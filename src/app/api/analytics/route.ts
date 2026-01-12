import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { getSession } from "@/lib/auth";

export async function GET() {
  const session = await getSession();
  if (!session || session.role !== "admin") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const weekAgo = new Date();
  weekAgo.setDate(weekAgo.getDate() - 7);

  const monthAgo = new Date();
  monthAgo.setMonth(monthAgo.getMonth() - 1);

  const [
    todayStats,
    weekStats,
    monthStats,
    pendingOrders,
    recentOrders,
    popularItems,
  ] = await Promise.all([
    // Today's stats
    prisma.order.aggregate({
      where: {
        createdAt: { gte: today },
        status: { not: "cancelled" },
      },
      _sum: { total: true },
      _count: true,
    }),
    // Week stats
    prisma.order.aggregate({
      where: {
        createdAt: { gte: weekAgo },
        status: { not: "cancelled" },
      },
      _sum: { total: true },
      _count: true,
    }),
    // Month stats
    prisma.order.aggregate({
      where: {
        createdAt: { gte: monthAgo },
        status: { not: "cancelled" },
      },
      _sum: { total: true },
      _count: true,
    }),
    // Pending orders count
    prisma.order.count({
      where: {
        status: { in: ["pending", "confirmed", "preparing"] },
      },
    }),
    // Recent orders
    prisma.order.findMany({
      take: 10,
      orderBy: { createdAt: "desc" },
      include: {
        items: {
          include: { menuItem: true },
        },
      },
    }),
    // Popular items (last 30 days)
    prisma.orderItem.groupBy({
      by: ["menuItemId"],
      where: {
        order: {
          createdAt: { gte: monthAgo },
          status: { not: "cancelled" },
        },
      },
      _sum: { quantity: true },
      orderBy: { _sum: { quantity: "desc" } },
      take: 5,
    }),
  ]);

  // Get menu item details for popular items
  const popularItemsWithDetails = await Promise.all(
    popularItems.map(async (item) => {
      const menuItem = await prisma.menuItem.findUnique({
        where: { id: item.menuItemId },
        select: { name: true, imageUrl: true },
      });
      return {
        ...item,
        menuItem,
      };
    })
  );

  return NextResponse.json({
    today: {
      revenue: todayStats._sum.total || 0,
      orders: todayStats._count,
    },
    week: {
      revenue: weekStats._sum.total || 0,
      orders: weekStats._count,
    },
    month: {
      revenue: monthStats._sum.total || 0,
      orders: monthStats._count,
    },
    pendingOrders,
    recentOrders,
    popularItems: popularItemsWithDetails,
  });
}
