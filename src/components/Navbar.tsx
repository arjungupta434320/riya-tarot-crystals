"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { 
  Search, 
  Heart, 
  ShoppingBag, 
  Sparkles, 
  Menu, 
  X, 
  ArrowRight, 
  Compass, 
  Tag, 
  Gift, 
  Check
} from "lucide-react";
import { useStore, Product } from "@/store/useStore";
import { fetchProducts } from "@/data/products";
import { motion, AnimatePresence } from "framer-motion";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [allProducts, setAllProducts] = useState<Product[]>([]);
  
  const searchInputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  const { cart, wishlist, toggleCart, setDrawerTab, openQuickView, openQuizModal } = useStore();
  const totalCartCount = cart.reduce((total, item) => total + item.quantity, 0);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    fetchProducts().then(setAllProducts);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      setIsSearchOpen(false);
      setIsMobileMenuOpen(false);
      router.push(`/#marketplace?search=${encodeURIComponent(searchQuery.trim())}`);
      const el = document.getElementById("marketplace");
      if (el) el.scrollIntoView({ behavior: "smooth" });
    }
  };

  const searchResults = searchQuery.trim().length > 1
    ? allProducts.filter((p) =>
        p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.shortIntention.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (p.rashi && p.rashi.toLowerCase().includes(searchQuery.toLowerCase())) ||
        (p.planet && p.planet.toLowerCase().includes(searchQuery.toLowerCase()))
      ).slice(0, 4)
    : [];

  return (
    <>
      {/* =========================================================================
          1. TOP ANNOUNCEMENT MARQUEE
          Warm Champagne Gold tinted light bar (#F7EFE2, text #2C2A29)
      ========================================================================= */}
      <div className="w-full bg-[#F7EFE2] text-[#2C2A29] py-2 px-4 border-b border-[#EAE5DF] overflow-hidden relative z-50">
        <div className="flex overflow-x-hidden">
          <div className="animate-marquee whitespace-nowrap flex items-center gap-12 text-[11px] sm:text-xs font-medium tracking-wide">
            <span className="flex items-center gap-2">
              <Sparkles size={12} className="text-[#D4AF37]" />
              <span>Complimentary Express Shipping on Orders Above ₹1,499</span>
              <span className="text-[#9A7B2C] font-bold">| Use Code: RIYA15 for 15% Off</span>
              <span className="text-[#D4AF37]">|</span>
              <span className="font-semibold text-[#2C2A29]">Buy Any 2 Bracelets & Get Extra 15% Off Automatically</span>
              <Sparkles size={12} className="text-[#D4AF37]" />
            </span>
            <span className="flex items-center gap-2">
              <Sparkles size={12} className="text-[#D4AF37]" />
              <span>Complimentary Express Shipping on Orders Above ₹1,499</span>
              <span className="text-[#9A7B2C] font-bold">| Use Code: RIYA15 for 15% Off</span>
              <span className="text-[#D4AF37]">|</span>
              <span className="font-semibold text-[#2C2A29]">Buy Any 2 Bracelets & Get Extra 15% Off Automatically</span>
              <Sparkles size={12} className="text-[#D4AF37]" />
            </span>
          </div>
        </div>
      </div>

      {/* =========================================================================
          2. STICKY GLASSMORPHIC NAVBAR WITH BESPOKE BRAND LOGO
      ========================================================================= */}
      <header
        className={`sticky top-0 w-full z-40 transition-all duration-300 ${
          isScrolled
            ? "bg-[#FAF9F6]/92 backdrop-blur-xl shadow-xs py-3 border-b border-[#EAE5DF]"
            : "bg-[#FAF9F6]/95 backdrop-blur-md py-4 border-b border-[#EAE5DF]/80"
        }`}
      >
        <div className="container mx-auto px-4 sm:px-6 flex items-center justify-between">
          
          {/* Left: Mobile Toggle & Custom Brand Logo */}
          <div className="flex items-center gap-3">
            <button
              type="button"
              className="lg:hidden p-2 rounded-xl text-[#2C2A29] hover:bg-[#F8F4EC] transition-colors cursor-pointer"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label="Toggle navigation menu"
            >
              {isMobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>

            {/* Bespoke Logo: Geometric multi-faceted crystal inside 8-point celestial starburst */}
            <Link href="/" className="flex items-center gap-3 group">
              <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-gradient-to-tr from-[#FAF9F6] via-[#F8F4EC] to-[#FFFFFF] border border-[#D4AF37]/50 flex items-center justify-center shadow-xs group-hover:scale-105 transition-transform flex-shrink-0">
                <svg viewBox="0 0 44 44" width="32" height="32" fill="none" xmlns="http://www.w3.org/2000/svg">
                  {/* 8-point celestial starburst */}
                  <path d="M22 3L24.5 14.5L36 17L24.5 19.5L22 31L19.5 19.5L8 17L19.5 14.5L22 3Z" fill="#F8F4EC" stroke="#D4AF37" strokeWidth="1.2" />
                  <path d="M22 7L23.5 14.5L31 16L23.5 17.5L22 25L20.5 17.5L13 16L20.5 14.5L22 7Z" stroke="#C59B27" strokeWidth="0.8" opacity="0.7" />
                  {/* Faceted crystal core */}
                  <polygon points="22,12 26.5,17 22,22 17.5,17" fill="#FFFFFF" stroke="#D4AF37" strokeWidth="1.2" />
                  <polyline points="17.5,17 22,18.8 26.5,17" stroke="#D4AF37" strokeWidth="0.9" />
                  <line x1="22" y1="12" x2="22" y2="22" stroke="#D4AF37" strokeWidth="0.9" />
                </svg>
              </div>

              <div className="flex flex-col min-w-0">
                <span className="font-serif text-base sm:text-lg tracking-wider text-[#2C2A29] font-bold leading-none uppercase group-hover:text-[#9A7B2C] transition-colors truncate">
                  RIYA TAROT CRYSTALS
                </span>
                <span className="text-[9px] sm:text-[10px] tracking-[0.2em] uppercase text-[#9A7B2C] font-semibold mt-0.5 truncate">
                  CERTIFIED & ENERGIZED GEMS
                </span>
              </div>
            </Link>
          </div>

          {/* Center: Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-7 text-xs font-semibold tracking-wider uppercase text-[#2C2A29]">
            <Link
              href="/#marketplace"
              className="hover:text-[#9A7B2C] transition-colors relative py-1 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[1.5px] after:bg-[#D4AF37] hover:after:w-full after:transition-all"
            >
              All Collections
            </Link>
            <Link
              href="/#bundles"
              className="hover:text-[#9A7B2C] transition-colors relative py-1 flex items-center gap-1.5 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[1.5px] after:bg-[#D4AF37] hover:after:w-full after:transition-all"
            >
              <Tag size={13} className="text-[#D4AF37]" />
              <span>Luxury Bundles</span>
            </Link>
            <button
              type="button"
              onClick={openQuizModal}
              className="hover:text-[#9A7B2C] transition-colors relative py-1 flex items-center gap-1.5 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[1.5px] after:bg-[#D4AF37] hover:after:w-full after:transition-all cursor-pointer uppercase text-xs font-semibold"
            >
              <Sparkles size={13} className="text-[#D4AF37]" />
              <span>60-Sec Quiz ✨</span>
            </button>
            <Link
              href="/#faq-section"
              className="hover:text-[#9A7B2C] transition-colors relative py-1 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[1.5px] after:bg-[#D4AF37] hover:after:w-full after:transition-all"
            >
              Client FAQ
            </Link>
          </nav>

          {/* Right: Actions (Search, Wishlist, Bag) */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Search Trigger */}
            <button
              onClick={() => {
                setIsSearchOpen(!isSearchOpen);
                setTimeout(() => searchInputRef.current?.focus(), 100);
              }}
              className="p-2 sm:p-2.5 rounded-full hover:bg-[#F8F4EC] text-[#2C2A29] transition-colors cursor-pointer"
              aria-label="Search crystals"
            >
              <Search size={19} />
            </button>

            {/* Wishlist Trigger */}
            <button
              onClick={() => {
                setDrawerTab("wishlist");
                toggleCart();
              }}
              className="p-2 sm:p-2.5 rounded-full hover:bg-[#F8F4EC] text-[#2C2A29] transition-colors relative cursor-pointer"
              aria-label="Open wishlist"
            >
              <Heart size={19} />
              {wishlist.length > 0 && (
                <span className="absolute top-1 right-1 w-4 h-4 rounded-full bg-[#F4E1D2] text-[#9A7B2C] text-[10px] font-bold border border-[#D4AF37]/50 flex items-center justify-center">
                  {wishlist.length}
                </span>
              )}
            </button>

            {/* Shopping Bag Trigger */}
            <button
              onClick={() => {
                setDrawerTab("cart");
                toggleCart();
              }}
              className="p-2 sm:p-2.5 rounded-full hover:bg-[#F8F4EC] text-[#2C2A29] transition-colors relative cursor-pointer"
              aria-label="Open cart"
            >
              <ShoppingBag size={19} />
              {totalCartCount > 0 && (
                <span className="absolute top-1 right-1 w-4 h-4 rounded-full bg-[#D4AF37] text-[#2C2A29] text-[10px] font-bold flex items-center justify-center shadow-xs">
                  {totalCartCount}
                </span>
              )}
            </button>
          </div>

        </div>

        {/* Search Dropdown Modal */}
        <AnimatePresence>
          {isSearchOpen && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="border-t border-[#EAE5DF] bg-[#FFFFFF] shadow-lg py-4 px-4 sm:px-6 transition-all"
            >
              <div className="container mx-auto max-w-2xl">
                <form onSubmit={handleSearchSubmit} className="relative flex items-center">
                  <Search size={18} className="absolute left-3.5 text-[#6E6A64]" />
                  <input
                    ref={searchInputRef}
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search by crystal name, intention (Wealth, Love, Nazar), Rashi or Chakra..."
                    className="w-full pl-10 pr-20 py-2.5 text-xs sm:text-sm rounded-full bg-[#FAF9F6] border border-[#EAE5DF] text-[#2C2A29] focus:outline-none focus:border-[#D4AF37]"
                  />
                  <button
                    type="submit"
                    className="absolute right-1.5 px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider text-[#2C2A29] btn-gold-shimmer cursor-pointer"
                  >
                    Search
                  </button>
                </form>

                {/* Instant Search Results Preview */}
                {searchResults.length > 0 && (
                  <div className="mt-3 divide-y divide-[#EAE5DF] border border-[#EAE5DF] rounded-2xl bg-[#FFFFFF] overflow-hidden shadow-xs">
                    {searchResults.map((item) => (
                      <div
                        key={item.id}
                        onClick={() => {
                          setIsSearchOpen(false);
                          openQuickView(item);
                        }}
                        className="p-2.5 sm:p-3 flex items-center justify-between hover:bg-[#FAF9F6] cursor-pointer transition-colors"
                      >
                        <div className="min-w-0 pr-3">
                          <h4 className="text-xs font-semibold text-[#2C2A29] truncate">{item.name}</h4>
                          <span className="text-[10px] text-[#6E6A64] truncate block">{item.shortIntention}</span>
                        </div>
                        <span className="text-xs font-bold text-[#9A7B2C] flex-shrink-0">
                          ₹{(item.salePrice || item.price).toLocaleString("en-IN")}
                        </span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* =========================================================================
          3. SLIDE-OVER MOBILE NAVIGATION DRAWER
      ========================================================================= */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="lg:hidden fixed inset-0 bg-[#2C2A29]/30 backdrop-blur-sm z-[70]"
              onClick={() => setIsMobileMenuOpen(false)}
            />

            {/* Drawer */}
            <motion.div
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 280 }}
              className="lg:hidden fixed top-0 left-0 bottom-0 w-[84%] max-w-sm bg-[#FFFFFF] z-[80] shadow-2xl flex flex-col border-r border-[#EAE5DF]"
            >
              {/* Drawer Header */}
              <div className="p-5 border-b border-[#EAE5DF] bg-[#FAF9F6] flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-full bg-[#FFFFFF] border border-[#D4AF37]/50 flex items-center justify-center text-[#D4AF37]">
                    <Sparkles size={16} />
                  </div>
                  <div>
                    <span className="font-serif text-sm font-bold text-[#2C2A29] tracking-wider block">
                      RIYA TAROT CRYSTALS
                    </span>
                    <span className="text-[9px] text-[#9A7B2C] font-semibold tracking-wider">
                      CERTIFIED & ENERGIZED GEMS
                    </span>
                  </div>
                </div>

                <button
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="p-1.5 rounded-full text-[#6E6A64] hover:text-[#2C2A29]"
                  aria-label="Close menu"
                >
                  <X size={20} />
                </button>
              </div>

              {/* Offer Highlight Pill */}
              <div className="p-4 bg-[#F8F4EC] border-b border-[#EAE5DF]">
                <div className="p-3 rounded-2xl bg-[#FFFFFF] border border-[#D4AF37]/40 text-xs text-[#2C2A29] space-y-1">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[#9A7B2C] flex items-center gap-1">
                    <Sparkles size={11} /> Limited Offer
                  </span>
                  <p className="font-semibold text-xs leading-snug">
                    Buy Any 2 Bracelets & Get Extra 15% Off Automatically!
                  </p>
                  <p className="text-[10px] text-[#6E6A64]">
                    Use code <strong className="text-[#9A7B2C]">RIYA15</strong> for 15% off any order.
                  </p>
                </div>
              </div>

              {/* Navigation Links */}
              <div className="flex-grow overflow-y-auto p-5 space-y-4">
                <span className="text-[10px] font-bold uppercase tracking-widest text-[#9A7B2C]">
                  Quick Navigation
                </span>

                <div className="space-y-2 text-xs font-semibold">
                  <Link
                    href="/#marketplace"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="flex items-center justify-between p-3 rounded-2xl bg-[#FAF9F6] border border-[#EAE5DF] text-[#2C2A29] hover:border-[#D4AF37]"
                  >
                    <span>All Collections</span>
                    <ArrowRight size={14} className="text-[#D4AF37]" />
                  </Link>

                  <Link
                    href="/#bundles"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="flex items-center justify-between p-3 rounded-2xl bg-[#FAF9F6] border border-[#EAE5DF] text-[#2C2A29] hover:border-[#D4AF37]"
                  >
                    <span className="flex items-center gap-1.5">
                      <Tag size={13} className="text-[#D4AF37]" />
                      <span>Luxury Bundles</span>
                    </span>
                    <ArrowRight size={14} className="text-[#D4AF37]" />
                  </Link>

                  <button
                    onClick={() => {
                      setIsMobileMenuOpen(false);
                      openQuizModal();
                    }}
                    className="w-full flex items-center justify-between p-3 rounded-2xl bg-[#FAF9F6] border border-[#EAE5DF] text-[#2C2A29] hover:border-[#D4AF37] text-left cursor-pointer"
                  >
                    <span className="flex items-center gap-1.5">
                      <Sparkles size={13} className="text-[#D4AF37]" />
                      <span>60-Sec Bracelet Quiz ✨</span>
                    </span>
                    <ArrowRight size={14} className="text-[#D4AF37]" />
                  </button>

                  <Link
                    href="/#faq-section"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="flex items-center justify-between p-3 rounded-2xl bg-[#FAF9F6] border border-[#EAE5DF] text-[#2C2A29] hover:border-[#D4AF37]"
                  >
                    <span>Client FAQ</span>
                    <ArrowRight size={14} className="text-[#D4AF37]" />
                  </Link>
                </div>
              </div>

              {/* Drawer Footer */}
              <div className="p-4 border-t border-[#EAE5DF] bg-[#FAF9F6] text-center text-[11px] text-[#6E6A64]">
                100% Lab-Certified Natural Stones • Pan-India Delivery
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
