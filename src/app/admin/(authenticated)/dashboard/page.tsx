"use client";

import { useEffect, useState } from "react";
import {
  DollarSign,
  ShoppingBag,
  Clock,
  TrendingUp,
  Loader2,
} from "lucide-react";
import { formatCurrency } from "@/lib/utils";

interface DashboardData {
  today: { revenue: number; orders: number };
  week: { revenue: number; orders: number };
  month: { revenue: number; orders: number };
  pendingOrders: number;
  recentOrders: Array<{
    id: string;
    orderNumber: string;
    customerName: string;
    total: number;
    status: string;
    createdAt: string;
  }>;
  popularItems: Array<{
    menuItemId: string;
    _sum: { quantity: number };
    menuItem: { name: string };
  }>;
}

export default function DashboardPage() {
  const [data, setData] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/analytics")
      .then((res) => res.json())
      .then(setData)
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="animate-spin text-[#FF6B6B]" size={40} />
      </div>
    );
  }

  if (!data) {
    return <div>Failed to load dashboard data</div>;
  }

  const stats = [
    {
      label: "Today's Revenue",
      value: formatCurrency(data.today.revenue),
      subtext: `${data.today.orders} orders`,
      icon: DollarSign,
      color: "bg-green-500",
    },
    {
      label: "This Week",
      value: formatCurrency(data.week.revenue),
      subtext: `${data.week.orders} orders`,
      icon: TrendingUp,
      color: "bg-blue-500",
    },
    {
      label: "This Month",
      value: formatCurrency(data.month.revenue),
      subtext: `${data.month.orders} orders`,
      icon: ShoppingBag,
      color: "bg-purple-500",
    },
    {
      label: "Pending Orders",
      value: data.pendingOrders.toString(),
      subtext: "Needs attention",
      icon: Clock,
      color: "bg-orange-500",
    },
  ];

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className="bg-white rounded-xl shadow-sm p-6 flex items-start gap-4"
          >
            <div className={`${stat.color} p-3 rounded-lg text-white`}>
              <stat.icon size={24} />
            </div>
            <div>
              <p className="text-sm text-gray-500">{stat.label}</p>
              <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
              <p className="text-sm text-gray-400">{stat.subtext}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Orders */}
        <div className="bg-white rounded-xl shadow-sm p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">
            Recent Orders
          </h2>
          {data.recentOrders.length === 0 ? (
            <p className="text-gray-500 text-center py-8">No orders yet</p>
          ) : (
            <div className="space-y-3">
              {data.recentOrders.slice(0, 5).map((order) => (
                <div
                  key={order.id}
                  className="flex items-center justify-between py-3 border-b last:border-0"
                >
                  <div>
                    <p className="font-medium text-gray-900">
                      {order.orderNumber}
                    </p>
                    <p className="text-sm text-gray-500">{order.customerName}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-gray-900">
                      {formatCurrency(order.total)}
                    </p>
                    <span
                      className={`inline-block px-2 py-0.5 rounded-full text-xs font-medium ${
                        order.status === "completed"
                          ? "bg-gray-100 text-gray-600"
                          : order.status === "ready"
                          ? "bg-green-100 text-green-600"
                          : order.status === "preparing"
                          ? "bg-orange-100 text-orange-600"
                          : order.status === "confirmed"
                          ? "bg-blue-100 text-blue-600"
                          : "bg-yellow-100 text-yellow-600"
                      }`}
                    >
                      {order.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Popular Items */}
        <div className="bg-white rounded-xl shadow-sm p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">
            Popular Items (This Month)
          </h2>
          {data.popularItems.length === 0 ? (
            <p className="text-gray-500 text-center py-8">No data yet</p>
          ) : (
            <div className="space-y-3">
              {data.popularItems.map((item, index) => (
                <div
                  key={item.menuItemId}
                  className="flex items-center gap-4 py-3 border-b last:border-0"
                >
                  <span className="w-8 h-8 rounded-full bg-[#FF6B6B] text-white flex items-center justify-center font-bold">
                    {index + 1}
                  </span>
                  <div className="flex-1">
                    <p className="font-medium text-gray-900">
                      {item.menuItem?.name || "Unknown Item"}
                    </p>
                  </div>
                  <span className="text-gray-500">
                    {item._sum.quantity} sold
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
