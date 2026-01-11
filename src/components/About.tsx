"use client";

import Image from "next/image";

export default function About() {
  return (
    <section id="about" className="section-padding bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Image side */}
          <div className="relative">
            <div className="aspect-[4/3] rounded-3xl overflow-hidden shadow-2xl">
              <Image
                src="/images/_MG_4414.jpg"
                alt="J. Beethoven's Pizza - Restaurant front with patio"
                fill
                className="object-cover"
              />
            </div>

            {/* Established badge */}
            <div className="absolute -bottom-4 -right-4 md:-bottom-6 md:-right-6 bg-white rounded-2xl shadow-xl p-4 md:p-6">
              <div className="text-center">
                <p className="text-[#E63946] font-bold text-3xl md:text-4xl">1979</p>
                <p className="text-[#8B4513] text-sm font-medium">Established</p>
              </div>
            </div>

            {/* Decorative elements */}
            <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-[#FCBF49] rounded-full opacity-20 blur-2xl" />
            <div className="absolute -top-6 -right-6 w-24 h-24 bg-[#E63946] rounded-full opacity-20 blur-2xl" />
          </div>

          {/* Content side */}
          <div>
            <span className="inline-block px-4 py-2 bg-[#FFF5E6] rounded-full text-[#E63946] font-semibold text-sm mb-4">
              Our Story
            </span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#2D1810] mb-6">
              A Cultus Lake Tradition Since 1979
            </h2>

            <div className="space-y-4 text-[#8B4513] text-lg">
              <p>
                For over 45 years, J. Beethoven&apos;s Pizza has been serving the Cultus Lake
                community our legendary thick-crust, square-cut pizzas. What started as a
                small family pizzeria has become a beloved destination for locals and
                visitors alike.
              </p>
              <p>
                Our signature Detroit-style rectangular pizzas are made fresh daily using
                time-honored recipes and quality ingredients. From our famous cup-and-char
                pepperoni to our loaded Beethoven&apos;s Special, every pizza is crafted
                with the same care and attention that&apos;s made us a local legend.
              </p>
              <p>
                Whether you&apos;re spending a day at the lake, camping nearby, or just
                craving the best pizza in the Fraser Valley, we welcome you to experience
                the taste that&apos;s kept families coming back for generations.
              </p>
            </div>

            {/* Features */}
            <div className="grid grid-cols-2 gap-4 mt-8">
              <div className="bg-[#FFF5E6] rounded-xl p-4">
                <div className="text-3xl mb-2">🏆</div>
                <h3 className="font-bold text-[#2D1810] mb-1">45+ Years</h3>
                <p className="text-sm text-[#8B4513]">Serving Cultus Lake</p>
              </div>
              <div className="bg-[#FFF5E6] rounded-xl p-4">
                <div className="text-3xl mb-2">👨‍👩‍👧‍👦</div>
                <h3 className="font-bold text-[#2D1810] mb-1">Family Owned</h3>
                <p className="text-sm text-[#8B4513]">Local tradition</p>
              </div>
              <div className="bg-[#FFF5E6] rounded-xl p-4">
                <div className="text-3xl mb-2">🍕</div>
                <h3 className="font-bold text-[#2D1810] mb-1">Detroit Style</h3>
                <p className="text-sm text-[#8B4513]">Thick crust, square cut</p>
              </div>
              <div className="bg-[#FFF5E6] rounded-xl p-4">
                <div className="text-3xl mb-2">🍺</div>
                <h3 className="font-bold text-[#2D1810] mb-1">Licensed</h3>
                <p className="text-sm text-[#8B4513]">Beer & wine available</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
