"use client";

import { useEffect, useState } from "react";
import { Loader2, Eye, ChevronDown } from "lucide-react";
import { formatCurrency, formatDate, ORDER_STATUSES, ORDER_TYPES } from "@/lib/utils";

interface OrderItem {
  id: string;
  quantity: number;
  size: string | null;
  totalPrice: number;
  menuItem: { name: string };
}

interface Order {
  id: string;
  orderNumber: string;
  customerName: string;
  customerPhone: string;
  customerEmail: string | null;
  orderType: string;
  status: string;
  paymentStatus: string;
  subtotal: number;
  tax: number;
  total: number;
  notes: string | null;
  createdAt: string;
  items: OrderItem[];
}

export default function OrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    status: "all",
    dateRange: "today",
    orderType: "all",
  });
  const [expandedOrder, setExpandedOrder] = useState<string | null>(null);

  const fetchOrders = async () => {
    setLoading(true);
    const params = new URLSearchParams(filters);
    const res = await fetch(`/api/orders?${params}`);
    const data = await res.json();
    setOrders(data);
    setLoading(false);
  };

  useEffect(() => {
    fetchOrders();
  }, [filters]);

  const updateStatus = async (orderId: string, status: string) => {
    const res = await fetch(`/api/orders/${orderId}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status }),
    });
    if (res.ok) {
      fetchOrders();
    }
  };

  return (
    <div className="space-y-4 md:space-y-6">
      <h1 className="text-xl md:text-2xl font-bold text-gray-900">Orders</h1>

      {/* Filters */}
      <div className="bg-white rounded-xl shadow-sm p-3 md:p-4 flex flex-col sm:flex-row sm:flex-wrap gap-3 md:gap-4">
        <div className="flex-1 min-w-[150px]">
          <label className="block text-xs md:text-sm font-medium text-gray-700 mb-1">
            Status
          </label>
          <select
            value={filters.status}
            onChange={(e) => setFilters({ ...filters, status: e.target.value })}
            className="w-full border border-gray-300 rounded-lg px-2 md:px-3 py-1.5 md:py-2 text-xs md:text-sm"
          >
            <option value="all">All Statuses</option>
            {Object.entries(ORDER_STATUSES).map(([key, { label }]) => (
              <option key={key} value={key}>
                {label}
              </option>
            ))}
          </select>
        </div>

        <div className="flex-1 min-w-[150px]">
          <label className="block text-xs md:text-sm font-medium text-gray-700 mb-1">
            Date Range
          </label>
          <select
            value={filters.dateRange}
            onChange={(e) =>
              setFilters({ ...filters, dateRange: e.target.value })
            }
            className="w-full border border-gray-300 rounded-lg px-2 md:px-3 py-1.5 md:py-2 text-xs md:text-sm"
          >
            <option value="today">Today</option>
            <option value="week">This Week</option>
            <option value="month">This Month</option>
            <option value="all">All Time</option>
          </select>
        </div>

        <div className="flex-1 min-w-[150px]">
          <label className="block text-xs md:text-sm font-medium text-gray-700 mb-1">
            Order Type
          </label>
          <select
            value={filters.orderType}
            onChange={(e) =>
              setFilters({ ...filters, orderType: e.target.value })
            }
            className="w-full border border-gray-300 rounded-lg px-2 md:px-3 py-1.5 md:py-2 text-xs md:text-sm"
          >
            <option value="all">All Types</option>
            {Object.entries(ORDER_TYPES).map(([key, { label }]) => (
              <option key={key} value={key}>
                {label}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Orders List */}
      {loading ? (
        <div className="flex items-center justify-center h-64">
          <Loader2 className="animate-spin text-[#FF6B6B] md:w-10 md:h-10" size={32} />
        </div>
      ) : orders.length === 0 ? (
        <div className="bg-white rounded-xl shadow-sm p-8 md:p-12 text-center">
          <p className="text-gray-500 text-sm md:text-base">No orders found</p>
        </div>
      ) : (
        <div className="space-y-3 md:space-y-4">
          {orders.map((order) => {
            const statusInfo =
              ORDER_STATUSES[order.status as keyof typeof ORDER_STATUSES];
            const typeInfo =
              ORDER_TYPES[order.orderType as keyof typeof ORDER_TYPES];
            const isExpanded = expandedOrder === order.id;

            return (
              <div
                key={order.id}
                className="bg-white rounded-xl shadow-sm overflow-hidden"
              >
                <div
                  className="p-3 md:p-4 flex items-center gap-3 md:gap-4 cursor-pointer hover:bg-gray-50"
                  onClick={() =>
                    setExpandedOrder(isExpanded ? null : order.id)
                  }
                >
                  <div className="flex-1 min-w-0">
                    <div className="flex flex-wrap items-center gap-1.5 md:gap-2 mb-1">
                      <span className="font-bold text-gray-900 text-sm md:text-base">
                        {order.orderNumber}
                      </span>
                      <span
                        className={`px-1.5 md:px-2 py-0.5 rounded-full text-xs font-medium bg-${statusInfo?.color}-100 text-${statusInfo?.color}-600`}
                        style={{
                          backgroundColor:
                            statusInfo?.color === "yellow"
                              ? "#FEF3C7"
                              : statusInfo?.color === "blue"
                              ? "#DBEAFE"
                              : statusInfo?.color === "orange"
                              ? "#FFEDD5"
                              : statusInfo?.color === "green"
                              ? "#D1FAE5"
                              : statusInfo?.color === "red"
                              ? "#FEE2E2"
                              : "#F3F4F6",
                          color:
                            statusInfo?.color === "yellow"
                              ? "#D97706"
                              : statusInfo?.color === "blue"
                              ? "#2563EB"
                              : statusInfo?.color === "orange"
                              ? "#EA580C"
                              : statusInfo?.color === "green"
                              ? "#059669"
                              : statusInfo?.color === "red"
                              ? "#DC2626"
                              : "#6B7280",
                        }}
                      >
                        {statusInfo?.label}
                      </span>
                      <span className="px-1.5 md:px-2 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-600">
                        {typeInfo?.label}
                      </span>
                    </div>
                    <p className="text-xs md:text-sm text-gray-500 truncate">
                      {order.customerName} - {order.customerPhone}
                    </p>
                    <p className="text-xs text-gray-400">
                      {formatDate(new Date(order.createdAt))}
                    </p>
                  </div>

                  <div className="text-right flex-shrink-0">
                    <p className="font-bold text-base md:text-lg text-gray-900">
                      {formatCurrency(order.total)}
                    </p>
                    <p className="text-xs md:text-sm text-gray-500">
                      {order.items.length} items
                    </p>
                  </div>

                  <ChevronDown
                    className={`text-gray-400 transition-transform flex-shrink-0 md:w-5 md:h-5 ${
                      isExpanded ? "rotate-180" : ""
                    }`}
                    size={18}
                  />
                </div>

                {isExpanded && (
                  <div className="border-t bg-gray-50 p-3 md:p-4">
                    <div className="mb-3 md:mb-4">
                      <h4 className="font-medium text-gray-900 mb-2 text-sm md:text-base">Items:</h4>
                      <ul className="space-y-1">
                        {order.items.map((item) => (
                          <li
                            key={item.id}
                            className="text-xs md:text-sm text-gray-600 flex justify-between gap-2"
                          >
                            <span className="truncate">
                              {item.quantity}x {item.menuItem.name}
                              {item.size && ` (${item.size})`}
                            </span>
                            <span className="flex-shrink-0">{formatCurrency(item.totalPrice)}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {order.notes && (
                      <div className="mb-3 md:mb-4 p-2 md:p-3 bg-yellow-50 rounded-lg">
                        <p className="text-xs md:text-sm text-yellow-800">
                          <strong>Notes:</strong> {order.notes}
                        </p>
                      </div>
                    )}

                    <div className="flex flex-col sm:flex-row sm:items-center gap-2">
                      <label className="text-xs md:text-sm font-medium text-gray-700 sm:whitespace-nowrap">
                        Update Status:
                      </label>
                      <select
                        value={order.status}
                        onChange={(e) => updateStatus(order.id, e.target.value)}
                        className="flex-1 sm:flex-none border border-gray-300 rounded px-2 py-1 text-xs md:text-sm"
                      >
                        {Object.entries(ORDER_STATUSES).map(
                          ([key, { label }]) => (
                            <option key={key} value={key}>
                              {label}
                            </option>
                          )
                        )}
                      </select>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
