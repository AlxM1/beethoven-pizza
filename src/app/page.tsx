"use client";

import { useState } from "react";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import AnimatedPizza from "@/components/AnimatedPizza";
import Menu from "@/components/Menu";
import About from "@/components/About";
import Locations from "@/components/Locations";
import Footer from "@/components/Footer";
import EnhancedOrderModal from "@/components/order/EnhancedOrderModal";
import { Phone, ShoppingBag } from "lucide-react";
import { useCart } from "@/components/order/CartContext";

export default function Home() {
  const [isOrderModalOpen, setIsOrderModalOpen] = useState(false);
  const cart = useCart();

  const handleOrderClick = () => {
    setIsOrderModalOpen(true);
  };

  return (
    <main className="min-h-screen bg-background">
      <Header onOrderClick={handleOrderClick} />
      <Hero currentStep={1} onOrderClick={handleOrderClick} />
      <AnimatedPizza />
      <Menu onOrderPizza={handleOrderClick} />
      <About />
      <Locations />
      <Footer onOrderClick={handleOrderClick} />

      <EnhancedOrderModal
        isOpen={isOrderModalOpen}
        onClose={() => setIsOrderModalOpen(false)}
      />

      {/* Floating Cart/Order Button - Mobile */}
      <div className="lg:hidden fixed bottom-4 left-4 right-4 z-40">
        {cart.itemCount > 0 ? (
          <button
            onClick={handleOrderClick}
            className="w-full bg-[#FF6B6B] hover:bg-[#FF5252] text-white font-bold text-base md:text-lg py-3 md:py-4 rounded-full shadow-2xl flex items-center justify-center gap-2 transition-colors"
          >
            <ShoppingBag size={18} className="md:w-5 md:h-5" />
            View Cart ({cart.itemCount})
          </button>
        ) : (
          <a
            href="tel:604-858-7766"
            className="w-full btn-primary text-base md:text-lg py-3 md:py-4 shadow-2xl animate-pulse-glow flex items-center justify-center gap-2"
          >
            <Phone size={18} className="md:w-5 md:h-5" />
            Call to Order
          </a>
        )}
      </div>
    </main>
  );
}
