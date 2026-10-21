"use client";

import { useState, useEffect, Suspense, useMemo } from "react";
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
  ArrowLeft,
  SlidersHorizontal,
  X,
  ShieldCheck,
  ChevronDown
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { TiltCard } from "@/components/animations/TiltCard";

const mainCategories = [
  { id: "all", label: "All Collections" },
  { id: "Heal Energized Bracelets", label: "Bracelets" },
  { id: "Clusters", label: "Raw Clusters & Geodes" },
  { id: "Pendants", label: "Sacred Pendants" },
  { id: "Gemstones", label: "Loose Gemstones" },
];

const braceletSubCategories = [
  { id: "all", label: "All Bracelets" },
  { id: "Chakra Bracelets", label: "Chakra Bracelets" },
  { id: "Mixel Bracelets", label: "Mixel Synergy" },
  { id: "Kundali Bracelets", label: "Kundali & Planetary" },
];

const purposes = [
  { id: "all", label: "All Intentions" },
  { id: "wealth", label: "Wealth & Cashflow", keywords: ["wealth", "abundance", "money", "dhan", "financial", "sales"] },
  { id: "love", label: "Love & Soulmate", keywords: ["love", "heart", "soulmate", "anahata", "romantic"] },
  { id: "protection", label: "Protection & Evil Eye", keywords: ["protection", "shield", "evil eye", "nazar", "grounding", "defense"] },
  { id: "calm", label: "Anxiety Relief & Calm", keywords: ["calm", "anxiety", "peace", "sleep", "clarity", "serenity"] },
  { id: "career", label: "Career & Confidence", keywords: ["career", "willpower", "confidence", "focus", "leadership", "status"] },
];

const chakras = [
  { id: "all", label: "All Chakras" },
  { id: "Root", label: "Root (Muladhara)" },
  { id: "Sacral", label: "Sacral (Svadhisthana)" },
  { id: "Solar Plexus", label: "Solar Plexus (Manipura)" },
  { id: "Heart", label: "Heart (Anahata)" },
  { id: "Throat", label: "Throat (Vishuddha)" },
  { id: "Third Eye", label: "Third Eye (Ajna)" },
  { id: "Crown", label: "Crown (Sahasrara)" },
];

function ShopContent() {
  const searchParams = useSearchParams();
  const initialCategory = searchParams.get("category") || "all";
  const initialSearch = searchParams.get("search") || "";
  const initialChakra = searchParams.get("chakra") || "all";

  const [products, setProducts] = useState<Product[]>([]);
  const [activeCategory, setActiveCategory] = useState(initialCategory);
  const [activeSubCategory, setActiveSubCategory] = useState("all");
  const [activePurpose, setActivePurpose] = useState("all");
  const [activeChakra, setActiveChakra] = useState(initialChakra);
  const [selectedBeadFilter, setSelectedBeadFilter] = useState<"all" | "8mm" | "10mm">("all");
  const [maxPrice, setMaxPrice] = useState<number>(15000);
  const [searchQuery, setSearchQuery] = useState(initialSearch);
  const [sortBy, setSortBy] = useState("featured");
  const [isFilterDrawerOpen, setIsFilterDrawerOpen] = useState(false);

  // Per-card selected bead size
  const [selectedCardBeadSizes, setSelectedCardBeadSizes] = useState<Record<string, "8mm" | "10mm">>({});
  const [hoveredCardId, setHoveredCardId] = useState<string | null>(null);
  const [justAddedId, setJustAddedId] = useState<string | null>(null);

  const { addToCart, wishlist, toggleWishlist, openQuickView, showToast } = useStore();

  useEffect(() => {
    fetchProducts().then(setProducts);
  }, []);

  useEffect(() => {
    if (searchParams.get("category")) {
      setActiveCategory(searchParams.get("category")!);
    }
    if (searchParams.get("search")) {
      setSearchQuery(searchParams.get("search")!);
    }
    if (searchParams.get("chakra")) {
      setActiveChakra(searchParams.get("chakra")!);
    }
  }, [searchParams]);

  // Filtering Logic
  const filteredProducts = useMemo(() => {
    return products
      .filter((p) => {
        // 1. Category
        if (activeCategory !== "all") {
          if (p.category !== activeCategory) return false;
          if (activeCategory === "Heal Energized Bracelets" && activeSubCategory !== "all") {
            if (p.subCategory !== activeSubCategory) return false;
          }
        }

        // 2. Chakra
        if (activeChakra !== "all") {
          const chakraString = (p.chakra || "").toLowerCase();
          if (!chakraString.includes(activeChakra.toLowerCase()) && !chakraString.includes("all 7")) {
            return false;
          }
        }

        // 3. Purpose
        if (activePurpose !== "all") {
          const purposeConfig = purposes.find((item) => item.id === activePurpose);
          if (purposeConfig && purposeConfig.keywords) {
            const textToSearch = `${p.name} ${p.shortIntention} ${p.description} ${(p.benefits || []).join(" ")}`.toLowerCase();
            const matchesPurpose = purposeConfig.keywords.some((k) => textToSearch.includes(k));
            if (!matchesPurpose) return false;
          }
        }

        // 4. Bead Size Filter (for bracelets)
        if (selectedBeadFilter !== "all" && p.category === "Heal Energized Bracelets") {
          // All bracelets support 8mm & 10mm
        }

        // 5. Price
        const price = p.salePrice || p.price;
        if (price > maxPrice) return false;

        // 6. Search Query
        if (searchQuery.trim()) {
          const q = searchQuery.toLowerCase().trim();
          const matches =
            p.name.toLowerCase().includes(q) ||
            p.shortIntention.toLowerCase().includes(q) ||
            (p.chakra && p.chakra.toLowerCase().includes(q)) ||
            (p.rashi && p.rashi.toLowerCase().includes(q)) ||
            (p.planet && p.planet.toLowerCase().includes(q));
          if (!matches) return false;
        }

        return true;
      })
      .sort((a, b) => {
        const priceA = a.salePrice || a.price;
        const priceB = b.salePrice || b.price;
        if (sortBy === "price-low") return priceA - priceB;
        if (sortBy === "price-high") return priceB - priceA;
        if (sortBy === "rating") return (b.rating || 5) - (a.rating || 5);
        return 0;
      });
  }, [
    products,
    activeCategory,
    activeSubCategory,
    activeChakra,
    activePurpose,
    selectedBeadFilter,
    maxPrice,
    searchQuery,
    sortBy,
  ]);

  const handleProductAddToCart = (product: Product, e?: React.MouseEvent) => {
    e?.stopPropagation();
    const beadSize = selectedCardBeadSizes[product.id] || "8mm";
    addToCart(product, 1, beadSize);
    setJustAddedId(product.id);
    showToast(`✨ Added ${product.name} (${beadSize}) to sacred bag!`);
    setTimeout(() => setJustAddedId(null), 1200);
  };

  const handleResetFilters = () => {
    setActiveCategory("all");
    setActiveSubCategory("all");
    setActivePurpose("all");
    setActiveChakra("all");
    setSelectedBeadFilter("all");
    setMaxPrice(15000);
    setSearchQuery("");
  };

  const activeFilterCount =
    (activeCategory !== "all" ? 1 : 0) +
    (activeSubCategory !== "all" ? 1 : 0) +
    (activeChakra !== "all" ? 1 : 0) +
    (activePurpose !== "all" ? 1 : 0) +
    (selectedBeadFilter !== "all" ? 1 : 0) +
    (maxPrice < 15000 ? 1 : 0) +
    (searchQuery ? 1 : 0);

  return (
    <div className="min-h-screen py-8 sm:py-14 bg-[#FBF8F3] text-[#2B1B3D]">
      <div className="container mx-auto px-4 sm:px-6">
        
        {/* Navigation Breadcrumb */}
        <div className="flex items-center justify-between mb-6">
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#635572] hover:text-[#7B4FC9] transition-colors"
          >
            <ArrowLeft size={14} />
            <span>Return to Sanctuary</span>
          </Link>
          <span className="text-[11px] text-[#8E6D24] font-medium tracking-wide">
            100% Certified Natural Stones • Prana Pratishtha Consecrated
          </span>
        </div>

        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-8 sm:mb-10">
          <div className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-[#F5F0FD] text-[#7B4FC9] text-[11px] font-bold tracking-widest uppercase mb-2 border border-[#7B4FC9]/25">
            <Sparkles size={12} className="text-[#C9A24D]" />
            <span>Sacred Gemstone Boutique</span>
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-serif text-[#2B1B3D] tracking-tight mb-3">
            Healed & Energized Collections
          </h1>
          <p className="text-xs sm:text-sm text-[#635572] leading-relaxed max-w-2xl mx-auto">
            Explore authentic gemstone jewelry, raw quartz clusters, and bespoke astrological talismans — purified in holy Himalayan waters and sealed with 108 Vedic mantras.
          </p>
        </div>

        {/* 1. Category Bar */}
        <div className="flex gap-2 overflow-x-auto pb-2 mb-4 justify-start sm:justify-center no-scrollbar -mx-4 px-4 sm:mx-0 sm:px-0">
          {mainCategories.map((cat) => {
            const isActive = activeCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => {
                  setActiveCategory(cat.id);
                  if (cat.id !== "Heal Energized Bracelets") {
                    setActiveSubCategory("all");
                  }
                }}
                className={`px-4 sm:px-6 py-2.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all border flex-shrink-0 cursor-pointer touch-press ${
                  isActive
                    ? "bg-[#7B4FC9] text-white border-[#7B4FC9] shadow-md font-bold"
                    : "bg-white text-[#635572] border-[#EFE9E2] hover:border-[#C9A24D]/50 hover:text-[#2B1B3D]"
                }`}
              >
                {cat.label}
              </button>
            );
          })}
        </div>

        {/* 2. Subcategory Bar (For Bracelets) */}
        <AnimatePresence>
          {activeCategory === "Heal Energized Bracelets" && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="overflow-hidden mb-6"
            >
              <div className="p-1.5 sm:p-2 rounded-2xl bg-white border border-[#C9A24D]/35 max-w-xl mx-auto flex items-center justify-start sm:justify-center gap-1.5 sm:gap-2 overflow-x-auto no-scrollbar shadow-xs">
                {braceletSubCategories.map((sub) => {
                  const isSubActive = activeSubCategory === sub.id;
                  return (
                    <button
                      key={sub.id}
                      type="button"
                      onClick={() => setActiveSubCategory(sub.id)}
                      className={`px-3 sm:px-4 py-1.5 rounded-xl text-[11px] font-semibold whitespace-nowrap flex-shrink-0 transition-all cursor-pointer ${
                        isSubActive
                          ? "bg-[#F5F0FD] text-[#7B4FC9] border border-[#7B4FC9]/40 shadow-xs font-bold"
                          : "text-[#635572] hover:text-[#2B1B3D]"
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

        {/* 3. Purpose Filter Chips */}
        <div className="flex items-center gap-1.5 sm:gap-2 overflow-x-auto pb-3 mb-6 justify-start lg:justify-center no-scrollbar -mx-4 px-4 sm:mx-0 sm:px-0">
          <span className="text-[10px] font-bold uppercase tracking-wider text-[#8E6D24] mr-1 flex-shrink-0">
            Intention:
          </span>
          {purposes.map((p) => {
            const isMatch = activePurpose === p.id;
            return (
              <button
                key={p.id}
                onClick={() => setActivePurpose(p.id)}
                className={`px-3 py-1 rounded-full text-[11px] font-medium whitespace-nowrap transition-all cursor-pointer ${
                  isMatch
                    ? "bg-[#C9A24D] text-[#2B1B3D] font-bold shadow-xs"
                    : "bg-white text-[#635572] border border-[#EFE9E2] hover:border-[#C9A24D]/40"
                }`}
              >
                {p.label}
              </button>
            );
          })}
        </div>

        {/* 4. Search, Chakra & Sort Controls Bar */}
        <div className="p-4 rounded-2xl bg-white border border-[#EFE9E2] mb-8 flex flex-col md:flex-row items-center justify-between gap-3 shadow-xs">
          
          {/* Search Input */}
          <div className="relative w-full md:w-80">
            <Search size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#635572]" />
            <input
              type="text"
              placeholder="Search by stone, chakra, intention..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-3 py-2 text-xs rounded-full bg-[#FBF8F3] border border-[#EFE9E2] text-[#2B1B3D] placeholder-[#9588A3] focus:outline-none focus:border-[#C9A24D]"
            />
          </div>

          {/* Chakra Dropdown & Price & Sort */}
          <div className="flex flex-wrap items-center justify-between md:justify-end gap-2.5 w-full md:w-auto text-xs">
            {/* Chakra Selector */}
            <select
              value={activeChakra}
              onChange={(e) => setActiveChakra(e.target.value)}
              className="px-3 py-1.5 text-xs rounded-full bg-[#FBF8F3] border border-[#EFE9E2] text-[#2B1B3D] focus:outline-none focus:border-[#C9A24D] cursor-pointer"
            >
              {chakras.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.label}
                </option>
              ))}
            </select>

            {/* Sort Selector */}
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-3 py-1.5 text-xs rounded-full bg-[#FBF8F3] border border-[#EFE9E2] text-[#2B1B3D] focus:outline-none focus:border-[#C9A24D] cursor-pointer"
            >
              <option value="featured">Featured Collection</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="rating">★ Highest Rated</option>
            </select>

            {activeFilterCount > 0 && (
              <button
                onClick={handleResetFilters}
                className="px-3 py-1.5 rounded-full text-xs text-[#7B4FC9] hover:bg-[#F5F0FD] font-semibold transition-colors flex items-center gap-1 cursor-pointer"
              >
                <X size={13} />
                <span>Reset ({activeFilterCount})</span>
              </button>
            )}

            <span className="text-[#635572] text-[11px] pl-1 font-medium hidden sm:inline">
              Showing <strong className="text-[#2B1B3D] font-bold">{filteredProducts.length}</strong> gems
            </span>
          </div>
        </div>

        {/* 5. Product Grid */}
        {filteredProducts.length === 0 ? (
          <div className="py-20 text-center text-[#635572] space-y-4 bg-white rounded-3xl border border-[#EFE9E2] p-8">
            <Sparkles size={36} className="mx-auto text-[#C9A24D]" />
            <h3 className="font-serif text-lg text-[#2B1B3D]">No matching crystal products found</h3>
            <p className="text-xs max-w-md mx-auto">
              We couldn't find any gems matching your current filter combinations. Try clearing filters or searching for another spiritual intention.
            </p>
            <button
              onClick={handleResetFilters}
              className="px-6 py-2.5 rounded-full text-xs font-semibold uppercase tracking-wider text-white btn-amethyst"
            >
              Reset All Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-6">
            {filteredProducts.map((product) => {
              const isWishlisted = wishlist.includes(product.id);
              const selectedSize = selectedCardBeadSizes[product.id] || "8mm";
              const isJustAdded = justAddedId === product.id;
              const price = product.salePrice || product.price;
              const originalPrice = product.price;
              const discount = originalPrice > price ? Math.round(((originalPrice - price) / originalPrice) * 100) : 0;
              
              const isHovered = hoveredCardId === product.id;
              const displayImage = isHovered && product.gallery && product.gallery[1]
                ? product.gallery[1]
                : product.image;

              return (
                <div
                  key={product.id}
                  data-cursor="gem"
                  onMouseEnter={() => setHoveredCardId(product.id)}
                  onMouseLeave={() => setHoveredCardId(null)}
                  onClick={() => openQuickView(product)}
                  className="product-card-target group rounded-2xl sm:rounded-3xl bg-white border border-[#EFE9E2] hover:border-[#C9A24D]/60 overflow-hidden shadow-xs hover:shadow-[0_16px_36px_rgba(123,79,201,0.12)] transition-all duration-300 flex flex-col justify-between cursor-pointer"
                >
                  {/* Image Container with Hover Swap */}
                  <div className="relative aspect-square w-full bg-[#FAF8F3] overflow-hidden">
                    <Image
                      src={displayImage}
                      alt={product.name}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                      sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                    />

                    {/* Badges */}
                    <div className="absolute top-2 left-2 sm:top-3 sm:left-3 flex flex-col gap-1 z-10 pointer-events-none">
                      <span className="px-2 py-0.5 rounded-full text-[8px] sm:text-[9px] font-bold uppercase tracking-wider bg-white/95 backdrop-blur-md text-[#2B1B3D] border border-[#C9A24D]/50 shadow-2xs">
                        {product.badge || "Energized & Certified"}
                      </span>
                      {discount > 0 && (
                        <span className="px-1.5 py-0.5 rounded-full text-[8px] sm:text-[9px] font-bold uppercase tracking-wider bg-[#EDF7ED] text-[#2E7D32] border border-[#A5D6A7] self-start shadow-2xs">
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
                      className={`absolute top-2 right-2 sm:top-3 sm:right-3 w-7 h-7 sm:w-8 sm:h-8 rounded-full border flex items-center justify-center transition-all z-10 shadow-xs touch-press cursor-pointer ${
                        isWishlisted
                          ? "bg-[#FDF2F4] text-[#B83D60] border-[#F4C6D0]"
                          : "bg-white/95 backdrop-blur-md text-[#635572] border-[#EFE9E2] hover:text-[#7B4FC9] hover:bg-white"
                      }`}
                      aria-label="Save to Wishlist"
                    >
                      <Heart size={14} fill={isWishlisted ? "currentColor" : "none"} />
                    </button>

                    {/* Quick View Pill */}
                    <div className="absolute inset-x-3 bottom-3 opacity-0 group-hover:opacity-100 transition-opacity z-10 hidden md:block">
                      <div className="w-full py-2 rounded-xl bg-white/95 backdrop-blur-md text-[11px] font-semibold text-[#2B1B3D] border border-[#EFE9E2] hover:bg-[#FBF8F3] transition-colors flex items-center justify-center gap-1.5 shadow-md">
                        <Eye size={13} className="text-[#C9A24D]" />
                        <span>Inspect & Details</span>
                      </div>
                    </div>
                  </div>

                  {/* Card Content */}
                  <div className="p-3 sm:p-5 flex flex-col justify-between flex-grow space-y-2 sm:space-y-3">
                    <div>
                      <div className="flex items-center justify-between text-[10px] sm:text-[11px] text-[#635572] mb-1">
                        <div className="flex items-center gap-1 font-bold text-[#2B1B3D]">
                          <Star size={11} className="fill-[#C9A24D] text-[#C9A24D]" />
                          <span>{product.rating || 4.9}</span>
                        </div>
                        <span className="text-[9px] sm:text-[10px] uppercase font-semibold text-[#8E6D24] tracking-wider truncate max-w-[100px] sm:max-w-[140px]">
                          {product.chakra || product.rashi || "Vedic Energized"}
                        </span>
                      </div>

                      <h3 className="font-serif text-xs sm:text-base font-semibold text-[#2B1B3D] leading-snug group-hover:text-[#7B4FC9] transition-colors line-clamp-2 min-h-[2rem] sm:min-h-[2.5rem]">
                        {product.name}
                      </h3>

                      <p className="text-[10px] sm:text-xs text-[#635572] mt-0.5 line-clamp-1 italic">
                        "{product.shortIntention}"
                      </p>
                    </div>

                    {/* Bead Size Selector for Bracelets */}
                    {product.category === "Heal Energized Bracelets" && (
                      <div className="pt-1.5 border-t border-[#EFE9E2]">
                        <div className="flex items-center justify-between text-[9px] sm:text-[10px] font-semibold text-[#635572] uppercase mb-1">
                          <span>Bead Size:</span>
                          <span className="text-[#2B1B3D]">{selectedSize}</span>
                        </div>
                        <div className="grid grid-cols-2 gap-1">
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              setSelectedCardBeadSizes((prev) => ({ ...prev, [product.id]: "8mm" }));
                            }}
                            className={`py-0.5 sm:py-1 rounded-md text-[9px] sm:text-[10px] font-medium border text-center transition-all ${
                              selectedSize === "8mm"
                                ? "bg-[#F5F0FD] border-[#7B4FC9] text-[#7B4FC9] font-bold"
                                : "bg-[#FBF8F3] border-[#EFE9E2] text-[#635572]"
                            }`}
                          >
                            8mm
                          </button>
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              setSelectedCardBeadSizes((prev) => ({ ...prev, [product.id]: "10mm" }));
                            }}
                            className={`py-0.5 sm:py-1 rounded-md text-[9px] sm:text-[10px] font-medium border text-center transition-all ${
                              selectedSize === "10mm"
                                ? "bg-[#F5F0FD] border-[#7B4FC9] text-[#7B4FC9] font-bold"
                                : "bg-[#FBF8F3] border-[#EFE9E2] text-[#635572]"
                            }`}
                          >
                            10mm
                          </button>
                        </div>
                      </div>
                    )}

                    {/* Price & Action */}
                    <div className="pt-1">
                      <div className="flex items-baseline gap-1.5 mb-2">
                        <span className="text-sm sm:text-lg font-bold text-[#2B1B3D]">
                          ₹{price.toLocaleString("en-IN")}
                        </span>
                        {originalPrice > price && (
                          <span className="text-[10px] sm:text-xs text-[#9588A3] line-through">
                            ₹{originalPrice.toLocaleString("en-IN")}
                          </span>
                        )}
                        <span className="text-[9px] text-[#635572] ml-auto">GST Incl.</span>
                      </div>

                      <button
                        type="button"
                        onClick={(e) => handleProductAddToCart(product, e)}
                        disabled={isJustAdded}
                        className={`w-full py-2 sm:py-2.5 px-3 rounded-full text-[11px] sm:text-xs font-semibold uppercase tracking-wider transition-all flex items-center justify-center gap-1.5 cursor-pointer shadow-xs ${
                          isJustAdded
                            ? "bg-[#EDF7ED] text-[#2E7D32] border border-[#A5D6A7]"
                            : "btn-amethyst"
                        }`}
                      >
                        {isJustAdded ? (
                          <>
                            <Check size={13} />
                            <span>Added to Bag!</span>
                          </>
                        ) : (
                          <>
                            <ShoppingBag size={13} />
                            <span>Add to Bag</span>
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                </div>
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
    <Suspense fallback={<div className="min-h-screen py-24 text-center text-xs text-[#635572]">Loading sacred crystals...</div>}>
      <ShopContent />
    </Suspense>
  );
}
