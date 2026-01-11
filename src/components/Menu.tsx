"use client";

import { useState } from "react";
import { ChevronRight } from "lucide-react";

interface MenuProps {
  onOrderPizza: (pizzaName: string) => void;
}

const menuData = {
  signaturePizzas: [
    {
      name: "New Yorker",
      description: "Italian sausage, tomato, green pepper, onion, fresh garlic",
      prices: { small: 12.99, medium: 15.99, large: 19.99 },
      popular: true,
    },
    {
      name: "Hawaiian",
      description: "Ham, pineapple",
      prices: { small: 12.99, medium: 15.99, large: 19.99 },
      popular: true,
    },
    {
      name: "Deluxe",
      description: "Ham, salami, green pepper, onion, tomato",
      prices: { small: 12.99, medium: 15.99, large: 19.99 },
      popular: false,
    },
    {
      name: "Athenian (Veggie)",
      description: "Spinach, black olives, tomato, green pepper, onion, feta cheese",
      prices: { small: 12.99, medium: 15.99, large: 19.99 },
      popular: false,
    },
    {
      name: "Olympian",
      description: "Ground beef, tomato, red onion, green pepper",
      prices: { small: 12.99, medium: 15.99, large: 19.99 },
      popular: false,
    },
    {
      name: "Herculean (Meat Lovers)",
      description: "Pepperoni, salami, ground beef",
      prices: { small: 12.99, medium: 15.99, large: 19.99 },
      popular: true,
    },
    {
      name: "Mediterranean",
      description: "Clam, shrimp, red pepper, red onions, fresh garlic",
      prices: { small: 12.99, medium: 15.99, large: 19.99 },
      popular: false,
    },
    {
      name: "House Special",
      description: "Grilled chicken, spinach, fresh garlic, tomato, artichoke",
      prices: { small: 12.99, medium: 15.99, large: 19.99 },
      popular: true,
    },
  ],
  customPizza: {
    cheese: { small: 10.99, medium: 14.99, large: 16.99 },
    veggieToppings: { small: 1.99, medium: 2.49, large: 3.49 },
    meatToppings: { small: 2.49, medium: 2.99, large: 3.99 },
  },
  bakedSubs: [
    { name: "Gourmet Sub", price: 11.99 },
    { name: "Beef Steak Sub", price: 11.99 },
    { name: "Grilled Chicken Sub", price: 11.99 },
  ],
  pastas: [
    { name: "Lasagna", small: 8.99, large: 14.99 },
    { name: "Spaghetti", small: 8.99, large: 14.99 },
    { name: "Fettuccine Alfredo", small: 8.99, large: 14.99 },
    { name: "Tortellini", small: 8.99, large: 14.99 },
    { name: "Ravioli", small: 8.99, large: 14.99 },
    { name: "Chicken Parmesan", small: 8.99, large: 14.99 },
  ],
  salads: [
    { name: "Tossed", small: 8.99, large: 10.99 },
    { name: "Caesar", small: 8.99, large: 10.99 },
    { name: "Greek", small: 8.99, large: 10.99 },
  ],
  extras: [
    { name: "Butter Chicken", lunch: 12.99, dinner: 16.99 },
    { name: "Beef Curry", lunch: 14.99, dinner: 16.99 },
    { name: "Chicken Wings (10pc)", price: 12.99 },
  ],
};

type Category = "pizzas" | "subs" | "pastas" | "salads" | "extras";

export default function Menu({ onOrderPizza }: MenuProps) {
  const [activeCategory, setActiveCategory] = useState<Category>("pizzas");

  const categories: { key: Category; label: string }[] = [
    { key: "pizzas", label: "Pizzas" },
    { key: "subs", label: "Baked Subs" },
    { key: "pastas", label: "Pastas" },
    { key: "salads", label: "Salads" },
    { key: "extras", label: "Extras" },
  ];

  return (
    <section id="menu" className="section-padding bg-white">
      <div className="max-w-7xl mx-auto">
        {/* Section header */}
        <div className="text-center mb-12">
          <span className="inline-block px-4 py-2 bg-[#FFF5E6] rounded-full text-[#E63946] font-semibold text-sm mb-4">
            Our Menu
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#2D1810] mb-4">
            Delicious Options for Everyone
          </h2>
          <p className="text-[#8B4513] text-lg max-w-2xl mx-auto">
            From our signature pizzas to homemade pastas, we have something for every taste.
          </p>
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
                  : "bg-[#FFF5E6] text-[#2D1810] hover:bg-[#FFECD2]"
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
              {/* Signature Pizzas */}
              <h3 className="text-2xl font-bold text-[#2D1810] mb-6">
                Signature Pizzas
              </h3>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-12">
                {menuData.signaturePizzas.map((pizza) => (
                  <div
                    key={pizza.name}
                    className="menu-card bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100"
                  >
                    {/* Pizza image placeholder */}
                    <div className="relative h-40 bg-gradient-to-br from-[#FCBF49] to-[#F77F00]">
                      <div className="absolute inset-0 flex items-center justify-center">
                        <span className="text-6xl">🍕</span>
                      </div>
                      {pizza.popular && (
                        <div className="absolute top-3 right-3 px-3 py-1 bg-[#E63946] text-white text-xs font-bold rounded-full">
                          POPULAR
                        </div>
                      )}
                    </div>

                    <div className="p-4">
                      <h4 className="text-lg font-bold text-[#2D1810] mb-2">
                        {pizza.name}
                      </h4>
                      <p className="text-sm text-gray-600 mb-4 min-h-[40px]">
                        {pizza.description}
                      </p>

                      <div className="flex justify-between items-center text-sm text-[#8B4513] mb-4">
                        <span>S: ${pizza.prices.small}</span>
                        <span>M: ${pizza.prices.medium}</span>
                        <span>L: ${pizza.prices.large}</span>
                      </div>

                      <button
                        onClick={() => onOrderPizza(pizza.name)}
                        className="w-full btn-primary flex items-center justify-center gap-2 text-sm"
                      >
                        Order Now
                        <ChevronRight size={16} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              {/* Custom Pizza */}
              <div className="bg-[#FFF5E6] rounded-2xl p-6 md:p-8">
                <h3 className="text-2xl font-bold text-[#2D1810] mb-4">
                  Build Your Own Pizza
                </h3>
                <p className="text-[#8B4513] mb-6">
                  Start with cheese and add your favorite toppings!
                </p>
                <div className="grid md:grid-cols-3 gap-6">
                  <div className="bg-white rounded-xl p-4 text-center">
                    <h4 className="font-bold text-[#2D1810] mb-2">Cheese Base</h4>
                    <div className="text-sm text-gray-600">
                      <p>Small: ${menuData.customPizza.cheese.small}</p>
                      <p>Medium: ${menuData.customPizza.cheese.medium}</p>
                      <p>Large: ${menuData.customPizza.cheese.large}</p>
                    </div>
                  </div>
                  <div className="bg-white rounded-xl p-4 text-center">
                    <h4 className="font-bold text-[#2D1810] mb-2">Veggie Toppings</h4>
                    <div className="text-sm text-gray-600">
                      <p>Small: +${menuData.customPizza.veggieToppings.small}</p>
                      <p>Medium: +${menuData.customPizza.veggieToppings.medium}</p>
                      <p>Large: +${menuData.customPizza.veggieToppings.large}</p>
                    </div>
                  </div>
                  <div className="bg-white rounded-xl p-4 text-center">
                    <h4 className="font-bold text-[#2D1810] mb-2">Meat Toppings</h4>
                    <div className="text-sm text-gray-600">
                      <p>Small: +${menuData.customPizza.meatToppings.small}</p>
                      <p>Medium: +${menuData.customPizza.meatToppings.medium}</p>
                      <p>Large: +${menuData.customPizza.meatToppings.large}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Baked Subs */}
          {activeCategory === "subs" && (
            <div className="grid md:grid-cols-3 gap-6">
              {menuData.bakedSubs.map((sub) => (
                <div
                  key={sub.name}
                  className="menu-card bg-white rounded-2xl shadow-lg p-6 border border-gray-100"
                >
                  <div className="text-5xl mb-4 text-center">🥖</div>
                  <h4 className="text-xl font-bold text-[#2D1810] text-center mb-2">
                    {sub.name}
                  </h4>
                  <p className="text-2xl font-bold text-[#E63946] text-center mb-4">
                    ${sub.price}
                  </p>
                  <button className="w-full btn-secondary">Add to Order</button>
                </div>
              ))}
            </div>
          )}

          {/* Pastas */}
          {activeCategory === "pastas" && (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {menuData.pastas.map((pasta) => (
                <div
                  key={pasta.name}
                  className="menu-card bg-white rounded-2xl shadow-lg p-6 border border-gray-100"
                >
                  <div className="text-5xl mb-4 text-center">🍝</div>
                  <h4 className="text-xl font-bold text-[#2D1810] text-center mb-4">
                    {pasta.name}
                  </h4>
                  <div className="flex justify-center gap-8 text-[#8B4513] mb-4">
                    <div className="text-center">
                      <p className="text-sm">Small</p>
                      <p className="text-lg font-bold">${pasta.small}</p>
                    </div>
                    <div className="text-center">
                      <p className="text-sm">Large</p>
                      <p className="text-lg font-bold">${pasta.large}</p>
                    </div>
                  </div>
                  <button className="w-full btn-secondary">Add to Order</button>
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
                  className="menu-card bg-white rounded-2xl shadow-lg p-6 border border-gray-100"
                >
                  <div className="text-5xl mb-4 text-center">🥗</div>
                  <h4 className="text-xl font-bold text-[#2D1810] text-center mb-4">
                    {salad.name} Salad
                  </h4>
                  <div className="flex justify-center gap-8 text-[#8B4513] mb-4">
                    <div className="text-center">
                      <p className="text-sm">Small</p>
                      <p className="text-lg font-bold">${salad.small}</p>
                    </div>
                    <div className="text-center">
                      <p className="text-sm">Large</p>
                      <p className="text-lg font-bold">${salad.large}</p>
                    </div>
                  </div>
                  <button className="w-full btn-secondary">Add to Order</button>
                </div>
              ))}
            </div>
          )}

          {/* Extras */}
          {activeCategory === "extras" && (
            <div className="grid md:grid-cols-3 gap-6">
              {menuData.extras.map((item) => (
                <div
                  key={item.name}
                  className="menu-card bg-white rounded-2xl shadow-lg p-6 border border-gray-100"
                >
                  <div className="text-5xl mb-4 text-center">
                    {item.name.includes("Chicken Wings") ? "🍗" : "🍛"}
                  </div>
                  <h4 className="text-xl font-bold text-[#2D1810] text-center mb-4">
                    {item.name}
                  </h4>
                  {"price" in item ? (
                    <p className="text-2xl font-bold text-[#E63946] text-center mb-4">
                      ${item.price}
                    </p>
                  ) : (
                    <div className="flex justify-center gap-8 text-[#8B4513] mb-4">
                      <div className="text-center">
                        <p className="text-sm">Lunch</p>
                        <p className="text-lg font-bold">${item.lunch}</p>
                      </div>
                      <div className="text-center">
                        <p className="text-sm">Dinner</p>
                        <p className="text-lg font-bold">${item.dinner}</p>
                      </div>
                    </div>
                  )}
                  <button className="w-full btn-secondary">Add to Order</button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
