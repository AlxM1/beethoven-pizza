"use client";

import { Phone, ArrowLeft } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

const menuData = {
  pizzaClassics: [
    { name: "Cheese Pizza", description: "Our signature thick crust with premium mozzarella cheese", small: "$17.00", medium: "$22.00", large: "$27.00" },
    { name: "Pepperoni", description: "Classic cup-and-char pepperoni with mozzarella", small: "$19.00", medium: "$24.00", large: "$29.00" },
    { name: "Ham & Pineapple", description: "Sweet pineapple and savory ham - the classic Hawaiian combination", small: "$19.00", medium: "$24.00", large: "$29.00" },
    { name: "Hawaiian", description: "Ham, Pineapple, Green Peppers", small: "$20.00", medium: "$25.00", large: "$30.00" },
    { name: "Canadian", description: "Pepperoni, Ham, Mushrooms, Bacon", small: "$21.00", medium: "$26.00", large: "$31.00" },
    { name: "New Yorker", description: "Italian Sausage, Tomatoes, Green Peppers, Onions, Fresh Garlic", small: "$21.00", medium: "$26.00", large: "$31.00" },
    { name: "Vegetarian", description: "Black Olives, Tomatoes, Green Peppers, Onions, Mushrooms", small: "$21.00", medium: "$26.00", large: "$31.00" },
    { name: "Athenian", description: "Spinach, Black Olives, Tomatoes, Green Peppers, Onions, Feta Cheese", small: "$21.00", medium: "$26.00", large: "$31.00" },
    { name: "Greek", description: "Spinach, Black Olives, Tomatoes, Green Peppers, Onions, Feta Cheese", small: "$21.00", medium: "$26.00", large: "$31.00" },
    { name: "Spinach & Feta", description: "Fresh Spinach, Feta Cheese, Garlic, Tomatoes", small: "$21.00", medium: "$26.00", large: "$31.00" },
    { name: "Meat Lovers", description: "Pepperoni, Ham, Italian Sausage, Bacon, Ground Beef", small: "$22.00", medium: "$28.00", large: "$33.00" },
    { name: "Chicken Pizza", description: "Grilled Chicken, Tomatoes, Green Peppers, Onions", small: "$22.00", medium: "$28.00", large: "$33.00" },
    { name: "Shrimp Pizza", description: "Shrimp, Tomatoes, Green Peppers, Onions, Fresh Garlic", small: "$23.00", medium: "$29.00", large: "$34.00" },
    { name: "BBQ Pork Ribs Pizza", description: "Boneless BBQ Pork Ribs, Onions, Green Peppers, Tomatoes", small: "$22.00", medium: "$28.00", large: "$33.00" },
    { name: "Beethoven's Special", description: "Salami, Ham, Onions, Green Peppers, Mushrooms, Tomatoes, Pineapple", small: "$22.00", medium: "$28.00", large: "$33.00", signature: true },
    { name: "Najib's Special", description: "Beef, Pepperoni, Salami, Ham with Fresh Tomatoes & Feta Cheese added after baking", small: "$23.00", medium: "$29.00", large: "$34.00", signature: true },
  ],
  extraIngredients: {
    regular: {
      title: "Regular Toppings",
      items: ["Pepperoni", "Ham", "Salami", "Italian Sausage", "Bacon", "Ground Beef", "Mushrooms", "Onions", "Green Peppers", "Black Olives", "Tomatoes", "Pineapple", "Jalapeños"],
      prices: { small: "$2.50", medium: "$3.00", large: "$3.50" },
    },
    gourmet: {
      title: "Gourmet Toppings",
      items: ["Shrimp", "Grilled Chicken", "Feta Cheese", "Sun-Dried Tomatoes", "Artichoke Hearts", "Roasted Garlic", "Spinach", "Anchovies", "BBQ Pork Ribs"],
      prices: { small: "$3.50", medium: "$4.00", large: "$4.50" },
    },
    extraCheese: {
      title: "Extra Mozzarella",
      prices: { small: "$3.00", medium: "$4.00", large: "$5.00" },
    },
  },
  submarines: [
    { name: "Meatball Sub", description: "Homemade meatballs with marinara sauce and melted mozzarella", price: "$12.00" },
    { name: "Italian Sub", description: "Ham, Salami, Pepperoni with lettuce, tomatoes, onions and Italian dressing", price: "$12.00" },
    { name: "Chicken Parmesan Sub", description: "Breaded chicken breast with marinara sauce and melted mozzarella", price: "$13.00" },
    { name: "Veggie Sub", description: "Mushrooms, green peppers, onions, tomatoes, black olives with mozzarella", price: "$11.00" },
    { name: "Steak Sub", description: "Sliced steak with mushrooms, onions, green peppers and mozzarella", price: "$14.00" },
  ],
  appetizers: [
    { name: "Spanakopita", description: "8 crispy phyllo triangles stuffed with spinach & feta", price: "$14.00" },
    { name: "Garlic Bread", description: "Fresh baked with garlic butter", price: "$5.00" },
    { name: "Garlic Cheese Bread", description: "Topped with melted mozzarella", price: "$9.00" },
    { name: "Chicken Wings", description: "6 pieces - Hot or Honey Garlic", price: "$9.00" },
    { name: "Dry Garlic Ribs", description: "8 oz of crispy, flavorful ribs", price: "$9.00" },
  ],
  salads: [
    { name: "Greek Salad", description: "Cucumber, Tomatoes, Onions, Kalamata Olives, Feta Cheese", small: "$8.00", large: "$15.00" },
    { name: "Caesar Salad", description: "Crisp Romaine, Parmesan, Croutons, House-made Caesar Dressing", small: "$7.00", large: "$13.00" },
  ],
  pasta: [
    { name: "Baked Lasagna", description: "Rich layers of pasta, savory meat sauce, and creamy cheese, baked to golden perfection", price: "$17.00" },
    { name: "Spinach & Cheese Cannelloni", description: "Delicate pasta tubes filled with spinach and ricotta, topped with marinara sauce", price: "$17.00" },
    { name: "Spaghetti alla Bolognese", description: "Classic spaghetti topped with our tasty slow-cooked meat sauce", price: "$14.00" },
    { name: "Spaghetti with Meatballs", description: "Spaghetti with homemade meatballs in marinara sauce", price: "$16.00" },
    { name: "Fettuccine Alfredo", description: "Fettuccine in a creamy parmesan alfredo sauce", price: "$15.00" },
    { name: "Chicken Fettuccine Alfredo", description: "Fettuccine alfredo with grilled chicken breast", price: "$18.00" },
    { name: "Kids Spaghetti", description: "Smaller portion of spaghetti with meat sauce or butter", price: "$8.00" },
  ],
  comboDinners: [
    { name: "Lasagna Combo", description: "Baked Lasagna + Caesar or Greek Salad + Garlic Bread", price: "$22.00" },
    { name: "Cannelloni Combo", description: "Spinach & Cheese Cannelloni + Caesar or Greek Salad + Garlic Bread", price: "$22.00" },
    { name: "Spaghetti Combo", description: "Spaghetti alla Bolognese + Caesar or Greek Salad + Garlic Bread", price: "$19.00" },
    { name: "Wings Combo", description: "Chicken Wings (6) + Caesar or Greek Salad + Garlic Bread", price: "$18.00" },
  ],
  beverages: [
    { name: "Soft Drinks", price: "$3.00" },
    { name: "Juice", price: "$3.50" },
    { name: "Coffee/Tea", price: "$3.00" },
  ],
  extras: [
    { name: "Gluten-Free Pizza", description: "Available in Medium size only", price: "+$4.00" },
    { name: "Extra Dipping Sauce", price: "$1.00" },
    { name: "Add Shrimp to Salad", price: "$6.00" },
    { name: "Extra Dressing", description: "Ranch, Creamy Garlic, or Cheddar", price: "$1.50" },
  ],
};

export default function MenuPage() {
  return (
    <main className="min-h-screen bg-[#FFF9F5]">
      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#FF6B6B] to-[#FF9A5C] flex items-center justify-center">
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
          <a href="tel:604-858-7766" className="btn-primary flex items-center gap-2">
            <Phone size={18} />
            <span className="hidden sm:inline">Call to Order</span>
          </a>
        </div>
      </header>

      {/* Hero Section - Simple gradient, no image */}
      <section className="bg-gradient-to-br from-[#FF6B6B] via-[#FF9A5C] to-[#FFE66D] py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 drop-shadow-lg">
            Our Menu
          </h1>
          <p className="text-lg md:text-xl text-white/90 max-w-2xl mx-auto">
            Detroit-style square-cut pizzas made fresh daily since 1979
          </p>
          <p className="mt-4 text-white/80">
            Small (6 slices) • Medium (8 slices) • Large (12 slices)
          </p>
        </div>
      </section>

      {/* Main Menu Content */}
      <div className="max-w-5xl mx-auto px-4 py-12">

        {/* Pizza Classics Section */}
        <section className="mb-12">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-[#2C3E50] mb-2">Pizza Classics</h2>
            <p className="text-[#2C3E50]/70">All pizzas are Detroit-style square cut</p>
          </div>

          <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
            <div className="bg-[#2C3E50] text-white px-6 py-3 grid grid-cols-4 gap-4 text-sm font-semibold">
              <span className="col-span-1">Pizza</span>
              <span className="text-center">Small</span>
              <span className="text-center">Medium</span>
              <span className="text-center">Large</span>
            </div>
            {menuData.pizzaClassics.map((pizza, index) => (
              <div
                key={pizza.name}
                className={`px-6 py-4 grid grid-cols-4 gap-4 items-center ${
                  index % 2 === 0 ? "bg-white" : "bg-[#FFF5EE]"
                } ${pizza.signature ? "border-l-4 border-[#FF6B6B]" : ""}`}
              >
                <div className="col-span-1">
                  <h3 className="font-bold text-[#2C3E50] flex items-center gap-2">
                    {pizza.name}
                    {pizza.signature && (
                      <span className="text-xs bg-[#FF6B6B] text-white px-2 py-0.5 rounded-full">SIGNATURE</span>
                    )}
                  </h3>
                  <p className="text-sm text-[#2C3E50]/60">{pizza.description}</p>
                </div>
                <span className="text-center font-semibold text-[#FF6B6B]">{pizza.small}</span>
                <span className="text-center font-semibold text-[#FF6B6B]">{pizza.medium}</span>
                <span className="text-center font-semibold text-[#FF6B6B]">{pizza.large}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Extra Ingredients Section */}
        <section className="mb-12">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-[#2C3E50] mb-2">Extra Ingredients</h2>
            <p className="text-[#2C3E50]/70">Customize your pizza with additional toppings</p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {/* Regular Toppings */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h3 className="font-bold text-[#2C3E50] text-xl mb-4">{menuData.extraIngredients.regular.title}</h3>
              <p className="text-sm text-[#2C3E50]/70 mb-4">
                {menuData.extraIngredients.regular.items.join(" • ")}
              </p>
              <div className="bg-[#FFF5EE] rounded-xl p-4 flex justify-between text-sm">
                <span><strong>Small:</strong> {menuData.extraIngredients.regular.prices.small}</span>
                <span><strong>Medium:</strong> {menuData.extraIngredients.regular.prices.medium}</span>
                <span><strong>Large:</strong> {menuData.extraIngredients.regular.prices.large}</span>
              </div>
            </div>

            {/* Gourmet Toppings */}
            <div className="bg-white rounded-2xl shadow-lg p-6 border-2 border-[#FFE66D]">
              <h3 className="font-bold text-[#2C3E50] text-xl mb-4 flex items-center gap-2">
                {menuData.extraIngredients.gourmet.title}
                <span className="text-xs bg-[#FFE66D] text-[#2C3E50] px-2 py-0.5 rounded-full">PREMIUM</span>
              </h3>
              <p className="text-sm text-[#2C3E50]/70 mb-4">
                {menuData.extraIngredients.gourmet.items.join(" • ")}
              </p>
              <div className="bg-[#FFE66D]/20 rounded-xl p-4 flex justify-between text-sm">
                <span><strong>Small:</strong> {menuData.extraIngredients.gourmet.prices.small}</span>
                <span><strong>Medium:</strong> {menuData.extraIngredients.gourmet.prices.medium}</span>
                <span><strong>Large:</strong> {menuData.extraIngredients.gourmet.prices.large}</span>
              </div>
            </div>

            {/* Extra Cheese */}
            <div className="bg-white rounded-2xl shadow-lg p-6 md:col-span-2">
              <h3 className="font-bold text-[#2C3E50] text-xl mb-4">{menuData.extraIngredients.extraCheese.title}</h3>
              <div className="bg-[#4ECDC4]/10 rounded-xl p-4 flex justify-center gap-12 text-sm">
                <span><strong>Small:</strong> {menuData.extraIngredients.extraCheese.prices.small}</span>
                <span><strong>Medium:</strong> {menuData.extraIngredients.extraCheese.prices.medium}</span>
                <span><strong>Large:</strong> {menuData.extraIngredients.extraCheese.prices.large}</span>
              </div>
            </div>
          </div>
        </section>

        {/* Submarines Section */}
        <section className="mb-12">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-[#2C3E50] mb-2">Oven-Baked Submarines</h2>
            <p className="text-[#2C3E50]/70">Served hot with melted cheese</p>
          </div>

          <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
            {menuData.submarines.map((sub, index) => (
              <div
                key={sub.name}
                className={`px-6 py-4 flex justify-between items-center ${
                  index % 2 === 0 ? "bg-white" : "bg-[#FFF5EE]"
                }`}
              >
                <div>
                  <h3 className="font-bold text-[#2C3E50]">{sub.name}</h3>
                  <p className="text-sm text-[#2C3E50]/60">{sub.description}</p>
                </div>
                <span className="font-bold text-[#FF6B6B] text-lg">{sub.price}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Appetizers Section */}
        <section className="mb-12">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-[#2C3E50]">Appetizers</h2>
          </div>

          <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
            {menuData.appetizers.map((item, index) => (
              <div
                key={item.name}
                className={`px-6 py-4 flex justify-between items-center ${
                  index % 2 === 0 ? "bg-white" : "bg-[#FFF5EE]"
                }`}
              >
                <div>
                  <h3 className="font-bold text-[#2C3E50]">{item.name}</h3>
                  <p className="text-sm text-[#2C3E50]/60">{item.description}</p>
                </div>
                <span className="font-bold text-[#FF6B6B] text-lg">{item.price}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Salads Section */}
        <section className="mb-12">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-[#2C3E50] mb-2">Salads</h2>
            <p className="text-[#2C3E50]/70">Large salads served with garlic bread</p>
          </div>

          <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
            <div className="bg-[#4ECDC4] text-white px-6 py-3 grid grid-cols-3 gap-4 text-sm font-semibold">
              <span>Salad</span>
              <span className="text-center">Small</span>
              <span className="text-center">Large</span>
            </div>
            {menuData.salads.map((salad, index) => (
              <div
                key={salad.name}
                className={`px-6 py-4 grid grid-cols-3 gap-4 items-center ${
                  index % 2 === 0 ? "bg-white" : "bg-[#B8E8E4]/20"
                }`}
              >
                <div>
                  <h3 className="font-bold text-[#2C3E50]">{salad.name}</h3>
                  <p className="text-sm text-[#2C3E50]/60">{salad.description}</p>
                </div>
                <span className="text-center font-semibold text-[#4ECDC4]">{salad.small}</span>
                <span className="text-center font-semibold text-[#4ECDC4]">{salad.large}</span>
              </div>
            ))}
          </div>
          <p className="text-center mt-4 text-[#2C3E50]/70">Add Shrimp - $6.00 | Extra Dressing - $1.50</p>
        </section>

        {/* Pasta Section */}
        <section className="mb-12">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-[#2C3E50] mb-2">Pasta</h2>
            <p className="text-[#2C3E50]/70">All pasta dishes served with garlic bread</p>
          </div>

          <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
            {menuData.pasta.map((item, index) => (
              <div
                key={item.name}
                className={`px-6 py-4 flex justify-between items-center ${
                  index % 2 === 0 ? "bg-white" : "bg-[#FFF5EE]"
                }`}
              >
                <div>
                  <h3 className="font-bold text-[#2C3E50]">{item.name}</h3>
                  <p className="text-sm text-[#2C3E50]/60">{item.description}</p>
                </div>
                <span className="font-bold text-[#FF6B6B] text-lg">{item.price}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Combo Dinners Section */}
        <section className="mb-12">
          <div className="bg-gradient-to-r from-[#FF6B6B] to-[#FF9A5C] rounded-2xl p-8 text-white">
            <h2 className="text-3xl font-bold text-center mb-2">Combo Dinners</h2>
            <p className="text-center text-white/90 mb-6">Served with your choice of Caesar or Greek Salad and Garlic Bread</p>

            <div className="grid md:grid-cols-2 gap-4">
              {menuData.comboDinners.map((combo) => (
                <div key={combo.name} className="bg-white/20 backdrop-blur-sm rounded-xl p-4 flex justify-between items-center">
                  <div>
                    <h3 className="font-bold">{combo.name}</h3>
                    <p className="text-sm text-white/80">{combo.description}</p>
                  </div>
                  <span className="font-bold text-2xl">{combo.price}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Beverages & Extras */}
        <section className="mb-12">
          <div className="grid md:grid-cols-2 gap-6">
            {/* Beverages */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h2 className="text-2xl font-bold text-[#2C3E50] mb-4">Beverages</h2>
              <div className="space-y-3">
                {menuData.beverages.map((item) => (
                  <div key={item.name} className="flex justify-between items-center py-2 border-b border-gray-100 last:border-0">
                    <span className="text-[#2C3E50]">{item.name}</span>
                    <span className="font-bold text-[#FF6B6B]">{item.price}</span>
                  </div>
                ))}
              </div>
              <div className="mt-4 p-3 bg-[#FFE66D]/20 rounded-xl text-center">
                <p className="text-[#2C3E50] font-semibold">Licensed - Beer & Wine Available</p>
              </div>
            </div>

            {/* Extras */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h2 className="text-2xl font-bold text-[#2C3E50] mb-4">Extras</h2>
              <div className="space-y-3">
                {menuData.extras.map((item) => (
                  <div key={item.name} className="flex justify-between items-center py-2 border-b border-gray-100 last:border-0">
                    <div>
                      <span className="text-[#2C3E50]">{item.name}</span>
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
        <section className="text-center">
          <div className="bg-[#2C3E50] rounded-2xl p-8 md:p-12">
            <h2 className="text-3xl font-bold text-white mb-4">Ready to Order?</h2>
            <p className="text-white/70 mb-6">Give us a call and we&apos;ll have your food ready for pickup!</p>
            <a
              href="tel:604-858-7766"
              className="inline-flex items-center gap-3 bg-[#FF6B6B] hover:bg-[#FF5252] text-white font-bold text-xl px-8 py-4 rounded-full transition-colors"
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
        className="fixed bottom-6 right-6 bg-[#FF6B6B] hover:bg-[#FF5252] text-white font-bold px-6 py-3 rounded-full shadow-lg flex items-center gap-2 lg:hidden z-50 transition-colors"
      >
        <Phone size={20} />
        <span>Order Now</span>
      </a>

      {/* Footer */}
      <footer className="bg-[#2C3E50] text-white py-8 mt-12">
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
              ← Back to Home
            </Link>
          </div>
        </div>
      </footer>
    </main>
  );
}
