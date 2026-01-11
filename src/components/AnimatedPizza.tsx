"use client";

import { useEffect, useState } from "react";

export default function AnimatedPizza() {
  const [isCutting, setIsCutting] = useState(false);
  const [cutProgress, setCutProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsCutting(true);
      setCutProgress(0);

      // Animate cut progress
      const cutInterval = setInterval(() => {
        setCutProgress((prev) => {
          if (prev >= 100) {
            clearInterval(cutInterval);
            setTimeout(() => setIsCutting(false), 2000);
            return 100;
          }
          return prev + 2;
        });
      }, 30);
    }, 6000);

    // Initial animation
    setTimeout(() => {
      setIsCutting(true);
      const cutInterval = setInterval(() => {
        setCutProgress((prev) => {
          if (prev >= 100) {
            clearInterval(cutInterval);
            setTimeout(() => setIsCutting(false), 2000);
            return 100;
          }
          return prev + 2;
        });
      }, 30);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="py-16 md:py-24 bg-[#2D1810] overflow-hidden">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">
            Fresh From the Oven
          </h2>
          <p className="text-[#D4A574] text-lg max-w-2xl mx-auto">
            Watch our signature square pizza being cut fresh, hot, and ready for you!
          </p>
        </div>

        <div className="relative max-w-xl mx-auto">
          {/* Pizza container */}
          <div className="relative aspect-square">
            {/* Pizza base - Square shape */}
            <div className="absolute inset-8 bg-gradient-to-br from-[#D4A574] to-[#8B4513] rounded-lg shadow-2xl animate-sizzle">
              {/* Pizza crust edge */}
              <div className="absolute inset-0 rounded-lg border-8 border-[#8B4513] opacity-60" />

              {/* Cheese layer */}
              <div className="absolute inset-4 bg-gradient-to-br from-[#FCBF49] to-[#F77F00] rounded opacity-90">
                {/* Toppings */}
                <div className="absolute inset-0 p-4">
                  {/* Pepperoni circles */}
                  {[
                    { top: "15%", left: "20%" },
                    { top: "25%", left: "60%" },
                    { top: "45%", left: "35%" },
                    { top: "55%", left: "70%" },
                    { top: "70%", left: "25%" },
                    { top: "75%", left: "55%" },
                    { top: "35%", left: "15%" },
                    { top: "60%", left: "45%" },
                  ].map((pos, i) => (
                    <div
                      key={i}
                      className="absolute w-8 h-8 md:w-10 md:h-10 bg-gradient-to-br from-[#E63946] to-[#9B2335] rounded-full shadow-md"
                      style={{ top: pos.top, left: pos.left }}
                    >
                      <div className="absolute inset-1 rounded-full bg-[#E63946] opacity-50" />
                    </div>
                  ))}

                  {/* Green pepper strips */}
                  {[
                    { top: "20%", left: "40%", rotate: "45deg" },
                    { top: "50%", left: "55%", rotate: "-30deg" },
                    { top: "65%", left: "40%", rotate: "15deg" },
                    { top: "30%", left: "75%", rotate: "-45deg" },
                  ].map((pos, i) => (
                    <div
                      key={i}
                      className="absolute w-6 h-2 bg-gradient-to-r from-green-500 to-green-600 rounded-full"
                      style={{
                        top: pos.top,
                        left: pos.left,
                        transform: `rotate(${pos.rotate})`,
                      }}
                    />
                  ))}
                </div>
              </div>
            </div>

            {/* Steam effects */}
            <div className="absolute top-0 left-1/4 w-4 h-8 opacity-60">
              <div className="absolute w-full h-full bg-white rounded-full blur-sm animate-steam" style={{ animationDelay: "0s" }} />
            </div>
            <div className="absolute top-0 left-1/2 w-3 h-6 opacity-50">
              <div className="absolute w-full h-full bg-white rounded-full blur-sm animate-steam" style={{ animationDelay: "0.5s" }} />
            </div>
            <div className="absolute top-0 right-1/4 w-4 h-8 opacity-60">
              <div className="absolute w-full h-full bg-white rounded-full blur-sm animate-steam" style={{ animationDelay: "1s" }} />
            </div>
            <div className="absolute top-4 left-1/3 w-3 h-6 opacity-40">
              <div className="absolute w-full h-full bg-white rounded-full blur-sm animate-steam" style={{ animationDelay: "1.5s" }} />
            </div>
            <div className="absolute top-4 right-1/3 w-3 h-6 opacity-40">
              <div className="absolute w-full h-full bg-white rounded-full blur-sm animate-steam" style={{ animationDelay: "0.75s" }} />
            </div>

            {/* Cutting animation */}
            {isCutting && (
              <>
                {/* Vertical cut line */}
                <svg
                  className="absolute inset-8"
                  viewBox="0 0 100 100"
                  preserveAspectRatio="none"
                >
                  <line
                    x1="50"
                    y1="0"
                    x2="50"
                    y2="100"
                    stroke="#333"
                    strokeWidth="0.5"
                    strokeDasharray="100"
                    strokeDashoffset={100 - cutProgress}
                    style={{ transition: "stroke-dashoffset 0.1s linear" }}
                  />
                </svg>

                {/* Horizontal cut line */}
                <svg
                  className="absolute inset-8"
                  viewBox="0 0 100 100"
                  preserveAspectRatio="none"
                >
                  <line
                    x1="0"
                    y1="50"
                    x2="100"
                    y2="50"
                    stroke="#333"
                    strokeWidth="0.5"
                    strokeDasharray="100"
                    strokeDashoffset={cutProgress < 50 ? 100 : 100 - (cutProgress - 50) * 2}
                    style={{ transition: "stroke-dashoffset 0.1s linear" }}
                  />
                </svg>

                {/* Pizza cutter */}
                {cutProgress < 100 && (
                  <div
                    className="absolute w-8 h-8 md:w-12 md:h-12 transition-all duration-100"
                    style={{
                      top: cutProgress < 50 ? `${8 + (cutProgress / 100) * 84}%` : "50%",
                      left: cutProgress < 50 ? "50%" : `${8 + ((cutProgress - 50) / 50) * 84}%`,
                      transform: "translate(-50%, -50%)",
                    }}
                  >
                    <div className="w-full h-full bg-gradient-to-br from-gray-400 to-gray-600 rounded-full border-4 border-gray-700 shadow-lg flex items-center justify-center">
                      <div className="w-1/2 h-1 bg-gray-800 rounded" />
                    </div>
                  </div>
                )}
              </>
            )}

            {/* Sizzle sparkles */}
            <div className="absolute inset-8 pointer-events-none">
              {[...Array(6)].map((_, i) => (
                <div
                  key={i}
                  className="absolute w-1 h-1 bg-yellow-300 rounded-full animate-ping"
                  style={{
                    top: `${20 + Math.random() * 60}%`,
                    left: `${20 + Math.random() * 60}%`,
                    animationDelay: `${i * 0.3}s`,
                    animationDuration: "1.5s",
                  }}
                />
              ))}
            </div>
          </div>

          {/* Label */}
          <div className="text-center mt-8">
            <span className="inline-block px-6 py-3 bg-gradient-to-r from-[#E63946] to-[#F77F00] text-white rounded-full font-semibold text-lg shadow-lg">
              Signature Square-Cut Pizza
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
