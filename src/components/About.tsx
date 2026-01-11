"use client";

export default function About() {
  return (
    <section id="about" className="section-padding bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Image/Visual side */}
          <div className="relative">
            <div className="aspect-square rounded-3xl overflow-hidden bg-gradient-to-br from-[#E63946] to-[#F77F00] p-1">
              <div className="w-full h-full rounded-3xl bg-[#FFF5E6] flex items-center justify-center">
                <div className="text-center p-8">
                  <div className="text-9xl mb-6 animate-float">🎹</div>
                  <p className="text-2xl font-bold text-[#2D1810]">
                    A Symphony of Flavors
                  </p>
                </div>
              </div>
            </div>

            {/* Decorative elements */}
            <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-[#FCBF49] rounded-full opacity-20 blur-2xl" />
            <div className="absolute -top-6 -left-6 w-24 h-24 bg-[#E63946] rounded-full opacity-20 blur-2xl" />
          </div>

          {/* Content side */}
          <div>
            <span className="inline-block px-4 py-2 bg-[#FFF5E6] rounded-full text-[#E63946] font-semibold text-sm mb-4">
              Our Story
            </span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#2D1810] mb-6">
              Where Music Meets Pizza
            </h2>

            <div className="space-y-4 text-[#8B4513] text-lg">
              <p>
                Just as Beethoven composed masterpieces that have stood the test of time,
                we craft pizzas that create unforgettable moments for our guests.
              </p>
              <p>
                At Beethoven&apos;s Pizza, we believe that great food, like great music,
                brings people together. Each pizza we make is a composition of fresh
                ingredients, authentic recipes, and a whole lot of love.
              </p>
              <p>
                With two locations serving the communities of Cultus Lake and Burnaby,
                we&apos;re proud to be a local favorite for families, friends, and pizza
                lovers alike.
              </p>
            </div>

            {/* Features */}
            <div className="grid grid-cols-2 gap-6 mt-8">
              <div className="bg-[#FFF5E6] rounded-xl p-4">
                <div className="text-3xl mb-2">🍅</div>
                <h3 className="font-bold text-[#2D1810] mb-1">Fresh Ingredients</h3>
                <p className="text-sm text-[#8B4513]">Quality ingredients sourced daily</p>
              </div>
              <div className="bg-[#FFF5E6] rounded-xl p-4">
                <div className="text-3xl mb-2">👨‍👩‍👧‍👦</div>
                <h3 className="font-bold text-[#2D1810] mb-1">Family Owned</h3>
                <p className="text-sm text-[#8B4513]">Serving our community with love</p>
              </div>
              <div className="bg-[#FFF5E6] rounded-xl p-4">
                <div className="text-3xl mb-2">⏰</div>
                <h3 className="font-bold text-[#2D1810] mb-1">Fast Service</h3>
                <p className="text-sm text-[#8B4513]">Quick and efficient ordering</p>
              </div>
              <div className="bg-[#FFF5E6] rounded-xl p-4">
                <div className="text-3xl mb-2">🏆</div>
                <h3 className="font-bold text-[#2D1810] mb-1">Local Favorite</h3>
                <p className="text-sm text-[#8B4513]">Two locations in BC</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
