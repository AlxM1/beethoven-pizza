"use client";

import { useEffect, useState } from "react";
import {
  Plus,
  Pencil,
  Trash2,
  Loader2,
  Check,
  X,
} from "lucide-react";
import { formatCurrency } from "@/lib/utils";

interface Category {
  id: string;
  name: string;
  slug: string;
  _count: { items: number };
}

interface MenuItem {
  id: string;
  name: string;
  description: string | null;
  price: number | null;
  priceSmall: number | null;
  priceMedium: number | null;
  priceLarge: number | null;
  isActive: boolean;
  isSignature: boolean;
  isPopular: boolean;
  category: { id: string; name: string };
}

export default function MenuManagementPage() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [items, setItems] = useState<MenuItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingItem, setEditingItem] = useState<string | null>(null);

  useEffect(() => {
    Promise.all([
      fetch("/api/menu/categories").then((r) => r.json()),
      fetch("/api/menu?active=false").then((r) => r.json()),
    ]).then(([cats, menuItems]) => {
      setCategories(cats);
      setItems(menuItems);
      setLoading(false);
    });
  }, []);

  const toggleActive = async (item: MenuItem) => {
    const res = await fetch(`/api/menu/${item.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ isActive: !item.isActive }),
    });
    if (res.ok) {
      const updated = await res.json();
      setItems(items.map((i) => (i.id === item.id ? updated : i)));
    }
  };

  const deleteItem = async (id: string) => {
    if (!confirm("Are you sure you want to delete this item?")) return;
    const res = await fetch(`/api/menu/${id}`, { method: "DELETE" });
    if (res.ok) {
      setItems(items.filter((i) => i.id !== id));
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="animate-spin text-[#FF6B6B]" size={40} />
      </div>
    );
  }

  const groupedItems = categories.map((cat) => ({
    ...cat,
    items: items.filter((item) => item.category.id === cat.id),
  }));

  return (
    <div className="space-y-4 md:space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <h1 className="text-xl md:text-2xl font-bold text-gray-900">Menu Management</h1>
        <button className="bg-[#FF6B6B] hover:bg-[#FF5252] text-white px-4 py-2 rounded-lg flex items-center justify-center gap-2 transition-colors text-sm md:text-base">
          <Plus size={18} className="md:w-5 md:h-5" />
          Add Item
        </button>
      </div>

      {groupedItems.map((category) => (
        <div key={category.id} className="bg-white rounded-xl shadow-sm overflow-hidden">
          <div className="bg-[#2C3E50] text-white px-4 md:px-6 py-3 md:py-4 flex items-center justify-between">
            <h2 className="text-base md:text-lg font-semibold">{category.name}</h2>
            <span className="bg-white/20 px-2 md:px-3 py-1 rounded-full text-xs md:text-sm">
              {category.items.length} items
            </span>
          </div>

          <div className="divide-y">
            {category.items.length === 0 ? (
              <p className="text-gray-500 text-center py-8 text-sm md:text-base">No items in this category</p>
            ) : (
              category.items.map((item) => (
                <div
                  key={item.id}
                  className={`px-4 md:px-6 py-3 md:py-4 flex flex-col sm:flex-row sm:items-center gap-3 ${
                    !item.isActive ? "bg-gray-50 opacity-60" : ""
                  }`}
                >
                  <div className="flex-1 min-w-0">
                    <div className="flex flex-wrap items-center gap-2">
                      <h3 className="font-medium text-gray-900 text-sm md:text-base">
                        {item.name}
                      </h3>
                      {item.isSignature && (
                        <span className="bg-[#FF6B6B] text-white text-xs px-2 py-0.5 rounded-full">
                          Signature
                        </span>
                      )}
                      {item.isPopular && (
                        <span className="bg-[#FFE66D] text-[#2C3E50] text-xs px-2 py-0.5 rounded-full">
                          Popular
                        </span>
                      )}
                    </div>
                    {item.description && (
                      <p className="text-xs md:text-sm text-gray-500 mt-1 line-clamp-2">
                        {item.description}
                      </p>
                    )}
                  </div>

                  <div className="flex items-center justify-between sm:justify-end gap-3 sm:gap-4">
                    <div className="text-right">
                      {item.price ? (
                        <span className="font-semibold text-gray-900 text-sm md:text-base">
                          {formatCurrency(item.price)}
                        </span>
                      ) : (
                        <div className="text-xs md:text-sm text-gray-500 space-y-0.5">
                          <div>S: {formatCurrency(item.priceSmall || 0)}</div>
                          <div>M: {formatCurrency(item.priceMedium || 0)}</div>
                          <div>L: {formatCurrency(item.priceLarge || 0)}</div>
                        </div>
                      )}
                    </div>

                    <div className="flex items-center gap-1.5 md:gap-2">
                      <button
                        onClick={() => toggleActive(item)}
                        className={`p-1.5 md:p-2 rounded-lg transition-colors ${
                          item.isActive
                            ? "bg-green-100 text-green-600 hover:bg-green-200"
                            : "bg-gray-100 text-gray-400 hover:bg-gray-200"
                        }`}
                        title={item.isActive ? "Deactivate" : "Activate"}
                      >
                        {item.isActive ? <Check size={16} className="md:w-[18px] md:h-[18px]" /> : <X size={16} className="md:w-[18px] md:h-[18px]" />}
                      </button>
                      <button
                        onClick={() => setEditingItem(item.id)}
                        className="p-1.5 md:p-2 bg-blue-100 text-blue-600 rounded-lg hover:bg-blue-200 transition-colors"
                        title="Edit"
                      >
                        <Pencil size={16} className="md:w-[18px] md:h-[18px]" />
                      </button>
                      <button
                        onClick={() => deleteItem(item.id)}
                        className="p-1.5 md:p-2 bg-red-100 text-red-600 rounded-lg hover:bg-red-200 transition-colors"
                        title="Delete"
                      >
                        <Trash2 size={16} className="md:w-[18px] md:h-[18px]" />
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
