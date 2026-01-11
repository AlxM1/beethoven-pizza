"use client";

import { useState, useEffect } from "react";
import { Menu, X, Phone, Clock } from "lucide-react";
import Link from "next/link";

interface HeaderProps {
  onOrderClick: () => void;
}

export default function Header({ onOrderClick }: HeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { href: "/menu", label: "Menu", isRoute: true },
    { href: "#about", label: "About", isRoute: false },
    { href: "#location", label: "Location", isRoute: false },
    { href: "#contact", label: "Contact", isRoute: false },
  ];

  return (
    <>
      {/* Top bar with contact info */}
      <div className="bg-gradient-to-r from-[#2C3E50] to-[#34495E] text-white py-2 px-4 text-sm hidden md:block">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-6">
            <a href="tel:604-858-7766" className="flex items-center gap-2 hover:text-[#FFE66D] transition-colors">
              <Phone size={14} />
              <span>(604) 858-7766</span>
            </a>
            <span className="text-[#4ECDC4]">|</span>
            <span>4125 Columbia Valley Highway, Cultus Lake, BC</span>
          </div>
          <div className="flex items-center gap-2">
            <Clock size={14} />
            <span>Daily 12:00 PM - 8:00 PM</span>
          </div>
        </div>
      </div>

      {/* Main header */}
      <header
        className={`sticky top-0 z-50 transition-all duration-300 ${
          isScrolled ? "glass shadow-lg" : "bg-white"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full pizza-gradient flex items-center justify-center">
                <span className="text-white text-2xl font-bold">B</span>
              </div>
              <div>
                <h1 className="text-xl md:text-2xl font-bold text-[#2C3E50]">
                  J. Beethoven&apos;s Pizza
                </h1>
                <p className="text-xs text-[#4ECDC4] hidden sm:block">
                  Since 1979 - Cultus Lake, BC
                </p>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-8">
              {navLinks.map((link) => (
                link.isRoute ? (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="text-[#2C3E50] hover:text-[#FF6B6B] font-medium transition-colors relative group"
                  >
                    {link.label}
                    <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#FF6B6B] transition-all group-hover:w-full" />
                  </Link>
                ) : (
                  <a
                    key={link.href}
                    href={link.href}
                    className="text-[#2C3E50] hover:text-[#FF6B6B] font-medium transition-colors relative group"
                  >
                    {link.label}
                    <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#FF6B6B] transition-all group-hover:w-full" />
                  </a>
                )
              ))}
            </nav>

            {/* CTA Button - Desktop */}
            <div className="hidden lg:flex items-center gap-4">
              <a
                href="tel:604-858-7766"
                className="btn-primary flex items-center gap-2"
              >
                <Phone size={18} />
                <span>Call to Order</span>
              </a>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="lg:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
              aria-label="Toggle menu"
            >
              {isMenuOpen ? (
                <X size={28} className="text-[#2C3E50]" />
              ) : (
                <Menu size={28} className="text-[#2C3E50]" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <div
          className={`lg:hidden absolute top-full left-0 right-0 bg-white shadow-lg transition-all duration-300 overflow-hidden ${
            isMenuOpen ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0"
          }`}
        >
          <nav className="flex flex-col p-4">
            {navLinks.map((link) => (
              link.isRoute ? (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsMenuOpen(false)}
                  className="py-3 px-4 text-[#2C3E50] hover:bg-[#B8E8E4]/30 rounded-lg font-medium transition-colors"
                >
                  {link.label}
                </Link>
              ) : (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsMenuOpen(false)}
                  className="py-3 px-4 text-[#2C3E50] hover:bg-[#B8E8E4]/30 rounded-lg font-medium transition-colors"
                >
                  {link.label}
                </a>
              )
            ))}

            {/* Mobile contact info */}
            <div className="mt-4 pt-4 border-t border-gray-200">
              <a
                href="tel:604-858-7766"
                className="flex items-center gap-3 py-3 px-4 text-[#2C3E50] hover:bg-[#B8E8E4]/30 rounded-lg"
              >
                <Phone size={18} className="text-[#FF6B6B]" />
                <div>
                  <p className="font-medium">Call Us</p>
                  <p className="text-sm text-gray-600">(604) 858-7766</p>
                </div>
              </a>
              <div className="flex items-center gap-3 py-3 px-4 text-[#4ECDC4]">
                <Clock size={18} className="text-[#FF6B6B]" />
                <div>
                  <p className="font-medium text-[#2C3E50]">Hours</p>
                  <p className="text-sm">Daily 12:00 PM - 8:00 PM</p>
                  <p className="text-xs">Full Menu 3:00 PM - 7:20 PM</p>
                </div>
              </div>
            </div>

            {/* Mobile Order Button */}
            <a
              href="tel:604-858-7766"
              onClick={() => setIsMenuOpen(false)}
              className="mt-4 btn-primary text-center flex items-center justify-center gap-2"
            >
              <Phone size={18} />
              Call to Order
            </a>
          </nav>
        </div>
      </header>
    </>
  );
}
