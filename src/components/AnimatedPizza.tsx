"use client";

import Image from "next/image";

const pizzaPhotos = [
  {
    src: "/images/_MG_4466.jpg",
    alt: "Cup and char pepperoni pizza - atmospheric shot",
  },
  {
    src: "/images/Beethoven's Special.JPEG",
    alt: "Beethoven's Special - signature loaded pizza",
  },
  {
    src: "/images/_MG_4472.jpg",
    alt: "Specialty pizza with salami cups",
  },
  {
    src: "/images/_MG_4490.jpg",
    alt: "Classic cheese pizza",
  },
];

export default function PizzaGallery() {
  return (
    <section className="py-16 md:py-24 bg-gradient-to-br from-[#2C3E50] to-[#34495E] overflow-hidden">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">
            Fresh From the Oven
          </h2>
          <p className="text-[#B8E8E4] text-lg max-w-2xl mx-auto">
            Our signature thick-crust, rectangular pizzas - baked to perfection with the finest ingredients
          </p>
        </div>

        {/* Photo Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {pizzaPhotos.map((photo, index) => (
            <div
              key={index}
              className="relative aspect-square rounded-2xl overflow-hidden shadow-xl group"
            >
              <Image
                src={photo.src}
                alt={photo.alt}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#FF6B6B]/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </div>
          ))}
        </div>

        {/* Feature highlights - Summer lakeside theme */}
        <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          <div className="p-4">
            <div className="text-4xl mb-2">🧀</div>
            <h3 className="text-white font-bold mb-1">Thick Crust</h3>
            <p className="text-[#B8E8E4] text-sm">Detroit-style dough</p>
          </div>
          <div className="p-4">
            <div className="text-4xl mb-2">🍅</div>
            <h3 className="text-white font-bold mb-1">Fresh Ingredients</h3>
            <p className="text-[#B8E8E4] text-sm">Quality toppings daily</p>
          </div>
          <div className="p-4">
            <div className="text-4xl mb-2">🔥</div>
            <h3 className="text-white font-bold mb-1">Cup & Char</h3>
            <p className="text-[#B8E8E4] text-sm">Signature pepperoni</p>
          </div>
          <div className="p-4">
            <div className="text-4xl mb-2">✂️</div>
            <h3 className="text-white font-bold mb-1">Square Cut</h3>
            <p className="text-[#B8E8E4] text-sm">Classic rectangular style</p>
          </div>
        </div>

        {/* CTA */}
        <div className="text-center mt-10">
          <a
            href="tel:604-858-7766"
            className="inline-block px-8 py-4 bg-gradient-to-r from-[#FF6B6B] to-[#FF9A5C] text-white rounded-full font-semibold text-lg shadow-lg hover:shadow-xl transition-shadow"
          >
            Order Your Pizza Today
          </a>
        </div>
      </div>
    </section>
  );
}
