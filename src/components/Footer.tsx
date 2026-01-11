"use client";

import { Phone, MapPin, Clock, Facebook, Instagram, Twitter } from "lucide-react";

interface FooterProps {
  onOrderClick: () => void;
}

export default function Footer({ onOrderClick }: FooterProps) {
  const currentYear = new Date().getFullYear();

  return (
    <footer id="contact" className="bg-[#2D1810] text-white">
      {/* CTA Section */}
      <div className="pizza-gradient py-12">
        <div className="max-w-4xl mx-auto text-center px-4">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Ready for the Best Pizza in BC?
          </h2>
          <p className="text-lg mb-8 opacity-90">
            Order now and experience a symphony of flavors!
          </p>
          <button
            onClick={onOrderClick}
            className="bg-white text-[#E63946] px-8 py-4 rounded-full font-bold text-lg hover:bg-[#FFF5E6] transition-colors shadow-lg"
          >
            Order Now
          </button>
        </div>
      </div>

      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-full pizza-gradient flex items-center justify-center">
                <span className="text-white text-2xl font-bold">B</span>
              </div>
              <div>
                <h3 className="text-xl font-bold">Beethoven&apos;s Pizza</h3>
                <p className="text-sm text-[#D4A574]">A Symphony of Flavors</p>
              </div>
            </div>
            <p className="text-[#D4A574] mb-4">
              Crafting delicious pizzas with fresh ingredients and authentic recipes
              since day one.
            </p>
            {/* Social links */}
            <div className="flex gap-4">
              <a
                href="#"
                className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors"
              >
                <Facebook size={20} />
              </a>
              <a
                href="#"
                className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors"
              >
                <Instagram size={20} />
              </a>
              <a
                href="#"
                className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors"
              >
                <Twitter size={20} />
              </a>
            </div>
          </div>

          {/* Cultus Lake Location */}
          <div>
            <h4 className="text-lg font-bold mb-4">Cultus Lake</h4>
            <div className="space-y-3 text-[#D4A574]">
              <a
                href="https://www.google.com/maps/dir/?api=1&destination=49.0614,-121.9854"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-start gap-2 hover:text-white transition-colors"
              >
                <MapPin size={18} className="mt-0.5 flex-shrink-0" />
                <span>4125 Columbia Valley Highway, Cultus Lake, BC</span>
              </a>
              <a
                href="tel:604-858-7766"
                className="flex items-center gap-2 hover:text-white transition-colors"
              >
                <Phone size={18} />
                <span>604-858-7766</span>
              </a>
              <div className="flex items-start gap-2">
                <Clock size={18} className="mt-0.5 flex-shrink-0" />
                <span>Daily: 12 PM - 8 PM</span>
              </div>
            </div>
          </div>

          {/* Burnaby Location */}
          <div>
            <h4 className="text-lg font-bold mb-4">Burnaby</h4>
            <div className="space-y-3 text-[#D4A574]">
              <a
                href="https://www.google.com/maps/dir/?api=1&destination=49.2622,-122.9621"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-start gap-2 hover:text-white transition-colors"
              >
                <MapPin size={18} className="mt-0.5 flex-shrink-0" />
                <span>#4 - 2909 Bainbridge Avenue, Burnaby, BC</span>
              </a>
              <a
                href="tel:604-421-7735"
                className="flex items-center gap-2 hover:text-white transition-colors"
              >
                <Phone size={18} />
                <span>604-421-7735</span>
              </a>
              <div className="flex items-start gap-2">
                <Clock size={18} className="mt-0.5 flex-shrink-0" />
                <div>
                  <p>Mon-Fri: 11 AM - 8 PM</p>
                  <p>Sat: 4 PM - 8 PM</p>
                  <p>Sun: Closed</p>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-bold mb-4">Quick Links</h4>
            <nav className="space-y-3">
              <a
                href="#menu"
                className="block text-[#D4A574] hover:text-white transition-colors"
              >
                Menu
              </a>
              <a
                href="#about"
                className="block text-[#D4A574] hover:text-white transition-colors"
              >
                About Us
              </a>
              <a
                href="#locations"
                className="block text-[#D4A574] hover:text-white transition-colors"
              >
                Locations
              </a>
              <button
                onClick={onOrderClick}
                className="block text-[#D4A574] hover:text-white transition-colors text-left"
              >
                Order Now
              </button>
            </nav>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-white/10 mt-12 pt-8 text-center text-[#D4A574] text-sm">
          <p>
            &copy; {currentYear} Beethoven&apos;s Pizza. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
