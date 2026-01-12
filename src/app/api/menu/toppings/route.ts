import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { getSession } from "@/lib/auth";

// GET all toppings (public)
export async function GET() {
  const toppings = await prisma.topping.findMany({
    where: { isActive: true },
    orderBy: [{ type: "asc" }, { displayOrder: "asc" }],
  });

  return NextResponse.json(toppings);
}

// POST create topping (admin only)
export async function POST(request: NextRequest) {
  const session = await getSession();
  if (!session || session.role !== "admin") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const data = await request.json();

    const topping = await prisma.topping.create({
      data: {
        name: data.name,
        type: data.type || "regular",
        priceSmall: data.priceSmall,
        priceMedium: data.priceMedium,
        priceLarge: data.priceLarge,
        displayOrder: data.displayOrder || 0,
      },
    });

    return NextResponse.json(topping, { status: 201 });
  } catch (error) {
    console.error("Create topping error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
