import type { Metadata, Viewport } from "next";
import { Cinzel, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CartDrawer from "@/components/CartDrawer";
import QuickViewModal from "@/components/QuickViewModal";
import CheckoutModal from "@/components/CheckoutModal";
import WhatsAppWidget from "@/components/WhatsAppWidget";
import StickyMobileCartBar from "@/components/StickyMobileCartBar";
import MobileBottomNav from "@/components/MobileBottomNav";
import PolicyModal from "@/components/PolicyModal";
import QuizModal from "@/components/QuizModal";
import ToastNotifier from "@/components/ToastNotifier";
import React from "react";
import { AuthProvider } from "@/components/AuthProvider";

const cinzel = Cinzel({
  variable: "--font-cinzel",
  subsets: ["latin"],
  display: "swap",
});

const plusJakartaSans = Plus_Jakarta_Sans({
  variable: "--font-plus-jakarta",
  subsets: ["latin"],
  display: "swap",
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  viewportFit: "cover",
};

export const metadata: Metadata = {
  title: "Riya Tarot Crystals | Certified & Energized Gems",
  description: "Authentic, lab-certified healed crystal bracelets, natural gemstones, and bespoke Kundali & Chakra curation. 100% natural stones pre-energized with sacred mantras.",
  icons: {
    icon: "/images/products/rose-quartz-new.jpg",
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${cinzel.variable} ${plusJakartaSans.variable} font-sans antialiased min-h-[100dvh] flex flex-col bg-[#FAF9F6] text-[#2C2A29] pb-28 md:pb-0`}>
        <AuthProvider>
          <Navbar />
          <main className="flex-grow">
            {children}
          </main>
          <Footer />
          <CartDrawer />
          <QuickViewModal />
          <CheckoutModal />
          <PolicyModal />
          <QuizModal />
          <StickyMobileCartBar />
          <MobileBottomNav />
          <ToastNotifier />
          <React.Suspense fallback={null}>
            <WhatsAppWidget />
          </React.Suspense>
        </AuthProvider>
      </body>
    </html>
  );
}
