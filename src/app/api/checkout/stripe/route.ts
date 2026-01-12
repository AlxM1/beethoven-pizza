import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { stripe } from "@/lib/stripe";
import { generateOrderNumber, calculateTax } from "@/lib/utils";
import { z } from "zod";

const checkoutSchema = z.object({
  customerName: z.string().min(1),
  customerPhone: z.string().min(1),
  customerEmail: z.string().email(),
  pickupTime: z.string().optional(),
  notes: z.string().optional(),
  items: z
    .array(
      z.object({
        menuItemId: z.string(),
        name: z.string(),
        quantity: z.number().min(1),
        size: z.string().optional(),
        unitPrice: z.number(),
        totalPrice: z.number(),
        toppings: z.array(z.object({ toppingId: z.string(), price: z.number() })).optional(),
      })
    )
    .min(1),
  subtotal: z.number(),
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const data = checkoutSchema.parse(body);

    const tax = calculateTax(data.subtotal);
    const total = data.subtotal + tax;

    // Create pending order
    const order = await prisma.order.create({
      data: {
        orderNumber: generateOrderNumber(),
        customerName: data.customerName,
        customerPhone: data.customerPhone,
        customerEmail: data.customerEmail,
        orderType: "online_stripe",
        status: "pending",
        paymentStatus: "pending",
        subtotal: data.subtotal,
        tax,
        total,
        pickupTime: data.pickupTime ? new Date(data.pickupTime) : null,
        notes: data.notes || null,
        items: {
          create: data.items.map((item) => ({
            menuItemId: item.menuItemId,
            quantity: item.quantity,
            size: item.size || null,
            unitPrice: item.unitPrice,
            totalPrice: item.totalPrice,
            toppings: {
              create: item.toppings?.map((t) => ({ toppingId: t.toppingId, price: t.price })) || [],
            },
          })),
        },
      },
    });

    // Create Stripe payment intent
    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(total * 100), // cents
      currency: "cad",
      metadata: {
        orderId: order.id,
        orderNumber: order.orderNumber,
      },
      description: `Beethoven's Pizza Order ${order.orderNumber}`,
    });

    return NextResponse.json({
      clientSecret: paymentIntent.client_secret,
      orderId: order.id,
      orderNumber: order.orderNumber,
      total,
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: error.issues }, { status: 400 });
    }
    console.error("Stripe checkout error:", error);
    return NextResponse.json(
      { error: "Failed to create checkout session" },
      { status: 500 }
    );
  }
}
