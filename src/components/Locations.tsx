"use client";

import { useEffect, useRef, useState } from "react";
import { Phone, MapPin, Clock, Navigation } from "lucide-react";
import Image from "next/image";

const location = {
  name: "Cultus Lake",
  address: "4125 Columbia Valley Highway, Cultus Lake, BC V2R 5B6",
  phone: "(604) 858-7766",
  hours: "Daily: 12:00 PM - 8:00 PM",
  fullMenuHours: "Full Menu: 3:00 PM - 7:20 PM",
  lat: 49.0614,
  lng: -121.9854,
};

const GOOGLE_MAPS_API_KEY = "AIzaSyAjvjmbklpdojLOo3d7UXH8u6THrCRV2C8";

export default function Locations() {
  const mapRef = useRef<HTMLDivElement>(null);
  const [mapLoaded, setMapLoaded] = useState(false);
  const mapInstanceRef = useRef<google.maps.Map | null>(null);

  useEffect(() => {
    // Load Google Maps script dynamically
    const loadGoogleMaps = () => {
      if (typeof window !== "undefined" && !window.google) {
        const script = document.createElement("script");
        script.src = `https://maps.googleapis.com/maps/api/js?key=${GOOGLE_MAPS_API_KEY}&libraries=marker&callback=initMap`;
        script.async = true;
        script.defer = true;

        // Define the callback
        (window as Window & { initMap?: () => void }).initMap = () => {
          setMapLoaded(true);
        };

        document.head.appendChild(script);
      } else if (window.google) {
        setMapLoaded(true);
      }
    };

    loadGoogleMaps();
  }, []);

  useEffect(() => {
    if (!mapLoaded || !mapRef.current || !window.google) return;

    try {
      const map = new google.maps.Map(mapRef.current, {
        center: { lat: location.lat, lng: location.lng },
        zoom: 15,
        mapId: "beethoven-pizza-map",
      });

      mapInstanceRef.current = map;

      // Create custom marker content
      const markerDiv = document.createElement("div");
      markerDiv.innerHTML = `
        <div style="
          background: linear-gradient(135deg, #E63946 0%, #F77F00 100%);
          padding: 10px 16px;
          border-radius: 20px;
          color: white;
          font-weight: bold;
          box-shadow: 0 4px 15px rgba(230, 57, 70, 0.4);
          white-space: nowrap;
          cursor: pointer;
          font-size: 14px;
        ">
          J. Beethoven's Pizza
        </div>
      `;

      // Try using AdvancedMarkerElement if available, fallback to regular marker
      if (google.maps.marker && google.maps.marker.AdvancedMarkerElement) {
        new google.maps.marker.AdvancedMarkerElement({
          map,
          position: { lat: location.lat, lng: location.lng },
          content: markerDiv,
          title: location.name,
        });
      } else {
        new google.maps.Marker({
          map,
          position: { lat: location.lat, lng: location.lng },
          title: location.name,
          label: {
            text: "J. Beethoven's Pizza",
            color: "#E63946",
            fontWeight: "bold",
          },
        });
      }
    } catch (error) {
      console.error("Error initializing map:", error);
    }
  }, [mapLoaded]);

  return (
    <section id="location" className="section-padding pizza-gradient-subtle">
      <div className="max-w-7xl mx-auto">
        {/* Section header */}
        <div className="text-center mb-12">
          <span className="inline-block px-4 py-2 bg-white rounded-full text-[#E63946] font-semibold text-sm mb-4">
            Visit Us
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#2D1810] mb-4">
            Find Us at Cultus Lake
          </h2>
          <p className="text-[#8B4513] text-lg max-w-2xl mx-auto">
            Located on Columbia Valley Highway, just minutes from the lake!
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Location card */}
          <div className="space-y-6">
            {/* Main info card */}
            <div className="bg-white rounded-2xl shadow-lg p-6 md:p-8">
              <div className="flex items-start gap-4 mb-6">
                <div className="relative w-24 h-24 md:w-32 md:h-32 rounded-xl overflow-hidden flex-shrink-0">
                  <Image
                    src="/images/_MG_4421.jpg"
                    alt="J. Beethoven's Pizza exterior"
                    fill
                    className="object-cover"
                  />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-[#2D1810] mb-2">
                    J. Beethoven&apos;s Pizza
                  </h3>
                  <p className="text-[#E63946] font-medium">Cultus Lake, BC</p>
                  <p className="text-sm text-[#8B4513]">Since 1979</p>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <MapPin size={20} className="text-[#E63946] mt-1 flex-shrink-0" />
                  <div>
                    <p className="font-medium text-[#2D1810]">Address</p>
                    <p className="text-[#8B4513]">{location.address}</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Phone size={20} className="text-[#E63946] mt-1 flex-shrink-0" />
                  <div>
                    <p className="font-medium text-[#2D1810]">Phone</p>
                    <a
                      href="tel:604-858-7766"
                      className="text-[#E63946] font-semibold hover:underline text-lg"
                    >
                      {location.phone}
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Clock size={20} className="text-[#E63946] mt-1 flex-shrink-0" />
                  <div>
                    <p className="font-medium text-[#2D1810]">Hours</p>
                    <p className="text-[#8B4513]">{location.hours}</p>
                    <p className="text-sm text-[#8B4513]">{location.fullMenuHours}</p>
                  </div>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-3 mt-6">
                <a
                  href={`https://www.google.com/maps/dir/?api=1&destination=${location.lat},${location.lng}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 btn-primary flex items-center justify-center gap-2"
                >
                  <Navigation size={18} />
                  Get Directions
                </a>
                <a
                  href="tel:604-858-7766"
                  className="flex-1 btn-secondary flex items-center justify-center gap-2"
                >
                  <Phone size={18} />
                  Call Now
                </a>
              </div>
            </div>

            {/* Additional info */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h4 className="font-bold text-[#2D1810] mb-4">Good to Know</h4>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div className="flex items-center gap-2">
                  <span className="text-green-500">&#10003;</span>
                  <span className="text-[#8B4513]">Patio seating available</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-green-500">&#10003;</span>
                  <span className="text-[#8B4513]">Gluten-free options</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-green-500">&#10003;</span>
                  <span className="text-[#8B4513]">Beer & wine</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-green-500">&#10003;</span>
                  <span className="text-[#8B4513]">Takeout available</span>
                </div>
              </div>
            </div>
          </div>

          {/* Map */}
          <div className="h-[400px] lg:h-auto lg:min-h-[500px] rounded-2xl overflow-hidden shadow-lg bg-gray-100">
            <div ref={mapRef} className="w-full h-full">
              {!mapLoaded && (
                <div className="w-full h-full flex items-center justify-center bg-[#FFF5E6]">
                  <div className="text-center">
                    <div className="text-4xl mb-4 animate-bounce">📍</div>
                    <p className="text-[#8B4513]">Loading map...</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
