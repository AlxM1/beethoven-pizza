"use client";

import { useState, useEffect } from "react";
import {
  X,
  ChevronLeft,
  Plus,
  Minus,
  Trash2,
  Phone,
  CreditCard,
  Wallet,
  Check,
  Loader2,
  ShoppingBag,
} from "lucide-react";
import { useCart, CartItem } from "./CartContext";
import { formatCurrency } from "@/lib/utils";
import { loadStripe } from "@stripe/stripe-js";

interface MenuItem {
  id: string;
  name: string;
  description: string | null;
  price: number | null;
  priceSmall: number | null;
  priceMedium: number | null;
  priceLarge: number | null;
  imageUrl: string | null;
  isSignature: boolean;
  isPopular: boolean;
  category: { id: string; name: string; slug: string };
}

interface Topping {
  id: string;
  name: string;
  type: string;
  priceSmall: number;
  priceMedium: number;
  priceLarge: number;
}

interface Category {
  id: string;
  name: string;
  slug: string;
}

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY || ""
);

export default function EnhancedOrderModal({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  const cart = useCart();
  const [step, setStep] = useState(1);
  const [categories, setCategories] = useState<Category[]>([]);
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const [toppings, setToppings] = useState<Topping[]>([]);
  const [loading, setLoading] = useState(true);

  // Selection state
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedItem, setSelectedItem] = useState<MenuItem | null>(null);
  const [selectedSize, setSelectedSize] = useState<"small" | "medium" | "large">("medium");
  const [selectedToppings, setSelectedToppings] = useState<Topping[]>([]);
  const [specialInstructions, setSpecialInstructions] = useState("");

  // Customer info
  const [customerName, setCustomerName] = useState("");
  const [customerPhone, setCustomerPhone] = useState("");
  const [customerEmail, setCustomerEmail] = useState("");
  const [pickupTime, setPickupTime] = useState("");
  const [notes, setNotes] = useState("");

  // Payment
  const [paymentMethod, setPaymentMethod] = useState<"phone" | "stripe" | "pickup">("phone");
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [orderNumber, setOrderNumber] = useState("");
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (isOpen) {
      Promise.all([
        fetch("/api/menu/categories").then((r) => r.json()),
        fetch("/api/menu").then((r) => r.json()),
        fetch("/api/menu/toppings").then((r) => r.json()),
      ]).then(([cats, items, tops]) => {
        setCategories(cats);
        setMenuItems(items);
        setToppings(tops);
        if (cats.length > 0) setSelectedCategory(cats[0].id);
        setLoading(false);
      });
    }
  }, [isOpen]);

  const resetSelection = () => {
    setSelectedItem(null);
    setSelectedSize("medium");
    setSelectedToppings([]);
    setSpecialInstructions("");
  };

  const getPrice = (item: MenuItem, size: "small" | "medium" | "large") => {
    if (item.price) return item.price;
    if (size === "small") return item.priceSmall || 0;
    if (size === "medium") return item.priceMedium || 0;
    return item.priceLarge || 0;
  };

  const getToppingPrice = (topping: Topping, size: "small" | "medium" | "large") => {
    if (size === "small") return topping.priceSmall;
    if (size === "medium") return topping.priceMedium;
    return topping.priceLarge;
  };

  const addToCart = () => {
    if (!selectedItem) return;

    const toppingsList = selectedToppings.map((t) => ({
      id: t.id,
      name: t.name,
      price: getToppingPrice(t, selectedSize),
    }));

    cart.addItem({
      menuItemId: selectedItem.id,
      name: selectedItem.name,
      size: selectedItem.price ? undefined : selectedSize,
      quantity: 1,
      unitPrice: getPrice(selectedItem, selectedSize),
      toppings: toppingsList,
      specialInstructions: specialInstructions || undefined,
    });

    resetSelection();
    setStep(1);
  };

  const placeOrder = async () => {
    setSubmitting(true);

    const orderData = {
      customerName,
      customerPhone,
      customerEmail: customerEmail || undefined,
      orderType: paymentMethod === "stripe" ? "online_stripe" : paymentMethod === "pickup" ? "online_pickup" : "phone",
      pickupTime: pickupTime || undefined,
      notes: notes || undefined,
      items: cart.items.map((item) => ({
        menuItemId: item.menuItemId,
        name: item.name,
        quantity: item.quantity,
        size: item.size,
        unitPrice: item.unitPrice,
        totalPrice: (item.unitPrice + item.toppings.reduce((s, t) => s + t.price, 0)) * item.quantity,
        toppings: item.toppings.map((t) => ({ toppingId: t.id, price: t.price })),
      })),
      subtotal: cart.subtotal,
    };

    try {
      if (paymentMethod === "stripe") {
        const res = await fetch("/api/checkout/stripe", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(orderData),
        });
        const data = await res.json();

        if (data.clientSecret) {
          // For now, show success - in production, use Stripe Elements
          setOrderNumber(data.orderNumber);
          setOrderPlaced(true);
          cart.clearCart();
          setStep(6);
        }
      } else {
        const res = await fetch("/api/orders", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(orderData),
        });
        const order = await res.json();
        setOrderNumber(order.orderNumber);
        setOrderPlaced(true);
        cart.clearCart();
        setStep(6);
      }
    } catch (error) {
      console.error("Order error:", error);
    } finally {
      setSubmitting(false);
    }
  };

  if (!isOpen) return null;

  const filteredItems = menuItems.filter(
    (item) => item.category.id === selectedCategory
  );
  const isPizzaCategory = categories.find((c) => c.id === selectedCategory)?.slug === "pizza";

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4">
      <div className="bg-white rounded-t-2xl sm:rounded-2xl w-full max-w-2xl max-h-[95vh] sm:max-h-[90vh] overflow-hidden flex flex-col">
        {/* Header */}
        <div className="bg-gradient-to-r from-[#FF6B6B] to-[#FF9A5C] p-3 md:p-4 text-white flex items-center justify-between">
          <div className="flex items-center gap-2 md:gap-3 min-w-0">
            {step > 1 && step < 6 && (
              <button
                onClick={() => {
                  if (step === 2) resetSelection();
                  setStep(step - 1);
                }}
                className="p-1 hover:bg-white/20 rounded-lg transition-colors flex-shrink-0"
              >
                <ChevronLeft size={20} className="md:w-6 md:h-6" />
              </button>
            )}
            <h2 className="text-base md:text-xl font-bold truncate">
              {step === 1 && "Choose Your Items"}
              {step === 2 && "Customize"}
              {step === 3 && "Your Cart"}
              {step === 4 && "Your Details"}
              {step === 5 && "Payment"}
              {step === 6 && "Order Confirmed!"}
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 md:p-2 hover:bg-white/20 rounded-lg transition-colors flex-shrink-0"
          >
            <X size={20} className="md:w-6 md:h-6" />
          </button>
        </div>

        {/* Progress */}
        {step < 6 && (
          <div className="flex px-4 py-2 bg-gray-100 gap-1">
            {[1, 2, 3, 4, 5].map((s) => (
              <div
                key={s}
                className={`flex-1 h-1.5 rounded-full transition-colors ${
                  s <= step ? "bg-[#FF6B6B]" : "bg-gray-300"
                }`}
              />
            ))}
          </div>
        )}

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-3 md:p-4">
          {loading ? (
            <div className="flex items-center justify-center h-48">
              <Loader2 className="animate-spin text-[#FF6B6B]" size={32} className="md:w-10 md:h-10" />
            </div>
          ) : step === 1 ? (
            <div className="space-y-4">
              {/* Categories */}
              <div className="flex gap-2 overflow-x-auto pb-2">
                {categories.map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => setSelectedCategory(cat.id)}
                    className={`px-4 py-2 rounded-full whitespace-nowrap transition-colors ${
                      selectedCategory === cat.id
                        ? "bg-[#FF6B6B] text-white"
                        : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                    }`}
                  >
                    {cat.name}
                  </button>
                ))}
              </div>

              {/* Items */}
              <div className="grid gap-3">
                {filteredItems.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => {
                      setSelectedItem(item);
                      setStep(2);
                    }}
                    className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors text-left"
                  >
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <h3 className="font-semibold text-gray-900">{item.name}</h3>
                        {item.isSignature && (
                          <span className="bg-[#FF6B6B] text-white text-xs px-2 py-0.5 rounded-full">
                            Signature
                          </span>
                        )}
                      </div>
                      {item.description && (
                        <p className="text-sm text-gray-500 mt-1 line-clamp-2">
                          {item.description}
                        </p>
                      )}
                    </div>
                    <div className="text-right">
                      {item.price ? (
                        <span className="font-bold text-[#FF6B6B]">
                          {formatCurrency(item.price)}
                        </span>
                      ) : (
                        <span className="text-sm text-gray-500">
                          from {formatCurrency(item.priceSmall || 0)}
                        </span>
                      )}
                    </div>
                  </button>
                ))}
              </div>

              {/* Cart Summary */}
              {cart.itemCount > 0 && (
                <button
                  onClick={() => setStep(3)}
                  className="fixed bottom-4 left-4 right-4 max-w-lg mx-auto bg-[#FF6B6B] text-white py-4 rounded-full font-bold flex items-center justify-center gap-2 shadow-lg hover:bg-[#FF5252] transition-colors"
                >
                  <ShoppingBag size={20} />
                  View Cart ({cart.itemCount}) - {formatCurrency(cart.total)}
                </button>
              )}
            </div>
          ) : step === 2 && selectedItem ? (
            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-bold text-gray-900">{selectedItem.name}</h3>
                {selectedItem.description && (
                  <p className="text-gray-500 mt-1">{selectedItem.description}</p>
                )}
              </div>

              {/* Size Selection */}
              {!selectedItem.price && (
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">Size</h4>
                  <div className="grid grid-cols-3 gap-2">
                    {(["small", "medium", "large"] as const).map((size) => (
                      <button
                        key={size}
                        onClick={() => setSelectedSize(size)}
                        className={`p-3 rounded-xl border-2 transition-colors ${
                          selectedSize === size
                            ? "border-[#FF6B6B] bg-[#FF6B6B]/10"
                            : "border-gray-200 hover:border-gray-300"
                        }`}
                      >
                        <div className="font-medium capitalize">{size}</div>
                        <div className="text-sm text-[#FF6B6B] font-bold">
                          {formatCurrency(getPrice(selectedItem, size))}
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Toppings for Pizza */}
              {isPizzaCategory && (
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">Extra Toppings</h4>
                  <div className="grid grid-cols-2 gap-2 max-h-48 overflow-y-auto">
                    {toppings.map((topping) => {
                      const isSelected = selectedToppings.some((t) => t.id === topping.id);
                      return (
                        <button
                          key={topping.id}
                          onClick={() => {
                            if (isSelected) {
                              setSelectedToppings(selectedToppings.filter((t) => t.id !== topping.id));
                            } else {
                              setSelectedToppings([...selectedToppings, topping]);
                            }
                          }}
                          className={`p-2 rounded-lg border text-left text-sm transition-colors ${
                            isSelected
                              ? "border-[#FF6B6B] bg-[#FF6B6B]/10"
                              : "border-gray-200 hover:border-gray-300"
                          }`}
                        >
                          <div className="flex justify-between">
                            <span>{topping.name}</span>
                            <span className="text-gray-500">
                              +{formatCurrency(getToppingPrice(topping, selectedSize))}
                            </span>
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Special Instructions */}
              <div>
                <h4 className="font-semibold text-gray-900 mb-2">Special Instructions</h4>
                <textarea
                  value={specialInstructions}
                  onChange={(e) => setSpecialInstructions(e.target.value)}
                  placeholder="Any special requests?"
                  className="w-full p-3 border border-gray-200 rounded-xl resize-none h-20"
                />
              </div>

              {/* Add to Cart Button */}
              <button
                onClick={addToCart}
                className="w-full bg-[#FF6B6B] text-white py-4 rounded-full font-bold hover:bg-[#FF5252] transition-colors"
              >
                Add to Cart -{" "}
                {formatCurrency(
                  getPrice(selectedItem, selectedSize) +
                    selectedToppings.reduce((s, t) => s + getToppingPrice(t, selectedSize), 0)
                )}
              </button>
            </div>
          ) : step === 3 ? (
            <div className="space-y-4">
              {cart.items.length === 0 ? (
                <div className="text-center py-12">
                  <ShoppingBag className="mx-auto text-gray-300 mb-4" size={48} />
                  <p className="text-gray-500">Your cart is empty</p>
                  <button
                    onClick={() => setStep(1)}
                    className="mt-4 text-[#FF6B6B] font-medium"
                  >
                    Browse Menu
                  </button>
                </div>
              ) : (
                <>
                  {cart.items.map((item) => (
                    <div key={item.id} className="flex items-start gap-4 p-4 bg-gray-50 rounded-xl">
                      <div className="flex-1">
                        <h4 className="font-semibold text-gray-900">
                          {item.name}
                          {item.size && ` (${item.size})`}
                        </h4>
                        {item.toppings.length > 0 && (
                          <p className="text-sm text-gray-500">
                            + {item.toppings.map((t) => t.name).join(", ")}
                          </p>
                        )}
                        <p className="text-[#FF6B6B] font-bold mt-1">
                          {formatCurrency(
                            (item.unitPrice + item.toppings.reduce((s, t) => s + t.price, 0)) *
                              item.quantity
                          )}
                        </p>
                      </div>
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() =>
                            item.quantity > 1
                              ? cart.updateQuantity(item.id, item.quantity - 1)
                              : cart.removeItem(item.id)
                          }
                          className="p-1 bg-gray-200 rounded-full hover:bg-gray-300"
                        >
                          {item.quantity === 1 ? <Trash2 size={16} /> : <Minus size={16} />}
                        </button>
                        <span className="w-8 text-center font-medium">{item.quantity}</span>
                        <button
                          onClick={() => cart.updateQuantity(item.id, item.quantity + 1)}
                          className="p-1 bg-gray-200 rounded-full hover:bg-gray-300"
                        >
                          <Plus size={16} />
                        </button>
                      </div>
                    </div>
                  ))}

                  <div className="border-t pt-4 space-y-2">
                    <div className="flex justify-between text-gray-600">
                      <span>Subtotal</span>
                      <span>{formatCurrency(cart.subtotal)}</span>
                    </div>
                    <div className="flex justify-between text-gray-600">
                      <span>Tax (12%)</span>
                      <span>{formatCurrency(cart.tax)}</span>
                    </div>
                    <div className="flex justify-between text-xl font-bold text-gray-900">
                      <span>Total</span>
                      <span>{formatCurrency(cart.total)}</span>
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <button
                      onClick={() => setStep(1)}
                      className="flex-1 py-3 border border-gray-300 rounded-full font-medium hover:bg-gray-50"
                    >
                      Add More
                    </button>
                    <button
                      onClick={() => setStep(4)}
                      className="flex-1 py-3 bg-[#FF6B6B] text-white rounded-full font-bold hover:bg-[#FF5252]"
                    >
                      Checkout
                    </button>
                  </div>
                </>
              )}
            </div>
          ) : step === 4 ? (
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Name *
                </label>
                <input
                  type="text"
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-xl"
                  placeholder="Your name"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Phone *
                </label>
                <input
                  type="tel"
                  value={customerPhone}
                  onChange={(e) => setCustomerPhone(e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-xl"
                  placeholder="(604) 555-1234"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Email
                </label>
                <input
                  type="email"
                  value={customerEmail}
                  onChange={(e) => setCustomerEmail(e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-xl"
                  placeholder="your@email.com"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Pickup Time
                </label>
                <input
                  type="time"
                  value={pickupTime}
                  onChange={(e) => setPickupTime(e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-xl"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Order Notes
                </label>
                <textarea
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-xl resize-none h-20"
                  placeholder="Any special requests?"
                />
              </div>

              <button
                onClick={() => setStep(5)}
                disabled={!customerName || !customerPhone}
                className="w-full py-4 bg-[#FF6B6B] text-white rounded-full font-bold hover:bg-[#FF5252] disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Continue to Payment
              </button>
            </div>
          ) : step === 5 ? (
            <div className="space-y-4">
              <div className="space-y-3">
                <button
                  onClick={() => setPaymentMethod("phone")}
                  className={`w-full p-4 rounded-xl border-2 flex items-center gap-4 transition-colors ${
                    paymentMethod === "phone"
                      ? "border-[#FF6B6B] bg-[#FF6B6B]/10"
                      : "border-gray-200 hover:border-gray-300"
                  }`}
                >
                  <Phone className="text-[#FF6B6B]" size={24} />
                  <div className="text-left">
                    <div className="font-semibold">Call to Order</div>
                    <div className="text-sm text-gray-500">
                      We&apos;ll call you to confirm your order
                    </div>
                  </div>
                </button>

                <button
                  onClick={() => setPaymentMethod("stripe")}
                  className={`w-full p-4 rounded-xl border-2 flex items-center gap-4 transition-colors ${
                    paymentMethod === "stripe"
                      ? "border-[#FF6B6B] bg-[#FF6B6B]/10"
                      : "border-gray-200 hover:border-gray-300"
                  }`}
                >
                  <CreditCard className="text-[#FF6B6B]" size={24} />
                  <div className="text-left">
                    <div className="font-semibold">Pay Online</div>
                    <div className="text-sm text-gray-500">
                      Secure payment with credit card
                    </div>
                  </div>
                </button>

                <button
                  onClick={() => setPaymentMethod("pickup")}
                  className={`w-full p-4 rounded-xl border-2 flex items-center gap-4 transition-colors ${
                    paymentMethod === "pickup"
                      ? "border-[#FF6B6B] bg-[#FF6B6B]/10"
                      : "border-gray-200 hover:border-gray-300"
                  }`}
                >
                  <Wallet className="text-[#FF6B6B]" size={24} />
                  <div className="text-left">
                    <div className="font-semibold">Pay at Pickup</div>
                    <div className="text-sm text-gray-500">
                      Pay when you pick up your order
                    </div>
                  </div>
                </button>
              </div>

              <div className="border-t pt-4">
                <div className="flex justify-between text-xl font-bold text-gray-900 mb-4">
                  <span>Total</span>
                  <span>{formatCurrency(cart.total)}</span>
                </div>

                <button
                  onClick={placeOrder}
                  disabled={submitting}
                  className="w-full py-4 bg-[#FF6B6B] text-white rounded-full font-bold hover:bg-[#FF5252] disabled:opacity-50 flex items-center justify-center gap-2"
                >
                  {submitting ? (
                    <>
                      <Loader2 className="animate-spin" size={20} />
                      Placing Order...
                    </>
                  ) : (
                    "Place Order"
                  )}
                </button>
              </div>
            </div>
          ) : step === 6 ? (
            <div className="text-center py-8">
              <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Check className="text-green-600" size={40} />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">
                Order Placed!
              </h3>
              <p className="text-gray-500 mb-4">
                Your order number is{" "}
                <span className="font-bold text-[#FF6B6B]">{orderNumber}</span>
              </p>
              <div className="bg-gray-50 rounded-xl p-4 mb-6 text-left">
                <p className="font-medium text-gray-900 mb-2">Pickup Location:</p>
                <p className="text-gray-600">4125 Columbia Valley Highway</p>
                <p className="text-gray-600">Cultus Lake, BC V2R 5B6</p>
                <p className="text-[#FF6B6B] font-bold mt-2">(604) 858-7766</p>
              </div>
              <button
                onClick={onClose}
                className="w-full py-4 bg-[#FF6B6B] text-white rounded-full font-bold hover:bg-[#FF5252]"
              >
                Done
              </button>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}
