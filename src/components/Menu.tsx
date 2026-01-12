"use client";

import { useState } from "react";
import { Phone } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

interface MenuProps {
  onOrderPizza: () => void;
}

const menuData = {
  pizzas: [
    {
      name: "Beethoven's Special",
      description: "Our signature loaded pizza with salami rings filled with premium toppings",
      image: "/images/Beethoven's Special.JPEG",
      popular: true,
    },
    {
      name: "Pepperoni",
      description: "Classic cup-and-char pepperoni with mozzarella on our thick crust",
      image: "/images/pepperoni.JPEG",
      popular: true,
    },
    {
      name: "Hawaiian",
      description: "Ham and pineapple - a classic combination",
      image: "/images/_MG_4486.jpg",
      popular: true,
    },
    {
      name: "Vegetarian",
      description: "Black olives, tomatoes, green peppers, onions, and feta cheese",
      image: "/images/image6.JPG",
      popular: false,
    },
    {
      name: "Meat Lovers",
      description: "Pepperoni, salami, ham, and ground beef",
      image: "/images/_MG_4472.jpg",
      popular: true,
    },
    {
      name: "Build Your Own",
      description: "Start with cheese and add your favorite toppings",
      image: "/images/_MG_4490.jpg",
      popular: false,
    },
  ],
  appetizers: [
    {
      name: "Spanakopita",
      description: "Crispy phyllo pastry triangles filled with spinach and feta, served with tzatziki",
      image: "/images/IMG_3253.jpg",
    },
    {
      name: "Garlic Bread",
      description: "Fresh baked bread with garlic butter",
      image: null,
    },
    {
      name: "Chicken Wings",
      description: "Crispy wings with your choice of sauce",
      image: null,
    },
  ],
  salads: [
    {
      name: "Greek Salad",
      description: "Fresh romaine, cucumbers, tomatoes, olives, feta cheese, served with garlic bread",
      image: "/images/IMG_3247.jpg",
    },
    {
      name: "Caesar Salad",
      description: "Romaine lettuce, parmesan, croutons, caesar dressing, served with garlic bread",
      image: "/images/image2.JPG",
    },
    {
      name: "Tossed Salad",
      description: "Mixed greens with fresh vegetables, served with garlic bread",
      image: "/images/image3.JPG",
    },
  ],
};

type Category = "pizzas" | "appetizers" | "salads";

export default function Menu({ onOrderPizza }: MenuProps) {
  const [activeCategory, setActiveCategory] = useState<Category>("pizzas");

  const categories: { key: Category; label: string }[] = [
    { key: "pizzas", label: "Pizzas" },
    { key: "appetizers", label: "Appetizers" },
    { key: "salads", label: "Salads" },
  ];

  return (
    <section id="menu" className="section-padding bg-white">
      <div className="max-w-7xl mx-auto">
        {/* Section header */}
        <div className="text-center mb-12">
          <span className="inline-block px-4 py-2 bg-[#4ECDC4]/20 rounded-full text-[#4ECDC4] font-semibold text-sm mb-4">
            Our Menu
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#2C3E50] mb-4">
            Legendary Square-Cut Pizza
          </h2>
          <p className="text-[#2C3E50]/70 text-lg max-w-2xl mx-auto mb-4">
            Thick-crust, Detroit-style pizzas made fresh daily. Gluten-free option available (medium size).
          </p>
          <Link
            href="/menu"
            className="text-[#FF6B6B] hover:text-[#FF9A5C] font-semibold transition-colors underline"
          >
            View Full Menu with Prices &rarr;
          </Link>
        </div>

        {/* Category tabs */}
        <div className="flex flex-wrap justify-center gap-2 md:gap-4 mb-12">
          {categories.map((cat) => (
            <button
              key={cat.key}
              onClick={() => setActiveCategory(cat.key)}
              className={`px-6 py-3 rounded-full font-semibold transition-all ${
                activeCategory === cat.key
                  ? "pizza-gradient text-white shadow-lg"
                  : "bg-[#B8E8E4]/30 text-[#2C3E50] hover:bg-[#B8E8E4]/50"
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Menu content */}
        <div className="animate-slide-up" key={activeCategory}>
          {/* Pizzas */}
          {activeCategory === "pizzas" && (
            <div>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
                {menuData.pizzas.map((pizza) => (
                  <div
                    key={pizza.name}
                    className="menu-card bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100"
                  >
                    {/* Pizza image */}
                    <div className="relative h-48 overflow-hidden">
                      <Image
                        src={pizza.image}
                        alt={pizza.name}
                        fill
                        className="object-cover"
                      />
                      {pizza.popular && (
                        <div className="absolute top-3 right-3 px-3 py-1 bg-[#FF6B6B] text-white text-xs font-bold rounded-full">
                          POPULAR
                        </div>
                      )}
                    </div>

                    <div className="p-5">
                      <h4 className="text-xl font-bold text-[#2C3E50] mb-2">
                        {pizza.name}
                      </h4>
                      <p className="text-sm text-[#2C3E50]/70 mb-4 min-h-[48px]">
                        {pizza.description}
                      </p>

                      <a
                        href="tel:604-858-7766"
                        className="w-full btn-primary flex items-center justify-center gap-2 text-sm"
                      >
                        <Phone size={16} />
                        Call to Order
                      </a>
                    </div>
                  </div>
                ))}
              </div>

              {/* Combo Dinner Info */}
              <div className="bg-gradient-to-br from-[#4ECDC4]/10 to-[#B8E8E4]/30 rounded-2xl p-6 md:p-8">
                <h3 className="text-2xl font-bold text-[#2C3E50] mb-4">
                  Combo Dinners Available
                </h3>
                <p className="text-[#2C3E50]/70 mb-4">
                  Ask about our combo dinners - served with your choice of salad and garlic bread!
                </p>
                <div className="flex flex-wrap gap-4">
                  <div className="bg-white rounded-xl p-4 flex-1 min-w-[200px] shadow-sm">
                    <h4 className="font-bold text-[#2C3E50] mb-2">Full Menu Hours</h4>
                    <p className="text-sm text-[#2C3E50]/60">Daily 3:00 PM - 7:20 PM</p>
                  </div>
                  <div className="bg-white rounded-xl p-4 flex-1 min-w-[200px] shadow-sm">
                    <h4 className="font-bold text-[#2C3E50] mb-2">Gluten-Free Option</h4>
                    <p className="text-sm text-[#2C3E50]/60">Available in medium size</p>
                  </div>
                  <div className="bg-white rounded-xl p-4 flex-1 min-w-[200px] shadow-sm">
                    <h4 className="font-bold text-[#2C3E50] mb-2">Licensed</h4>
                    <p className="text-sm text-[#2C3E50]/60">Beer and wine available</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Appetizers */}
          {activeCategory === "appetizers" && (
            <div className="grid md:grid-cols-3 gap-6">
              {menuData.appetizers.map((item) => (
                <div
                  key={item.name}
                  className="menu-card bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100"
                >
                  {item.image ? (
                    <div className="relative h-48 overflow-hidden">
                      <Image
                        src={item.image}
                        alt={item.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                  ) : (
                    <div className="h-48 bg-gradient-to-br from-[#FFE66D] to-[#FF9A5C] flex items-center justify-center">
                      <span className="text-6xl">
                        {item.name === "Garlic Bread" ? "🍞" : "🍗"}
                      </span>
                    </div>
                  )}
                  <div className="p-5">
                    <h4 className="text-xl font-bold text-[#2C3E50] mb-2">
                      {item.name}
                    </h4>
                    <p className="text-sm text-[#2C3E50]/70 mb-4">
                      {item.description}
                    </p>
                    <a
                      href="tel:604-858-7766"
                      className="w-full btn-secondary flex items-center justify-center gap-2"
                    >
                      <Phone size={16} />
                      Call to Order
                    </a>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Salads */}
          {activeCategory === "salads" && (
            <div className="grid md:grid-cols-3 gap-6">
              {menuData.salads.map((salad) => (
                <div
                  key={salad.name}
                  className="menu-card bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100"
                >
                  {salad.image ? (
                    <div className="relative h-48 overflow-hidden">
                      <Image
                        src={salad.image}
                        alt={salad.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                  ) : (
                    <div className="h-48 bg-gradient-to-br from-[#4ECDC4] to-[#45B7AF] flex items-center justify-center">
                      <span className="text-6xl">🥗</span>
                    </div>
                  )}
                  <div className="p-5">
                    <h4 className="text-xl font-bold text-[#2C3E50] mb-2">
                      {salad.name}
                    </h4>
                    <p className="text-sm text-[#2C3E50]/70 mb-4">
                      {salad.description}
                    </p>
                    <a
                      href="tel:604-858-7766"
                      className="w-full btn-secondary flex items-center justify-center gap-2"
                    >
                      <Phone size={16} />
                      Call to Order
                    </a>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Call to Action */}
        <div className="text-center mt-12">
          <p className="text-[#2C3E50]/70 mb-4">Ready to order?</p>
          <a
            href="tel:604-858-7766"
            className="btn-primary text-lg px-8 py-4 inline-flex items-center gap-2"
          >
            <Phone size={20} />
            Call (604) 858-7766
          </a>
        </div>
      </div>
    </section>
  );
}
