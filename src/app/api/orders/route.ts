import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { getSession } from "@/lib/auth";
import { generateOrderNumber, calculateTax } from "@/lib/utils";
import { z } from "zod";

const orderItemSchema = z.object({
  menuItemId: z.string(),
  quantity: z.number().min(1),
  size: z.enum(["small", "medium", "large"]).optional(),
  unitPrice: z.number(),
  totalPrice: z.number(),
  specialInstructions: z.string().optional(),
  toppings: z
    .array(
      z.object({
        toppingId: z.string(),
        price: z.number(),
      })
    )
    .optional(),
});

const createOrderSchema = z.object({
  customerName: z.string().min(1),
  customerPhone: z.string().min(1),
  customerEmail: z.string().email().optional(),
  orderType: z.enum(["phone", "online_stripe", "online_pickup"]),
  pickupTime: z.string().optional(),
  notes: z.string().optional(),
  items: z.array(orderItemSchema).min(1),
  subtotal: z.number(),
});

// GET all orders (admin only)
export async function GET(request: NextRequest) {
  const session = await getSession();
  if (!session || session.role !== "admin") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { searchParams } = new URL(request.url);
  const status = searchParams.get("status");
  const dateRange = searchParams.get("dateRange");
  const orderType = searchParams.get("orderType");

  let dateFilter = {};
  if (dateRange === "today") {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    dateFilter = { createdAt: { gte: today } };
  } else if (dateRange === "week") {
    const weekAgo = new Date();
    weekAgo.setDate(weekAgo.getDate() - 7);
    dateFilter = { createdAt: { gte: weekAgo } };
  } else if (dateRange === "month") {
    const monthAgo = new Date();
    monthAgo.setMonth(monthAgo.getMonth() - 1);
    dateFilter = { createdAt: { gte: monthAgo } };
  }

  const orders = await prisma.order.findMany({
    where: {
      ...(status && status !== "all" && { status }),
      ...(orderType && orderType !== "all" && { orderType }),
      ...dateFilter,
    },
    include: {
      items: {
        include: {
          menuItem: true,
          toppings: { include: { topping: true } },
        },
      },
    },
    orderBy: { createdAt: "desc" },
  });

  return NextResponse.json(orders);
}

// POST create order (public)
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const data = createOrderSchema.parse(body);

    const tax = calculateTax(data.subtotal);
    const total = data.subtotal + tax;

    const order = await prisma.order.create({
      data: {
        orderNumber: generateOrderNumber(),
        customerName: data.customerName,
        customerPhone: data.customerPhone,
        customerEmail: data.customerEmail || null,
        orderType: data.orderType,
        status: data.orderType === "online_stripe" ? "pending" : "confirmed",
        paymentStatus:
          data.orderType === "online_stripe" ? "pending" : "pending",
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
            specialInstructions: item.specialInstructions || null,
            toppings: {
              create:
                item.toppings?.map((t) => ({
                  toppingId: t.toppingId,
                  price: t.price,
                })) || [],
            },
          })),
        },
      },
      include: {
        items: {
          include: {
            menuItem: true,
            toppings: { include: { topping: true } },
          },
        },
      },
    });

    return NextResponse.json(order, { status: 201 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: error.errors }, { status: 400 });
    }
    console.error("Create order error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
