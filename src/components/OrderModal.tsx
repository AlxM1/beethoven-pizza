"use client";

import { useState, useEffect } from "react";
import { X, Check, ChevronRight, ChevronLeft, ShoppingCart, Phone, MapPin } from "lucide-react";

interface OrderModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialPizza?: string;
}

const pizzas = [
  { name: "New Yorker", description: "Italian sausage, tomato, green pepper, onion, fresh garlic" },
  { name: "Hawaiian", description: "Ham, pineapple" },
  { name: "Deluxe", description: "Ham, salami, green pepper, onion, tomato" },
  { name: "Athenian (Veggie)", description: "Spinach, black olives, tomato, green pepper, onion, feta cheese" },
  { name: "Olympian", description: "Ground beef, tomato, red onion, green pepper" },
  { name: "Herculean (Meat Lovers)", description: "Pepperoni, salami, ground beef" },
  { name: "Mediterranean", description: "Clam, shrimp, red pepper, red onions, fresh garlic" },
  { name: "House Special", description: "Grilled chicken, spinach, fresh garlic, tomato, artichoke" },
];

const sizes = [
  { name: "Small", price: 12.99, servings: "1-2 people" },
  { name: "Medium", price: 15.99, servings: "2-3 people" },
  { name: "Large", price: 19.99, servings: "3-4 people" },
];

const locations = [
  { name: "Cultus Lake", phone: "604-858-7766", address: "4125 Columbia Valley Highway" },
  { name: "Burnaby", phone: "604-421-7735", address: "#4 - 2909 Bainbridge Avenue" },
];

export default function OrderModal({ isOpen, onClose, initialPizza }: OrderModalProps) {
  const [step, setStep] = useState(1);
  const [selectedPizza, setSelectedPizza] = useState<string | null>(null);
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [selectedLocation, setSelectedLocation] = useState<string | null>(null);

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
      setSelectedLocation(null);
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

  const handleLocationSelect = (locationName: string) => {
    setSelectedLocation(locationName);
  };

  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  const getSelectedPrice = () => {
    const size = sizes.find((s) => s.name === selectedSize);
    return size?.price || 0;
  };

  const getLocationPhone = () => {
    const location = locations.find((l) => l.name === selectedLocation);
    return location?.phone || "";
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
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
                <ChevronLeft size={24} className="text-[#2D1810]" />
              </button>
            )}
            <h2 className="text-xl font-bold text-[#2D1810]">
              {step === 1 && "Step 1: Choose Your Pizza"}
              {step === 2 && "Step 2: Select Size"}
              {step === 3 && "Step 3: Confirm Order"}
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X size={24} className="text-gray-500" />
          </button>
        </div>

        {/* Step indicator */}
        <div className="px-6 py-4 bg-[#FFF5E6]">
          <div className="flex items-center justify-center gap-2">
            {[1, 2, 3].map((s) => (
              <div key={s} className="flex items-center">
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm transition-all ${
                    step > s
                      ? "bg-green-500 text-white"
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
                      step > s ? "bg-green-500" : "bg-gray-200"
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
                  className={`p-4 rounded-xl border-2 text-left transition-all hover:shadow-lg ${
                    selectedPizza === pizza.name
                      ? "border-[#E63946] bg-[#FFF5E6]"
                      : "border-gray-200 hover:border-[#F77F00]"
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <span className="text-3xl">🍕</span>
                    <div>
                      <h3 className="font-bold text-[#2D1810]">{pizza.name}</h3>
                      <p className="text-sm text-gray-600">{pizza.description}</p>
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
                <p className="text-[#8B4513]">You selected:</p>
                <p className="text-2xl font-bold text-[#2D1810]">{selectedPizza}</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {sizes.map((size) => (
                  <button
                    key={size.name}
                    onClick={() => handleSizeSelect(size.name)}
                    className={`p-6 rounded-xl border-2 text-center transition-all hover:shadow-lg ${
                      selectedSize === size.name
                        ? "border-[#E63946] bg-[#FFF5E6]"
                        : "border-gray-200 hover:border-[#F77F00]"
                    }`}
                  >
                    <div className="text-4xl mb-2">
                      {size.name === "Small" ? "🍕" : size.name === "Medium" ? "🍕🍕" : "🍕🍕🍕"}
                    </div>
                    <h3 className="font-bold text-xl text-[#2D1810]">{size.name}</h3>
                    <p className="text-[#E63946] font-bold text-2xl">${size.price}</p>
                    <p className="text-sm text-gray-500 mt-1">{size.servings}</p>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Step 3: Confirm & Select Location */}
          {step === 3 && (
            <div className="space-y-6">
              {/* Order Summary */}
              <div className="bg-[#FFF5E6] rounded-xl p-6">
                <h3 className="font-bold text-lg text-[#2D1810] mb-4">Order Summary</h3>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[#8B4513]">Pizza:</span>
                  <span className="font-semibold text-[#2D1810]">{selectedPizza}</span>
                </div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[#8B4513]">Size:</span>
                  <span className="font-semibold text-[#2D1810]">{selectedSize}</span>
                </div>
                <div className="border-t border-[#D4A574] pt-3 mt-3">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-[#2D1810]">Total:</span>
                    <span className="font-bold text-2xl text-[#E63946]">
                      ${getSelectedPrice().toFixed(2)}
                    </span>
                  </div>
                </div>
              </div>

              {/* Select Location */}
              <div>
                <h3 className="font-bold text-lg text-[#2D1810] mb-4">
                  Select Pickup Location
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {locations.map((location) => (
                    <button
                      key={location.name}
                      onClick={() => handleLocationSelect(location.name)}
                      className={`p-4 rounded-xl border-2 text-left transition-all ${
                        selectedLocation === location.name
                          ? "border-[#E63946] bg-[#FFF5E6]"
                          : "border-gray-200 hover:border-[#F77F00]"
                      }`}
                    >
                      <h4 className="font-bold text-[#2D1810] mb-2">{location.name}</h4>
                      <div className="flex items-center gap-2 text-sm text-gray-600 mb-1">
                        <MapPin size={14} />
                        {location.address}
                      </div>
                      <div className="flex items-center gap-2 text-sm text-[#E63946] font-semibold">
                        <Phone size={14} />
                        {location.phone}
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Call to Order */}
              {selectedLocation && (
                <div className="text-center">
                  <p className="text-[#8B4513] mb-4">
                    Call now to place your order!
                  </p>
                  <a
                    href={`tel:${getLocationPhone()}`}
                    className="btn-primary text-xl px-8 py-4 inline-flex items-center gap-3 animate-pulse-glow"
                  >
                    <Phone size={24} />
                    Call {getLocationPhone()}
                  </a>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="sticky bottom-0 bg-white border-t border-gray-100 px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="text-sm text-gray-500">
              {step === 1 && `${pizzas.length} pizzas available`}
              {step === 2 && selectedPizza && `Selected: ${selectedPizza}`}
              {step === 3 && selectedPizza && selectedSize && (
                <span className="flex items-center gap-2">
                  <ShoppingCart size={16} />
                  {selectedPizza} ({selectedSize})
                </span>
              )}
            </div>

            {step < 3 && selectedPizza && step === 1 && (
              <button
                onClick={() => setStep(2)}
                className="btn-primary flex items-center gap-2"
              >
                Next
                <ChevronRight size={20} />
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
