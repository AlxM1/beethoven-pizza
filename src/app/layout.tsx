import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Beethoven's Pizza | Best Pizza in BC",
  description: "Experience a symphony of flavors at Beethoven's Pizza. Fresh ingredients, authentic recipes, and fast service at our Cultus Lake and Burnaby locations. Order online today!",
  keywords: "pizza, Beethoven's Pizza, Cultus Lake, Burnaby, BC, delivery, takeout, Italian food",
  openGraph: {
    title: "Beethoven's Pizza | Best Pizza in BC",
    description: "Experience a symphony of flavors at Beethoven's Pizza. Fresh ingredients, authentic recipes.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
