"use client";

import { Check, Phone, MapPin, Clock } from "lucide-react";
import Image from "next/image";

interface HeroProps {
  currentStep: number;
  onOrderClick: () => void;
}

export default function Hero({ currentStep, onOrderClick }: HeroProps) {
  return (
    <section className="relative overflow-hidden">
      {/* Hero Background Image */}
      <div className="absolute inset-0">
        <Image
          src="/images/_MG_4421.jpg"
          alt="J. Beethoven's Pizza - Cultus Lake Restaurant"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-transparent" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 py-20 md:py-28 lg:py-36">
        <div className="max-w-2xl">
          {/* Badge */}
          <div className="inline-block px-4 py-2 bg-white/95 rounded-full shadow-lg mb-6">
            <span className="text-[#E63946] font-semibold text-sm">
              Serving Cultus Lake Since 1979
            </span>
          </div>

          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight drop-shadow-lg">
            Legendary
            <br />
            <span className="text-[#FCBF49]">
              Square-Cut Pizza
            </span>
          </h2>

          <p className="text-lg md:text-xl text-white/90 mb-8 max-w-lg drop-shadow-md">
            Thick-crust, Detroit-style pizza made with fresh ingredients
            and time-honored recipes. A family tradition for over 45 years.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 mb-8">
            <a
              href="tel:604-858-7766"
              className="btn-primary text-lg px-8 py-4 animate-pulse-glow flex items-center justify-center gap-2"
            >
              <Phone size={24} />
              <span>Call to Order</span>
            </a>
            <a
              href="#menu"
              className="bg-white/95 text-[#2D1810] px-8 py-4 rounded-full font-semibold text-lg hover:bg-white transition-colors text-center"
            >
              View Menu
            </a>
          </div>

          {/* Trust signals */}
          <div className="flex flex-wrap gap-6 text-sm text-white/90">
            <div className="flex items-center gap-2 bg-black/30 px-3 py-2 rounded-full backdrop-blur-sm">
              <Check size={18} className="text-green-400" />
              <span>Fresh Daily</span>
            </div>
            <div className="flex items-center gap-2 bg-black/30 px-3 py-2 rounded-full backdrop-blur-sm">
              <Check size={18} className="text-green-400" />
              <span>Family Owned</span>
            </div>
            <div className="flex items-center gap-2 bg-black/30 px-3 py-2 rounded-full backdrop-blur-sm">
              <Check size={18} className="text-green-400" />
              <span>Licensed</span>
            </div>
          </div>
        </div>
      </div>

      {/* Info Bar */}
      <div className="relative bg-[#2D1810]/95 backdrop-blur-sm py-4">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 text-white">
            <div className="flex items-center gap-3">
              <MapPin size={20} className="text-[#FCBF49]" />
              <span>4125 Columbia Valley Highway, Cultus Lake, BC V2R 5B6</span>
            </div>
            <div className="flex items-center gap-3">
              <Clock size={20} className="text-[#FCBF49]" />
              <div>
                <span>Daily 12:00 PM - 8:00 PM</span>
                <span className="text-[#D4A574] text-sm ml-2">(Full Menu 3:00 PM - 7:20 PM)</span>
              </div>
            </div>
            <a
              href="tel:604-858-7766"
              className="flex items-center gap-2 text-[#FCBF49] hover:text-white transition-colors font-semibold"
            >
              <Phone size={20} />
              <span>(604) 858-7766</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
