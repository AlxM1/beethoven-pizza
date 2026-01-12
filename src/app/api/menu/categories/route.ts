import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { getSession } from "@/lib/auth";
import { slugify } from "@/lib/utils";
import { z } from "zod";

// GET all categories (public)
export async function GET() {
  const categories = await prisma.category.findMany({
    where: { isActive: true },
    include: {
      _count: { select: { items: true } },
    },
    orderBy: { displayOrder: "asc" },
  });

  return NextResponse.json(categories);
}

const createCategorySchema = z.object({
  name: z.string().min(1),
  description: z.string().optional(),
  displayOrder: z.number().optional(),
  isActive: z.boolean().optional(),
});

// POST create category (admin only)
export async function POST(request: NextRequest) {
  const session = await getSession();
  if (!session || session.role !== "admin") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await request.json();
    const data = createCategorySchema.parse(body);

    const category = await prisma.category.create({
      data: {
        ...data,
        slug: slugify(data.name),
      },
    });

    return NextResponse.json(category, { status: 201 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: error.errors }, { status: 400 });
    }
    console.error("Create category error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
