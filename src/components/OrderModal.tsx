"use client";

import { useState, useEffect } from "react";
import { X, Check, ChevronLeft, Phone, MapPin } from "lucide-react";
import Image from "next/image";

interface OrderModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialPizza?: string;
}

const pizzas = [
  { name: "Beethoven's Special", description: "Our signature loaded pizza with salami rings", image: "/images/Beethoven's Special.JPEG" },
  { name: "Pepperoni", description: "Classic cup-and-char pepperoni", image: "/images/pepperoni.JPEG" },
  { name: "Hawaiian", description: "Ham and pineapple", image: "/images/_MG_4486.jpg" },
  { name: "Vegetarian", description: "Black olives, tomatoes, green peppers, onions, feta", image: "/images/image6.JPG" },
  { name: "Meat Lovers", description: "Pepperoni, salami, ham, ground beef", image: "/images/_MG_4472.jpg" },
  { name: "Build Your Own", description: "Start with cheese and add toppings", image: "/images/_MG_4490.jpg" },
];

const sizes = [
  { name: "Small", servings: "6 slices" },
  { name: "Medium", servings: "8 slices" },
  { name: "Large", servings: "12 slices" },
];

export default function OrderModal({ isOpen, onClose, initialPizza }: OrderModalProps) {
  const [step, setStep] = useState(1);
  const [selectedPizza, setSelectedPizza] = useState<string | null>(null);
  const [selectedSize, setSelectedSize] = useState<string | null>(null);

  // Reset when modal opens
  useEffect(() => {
    if (isOpen) {
      if (initialPizza) {
        setSelectedPizza(initialPizza);
        setStep(2);
      } else {
        setStep(1);
        setSelectedPizza(null);
      }
      setSelectedSize(null);
    }
  }, [isOpen, initialPizza]);

  const handlePizzaSelect = (pizzaName: string) => {
    setSelectedPizza(pizzaName);
    setStep(2);
  };

  const handleSizeSelect = (sizeName: string) => {
    setSelectedSize(sizeName);
    setStep(3);
  };

  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-[#2C3E50]/60 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative bg-white rounded-3xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-hidden animate-slide-up">
        {/* Header */}
        <div className="sticky top-0 bg-white border-b border-gray-100 px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            {step > 1 && (
              <button
                onClick={handleBack}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
              >
                <ChevronLeft size={24} className="text-[#2C3E50]" />
              </button>
            )}
            <h2 className="text-xl font-bold text-[#2C3E50]">
              {step === 1 && "Step 1: Choose Your Pizza"}
              {step === 2 && "Step 2: Select Size"}
              {step === 3 && "Step 3: Call to Order"}
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X size={24} className="text-gray-500" />
          </button>
        </div>

        {/* Step indicator - Summer lakeside theme */}
        <div className="px-6 py-4 bg-gradient-to-r from-[#B8E8E4]/30 to-[#FFF5EE]">
          <div className="flex items-center justify-center gap-2">
            {[1, 2, 3].map((s) => (
              <div key={s} className="flex items-center">
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm transition-all ${
                    step > s
                      ? "bg-[#4ECDC4] text-white"
                      : step === s
                      ? "pizza-gradient text-white"
                      : "bg-gray-200 text-gray-400"
                  }`}
                >
                  {step > s ? <Check size={16} /> : s}
                </div>
                {s < 3 && (
                  <div
                    className={`w-12 h-1 mx-1 rounded ${
                      step > s ? "bg-[#4ECDC4]" : "bg-gray-200"
                    }`}
                  />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto max-h-[calc(90vh-200px)]">
          {/* Step 1: Choose Pizza */}
          {step === 1 && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {pizzas.map((pizza) => (
                <button
                  key={pizza.name}
                  onClick={() => handlePizzaSelect(pizza.name)}
                  className={`p-3 rounded-xl border-2 text-left transition-all hover:shadow-lg ${
                    selectedPizza === pizza.name
                      ? "border-[#FF6B6B] bg-[#FFF5EE]"
                      : "border-gray-200 hover:border-[#4ECDC4]"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className="relative w-16 h-16 rounded-lg overflow-hidden flex-shrink-0">
                      <Image
                        src={pizza.image}
                        alt={pizza.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div>
                      <h3 className="font-bold text-[#2C3E50]">{pizza.name}</h3>
                      <p className="text-sm text-[#2C3E50]/70">{pizza.description}</p>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          )}

          {/* Step 2: Select Size */}
          {step === 2 && (
            <div className="space-y-4">
              <div className="text-center mb-6">
                <p className="text-[#2C3E50]/70">You selected:</p>
                <p className="text-2xl font-bold text-[#2C3E50]">{selectedPizza}</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {sizes.map((size) => (
                  <button
                    key={size.name}
                    onClick={() => handleSizeSelect(size.name)}
                    className={`p-6 rounded-xl border-2 text-center transition-all hover:shadow-lg ${
                      selectedSize === size.name
                        ? "border-[#FF6B6B] bg-[#FFF5EE]"
                        : "border-gray-200 hover:border-[#4ECDC4]"
                    }`}
                  >
                    <h3 className="font-bold text-xl text-[#2C3E50]">{size.name}</h3>
                    <p className="text-sm text-[#2C3E50]/60 mt-1">{size.servings}</p>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Step 3: Call to Order */}
          {step === 3 && (
            <div className="space-y-6">
              {/* Order Summary */}
              <div className="bg-gradient-to-br from-[#B8E8E4]/30 to-[#FFF5EE] rounded-xl p-6">
                <h3 className="font-bold text-lg text-[#2C3E50] mb-4">Your Order</h3>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[#2C3E50]/70">Pizza:</span>
                  <span className="font-semibold text-[#2C3E50]">{selectedPizza}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-[#2C3E50]/70">Size:</span>
                  <span className="font-semibold text-[#2C3E50]">{selectedSize}</span>
                </div>
              </div>

              {/* Location Info */}
              <div className="bg-white border border-gray-200 rounded-xl p-6">
                <h3 className="font-bold text-lg text-[#2C3E50] mb-4">
                  J. Beethoven&apos;s Pizza - Cultus Lake
                </h3>
                <div className="space-y-3 mb-6">
                  <div className="flex items-center gap-2 text-[#2C3E50]/70">
                    <MapPin size={16} className="text-[#FF6B6B]" />
                    <span>4125 Columbia Valley Highway, Cultus Lake, BC</span>
                  </div>
                  <div className="flex items-center gap-2 text-[#2C3E50]/70">
                    <Phone size={16} className="text-[#FF6B6B]" />
                    <span className="font-semibold">(604) 858-7766</span>
                  </div>
                </div>
              </div>

              {/* Call to Order */}
              <div className="text-center">
                <p className="text-[#2C3E50]/70 mb-4">
                  Call now to place your order!
                </p>
                <a
                  href="tel:604-858-7766"
                  className="btn-primary text-xl px-8 py-4 inline-flex items-center gap-3 animate-pulse-glow"
                >
                  <Phone size={24} />
                  Call (604) 858-7766
                </a>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="sticky bottom-0 bg-white border-t border-gray-100 px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="text-sm text-[#2C3E50]/60">
              {step === 1 && `${pizzas.length} pizzas available`}
              {step === 2 && selectedPizza && `Selected: ${selectedPizza}`}
              {step === 3 && selectedPizza && selectedSize && (
                <span>
                  {selectedPizza} ({selectedSize})
                </span>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
