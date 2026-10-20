"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { 
  Sparkles, 
  Star, 
  ShieldCheck, 
  Heart, 
  ShoppingBag, 
  Eye, 
  Search, 
  Check, 
  ChevronDown, 
  ChevronUp, 
  ArrowRight, 
  Award,
  Compass, 
  Sun, 
  SlidersHorizontal,
  Tag
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { fetchProducts } from "@/data/products";
import { Product, useStore } from "@/store/useStore";
import OffersSection from "@/components/OffersSection";
import BraceletQuiz from "@/components/BraceletQuiz";

// Main 5 Category Tabs
const mainCategories = [
  { id: "all", label: "All Collections" },
  { id: "Heal Energized Bracelets", label: "Heal Energized Bracelets" },
  { id: "Pendants", label: "Pendants" },
  { id: "Gemstones", label: "Gemstones" },
  { id: "Clusters", label: "Clusters" },
];

// Nested Sub-Filters for "Heal Energized Bracelets"
const braceletSubFilters = [
  { id: "all", label: "All Bracelets" },
  { id: "Mixel Bracelets", label: "Mixel Bracelets" },
  { id: "Chakra Bracelets", label: "Chakra Bracelets" },
  { id: "Kundali Bracelets", label: "Kundali Bracelets" },
];

export default function HomePage() {
  const [allProducts, setAllProducts] = useState<Product[]>([]);
  const [activeCategory, setActiveCategory] = useState("all");
  const [activeSubFilter, setActiveSubFilter] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("featured");
  const [selectedBeadSizes, setSelectedBeadSizes] = useState<Record<string, '8mm' | '10mm'>>({});
  const [justAddedId, setJustAddedId] = useState<string | null>(null);

  // FAQ Accordion State
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  const { addToCart, wishlist, toggleWishlist, openQuickView, openQuizModal, showToast } = useStore();
  const quizSectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    fetchProducts().then(setAllProducts);
  }, []);

  // Filter & Sort Products
  const filteredProducts = allProducts.filter((product) => {
    // 1. Category Matching
    let matchesCategory = true;
    if (activeCategory !== "all") {
      matchesCategory = product.category === activeCategory;
      if (matchesCategory && activeCategory === "Heal Energized Bracelets" && activeSubFilter !== "all") {
        matchesCategory = product.subCategory === activeSubFilter;
      }
    }

    // 2. Search Query Matching
    const q = searchQuery.trim().toLowerCase();
    const matchesSearch =
      !q ||
      product.name.toLowerCase().includes(q) ||
      product.shortIntention.toLowerCase().includes(q) ||
      (product.rashi && product.rashi.toLowerCase().includes(q)) ||
      (product.chakra && product.chakra.toLowerCase().includes(q)) ||
      (product.planet && product.planet.toLowerCase().includes(q)) ||
      (product.subCategory && product.subCategory.toLowerCase().includes(q));

    return matchesCategory && matchesSearch;
  }).sort((a, b) => {
    const priceA = a.salePrice || a.price;
    const priceB = b.salePrice || b.price;
    if (sortBy === "price-low") return priceA - priceB;
    if (sortBy === "price-high") return priceB - priceA;
    if (sortBy === "rating") return (b.rating || 5) - (a.rating || 5);
    return 0;
  });

  const handleProductAddToCart = (product: Product, e?: React.MouseEvent) => {
    e?.stopPropagation();
    const beadSize = selectedBeadSizes[product.id] || "8mm";
    addToCart(product, 1, beadSize);
    setJustAddedId(product.id);
    showToast(`✨ Added ${product.name} (${beadSize}) to bag!`);
    setTimeout(() => setJustAddedId(null), 1200);
  };

  const handleBeadSizeSelect = (productId: string, size: '8mm' | '10mm', e?: React.MouseEvent) => {
    e?.stopPropagation();
    setSelectedBeadSizes((prev) => ({ ...prev, [productId]: size }));
  };

  return (
    <div className="bg-[#FAF9F6] text-[#2C2A29] overflow-x-hidden selection:bg-[#F4E1D2] selection:text-[#2C2A29]">
      
      {/* =========================================================================
          SECTION 1: AIRY SPLIT-SCREEN HERO SECTION + 60-SEC QUIZ
      ========================================================================= */}
      <section className="relative pt-8 pb-14 sm:pt-16 sm:pb-24 bg-gradient-to-b from-[#FAF9F6] via-[#FFFFFF] to-[#FAF9F6] border-b border-[#EAE5DF] overflow-hidden">
        
        {/* Soft Ambient Rose & Champagne Orbs */}
        <div className="absolute top-10 left-1/4 w-80 sm:w-96 h-80 sm:h-96 bg-[#F4E1D2]/35 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-10 right-10 w-80 sm:w-96 h-80 sm:h-96 bg-[#F8F4EC] rounded-full blur-3xl pointer-events-none" />

        <div className="container mx-auto px-4 sm:px-6 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-center">
            
            {/* LEFT COLUMN: Authority, Curation Story & Dual CTAs */}
            <div className="lg:col-span-7 space-y-5 sm:space-y-6 text-center lg:text-left">
              
              {/* Trust Badge */}
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="inline-flex items-center gap-2 px-3.5 sm:px-4 py-1.5 rounded-full bg-[#FFFFFF] border border-[#D4AF37]/50 shadow-xs max-w-full"
              >
                <Sparkles size={13} className="text-[#D4AF37] flex-shrink-0" />
                <span className="text-[10px] sm:text-xs font-semibold tracking-wider uppercase text-[#9A7B2C] truncate">
                  Certified Astrologer & Tarot Reader Curation
                </span>
              </motion.div>

              {/* Main Headline */}
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.1 }}
                className="text-3xl sm:text-5xl md:text-6xl font-serif text-[#2C2A29] leading-[1.18] font-normal tracking-tight"
              >
                Consecrated for Your <br className="hidden sm:inline" />
                <span className="italic font-serif text-[#9A7B2C]">Soul Alignment</span>. <br />
                Vedic Energized Crystals.
              </motion.h1>

              {/* Subheadline */}
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.2 }}
                className="text-xs sm:text-base text-[#6E6A64] leading-relaxed max-w-xl mx-auto lg:mx-0 font-light"
              >
                100% natural, lab-certified Grade-A gemstones and healing bracelets. Consecrated under Full Moon illumination and locked with 108 Vedic Beej Mantras for wealth manifestation, love, and impenetrable evil-eye shielding.
              </motion.p>

              {/* Floating Glassmorphic Trust Cards (3 Cards) */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.3 }}
                className="grid grid-cols-3 gap-2 sm:gap-3 max-w-lg mx-auto lg:mx-0 pt-1"
              >
                <div className="p-2.5 sm:p-3 rounded-2xl bg-[#FFFFFF] border border-[#EAE5DF] text-center shadow-xs">
                  <div className="flex items-center justify-center text-[#D4AF37] mb-1">
                    <Award size={16} />
                  </div>
                  <span className="block text-xs sm:text-sm font-bold text-[#2C2A29]">100% Natural</span>
                  <span className="text-[9px] sm:text-[10px] text-[#6E6A64] uppercase tracking-wider block truncate">Lab Certified</span>
                </div>

                <div className="p-2.5 sm:p-3 rounded-2xl bg-[#FFFFFF] border border-[#EAE5DF] text-center shadow-xs">
                  <div className="flex items-center justify-center text-[#D4AF37] mb-1">
                    <Compass size={16} />
                  </div>
                  <span className="block text-xs sm:text-sm font-bold text-[#2C2A29]">Bespoke</span>
                  <span className="text-[9px] sm:text-[10px] text-[#6E6A64] uppercase tracking-wider block truncate">Kundali & Chakra</span>
                </div>

                <div className="p-2.5 sm:p-3 rounded-2xl bg-[#FFFFFF] border border-[#EAE5DF] text-center shadow-xs">
                  <div className="flex items-center justify-center text-[#D4AF37] gap-0.5 mb-1 font-bold text-xs sm:text-sm">
                    <Star size={13} className="fill-[#D4AF37] text-[#D4AF37]" />
                    <span>4.9★</span>
                  </div>
                  <span className="block text-xs sm:text-sm font-bold text-[#2C2A29]">12,000+</span>
                  <span className="text-[9px] sm:text-[10px] text-[#6E6A64] uppercase tracking-wider block truncate">Happy Clients</span>
                </div>
              </motion.div>

              {/* Dual CTAs (Strictly Light Theme: Gold Shimmer & Pearl White) */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.4 }}
                className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3 sm:gap-4 pt-2"
              >
                <a
                  href="#marketplace"
                  className="w-full sm:w-auto px-8 py-3.5 rounded-full text-xs font-semibold tracking-wider uppercase text-[#2C2A29] btn-gold-shimmer flex items-center justify-center gap-2 shadow-md"
                >
                  <span>Explore Energized Collection</span>
                  <ArrowRight size={14} />
                </a>

                <button
                  type="button"
                  onClick={() => {
                    quizSectionRef.current?.scrollIntoView({ behavior: "smooth" });
                  }}
                  className="w-full sm:w-auto px-7 py-3.5 rounded-full text-xs font-semibold tracking-wider uppercase text-[#2C2A29] btn-pearl-gold flex items-center justify-center gap-2 cursor-pointer shadow-xs"
                >
                  <Sparkles size={14} className="text-[#D4AF37]" />
                  <span>Take the 60-Sec Bracelet Quiz ✨</span>
                </button>
              </motion.div>

              {/* Floating Hero Crystal Showcase Card */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1, delay: 0.5 }}
                className="pt-2 flex items-center justify-center lg:justify-start"
              >
                <div className="animate-float p-2.5 pr-4 rounded-2xl bg-[#FFFFFF] border border-[#D4AF37]/40 shadow-[0_8px_25px_rgba(212,175,55,0.15)] flex items-center gap-3 max-w-sm">
                  <div className="w-12 h-12 rounded-xl overflow-hidden relative flex-shrink-0 bg-[#FAF9F6]">
                    <Image
                      src="/images/products/money-maker.jpg"
                      alt="Triple Synergy Mixel"
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="text-left min-w-0">
                    <div className="flex items-center gap-1.5 mb-0.5">
                      <span className="text-[9px] px-2 py-0.2 rounded-full bg-[#F8F4EC] text-[#9A7B2C] font-bold border border-[#D4AF37]/30">
                        Bestseller
                      </span>
                      <span className="text-[9px] text-emerald-800 font-semibold truncate">Vedic Cleansed</span>
                    </div>
                    <span className="text-xs font-bold text-[#2C2A29] block truncate">Triple Synergy Mixel Abundance</span>
                    <span className="text-[11px] text-[#6E6A64]">₹1,499 <del className="text-[#6E6A64]/50">₹2,999</del></span>
                  </div>
                </div>
              </motion.div>

            </div>

            {/* RIGHT COLUMN: Interactive 4-Step Bracelet Quiz Card */}
            <div className="lg:col-span-5" ref={quizSectionRef} id="quiz">
              <BraceletQuiz />
            </div>

          </div>
        </div>
      </section>


      {/* =========================================================================
          SECTION 2: LIMITED-TIME LUXURY OFFERS & BUNDLES (COUNTDOWN TIMER)
      ========================================================================= */}
      <OffersSection />


      {/* =========================================================================
          SECTION 3: PRODUCT CATALOG WITH NESTED SUB-CATEGORY FILTERING
      ========================================================================= */}
      <section id="marketplace" className="py-14 sm:py-24 bg-[#FAF9F6]">
        <div className="container mx-auto px-4 sm:px-6">
          
          {/* Section Header */}
          <div className="text-center max-w-2xl mx-auto mb-8 sm:mb-12">
            <span className="text-[10px] sm:text-xs font-semibold uppercase tracking-widest text-[#9A7B2C] mb-1.5 block">
              100% Certified Natural Gemstones
            </span>
            <h2 className="text-2xl sm:text-4xl md:text-5xl font-serif text-[#2C2A29] tracking-wide mb-2 sm:mb-3">
              Sacred Curation Collections
            </h2>
            <p className="text-xs sm:text-sm text-[#6E6A64] leading-relaxed">
              Explore by category, ruling planet, or Kundali meridian. Hand-selected Grade-A stones consecrated with 108 Vedic Beej Mantras.
            </p>
          </div>

          {/* MAIN 5 CATEGORY TABS */}
          <div className="flex gap-2 overflow-x-auto pb-2 mb-4 justify-start lg:justify-center no-scrollbar -mx-4 px-4 sm:mx-0 sm:px-0">
            {mainCategories.map((cat) => {
              const isActive = activeCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => {
                    setActiveCategory(cat.id);
                    if (cat.id !== "Heal Energized Bracelets") {
                      setActiveSubFilter("all");
                    }
                  }}
                  className={`px-4 sm:px-6 py-2.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all border flex-shrink-0 cursor-pointer touch-press ${
                    isActive
                      ? "bg-[#D4AF37] text-[#2C2A29] border-[#D4AF37] shadow-md font-bold"
                      : "bg-[#FFFFFF] text-[#6E6A64] border-[#EAE5DF] hover:border-[#D4AF37]/50"
                  }`}
                >
                  {cat.label}
                </button>
              );
            })}
          </div>

          {/* NESTED SUB-FILTER PILLS BAR FOR "Heal Energized Bracelets" */}
          <AnimatePresence>
            {activeCategory === "Heal Energized Bracelets" && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="overflow-hidden mb-6"
              >
                <div className="p-2 sm:p-2.5 rounded-2xl bg-[#FFFFFF] border border-[#D4AF37]/40 max-w-xl mx-auto flex items-center justify-center gap-1.5 sm:gap-2 shadow-xs">
                  {braceletSubFilters.map((sub) => {
                    const isSubActive = activeSubFilter === sub.id;
                    return (
                      <button
                        key={sub.id}
                        type="button"
                        onClick={() => setActiveSubFilter(sub.id)}
                        className={`px-3 sm:px-4 py-1.5 rounded-xl text-[11px] font-semibold whitespace-nowrap transition-all cursor-pointer ${
                          isSubActive
                            ? "bg-[#F8F4EC] text-[#9A7B2C] border border-[#D4AF37]/50 shadow-xs font-bold"
                            : "text-[#6E6A64] hover:text-[#2C2A29]"
                        }`}
                      >
                        {sub.label}
                      </button>
                    );
                  })}
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Live Search & Sort Control Bar */}
          <div className="p-3.5 sm:p-4 rounded-2xl bg-[#FFFFFF] border border-[#EAE5DF] mb-8 flex flex-col sm:flex-row items-center justify-between gap-3 shadow-xs">
            
            {/* Real-Time Search Input */}
            <div className="relative w-full sm:w-80">
              <Search size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#6E6A64]" />
              <input
                type="text"
                placeholder="Search by crystal, intention, Rashi or Chakra..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-3 py-2 text-xs rounded-full bg-[#FAF9F6] border border-[#EAE5DF] text-[#2C2A29] focus:outline-none focus:border-[#D4AF37]"
              />
            </div>

            {/* Sort & Counter Indicators */}
            <div className="flex items-center gap-3 w-full sm:w-auto justify-between sm:justify-end text-xs">
              <span className="text-[#6E6A64] text-[11px] sm:text-xs">
                Showing <strong className="text-[#2C2A29] font-bold">{filteredProducts.length}</strong> Sacred Gems
              </span>

              <div className="flex items-center gap-1.5">
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="px-3 py-1.5 text-xs rounded-full bg-[#FAF9F6] border border-[#EAE5DF] text-[#2C2A29] focus:outline-none focus:border-[#D4AF37] cursor-pointer"
                >
                  <option value="featured">Featured Collection</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                  <option value="rating">★ Highest Rated</option>
                </select>
              </div>
            </div>
          </div>

          {/* Product Grid: 2 Columns Mobile (Gold Standard), 3-4 Columns Desktop */}
          {filteredProducts.length === 0 ? (
            <div className="py-16 text-center text-[#6E6A64] space-y-3">
              <Sparkles size={32} className="mx-auto text-[#D4AF37]" />
              <h4 className="font-serif text-base sm:text-lg text-[#2C2A29]">No matching crystal products found</h4>
              <p className="text-xs">Try searching with a broader keyword or selecting "All Collections".</p>
              <button
                onClick={() => {
                  setSearchQuery("");
                  setActiveCategory("all");
                  setActiveSubFilter("all");
                }}
                className="px-6 py-2 rounded-full text-xs font-semibold uppercase tracking-wider text-[#2C2A29] btn-pearl-gold"
              >
                Reset Filter Settings
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-6">
              {filteredProducts.map((product) => {
                const isWishlisted = wishlist.includes(product.id);
                const selectedSize = selectedBeadSizes[product.id] || "8mm";
                const isJustAdded = justAddedId === product.id;
                const price = product.salePrice || product.price;
                const originalPrice = product.price;
                const discount = originalPrice > price ? Math.round(((originalPrice - price) / originalPrice) * 100) : 0;

                return (
                  <motion.div
                    key={product.id}
                    initial={{ opacity: 0, y: 15 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    onClick={() => openQuickView(product)}
                    className="group rounded-2xl sm:rounded-3xl bg-[#FFFFFF] border border-[#EAE5DF] hover:border-[#D4AF37]/60 overflow-hidden shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col justify-between cursor-pointer"
                  >
                    {/* Media Container */}
                    <div className="relative aspect-square w-full bg-[#FAF9F6] overflow-hidden">
                      <Image
                        src={product.image}
                        alt={product.name}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-700"
                        sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                      />

                      {/* Top Badges */}
                      <div className="absolute top-2 left-2 sm:top-3 sm:left-3 flex flex-col gap-1 z-10">
                        <span className="px-2 py-0.5 rounded-full text-[8px] sm:text-[9px] font-bold uppercase tracking-wider bg-white/95 backdrop-blur-md text-[#2C2A29] border border-[#D4AF37]/50 shadow-xs">
                          {product.badge || "Energized & Lab Certified"}
                        </span>
                        {discount > 0 && (
                          <span className="px-1.5 py-0.2 rounded-full text-[8px] sm:text-[9px] font-bold uppercase tracking-wider bg-emerald-50 text-emerald-800 border border-emerald-200 self-start shadow-xs">
                            {discount}% OFF
                          </span>
                        )}
                      </div>

                      {/* Wishlist Button */}
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleWishlist(product.id);
                        }}
                        className={`absolute top-2 right-2 sm:top-3 sm:right-3 w-7 h-7 sm:w-8 sm:h-8 rounded-full border flex items-center justify-center transition-colors z-10 shadow-xs touch-press ${
                          isWishlisted
                            ? "bg-[#F4E1D2] text-[#9A7B2C] border-[#D4AF37]"
                            : "bg-white/95 backdrop-blur-md text-[#6E6A64] border-[#EAE5DF] hover:text-[#9A7B2C]"
                        }`}
                        aria-label="Save to Wishlist"
                      >
                        <Heart size={14} fill={isWishlisted ? "currentColor" : "none"} />
                      </button>

                      {/* Quick View Floating Overlay (Desktop) */}
                      <div className="absolute inset-x-3 bottom-3 opacity-0 group-hover:opacity-100 transition-opacity z-10 hidden md:block">
                        <div className="w-full py-2 rounded-xl bg-white/95 backdrop-blur-md text-[11px] font-semibold text-[#2C2A29] border border-[#EAE5DF] hover:bg-[#F8F4EC] transition-colors flex items-center justify-center gap-1.5 shadow-md">
                          <Eye size={13} className="text-[#D4AF37]" />
                          <span>Quick View</span>
                        </div>
                      </div>
                    </div>

                    {/* Card Body Details */}
                    <div className="p-3 sm:p-5 flex flex-col justify-between flex-grow space-y-2 sm:space-y-3">
                      <div>
                        {/* Rating & Rashi / Planet Meta */}
                        <div className="flex items-center justify-between text-[10px] sm:text-[11px] text-[#6E6A64] mb-1">
                          <div className="flex items-center gap-1 font-bold text-[#2C2A29]">
                            <Star size={11} className="fill-[#D4AF37] text-[#D4AF37]" />
                            <span>{product.rating || 4.9}</span>
                          </div>
                          <span className="text-[9px] sm:text-[10px] uppercase font-semibold text-[#9A7B2C] tracking-wider truncate max-w-[90px] sm:max-w-[130px]">
                            {product.rashi || product.planet || "Vedic"}
                          </span>
                        </div>

                        {/* Title */}
                        <h3 className="font-serif text-xs sm:text-base font-semibold text-[#2C2A29] leading-tight group-hover:text-[#9A7B2C] transition-colors line-clamp-2 min-h-[2rem] sm:min-h-[2.5rem]">
                          {product.name}
                        </h3>

                        {/* Short Intention Subtitle */}
                        <p className="text-[10px] sm:text-xs text-[#6E6A64] mt-0.5 line-clamp-1 italic">
                          "{product.shortIntention}"
                        </p>
                      </div>

                      {/* Bead Size Selector (for Bracelets) */}
                      {product.category === "Heal Energized Bracelets" && (
                        <div className="pt-1.5 border-t border-[#EAE5DF]">
                          <div className="flex items-center justify-between text-[9px] sm:text-[10px] font-semibold text-[#6E6A64] uppercase mb-1">
                            <span>Bead Size:</span>
                            <span className="text-[#2C2A29]">{selectedSize}</span>
                          </div>
                          <div className="grid grid-cols-2 gap-1">
                            <button
                              type="button"
                              onClick={(e) => handleBeadSizeSelect(product.id, "8mm", e)}
                              className={`py-0.5 sm:py-1 rounded-md text-[9px] sm:text-[10px] font-medium border text-center transition-all ${
                                selectedSize === "8mm"
                                  ? "bg-[#F8F4EC] border-[#D4AF37] text-[#2C2A29] font-bold"
                                  : "bg-[#FAF9F6] border-[#EAE5DF] text-[#6E6A64]"
                              }`}
                            >
                              8mm
                            </button>
                            <button
                              type="button"
                              onClick={(e) => handleBeadSizeSelect(product.id, "10mm", e)}
                              className={`py-0.5 sm:py-1 rounded-md text-[9px] sm:text-[10px] font-medium border text-center transition-all ${
                                selectedSize === "10mm"
                                  ? "bg-[#F8F4EC] border-[#D4AF37] text-[#2C2A29] font-bold"
                                  : "bg-[#FAF9F6] border-[#EAE5DF] text-[#6E6A64]"
                              }`}
                            >
                              10mm
                            </button>
                          </div>
                        </div>
                      )}

                      {/* Pricing & Add to Cart Button */}
                      <div className="pt-1">
                        <div className="flex items-baseline gap-1.5 mb-2">
                          <span className="text-sm sm:text-lg font-bold text-[#2C2A29]">
                            ₹{price.toLocaleString("en-IN")}
                          </span>
                          {originalPrice > price && (
                            <span className="text-[10px] sm:text-xs text-[#6E6A64] line-through">
                              ₹{originalPrice.toLocaleString("en-IN")}
                            </span>
                          )}
                        </div>

                        <button
                          type="button"
                          onClick={(e) => handleProductAddToCart(product, e)}
                          disabled={isJustAdded}
                          className={`w-full py-2 sm:py-2.5 px-3 rounded-full text-[11px] sm:text-xs font-semibold uppercase tracking-wider transition-all flex items-center justify-center gap-1.5 cursor-pointer shadow-xs ${
                            isJustAdded
                              ? "bg-emerald-50 text-emerald-800 border border-emerald-300"
                              : "btn-gold-shimmer text-[#2C2A29]"
                          }`}
                        >
                          {isJustAdded ? (
                            <>
                              <Check size={13} />
                              <span>Added!</span>
                            </>
                          ) : (
                            <>
                              <ShoppingBag size={13} className="text-[#2C2A29]" />
                              <span>Add to Bag</span>
                            </>
                          )}
                        </button>
                      </div>
                    </div>

                  </motion.div>
                );
              })}
            </div>
          )}

        </div>
      </section>


      {/* =========================================================================
          SECTION 4: VERIFIED CLIENT REVIEWS & LIFE TRANSFORMATIONS
      ========================================================================= */}
      <section className="py-14 sm:py-20 bg-[#F8F4EC] border-y border-[#EAE5DF]">
        <div className="container mx-auto px-4 sm:px-6">
          
          <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-14">
            <span className="text-[10px] sm:text-xs font-semibold uppercase tracking-widest text-[#9A7B2C] mb-1.5 block">
              Verified Wearer Transformations
            </span>
            <h2 className="text-2xl sm:text-4xl md:text-5xl font-serif text-[#2C2A29] tracking-wide mb-2 sm:mb-3">
              Stories of Energetic Alignment
            </h2>
            <p className="text-xs sm:text-sm text-[#6E6A64] leading-relaxed">
              Read how authentic pre-energized crystal bracelets have empowered our wearers to attract wealth, heal emotional relationships, and deflect negative energy.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
            
            {/* Review 1 */}
            <div className="p-6 sm:p-8 rounded-3xl bg-[#FFFFFF] border border-[#EAE5DF] shadow-xs flex flex-col justify-between">
              <div className="space-y-3">
                <div className="flex items-center gap-1 text-[#D4AF37]">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={14} className="fill-[#D4AF37]" />
                  ))}
                  <span className="text-xs font-bold text-[#2C2A29] ml-1.5">5.0</span>
                </div>

                <p className="text-xs text-[#2C2A29] leading-relaxed italic">
                  "I ordered the Triple Synergy Mixel Abundance Bracelet after experiencing career stagnation. Within three weeks of wearing it on my right wrist, I closed a long-pending consulting contract! The metallic luster of the Pyrite and Citrine is unmatched."
                </p>
              </div>

              <div className="mt-5 pt-3 border-t border-[#EAE5DF] flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-[#F8F4EC] border border-[#D4AF37]/50 flex items-center justify-center font-serif font-bold text-xs text-[#2C2A29]">
                  PK
                </div>
                <div>
                  <h5 className="text-xs font-bold text-[#2C2A29]">Pooja Kapoor</h5>
                  <div className="flex items-center gap-1 text-[10px] text-emerald-800">
                    <ShieldCheck size={12} />
                    <span>Verified Buyer • Mumbai</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Review 2 */}
            <div className="p-6 sm:p-8 rounded-3xl bg-[#FFFFFF] border border-[#EAE5DF] shadow-xs flex flex-col justify-between">
              <div className="space-y-3">
                <div className="flex items-center gap-1 text-[#D4AF37]">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={14} className="fill-[#D4AF37]" />
                  ))}
                  <span className="text-xs font-bold text-[#2C2A29] ml-1.5">5.0</span>
                </div>

                <p className="text-xs text-[#2C2A29] leading-relaxed italic">
                  "The Madagascar Rose Quartz feels soothing the moment you slip it on. I went through a painful breakup and carried heavy chest anxiety. Wearing this on my left receptive wrist gave me a peaceful sense of self-compassion and safety."
                </p>
              </div>

              <div className="mt-5 pt-3 border-t border-[#EAE5DF] flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-[#F8F4EC] border border-[#D4AF37]/50 flex items-center justify-center font-serif font-bold text-xs text-[#2C2A29]">
                  AS
                </div>
                <div>
                  <h5 className="text-xs font-bold text-[#2C2A29]">Ananya Sharma</h5>
                  <div className="flex items-center gap-1 text-[10px] text-emerald-800">
                    <ShieldCheck size={12} />
                    <span>Verified Buyer • Bengaluru</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Review 3 */}
            <div className="p-6 sm:p-8 rounded-3xl bg-[#FFFFFF] border border-[#EAE5DF] shadow-xs flex flex-col justify-between">
              <div className="space-y-3">
                <div className="flex items-center gap-1 text-[#D4AF37]">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={14} className="fill-[#D4AF37]" />
                  ))}
                  <span className="text-xs font-bold text-[#2C2A29] ml-1.5">5.0</span>
                </div>

                <p className="text-xs text-[#2C2A29] leading-relaxed italic">
                  "I work in a competitive corporate sales firm with constant office politics. The Black Tourmaline shield bracelet has been my daily armor. You can immediately feel these are genuine earth minerals, not cheap dyed glass."
                </p>
              </div>

              <div className="mt-5 pt-3 border-t border-[#EAE5DF] flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-[#F8F4EC] border border-[#D4AF37]/50 flex items-center justify-center font-serif font-bold text-xs text-[#2C2A29]">
                  RM
                </div>
                <div>
                  <h5 className="text-xs font-bold text-[#2C2A29]">Rohan Mehta</h5>
                  <div className="flex items-center gap-1 text-[10px] text-emerald-800">
                    <ShieldCheck size={12} />
                    <span>Verified Buyer • New Delhi</span>
                  </div>
                </div>
              </div>
            </div>

          </div>

        </div>
      </section>


      {/* =========================================================================
          SECTION 5: CLIENT FAQ ACCORDION
      ========================================================================= */}
      <section id="faq-section" className="py-14 sm:py-24 bg-[#FAF9F6]">
        <div className="container mx-auto px-4 sm:px-6 max-w-4xl">
          
          <div className="text-center mb-8 sm:mb-12">
            <span className="text-[10px] sm:text-xs font-semibold uppercase tracking-widest text-[#9A7B2C] mb-1.5 block">
              Clear E-Commerce Guidance
            </span>
            <h2 className="text-2xl sm:text-4xl font-serif text-[#2C2A29] tracking-wide mb-2 sm:mb-3">
              Frequently Asked Questions
            </h2>
            <p className="text-xs sm:text-sm text-[#6E6A64]">
              Authenticity verification, wear guidelines, shipping timelines, and custom energization.
            </p>
          </div>

          <div className="space-y-3">
            {[
              {
                q: "Which wrist should I wear my energized crystal bracelet on?",
                a: "In Vedic subtle energy mechanics: Wear on your LEFT wrist to RECEIVE internal healing, self-compassion, and intuitive calm (e.g., Madagascar Rose Quartz, Amethyst). Wear on your RIGHT wrist to PROJECT external manifest power, career contracts, and aura defense (e.g., Pyrite, Golden Citrine, Black Tourmaline)."
              },
              {
                q: "Are these 100% natural crystals or synthetic glass?",
                a: "Every gemstone and bracelet sold by Riya Tarot Crystals is guaranteed 100% genuine earth-mined mineral. We strictly forbid artificial glass beads, dyed jade, or plastic resin replicas. Every order arrives with our laboratory authenticity certificate."
              },
              {
                q: "How does the personalized Vedic energization work?",
                a: "Prior to packaging, our master astrologer and tarot reader bathes your bracelet under Full Moon illumination, purifies it on Selenite master slabs, and locks it with 108 Vedic Beej Mantras dedicated to your intention."
              },
              {
                q: "What are your shipping and pan-India delivery timelines?",
                a: "Orders are prepared and cleansed within 24–48 hours. Express Priority Air delivery typically arrives within 1–2 business days, while Standard Insured delivery arrives in 3–5 business days. Free shipping is automatically applied on orders above ₹1,499."
              },
              {
                q: "What is your replacement and return policy?",
                a: "We offer a 7-day hassle-free replacement guarantee if your jewelry is damaged during transit. Simply WhatsApp our concierge team with an uncut unboxing video recorded at package opening, and an immediate replacement is dispatched."
              }
            ].map((faq, idx) => {
              const isOpen = openFaqIndex === idx;
              return (
                <div
                  key={idx}
                  className="rounded-2xl bg-[#FFFFFF] border border-[#EAE5DF] overflow-hidden transition-all shadow-xs"
                >
                  <button
                    type="button"
                    onClick={() => setOpenFaqIndex(isOpen ? null : idx)}
                    className="w-full p-4 sm:p-5 text-left flex items-center justify-between gap-3 hover:bg-[#FAF9F6] transition-colors cursor-pointer"
                  >
                    <span className="text-xs sm:text-sm font-semibold text-[#2C2A29] leading-snug">
                      {faq.q}
                    </span>
                    <span className="text-[#9A7B2C] flex-shrink-0">
                      {isOpen ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                    </span>
                  </button>

                  <AnimatePresence>
                    {isOpen && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        className="px-4 sm:px-5 pb-4 text-xs text-[#6E6A64] leading-relaxed border-t border-[#FAF9F6]"
                      >
                        <p className="pt-2">{faq.a}</p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>

        </div>
      </section>

    </div>
  );
}
