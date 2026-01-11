import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Script from "next/script";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Beethoven's Pizza Cultus Lake | Best Detroit-Style Square Pizza BC | Since 1979",
    template: "%s | Beethoven's Pizza Cultus Lake"
  },
  description: "Award-winning Detroit-style square-cut pizza in Cultus Lake since 1979. Thick crust, fresh ingredients, family-owned. Order online or call (604) 858-7766. Gluten-free options, patio seating, licensed. Best pizza in Fraser Valley!",
  keywords: [
    "Beethoven's Pizza",
    "Cultus Lake pizza",
    "Detroit-style pizza BC",
    "square cut pizza",
    "thick crust pizza",
    "best pizza Cultus Lake",
    "pizza near me",
    "Chilliwack pizza",
    "Fraser Valley pizza",
    "pizza takeout",
    "family restaurant",
    "gluten-free pizza",
    "licensed restaurant",
    "patio dining",
    "pizza delivery Cultus Lake",
    "authentic Detroit pizza",
    "specialty pizza",
    "Italian food Cultus Lake"
  ],
  authors: [{ name: "J. Beethoven's Pizza" }],
  creator: "J. Beethoven's Pizza",
  publisher: "J. Beethoven's Pizza",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://beethovenspizza.com'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: "Beethoven's Pizza | Best Detroit-Style Pizza in Cultus Lake BC",
    description: "Legendary thick-crust, square-cut Detroit-style pizza since 1979. Fresh ingredients, family recipes. Order now: (604) 858-7766",
    url: 'https://beethovenspizza.com',
    siteName: "Beethoven's Pizza",
    locale: 'en_CA',
    type: 'website',
    images: [
      {
        url: '/images/_MG_4466.jpg',
        width: 1200,
        height: 630,
        alt: 'Delicious Detroit-style pepperoni pizza from Beethoven\'s Pizza Cultus Lake',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: "Beethoven's Pizza | Best Detroit-Style Pizza Cultus Lake",
    description: "Legendary square-cut pizza since 1979. Order now: (604) 858-7766",
    images: ['/images/_MG_4466.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'your-google-verification-code',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Restaurant",
    "@id": "https://beethovenspizza.com/#restaurant",
    "name": "J. Beethoven's Pizza",
    "alternateName": "Beethoven's Pizza Cultus Lake",
    "url": "https://beethovenspizza.com",
    "logo": "https://beethovenspizza.com/images/logo.png",
    "image": [
      "https://beethovenspizza.com/images/_MG_4466.jpg",
      "https://beethovenspizza.com/images/pepperoni.JPEG",
      "https://beethovenspizza.com/images/Beethoven's Special.JPEG"
    ],
    "description": "Award-winning Detroit-style square-cut pizza restaurant in Cultus Lake, BC. Serving legendary thick-crust pizza since 1979. Family-owned and operated for over 45 years.",
    "servesCuisine": ["Pizza", "Italian", "American"],
    "priceRange": "$$",
    "telephone": "+16048587766",
    "email": "beethovenspizza@gmail.com",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "4125 Columbia Valley Highway, Suite 9",
      "addressLocality": "Cultus Lake",
      "addressRegion": "BC",
      "postalCode": "V2R 5B6",
      "addressCountry": "CA"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": "49.0614",
      "longitude": "-121.9854"
    },
    "openingHoursSpecification": [
      {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
        "opens": "12:00",
        "closes": "20:00"
      }
    ],
    "menu": "https://beethovenspizza.com/menu",
    "acceptsReservations": "False",
    "paymentAccepted": "Cash, Credit Card, Debit Card",
    "currenciesAccepted": "CAD",
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.5",
      "reviewCount": "150",
      "bestRating": "5",
      "worstRating": "1"
    },
    "foundingDate": "1979",
    "founder": {
      "@type": "Person",
      "name": "J. Beethoven"
    },
    "sameAs": [
      "https://www.facebook.com/beethovenspizza",
      "https://www.instagram.com/beethovenspizza"
    ],
    "hasMenu": {
      "@type": "Menu",
      "name": "Beethoven's Pizza Menu",
      "description": "Detroit-style square-cut pizzas, pastas, salads, appetizers",
      "hasMenuSection": [
        {
          "@type": "MenuSection",
          "name": "Signature Pizzas",
          "description": "Our famous Detroit-style square-cut pizzas"
        },
        {
          "@type": "MenuSection",
          "name": "Pasta",
          "description": "Italian pasta dishes with garlic bread"
        }
      ]
    }
  };

  const breadcrumbData = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": "https://beethovenspizza.com"
      }
    ]
  };

  return (
    <html lang="en-CA">
      <head>
        <link rel="canonical" href="https://beethovenspizza.com" />
        <meta name="geo.region" content="CA-BC" />
        <meta name="geo.placename" content="Cultus Lake" />
        <meta name="geo.position" content="49.0614;-121.9854" />
        <meta name="ICBM" content="49.0614, -121.9854" />

        {/* Structured Data */}
        <Script
          id="structured-data-restaurant"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
        <Script
          id="structured-data-breadcrumb"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbData) }}
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
