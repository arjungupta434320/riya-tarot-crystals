"use client";

import { useState, useEffect, Suspense } from "react";
import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { fetchProducts } from "@/data/products";
import { useStore, Product } from "@/store/useStore";
import { ChevronDown, Sparkles } from "lucide-react";
import { motion } from "framer-motion";

const categories = ["Bracelets"];

function ShopContent() {
  const [activeCategory, setActiveCategory] = useState("Bracelets");
  const [products, setProducts] = useState<Product[]>([]);
  const { addToCart } = useStore();
  
  const searchParams = useSearchParams();
  const searchQuery = searchParams.get("search")?.toLowerCase() || "";

  const [sortOption, setSortOption] = useState("featured");
  const [showSort, setShowSort] = useState(false);

  useEffect(() => {
    fetchProducts().then(setProducts);
  }, []);

  const filteredProducts = products.filter(p => {
    const matchesCategory = activeCategory === "Bracelets" || p.category === activeCategory;
    const matchesSearch = !searchQuery || 
      (p.name && p.name.toLowerCase().includes(searchQuery)) || 
      (p.description && p.description.toLowerCase().includes(searchQuery)) || 
      (p.shortIntention && p.shortIntention.toLowerCase().includes(searchQuery)) ||
      (p.category && p.category.toLowerCase().includes(searchQuery));
      
    return matchesCategory && matchesSearch;
  }).sort((a, b) => {
    const priceA = a.salePrice || a.price;
    const priceB = b.salePrice || b.price;
    if (sortOption === "price-low") return priceA - priceB;
    if (sortOption === "price-high") return priceB - priceA;
    return 0; // featured
  });

  return (
    <div className="min-h-screen pt-28 md:pt-36 pb-24 bg-[#FFFCF7] text-[#51473C]">
      <div className="container mx-auto px-6 max-w-7xl">
        
        {/* Header Title */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-[11px] tracking-[0.25em] uppercase text-[#B99B6B] font-semibold block mb-2">
            Fine Boutique Collection
          </span>
          <h1 className="font-serif text-3xl md:text-5xl text-[#51473C] tracking-wide mb-3">
            Handcrafted Intention Bracelets
          </h1>
          <p className="text-xs md:text-sm text-[#817569] font-light leading-relaxed">
            Curated natural gemstone bracelets attuned with Vedic rituals to align with your personal energy.
          </p>
        </div>

        {searchQuery && (
          <div className="mb-8 p-4 bg-[#F8F1E8] border border-[#E9E1D5] rounded-[3px] flex items-center justify-between">
            <h2 className="font-serif text-lg text-[#51473C]">
              Search results for "{searchQuery}"
            </h2>
            <button 
              onClick={() => window.location.href = '/shop'} 
              className="text-xs tracking-widest uppercase border-b border-[#51473C]/40 text-[#51473C] hover:text-[#B99B6B] transition-colors"
            >
              Clear Search
            </button>
          </div>
        )}

        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-10 pb-6 border-b border-[#E9E1D5] gap-4">
          {/* Categories */}
          <div className="flex gap-6 overflow-x-auto hide-scrollbar">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`text-xs tracking-[0.2em] uppercase whitespace-nowrap pb-1.5 transition-colors ${
                  activeCategory === cat 
                    ? "border-b-2 border-[#51473C] text-[#51473C] font-semibold" 
                    : "text-[#817569] hover:text-[#51473C]"
                }`}
              >
                {cat} ({filteredProducts.length})
              </button>
            ))}
          </div>
          
          {/* Sort By Dropdown */}
          <div className="relative self-end sm:self-auto">
            <button 
              onClick={() => setShowSort(!showSort)}
              className="flex items-center gap-2 text-xs tracking-[0.16em] uppercase border border-[#E9E1D5] bg-[#FFFFFF] px-4 py-2.5 hover:border-[#B99B6B] transition-colors rounded-[3px] text-[#51473C]"
            >
              Sort By {sortOption === 'price-low' ? ': Price (Low)' : sortOption === 'price-high' ? ': Price (High)' : ''} 
              <ChevronDown size={14} className={`transition-transform text-[#817569] ${showSort ? 'rotate-180' : ''}`} />
            </button>

            {showSort && (
              <div className="absolute top-full right-0 mt-2 w-48 bg-[#FFFFFF] border border-[#E9E1D5] shadow-[0_12px_32px_rgba(81,71,60,0.08)] z-50 rounded-[3px] overflow-hidden">
                <button 
                  onClick={() => { setSortOption('featured'); setShowSort(false); }}
                  className="block w-full text-left px-4 py-3 text-xs tracking-widest uppercase hover:bg-[#F4E9D9] transition-colors text-[#51473C]"
                >
                  Featured
                </button>
                <button 
                  onClick={() => { setSortOption('price-low'); setShowSort(false); }}
                  className="block w-full text-left px-4 py-3 text-xs tracking-widest uppercase hover:bg-[#F4E9D9] transition-colors border-t border-[#E9E1D5] text-[#51473C]"
                >
                  Price: Low to High
                </button>
                <button 
                  onClick={() => { setSortOption('price-high'); setShowSort(false); }}
                  className="block w-full text-left px-4 py-3 text-xs tracking-widest uppercase hover:bg-[#F4E9D9] transition-colors border-t border-[#E9E1D5] text-[#51473C]"
                >
                  Price: High to Low
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
          {filteredProducts.map((product, idx) => (
            <motion.div 
              key={product.id} 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.5, delay: (idx % 4) * 0.08 }}
              className="card-luxury p-3 sm:p-4 flex flex-col h-full bg-[#FFFFFF]"
            >
              <div className="relative aspect-square mb-4 bg-[#F8F1E8] rounded-[2px] overflow-hidden border border-[#E9E1D5]/60 group">
                <Link href={`/product?id=${product.id}`} className="block absolute inset-0 z-0">
                  <Image 
                    src={product.image} 
                    alt={product.name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                  />
                </Link>
                <div className="absolute bottom-0 left-0 w-full p-2 translate-y-full group-hover:translate-y-0 transition-transform duration-300 z-10">
                  <button 
                    onClick={(e) => {
                      e.preventDefault();
                      import("@/lib/animations").then(m => m.flyToCart(e, product.image));
                      addToCart(product);
                    }}
                    className="w-full bg-[#51473C] text-[#FFFCF7] text-[10px] tracking-widest py-2.5 uppercase hover:bg-[#3E362D] transition-colors font-medium shadow-sm rounded-[2px]"
                  >
                    Quick Add
                  </button>
                </div>
              </div>

              <div className="flex flex-col flex-grow text-center">
                <h3 className="text-xs tracking-[0.14em] uppercase font-semibold text-[#51473C] mb-1 hover:text-[#B99B6B] transition-colors truncate">
                  <Link href={`/product?id=${product.id}`}>{product.name}</Link>
                </h3>
                <p className="text-[11px] text-[#817569] font-light mb-3 truncate">
                  {product.shortIntention}
                </p>
                
                <div className="mt-auto pt-2 border-t border-[#E9E1D5]/60 flex items-center justify-center gap-2">
                  {product.salePrice && (
                    <span className="text-xs text-[#817569]/60 line-through">
                      ₹{product.price.toLocaleString('en-IN')}
                    </span>
                  )}
                  <span className="text-sm font-semibold text-[#51473C]">
                    ₹{(product.salePrice || product.price).toLocaleString('en-IN')}
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </div>
  );
}

export default function Shop() {
  return (
    <Suspense fallback={
      <div className="min-h-screen pt-32 pb-24 bg-[#FFFCF7] flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-[#51473C] border-t-transparent rounded-full animate-spin"></div>
      </div>
    }>
      <ShopContent />
    </Suspense>
  );
}
