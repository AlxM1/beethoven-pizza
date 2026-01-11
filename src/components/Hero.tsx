"use client";

import { Check, Phone, MapPin, Clock } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

interface HeroProps {
  currentStep: number;
  onOrderClick: () => void;
}

export default function Hero({ currentStep, onOrderClick }: HeroProps) {
  return (
    <section className="relative overflow-hidden">
      {/* Hero Background Image - Now featuring the delicious pizza */}
      <div className="absolute inset-0">
        <Image
          src="/images/_MG_4466.jpg"
          alt="Delicious Detroit-style pepperoni pizza from J. Beethoven's"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#2C3E50]/80 via-[#2C3E50]/50 to-transparent" />
        {/* Sunset overlay for summer vibes */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#FF6B6B]/20 via-transparent to-[#4ECDC4]/10" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 py-20 md:py-28 lg:py-36">
        <div className="max-w-2xl">
          {/* Badge */}
          <div className="inline-block px-4 py-2 bg-white/95 rounded-full shadow-lg mb-6">
            <span className="text-[#FF6B6B] font-semibold text-sm">
              Serving Cultus Lake Since 1979
            </span>
          </div>

          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight drop-shadow-lg">
            Legendary
            <br />
            <span className="text-[#FFE66D]">
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
            <Link
              href="/menu"
              className="bg-white/95 text-[#2C3E50] px-8 py-4 rounded-full font-semibold text-lg hover:bg-white transition-colors text-center hover:shadow-lg"
            >
              View Menu
            </Link>
          </div>

          {/* Trust signals */}
          <div className="flex flex-wrap gap-6 text-sm text-white/90">
            <div className="flex items-center gap-2 bg-[#4ECDC4]/30 px-3 py-2 rounded-full backdrop-blur-sm">
              <Check size={18} className="text-[#FFE66D]" />
              <span>Fresh Daily</span>
            </div>
            <div className="flex items-center gap-2 bg-[#4ECDC4]/30 px-3 py-2 rounded-full backdrop-blur-sm">
              <Check size={18} className="text-[#FFE66D]" />
              <span>Family Owned</span>
            </div>
            <div className="flex items-center gap-2 bg-[#4ECDC4]/30 px-3 py-2 rounded-full backdrop-blur-sm">
              <Check size={18} className="text-[#FFE66D]" />
              <span>Licensed</span>
            </div>
          </div>
        </div>
      </div>

      {/* Info Bar - Summer lakeside colors */}
      <div className="relative bg-gradient-to-r from-[#2C3E50] to-[#34495E] backdrop-blur-sm py-4">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 text-white text-sm md:text-base">
            <div className="flex items-center gap-2">
              <MapPin size={18} className="text-[#4ECDC4] flex-shrink-0" />
              <span className="text-sm md:text-base">4125 Columbia Valley Hwy, Cultus Lake, BC</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock size={18} className="text-[#4ECDC4] flex-shrink-0" />
              <div className="flex flex-col sm:flex-row sm:gap-2">
                <span className="text-sm md:text-base">Daily 12-8 PM</span>
                <span className="text-[#B8E8E4] text-xs md:text-sm">(Full Menu 3-7:20 PM)</span>
              </div>
            </div>
            <a
              href="tel:604-858-7766"
              className="flex items-center gap-2 text-[#FFE66D] hover:text-white transition-colors font-semibold"
            >
              <Phone size={18} className="flex-shrink-0" />
              <span className="text-sm md:text-base">(604) 858-7766</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
