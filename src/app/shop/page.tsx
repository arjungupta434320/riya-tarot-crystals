"use client";

import { useState, useEffect, Suspense } from "react";
import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { fetchProducts } from "@/data/products";
import { useStore, Product } from "@/store/useStore";
import { 
  Star, 
  Sparkles, 
  Heart, 
  Eye, 
  ShoppingBag, 
  Check, 
  Search, 
  ArrowLeft 
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const mainCategories = [
  { id: "all", label: "All Collections" },
  { id: "Heal Energized Bracelets", label: "Heal Energized Bracelets" },
  { id: "Pendants", label: "Pendants" },
  { id: "Gemstones", label: "Gemstones" },
  { id: "Clusters", label: "Clusters" },
];

const braceletSubFilters = [
  { id: "all", label: "All Bracelets" },
  { id: "Mixel Bracelets", label: "Mixel Bracelets" },
  { id: "Chakra Bracelets", label: "Chakra Bracelets" },
  { id: "Kundali Bracelets", label: "Kundali Bracelets" },
];

function ShopContent() {
  const [activeCategory, setActiveCategory] = useState("all");
  const [activeSubFilter, setActiveSubFilter] = useState("all");
  const [products, setProducts] = useState<Product[]>([]);
  const [justAddedId, setJustAddedId] = useState<string | null>(null);
  const [selectedBeadSizes, setSelectedBeadSizes] = useState<Record<string, '8mm' | '10mm'>>({});

  const { addToCart, wishlist, toggleWishlist, openQuickView, showToast } = useStore();
  
  const searchParams = useSearchParams();
  const queryParam = searchParams.get("search")?.toLowerCase() || "";
  const [searchQuery, setSearchQuery] = useState(queryParam);
  const [sortBy, setSortBy] = useState("featured");

  useEffect(() => {
    fetchProducts().then(setProducts);
  }, []);

  useEffect(() => {
    if (queryParam) {
      setSearchQuery(queryParam);
    }
  }, [queryParam]);

  const filteredProducts = products.filter((p) => {
    let matchesCategory = true;
    if (activeCategory !== "all") {
      matchesCategory = p.category === activeCategory;
      if (matchesCategory && activeCategory === "Heal Energized Bracelets" && activeSubFilter !== "all") {
        matchesCategory = p.subCategory === activeSubFilter;
      }
    }

    const q = searchQuery.trim().toLowerCase();
    const matchesSearch =
      !q ||
      p.name.toLowerCase().includes(q) ||
      p.shortIntention.toLowerCase().includes(q) ||
      (p.rashi && p.rashi.toLowerCase().includes(q)) ||
      (p.chakra && p.chakra.toLowerCase().includes(q)) ||
      (p.planet && p.planet.toLowerCase().includes(q)) ||
      (p.subCategory && p.subCategory.toLowerCase().includes(q));

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
    <div className="min-h-screen py-10 sm:py-16 bg-[#FAF9F6] text-[#2C2A29]">
      <div className="container mx-auto px-4 sm:px-6">
        
        {/* Navigation Breadcrumb */}
        <div className="mb-6">
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#6E6A64] hover:text-[#2C2A29] transition-colors"
          >
            <ArrowLeft size={14} />
            <span>Return to Home</span>
          </Link>
        </div>

        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-8 sm:mb-12">
          <span className="text-[10px] sm:text-xs font-semibold uppercase tracking-widest text-[#9A7B2C] mb-1.5 block">
            100% Certified Natural Stones
          </span>
          <h1 className="text-2xl sm:text-4xl md:text-5xl font-serif text-[#2C2A29] tracking-wide mb-2 sm:mb-3">
            Riya Tarot Crystals Marketplace
          </h1>
          <p className="text-xs sm:text-sm text-[#6E6A64] leading-relaxed">
            Browse our laboratory-certified healed crystal bracelets, raw clusters, pendants, and untreated loose gemstones.
          </p>
        </div>

        {/* Main 5 Category Tabs */}
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

        {/* Sub-Filters for Heal Energized Bracelets */}
        <AnimatePresence>
          {activeCategory === "Heal Energized Bracelets" && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="overflow-hidden mb-6"
            >
              <div className="p-1.5 sm:p-2.5 rounded-2xl bg-[#FFFFFF] border border-[#D4AF37]/40 max-w-xl mx-auto flex items-center justify-start sm:justify-center gap-1.5 sm:gap-2 overflow-x-auto no-scrollbar shadow-xs">
                {braceletSubFilters.map((sub) => {
                  const isSubActive = activeSubFilter === sub.id;
                  return (
                    <button
                      key={sub.id}
                      type="button"
                      onClick={() => setActiveSubFilter(sub.id)}
                      className={`px-3 sm:px-4 py-1.5 rounded-xl text-[11px] font-semibold whitespace-nowrap flex-shrink-0 transition-all cursor-pointer ${
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

        {/* Live Search & Sort Bar */}
        <div className="p-3.5 sm:p-4 rounded-2xl bg-[#FFFFFF] border border-[#EAE5DF] mb-8 flex flex-col sm:flex-row items-center justify-between gap-3 shadow-xs">
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

        {/* Product Grid */}
        {filteredProducts.length === 0 ? (
          <div className="py-16 text-center text-[#6E6A64] space-y-3">
            <Sparkles size={32} className="mx-auto text-[#D4AF37]" />
            <h3 className="font-serif text-base sm:text-lg text-[#2C2A29]">No matching crystal products found</h3>
            <p className="text-xs">Try clearing your search query or selecting "All Collections".</p>
            <button
              onClick={() => {
                setSearchQuery("");
                setActiveCategory("all");
                setActiveSubFilter("all");
              }}
              className="px-6 py-2 rounded-full text-xs font-semibold uppercase tracking-wider text-[#2C2A29] btn-pearl-gold"
            >
              Reset Filters
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
                  <div className="relative aspect-square w-full bg-[#FAF9F6] overflow-hidden">
                    <Image
                      src={product.image}
                      alt={product.name}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-700"
                      sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                    />

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

                    <div className="absolute inset-x-3 bottom-3 opacity-0 group-hover:opacity-100 transition-opacity z-10 hidden md:block">
                      <div className="w-full py-2 rounded-xl bg-white/95 backdrop-blur-md text-[11px] font-semibold text-[#2C2A29] border border-[#EAE5DF] hover:bg-[#F8F4EC] transition-colors flex items-center justify-center gap-1.5 shadow-md">
                        <Eye size={13} className="text-[#D4AF37]" />
                        <span>Quick View</span>
                      </div>
                    </div>
                  </div>

                  <div className="p-3 sm:p-5 flex flex-col justify-between flex-grow space-y-2 sm:space-y-3">
                    <div>
                      <div className="flex items-center justify-between text-[10px] sm:text-[11px] text-[#6E6A64] mb-1">
                        <div className="flex items-center gap-1 font-bold text-[#2C2A29]">
                          <Star size={11} className="fill-[#D4AF37] text-[#D4AF37]" />
                          <span>{product.rating || 4.9}</span>
                        </div>
                        <span className="text-[9px] sm:text-[10px] uppercase font-semibold text-[#9A7B2C] tracking-wider truncate max-w-[90px] sm:max-w-[130px]">
                          {product.rashi || product.planet || "Vedic"}
                        </span>
                      </div>

                      <h3 className="font-serif text-xs sm:text-base font-semibold text-[#2C2A29] leading-tight group-hover:text-[#9A7B2C] transition-colors line-clamp-2 min-h-[2rem] sm:min-h-[2.5rem]">
                        {product.name}
                      </h3>

                      <p className="text-[10px] sm:text-xs text-[#6E6A64] mt-0.5 line-clamp-1 italic">
                        "{product.shortIntention}"
                      </p>
                    </div>

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
    </div>
  );
}

export default function ShopPage() {
  return (
    <Suspense fallback={<div className="min-h-screen py-24 text-center text-xs text-[#6E6A64]">Loading collections...</div>}>
      <ShopContent />
    </Suspense>
  );
}
