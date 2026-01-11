"use client";

import { Phone, MapPin, Clock, Facebook, Instagram } from "lucide-react";

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
            Ready for Legendary Pizza?
          </h2>
          <p className="text-lg mb-8 opacity-90">
            Call us today and taste the tradition that&apos;s been delighting Cultus Lake since 1979!
          </p>
          <a
            href="tel:604-858-7766"
            className="inline-flex items-center gap-2 bg-white text-[#E63946] px-8 py-4 rounded-full font-bold text-lg hover:bg-[#FFF5E6] transition-colors shadow-lg"
          >
            <Phone size={24} />
            Call (604) 858-7766
          </a>
        </div>
      </div>

      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-full pizza-gradient flex items-center justify-center">
                <span className="text-white text-2xl font-bold">B</span>
              </div>
              <div>
                <h3 className="text-xl font-bold">J. Beethoven&apos;s Pizza</h3>
                <p className="text-sm text-[#D4A574]">Since 1979</p>
              </div>
            </div>
            <p className="text-[#D4A574] mb-4">
              Legendary thick-crust, square-cut pizza made fresh daily.
              A Cultus Lake tradition for over 45 years.
            </p>
            {/* Social links */}
            <div className="flex gap-4">
              <a
                href="#"
                className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors"
                aria-label="Facebook"
              >
                <Facebook size={20} />
              </a>
              <a
                href="#"
                className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors"
                aria-label="Instagram"
              >
                <Instagram size={20} />
              </a>
            </div>
          </div>

          {/* Location Info */}
          <div>
            <h4 className="text-lg font-bold mb-4">Visit Us</h4>
            <div className="space-y-3 text-[#D4A574]">
              <a
                href="https://www.google.com/maps/dir/?api=1&destination=49.0614,-121.9854"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-start gap-2 hover:text-white transition-colors"
              >
                <MapPin size={18} className="mt-0.5 flex-shrink-0" />
                <span>4125 Columbia Valley Highway<br />Cultus Lake, BC V2R 5B6</span>
              </a>
              <a
                href="tel:604-858-7766"
                className="flex items-center gap-2 hover:text-white transition-colors"
              >
                <Phone size={18} />
                <span>(604) 858-7766</span>
              </a>
              <div className="flex items-start gap-2">
                <Clock size={18} className="mt-0.5 flex-shrink-0" />
                <div>
                  <p>Daily: 12:00 PM - 8:00 PM</p>
                  <p className="text-sm">Full Menu: 3:00 PM - 7:20 PM</p>
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
                href="#location"
                className="block text-[#D4A574] hover:text-white transition-colors"
              >
                Location & Hours
              </a>
              <a
                href="tel:604-858-7766"
                className="block text-[#D4A574] hover:text-white transition-colors"
              >
                Call to Order
              </a>
            </nav>

            {/* Features */}
            <div className="mt-6 pt-6 border-t border-white/10">
              <p className="text-sm text-[#D4A574] mb-2">We offer:</p>
              <ul className="text-sm text-[#D4A574] space-y-1">
                <li>Gluten-free pizza (medium)</li>
                <li>Patio seating</li>
                <li>Beer & wine</li>
                <li>Takeout</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-white/10 mt-12 pt-8 text-center text-[#D4A574] text-sm">
          <p>
            &copy; {currentYear} J. Beethoven&apos;s Pizza - Cultus Lake, BC. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
