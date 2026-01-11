"use client";

import { useEffect, useRef, useState } from "react";
import { Phone, MapPin, Clock, Navigation } from "lucide-react";

const locations = [
  {
    id: "cultus-lake",
    name: "Cultus Lake",
    address: "4125 Columbia Valley Highway, Cultus Lake, BC",
    phone: "604-858-7766",
    hours: "Daily: 12 PM - 8 PM",
    lat: 49.0614,
    lng: -121.9854,
  },
  {
    id: "burnaby",
    name: "Burnaby",
    address: "#4 - 2909 Bainbridge Avenue, Burnaby, BC",
    phone: "604-421-7735",
    hours: "Mon-Fri: 11 AM - 8 PM | Sat: 4 PM - 8 PM | Sun: Closed",
    lat: 49.2622,
    lng: -122.9621,
  },
];

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
      // Center between both locations
      const center = {
        lat: (locations[0].lat + locations[1].lat) / 2,
        lng: (locations[0].lng + locations[1].lng) / 2,
      };

      const map = new google.maps.Map(mapRef.current, {
        center,
        zoom: 9,
        mapId: "beethoven-pizza-map",
      });

      mapInstanceRef.current = map;

      // Add markers for each location
      locations.forEach((location) => {
        // Create custom marker content
        const markerDiv = document.createElement("div");
        markerDiv.innerHTML = `
          <div style="
            background: linear-gradient(135deg, #E63946 0%, #F77F00 100%);
            padding: 8px 12px;
            border-radius: 20px;
            color: white;
            font-weight: bold;
            box-shadow: 0 4px 15px rgba(230, 57, 70, 0.4);
            white-space: nowrap;
            cursor: pointer;
          ">
            ${location.name}
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
              text: location.name,
              color: "#E63946",
              fontWeight: "bold",
            },
          });
        }
      });
    } catch (error) {
      console.error("Error initializing map:", error);
    }
  }, [mapLoaded]);

  const focusLocation = (lat: number, lng: number) => {
    if (mapInstanceRef.current) {
      mapInstanceRef.current.panTo({ lat, lng });
      mapInstanceRef.current.setZoom(15);
    }
  };

  return (
    <section id="locations" className="section-padding pizza-gradient-subtle">
      <div className="max-w-7xl mx-auto">
        {/* Section header */}
        <div className="text-center mb-12">
          <span className="inline-block px-4 py-2 bg-white rounded-full text-[#E63946] font-semibold text-sm mb-4">
            Find Us
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#2D1810] mb-4">
            Two Locations to Serve You
          </h2>
          <p className="text-[#8B4513] text-lg max-w-2xl mx-auto">
            Visit us at Cultus Lake or Burnaby for the best pizza experience in BC!
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Location cards */}
          <div className="space-y-6">
            {locations.map((location) => (
              <div
                key={location.id}
                className="bg-white rounded-2xl shadow-lg p-6 md:p-8 menu-card"
              >
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-2xl font-bold text-[#2D1810] mb-2">
                      {location.name}
                    </h3>
                    <div className="flex items-center gap-2 text-[#8B4513]">
                      <MapPin size={18} className="text-[#E63946]" />
                      <span>{location.address}</span>
                    </div>
                  </div>
                  <div className="w-12 h-12 rounded-full pizza-gradient flex items-center justify-center text-white text-xl">
                    <span>P</span>
                  </div>
                </div>

                <div className="space-y-3 mb-6">
                  <div className="flex items-center gap-3">
                    <Phone size={18} className="text-[#E63946]" />
                    <a
                      href={`tel:${location.phone}`}
                      className="text-[#2D1810] font-semibold hover:text-[#E63946] transition-colors"
                    >
                      {location.phone}
                    </a>
                  </div>
                  <div className="flex items-start gap-3">
                    <Clock size={18} className="text-[#E63946] mt-0.5" />
                    <span className="text-[#8B4513]">{location.hours}</span>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-3">
                  <button
                    onClick={() => focusLocation(location.lat, location.lng)}
                    className="flex-1 btn-secondary flex items-center justify-center gap-2"
                  >
                    <Navigation size={18} />
                    View on Map
                  </button>
                  <a
                    href={`https://www.google.com/maps/dir/?api=1&destination=${location.lat},${location.lng}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 btn-primary flex items-center justify-center gap-2"
                  >
                    <MapPin size={18} />
                    Get Directions
                  </a>
                </div>
              </div>
            ))}
          </div>

          {/* Map */}
          <div className="h-[400px] lg:h-auto lg:min-h-[500px] rounded-2xl overflow-hidden shadow-lg bg-gray-100">
            <div ref={mapRef} className="w-full h-full">
              {!mapLoaded && (
                <div className="w-full h-full flex items-center justify-center bg-[#FFF5E6]">
                  <div className="text-center">
                    <div className="text-4xl mb-4 animate-bounce-gentle">📍</div>
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
