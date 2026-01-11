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
  title: "J. Beethoven's Pizza | Cultus Lake, BC | Since 1979",
  description: "Legendary thick-crust, square-cut pizza at Cultus Lake since 1979. Detroit-style pizza made fresh daily with quality ingredients. Call (604) 858-7766 to order.",
  keywords: "pizza, Beethoven's Pizza, Cultus Lake, BC, Detroit-style pizza, square cut pizza, thick crust, Fraser Valley, takeout",
  openGraph: {
    title: "J. Beethoven's Pizza | Cultus Lake, BC",
    description: "Legendary thick-crust, square-cut pizza at Cultus Lake since 1979. A family tradition for over 45 years.",
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
