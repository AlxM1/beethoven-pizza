"use client";

import { useState } from "react";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import AnimatedPizza from "@/components/AnimatedPizza";
import Menu from "@/components/Menu";
import About from "@/components/About";
import Locations from "@/components/Locations";
import Footer from "@/components/Footer";
import OrderModal from "@/components/OrderModal";

export default function Home() {
  const [isOrderModalOpen, setIsOrderModalOpen] = useState(false);
  const [selectedPizza, setSelectedPizza] = useState<string | undefined>(undefined);
  const [currentStep, setCurrentStep] = useState(1);

  const handleOrderClick = () => {
    setSelectedPizza(undefined);
    setCurrentStep(1);
    setIsOrderModalOpen(true);
  };

  const handleOrderPizza = (pizzaName: string) => {
    setSelectedPizza(pizzaName);
    setCurrentStep(2);
    setIsOrderModalOpen(true);
  };

  return (
    <main className="min-h-screen bg-background">
      <Header onOrderClick={handleOrderClick} />
      <Hero currentStep={currentStep} onOrderClick={handleOrderClick} />
      <AnimatedPizza />
      <Menu onOrderPizza={handleOrderPizza} />
      <About />
      <Locations />
      <Footer onOrderClick={handleOrderClick} />

      <OrderModal
        isOpen={isOrderModalOpen}
        onClose={() => setIsOrderModalOpen(false)}
        initialPizza={selectedPizza}
      />

      {/* Floating Order Button - Mobile */}
      <div className="lg:hidden fixed bottom-4 left-4 right-4 z-40">
        <button
          onClick={handleOrderClick}
          className="w-full btn-primary text-lg py-4 shadow-2xl animate-pulse-glow"
        >
          Order Now
        </button>
      </div>
    </main>
  );
}
