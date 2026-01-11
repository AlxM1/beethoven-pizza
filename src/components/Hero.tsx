"use client";

import { Check, ChevronRight } from "lucide-react";

interface HeroProps {
  currentStep: number;
  onOrderClick: () => void;
}

export default function Hero({ currentStep, onOrderClick }: HeroProps) {
  const steps = [
    { num: 1, title: "Choose Pizza", desc: "Pick your favorite" },
    { num: 2, title: "Select Size", desc: "Small, Medium, Large" },
    { num: 3, title: "Confirm Order", desc: "Quick checkout" },
  ];

  return (
    <section className="relative overflow-hidden pizza-gradient-subtle">
      {/* Background decorations */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-20 -right-20 w-80 h-80 bg-[#FCBF49] rounded-full opacity-20 blur-3xl" />
        <div className="absolute -bottom-20 -left-20 w-80 h-80 bg-[#E63946] rounded-full opacity-10 blur-3xl" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 py-16 md:py-24 lg:py-32">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left content */}
          <div className="text-center lg:text-left">
            <div className="inline-block px-4 py-2 bg-white rounded-full shadow-sm mb-6">
              <span className="text-[#E63946] font-semibold text-sm">
                Order in just 3 clicks!
              </span>
            </div>

            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-[#2D1810] mb-6 leading-tight">
              The Best Pizza
              <br />
              <span className="pizza-gradient bg-clip-text text-transparent">
                In British Columbia
              </span>
            </h2>

            <p className="text-lg md:text-xl text-[#8B4513] mb-8 max-w-lg mx-auto lg:mx-0">
              Fresh ingredients, authentic recipes, and a symphony of flavors
              delivered hot to your door. Two locations serving you with love.
            </p>

            {/* Mobile 3-Click CTA */}
            <div className="lg:hidden mb-8">
              <button
                onClick={onOrderClick}
                className="w-full btn-primary text-xl py-4 animate-pulse-glow flex items-center justify-center gap-2"
              >
                <span>Start Your Order</span>
                <ChevronRight size={24} />
              </button>
            </div>

            {/* Desktop CTA buttons */}
            <div className="hidden lg:flex gap-4 mb-8">
              <button
                onClick={onOrderClick}
                className="btn-primary text-lg px-8 py-4 animate-pulse-glow flex items-center gap-2"
              >
                <span>Order Now</span>
                <ChevronRight size={24} />
              </button>
              <a
                href="#menu"
                className="btn-secondary text-lg px-8 py-4"
              >
                View Menu
              </a>
            </div>

            {/* Trust signals */}
            <div className="flex flex-wrap justify-center lg:justify-start gap-6 text-sm text-[#8B4513]">
              <div className="flex items-center gap-2">
                <Check size={18} className="text-green-500" />
                <span>Fresh Daily</span>
              </div>
              <div className="flex items-center gap-2">
                <Check size={18} className="text-green-500" />
                <span>Family Owned</span>
              </div>
              <div className="flex items-center gap-2">
                <Check size={18} className="text-green-500" />
                <span>2 Locations</span>
              </div>
            </div>
          </div>

          {/* Right content - 3 Step Visual */}
          <div className="hidden lg:block">
            <div className="bg-white rounded-3xl shadow-2xl p-8 relative">
              <h3 className="text-2xl font-bold text-[#2D1810] mb-6 text-center">
                Order in 3 Easy Steps
              </h3>

              {/* Step indicators */}
              <div className="flex justify-between items-center mb-8">
                {steps.map((step, index) => (
                  <div key={step.num} className="flex items-center">
                    <div className="flex flex-col items-center">
                      <div
                        className={`step-circle ${
                          currentStep > step.num
                            ? "completed"
                            : currentStep === step.num
                            ? "active"
                            : "pending"
                        }`}
                      >
                        {currentStep > step.num ? (
                          <Check size={24} />
                        ) : (
                          step.num
                        )}
                      </div>
                      <span className="mt-2 font-medium text-[#2D1810]">
                        {step.title}
                      </span>
                      <span className="text-xs text-gray-500">{step.desc}</span>
                    </div>
                    {index < steps.length - 1 && (
                      <div
                        className={`w-16 h-1 mx-2 mt-[-20px] rounded ${
                          currentStep > step.num
                            ? "bg-green-500"
                            : "bg-gray-200"
                        }`}
                      />
                    )}
                  </div>
                ))}
              </div>

              {/* Pizza preview image placeholder */}
              <div className="relative aspect-video rounded-2xl overflow-hidden bg-gradient-to-br from-[#FCBF49] to-[#F77F00]">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center text-white">
                    <div className="text-8xl mb-4 animate-bounce-gentle">
                      🍕
                    </div>
                    <p className="text-xl font-semibold">
                      Your perfect pizza awaits!
                    </p>
                  </div>
                </div>
              </div>

              {/* Quick action button */}
              <button
                onClick={onOrderClick}
                className="mt-6 w-full btn-primary text-lg py-4 flex items-center justify-center gap-2"
              >
                <span>Start Your Order</span>
                <ChevronRight size={24} />
              </button>
            </div>
          </div>
        </div>

        {/* Mobile step indicator */}
        <div className="lg:hidden mt-8 bg-white rounded-2xl shadow-lg p-6">
          <h3 className="text-xl font-bold text-[#2D1810] mb-4 text-center">
            How It Works
          </h3>
          <div className="flex justify-around">
            {steps.map((step) => (
              <div key={step.num} className="flex flex-col items-center">
                <div className="w-12 h-12 rounded-full pizza-gradient flex items-center justify-center text-white font-bold text-xl mb-2">
                  {step.num}
                </div>
                <span className="text-sm font-medium text-[#2D1810]">
                  {step.title}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
