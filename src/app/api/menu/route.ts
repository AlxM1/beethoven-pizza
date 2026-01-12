import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { getSession } from "@/lib/auth";
import { slugify } from "@/lib/utils";
import { z } from "zod";

// GET all menu items (public)
export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const categorySlug = searchParams.get("category");
  const activeOnly = searchParams.get("active") !== "false";

  const items = await prisma.menuItem.findMany({
    where: {
      ...(activeOnly && { isActive: true }),
      ...(categorySlug && { category: { slug: categorySlug } }),
    },
    include: { category: true },
    orderBy: [{ category: { displayOrder: "asc" } }, { displayOrder: "asc" }],
  });

  return NextResponse.json(items);
}

const createMenuItemSchema = z.object({
  name: z.string().min(1),
  description: z.string().optional(),
  categoryId: z.string(),
  price: z.number().optional(),
  priceSmall: z.number().optional(),
  priceMedium: z.number().optional(),
  priceLarge: z.number().optional(),
  isSignature: z.boolean().optional(),
  isPopular: z.boolean().optional(),
  isPremium: z.boolean().optional(),
  isGlutenFree: z.boolean().optional(),
  isVegetarian: z.boolean().optional(),
  isActive: z.boolean().optional(),
  imageUrl: z.string().optional(),
  displayOrder: z.number().optional(),
});

// POST create menu item (admin only)
export async function POST(request: NextRequest) {
  const session = await getSession();
  if (!session || session.role !== "admin") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await request.json();
    const data = createMenuItemSchema.parse(body);

    const item = await prisma.menuItem.create({
      data: {
        ...data,
        slug: slugify(data.name),
      },
      include: { category: true },
    });

    return NextResponse.json(item, { status: 201 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: error.issues }, { status: 400 });
    }
    console.error("Create menu item error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
