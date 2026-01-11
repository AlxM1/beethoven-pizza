"use client";

import { Phone } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const menuData = {
  pizzaClassics: [
    {
      name: "Cheese Pizza",
      description: "Classic cheese pizza on our signature thick crust",
      small: "$18.00",
      medium: "$23.00",
      large: "$28.00",
      image: "/images/_MG_4490.jpg",
    },
    {
      name: "Pepperoni",
      description: "Classic cup-and-char pepperoni with mozzarella",
      small: "$20.00",
      medium: "$25.00",
      large: "$30.00",
      image: "/images/pepperoni.JPEG",
      popular: true,
    },
    {
      name: "Hawaiian",
      description: "Ham & Pineapple - a classic combination",
      small: "$20.00",
      medium: "$25.00",
      large: "$30.00",
      image: "/images/_MG_4486.jpg",
    },
    {
      name: "Vegetarian",
      description: "Olives, Tomatoes, Green Peppers, Onions, Mushrooms",
      small: "$21.00",
      medium: "$26.00",
      large: "$31.00",
      image: "/images/image6.JPG",
    },
    {
      name: "Meat Lovers",
      description: "Pepperoni, Ham, Italian Sausage, Bacon",
      small: "$23.00",
      medium: "$28.00",
      large: "$33.00",
      image: "/images/_MG_4472.jpg",
      popular: true,
    },
    {
      name: "Beethoven's Special",
      description: "Salami, Ham, Onions, Green Peppers, Mushrooms, Tomatoes, Pineapple",
      small: "$22.00",
      medium: "$28.00",
      large: "$33.00",
      image: "/images/Beethoven's Special.JPEG",
      popular: true,
      signature: true,
    },
  ],
  buildYourOwn: {
    description: "Start with Cheese Pizza, add toppings:",
    toppings: {
      vegetables: {
        items: ["Mushrooms", "Onions", "Green Peppers", "Black Olives", "Tomatoes", "Pineapple", "Jalapenos"],
        prices: { small: "$2.00", medium: "$2.50", large: "$3.00" },
      },
      meats: {
        items: ["Pepperoni", "Ham", "Italian Sausage", "Bacon", "Salami"],
        prices: { small: "$2.50", medium: "$3.00", large: "$3.50" },
      },
      extraCheese: {
        prices: { small: "$3.00", medium: "$4.00", large: "$5.00" },
      },
    },
  },
  appetizers: [
    { name: "Spanakopita", description: "4 pieces", price: "$9.00", image: "/images/IMG_3253.jpg" },
    { name: "Garlic Bread", description: "Fresh baked with garlic butter", price: "$6.00" },
    { name: "Garlic Bread with Cheese", description: "Topped with melted mozzarella", price: "$8.00" },
    { name: "Chicken Wings", description: "10 pieces", price: "$15.00" },
    { name: "Dry Garlic Ribs", description: "Crispy and flavorful", price: "$14.00" },
  ],
  salads: [
    {
      name: "Greek Salad",
      description: "Cucumber, Tomatoes, Onions, Olives, Feta - Served with garlic bread",
      small: "$9.00",
      large: "$13.00",
      image: "/images/IMG_3247.jpg",
    },
    {
      name: "Caesar Salad",
      description: "Romaine, parmesan, croutons, caesar dressing - Served with garlic bread",
      small: "$8.00",
      large: "$12.00",
      image: "/images/image2.JPG",
    },
    {
      name: "Tossed Garden Salad",
      description: "Mixed greens with fresh vegetables - Served with garlic bread",
      small: "$7.00",
      large: "$11.00",
      image: "/images/image3.JPG",
    },
  ],
  comboDinners: [
    {
      name: "Pizza Combo",
      description: "4 slices + salad + garlic bread",
      price: "$18.00",
    },
    {
      name: "Wings Combo",
      description: "10 wings + salad + garlic bread",
      price: "$22.00",
    },
  ],
  beverages: [
    { name: "Soft Drinks", price: "$3.00" },
    { name: "Juice", price: "$3.50" },
    { name: "Coffee/Tea", price: "$3.00" },
  ],
  extras: [
    { name: "Gluten-Free Pizza", description: "Available in Medium size only", price: "+$4.00" },
    { name: "Extra Dipping Sauce", price: "$1.00" },
    { name: "Add Grilled Chicken to Salad", price: "$5.00" },
  ],
};

export default function MenuPage() {
  return (
    <main className="min-h-screen bg-[#FFF9F5]">
      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
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
          <a
            href="tel:604-858-7766"
            className="btn-primary flex items-center gap-2"
          >
            <Phone size={18} />
            <span className="hidden sm:inline">Call to Order</span>
          </a>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative h-64 md:h-80 overflow-hidden">
        <Image
          src="/images/_MG_4466.jpg"
          alt="Beethoven's Pizza"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#2C3E50]/70 to-[#2C3E50]/90" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#FF6B6B]/20 to-[#4ECDC4]/20" />
        <div className="relative h-full flex items-center justify-center text-center px-4">
          <div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 drop-shadow-lg">
              Our Menu
            </h1>
            <p className="text-lg md:text-xl text-white/90 max-w-2xl mx-auto">
              Detroit-style square-cut pizzas made fresh daily with quality ingredients
            </p>
          </div>
        </div>
      </section>

      {/* Main Menu Content */}
      <div className="max-w-7xl mx-auto px-4 py-12">
        {/* Pizza Classics Section */}
        <section className="mb-16">
          <div className="text-center mb-10">
            <span className="inline-block px-4 py-2 bg-[#4ECDC4]/20 rounded-full text-[#4ECDC4] font-semibold text-sm mb-4">
              Detroit-Style Square Cut
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-[#2C3E50] mb-4">
              Pizza Classics
            </h2>
            <p className="text-[#2C3E50]/70">
              All pizzas are Detroit-style square cut. Sizes: Small (6 slices), Medium (8 slices), Large (12 slices)
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {menuData.pizzaClassics.map((pizza) => (
              <div
                key={pizza.name}
                className={`menu-card bg-white rounded-2xl shadow-lg overflow-hidden border ${
                  pizza.signature ? "border-[#FFE66D] ring-2 ring-[#FFE66D]/50" : "border-gray-100"
                }`}
              >
                <div className="relative h-48 overflow-hidden">
                  <Image
                    src={pizza.image}
                    alt={pizza.name}
                    fill
                    className="object-cover"
                  />
                  {pizza.signature && (
                    <div className="absolute top-3 left-3 px-3 py-1 bg-gradient-to-r from-[#FFE66D] to-[#FF9A5C] text-[#2C3E50] text-xs font-bold rounded-full">
                      SIGNATURE
                    </div>
                  )}
                  {pizza.popular && !pizza.signature && (
                    <div className="absolute top-3 right-3 px-3 py-1 bg-[#FF6B6B] text-white text-xs font-bold rounded-full">
                      POPULAR
                    </div>
                  )}
                </div>
                <div className="p-5">
                  <h3 className="text-xl font-bold text-[#2C3E50] mb-2">{pizza.name}</h3>
                  <p className="text-sm text-[#2C3E50]/70 mb-4">{pizza.description}</p>
                  <div className="flex justify-between items-center bg-[#FFF5EE] rounded-xl p-3">
                    <div className="text-center">
                      <p className="text-xs text-[#2C3E50]/60">Small</p>
                      <p className="font-bold text-[#FF6B6B]">{pizza.small}</p>
                    </div>
                    <div className="text-center border-x border-[#2C3E50]/10 px-4">
                      <p className="text-xs text-[#2C3E50]/60">Medium</p>
                      <p className="font-bold text-[#FF6B6B]">{pizza.medium}</p>
                    </div>
                    <div className="text-center">
                      <p className="text-xs text-[#2C3E50]/60">Large</p>
                      <p className="font-bold text-[#FF6B6B]">{pizza.large}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Build Your Own Section */}
        <section className="mb-16">
          <div className="bg-gradient-to-br from-[#4ECDC4]/10 to-[#B8E8E4]/30 rounded-3xl p-8 md:p-12">
            <div className="text-center mb-8">
              <h2 className="text-3xl md:text-4xl font-bold text-[#2C3E50] mb-4">
                Build Your Own
              </h2>
              <p className="text-[#2C3E50]/70">
                Start with a Cheese Pizza and add your favorite toppings!
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* Vegetable Toppings */}
              <div className="bg-white rounded-2xl p-6 shadow-lg">
                <h3 className="font-bold text-[#2C3E50] mb-3 flex items-center gap-2">
                  <span className="text-2xl">🥬</span> Vegetable Toppings
                </h3>
                <p className="text-sm text-[#2C3E50]/70 mb-4">
                  {menuData.buildYourOwn.toppings.vegetables.items.join(", ")}
                </p>
                <div className="flex justify-between text-sm bg-[#FFF5EE] rounded-lg p-3">
                  <span>S: {menuData.buildYourOwn.toppings.vegetables.prices.small}</span>
                  <span>M: {menuData.buildYourOwn.toppings.vegetables.prices.medium}</span>
                  <span>L: {menuData.buildYourOwn.toppings.vegetables.prices.large}</span>
                </div>
              </div>

              {/* Meat Toppings */}
              <div className="bg-white rounded-2xl p-6 shadow-lg">
                <h3 className="font-bold text-[#2C3E50] mb-3 flex items-center gap-2">
                  <span className="text-2xl">🥓</span> Meat Toppings
                </h3>
                <p className="text-sm text-[#2C3E50]/70 mb-4">
                  {menuData.buildYourOwn.toppings.meats.items.join(", ")}
                </p>
                <div className="flex justify-between text-sm bg-[#FFF5EE] rounded-lg p-3">
                  <span>S: {menuData.buildYourOwn.toppings.meats.prices.small}</span>
                  <span>M: {menuData.buildYourOwn.toppings.meats.prices.medium}</span>
                  <span>L: {menuData.buildYourOwn.toppings.meats.prices.large}</span>
                </div>
              </div>

              {/* Extra Cheese */}
              <div className="bg-white rounded-2xl p-6 shadow-lg">
                <h3 className="font-bold text-[#2C3E50] mb-3 flex items-center gap-2">
                  <span className="text-2xl">🧀</span> Extra Cheese
                </h3>
                <p className="text-sm text-[#2C3E50]/70 mb-4">
                  Add extra melted mozzarella to any pizza
                </p>
                <div className="flex justify-between text-sm bg-[#FFF5EE] rounded-lg p-3">
                  <span>S: {menuData.buildYourOwn.toppings.extraCheese.prices.small}</span>
                  <span>M: {menuData.buildYourOwn.toppings.extraCheese.prices.medium}</span>
                  <span>L: {menuData.buildYourOwn.toppings.extraCheese.prices.large}</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Appetizers Section */}
        <section className="mb-16">
          <div className="text-center mb-10">
            <span className="inline-block px-4 py-2 bg-[#FF6B6B]/10 rounded-full text-[#FF6B6B] font-semibold text-sm mb-4">
              Starters
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-[#2C3E50]">
              Appetizers
            </h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {menuData.appetizers.map((item) => (
              <div
                key={item.name}
                className="menu-card bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100"
              >
                {item.image ? (
                  <div className="relative h-40 overflow-hidden">
                    <Image
                      src={item.image}
                      alt={item.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                ) : (
                  <div className="h-40 bg-gradient-to-br from-[#FFE66D] to-[#FF9A5C] flex items-center justify-center">
                    <span className="text-5xl">
                      {item.name.includes("Wings") ? "🍗" :
                       item.name.includes("Bread") ? "🍞" :
                       item.name.includes("Ribs") ? "🍖" : "🥟"}
                    </span>
                  </div>
                )}
                <div className="p-5">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-lg font-bold text-[#2C3E50]">{item.name}</h3>
                    <span className="font-bold text-[#FF6B6B] text-lg">{item.price}</span>
                  </div>
                  <p className="text-sm text-[#2C3E50]/70">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Salads Section */}
        <section className="mb-16">
          <div className="text-center mb-10">
            <span className="inline-block px-4 py-2 bg-[#4ECDC4]/20 rounded-full text-[#4ECDC4] font-semibold text-sm mb-4">
              Fresh & Crisp
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-[#2C3E50] mb-2">
              Salads
            </h2>
            <p className="text-[#2C3E50]/70">Served with garlic bread</p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {menuData.salads.map((salad) => (
              <div
                key={salad.name}
                className="menu-card bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100"
              >
                {salad.image && (
                  <div className="relative h-40 overflow-hidden">
                    <Image
                      src={salad.image}
                      alt={salad.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                )}
                <div className="p-5">
                  <h3 className="text-lg font-bold text-[#2C3E50] mb-2">{salad.name}</h3>
                  <p className="text-sm text-[#2C3E50]/70 mb-4">{salad.description}</p>
                  <div className="flex justify-between items-center bg-[#B8E8E4]/30 rounded-xl p-3">
                    <div className="text-center">
                      <p className="text-xs text-[#2C3E50]/60">Small</p>
                      <p className="font-bold text-[#4ECDC4]">{salad.small}</p>
                    </div>
                    <div className="text-center">
                      <p className="text-xs text-[#2C3E50]/60">Large</p>
                      <p className="font-bold text-[#4ECDC4]">{salad.large}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="text-center mt-6">
            <p className="text-[#2C3E50]/70">Add Grilled Chicken to any salad - $5.00</p>
          </div>
        </section>

        {/* Combo Dinners Section */}
        <section className="mb-16">
          <div className="bg-gradient-to-r from-[#FF6B6B] to-[#FF9A5C] rounded-3xl p-8 md:p-12 text-white">
            <div className="text-center mb-8">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Combo Dinners
              </h2>
              <p className="text-white/90">
                Served with your choice of Caesar or Greek Salad and Garlic Bread
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-6 max-w-2xl mx-auto">
              {menuData.comboDinners.map((combo) => (
                <div
                  key={combo.name}
                  className="bg-white/20 backdrop-blur-sm rounded-2xl p-6 text-center"
                >
                  <h3 className="text-xl font-bold mb-2">{combo.name}</h3>
                  <p className="text-white/80 mb-4">{combo.description}</p>
                  <p className="text-3xl font-bold">{combo.price}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Beverages & Extras */}
        <section className="mb-16">
          <div className="grid md:grid-cols-2 gap-8">
            {/* Beverages */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h2 className="text-2xl font-bold text-[#2C3E50] mb-6 flex items-center gap-2">
                <span className="text-2xl">🍺</span> Beverages
              </h2>
              <div className="space-y-3">
                {menuData.beverages.map((item) => (
                  <div key={item.name} className="flex justify-between items-center py-2 border-b border-gray-100 last:border-0">
                    <span className="text-[#2C3E50]">{item.name}</span>
                    <span className="font-bold text-[#FF6B6B]">{item.price}</span>
                  </div>
                ))}
              </div>
              <div className="mt-6 p-4 bg-[#FFE66D]/20 rounded-xl">
                <p className="text-[#2C3E50] font-semibold flex items-center gap-2">
                  <span>🍷</span> Licensed - Beer & Wine Available
                </p>
              </div>
            </div>

            {/* Extras */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h2 className="text-2xl font-bold text-[#2C3E50] mb-6 flex items-center gap-2">
                <span className="text-2xl">✨</span> Extras
              </h2>
              <div className="space-y-4">
                {menuData.extras.map((item) => (
                  <div key={item.name} className="flex justify-between items-start py-2 border-b border-gray-100 last:border-0">
                    <div>
                      <span className="text-[#2C3E50] font-medium">{item.name}</span>
                      {item.description && (
                        <p className="text-sm text-[#2C3E50]/60">{item.description}</p>
                      )}
                    </div>
                    <span className="font-bold text-[#4ECDC4]">{item.price}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <section className="text-center py-12">
          <div className="bg-gradient-to-br from-[#4ECDC4]/10 to-[#B8E8E4]/30 rounded-3xl p-8 md:p-12">
            <h2 className="text-3xl md:text-4xl font-bold text-[#2C3E50] mb-4">
              Ready to Order?
            </h2>
            <p className="text-[#2C3E50]/70 mb-8 max-w-xl mx-auto">
              Give us a call and we&apos;ll have your delicious pizza ready for pickup!
            </p>
            <a
              href="tel:604-858-7766"
              className="btn-primary text-xl px-10 py-5 inline-flex items-center gap-3 animate-pulse-glow"
            >
              <Phone size={24} />
              Call (604) 858-7766
            </a>
          </div>
        </section>
      </div>

      {/* Floating Order Button */}
      <a
        href="tel:604-858-7766"
        className="floating-order-btn flex items-center gap-2 lg:hidden"
      >
        <Phone size={20} />
        <span>Order Now</span>
      </a>

      {/* Footer */}
      <footer className="bg-[#2C3E50] text-white py-8">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p className="text-[#B8E8E4] mb-2">
            4125 Columbia Valley Highway, Cultus Lake, BC V2R 5B6
          </p>
          <p className="text-[#FFE66D] font-semibold mb-4">(604) 858-7766</p>
          <p className="text-white/60 text-sm">
            Daily 12:00 PM - 8:00 PM | Full Menu 3:00 PM - 7:20 PM
          </p>
          <div className="mt-6 pt-6 border-t border-white/10">
            <Link href="/" className="text-[#4ECDC4] hover:text-white transition-colors">
              &larr; Back to Home
            </Link>
          </div>
        </div>
      </footer>
    </main>
  );
}
