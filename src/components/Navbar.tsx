"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Search, Heart, ShoppingCart, User, Menu, X } from "lucide-react";
import { useStore } from "@/store/useStore";
import { motion, AnimatePresence } from "framer-motion";
import { fetchProducts } from "@/data/products";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [products, setProducts] = useState<any[]>([]);
  const router = useRouter();
  const { cart, wishlist, toggleCart, setDrawerTab } = useStore();

  const cartItemsCount = cart.reduce((total, item) => total + item.quantity, 0);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    
    // Fetch products for instant search
    fetchProducts().then(setProducts);
    
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      setIsSearchOpen(false);
      setIsMobileMenuOpen(false);
      router.push(`/shop?search=${encodeURIComponent(searchQuery.trim())}`);
      setSearchQuery("");
    }
  };

  return (
    <>
      {/* Slim Announcement Bar in #F4E9D9 with #51473C text */}
      <div className="bg-[#F4E9D9] text-[#51473C] border-b border-[#E9E1D5] py-2 text-[11px] sm:text-xs tracking-[0.2em] uppercase text-center font-medium">
        Handcrafted Crystal Jewelry & Intention Bracelets • Complimentary Packaging
      </div>

      <header
        className={`sticky top-0 w-full z-50 transition-all duration-300 border-b border-[#E9E1D5] ${
          isScrolled 
            ? "bg-[#FFFCF7]/95 backdrop-blur-md shadow-[0_2px_12px_rgba(81,71,60,0.04)] py-2" 
            : "bg-[#FFFCF7]/95 backdrop-blur-md py-3 md:py-4"
        }`}
      >
        <div className="container mx-auto h-[65px] md:h-[80px] px-4 md:px-6 flex justify-between items-center xl:grid xl:grid-cols-3">
        
        {/* Left: Mobile Hamburger, Mobile Logo & Desktop Links */}
        <div className="flex justify-start items-center z-50">
          <button 
            type="button"
            className="xl:hidden text-[#51473C] p-2 -ml-2 cursor-pointer flex-shrink-0 hover:text-[#B99B6B] transition-colors"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle Menu"
          >
            {isMobileMenuOpen ? <X size={26} /> : <Menu size={26} />}
          </button>
          
          {/* Mobile Logo */}
          <Link href="/" className="xl:hidden ml-1 flex items-center">
            <Image 
              src="/logo.jpg" 
              alt="Riya Tarot Crystals" 
              width={200} 
              height={200} 
              className="h-[65px] w-auto mix-blend-multiply scale-125 origin-left" 
              priority 
            />
          </Link>
          
          <nav className="hidden xl:flex gap-4 2xl:gap-7 text-[11px] xl:text-xs tracking-[0.18em] uppercase whitespace-nowrap font-medium text-[#51473C]">
            <Link href="/" className="hover:text-[#B99B6B] transition-colors">Home</Link>
            <Link href="/shop" className="hover:text-[#B99B6B] transition-colors">Shop All</Link>
            <Link href="/quiz" className="hover:text-[#B99B6B] transition-colors">Crystal Quiz</Link>
            <Link href="/about" className="hover:text-[#B99B6B] transition-colors">About Us</Link>
            <Link href="/track" className="hover:text-[#B99B6B] transition-colors">Track Order</Link>
          </nav>
        </div>

        {/* Center: Desktop Logo */}
        <div className="hidden xl:flex justify-center items-center z-40">
          <Link href="/" className="flex flex-col items-center">
            <Image 
              src="/logo.jpg" 
              alt="Riya Tarot Crystals" 
              width={250} 
              height={250} 
              className="h-[85px] w-auto mix-blend-multiply scale-110" 
              priority 
            />
          </Link>
        </div>

        {/* Right Nav */}
        <div className="flex justify-end items-center gap-3 sm:gap-4 md:gap-6 z-50 text-[#51473C]">
          <Link href="/account" className="hover:text-[#B99B6B] transition-colors" aria-label="Account">
            <User size={20} className="md:w-5 md:h-5 w-[22px] h-[22px]" />
          </Link>
          <button 
            onClick={() => {
              setDrawerTab('wishlist');
              toggleCart();
            }}
            aria-label="Wishlist"
            className="hover:text-[#B99B6B] transition-colors relative"
          >
            <Heart size={20} className="md:w-5 md:h-5 w-[22px] h-[22px]" />
            {wishlist.length > 0 && (
              <span className="absolute -top-2 -right-2 bg-[#B99B6B] text-[#FFFCF7] text-[10px] w-4 h-4 flex items-center justify-center rounded-full font-medium">
                {wishlist.length}
              </span>
            )}
          </button>
          <button 
            id="cart-icon"
            onClick={() => {
              setDrawerTab('cart');
              toggleCart();
            }}
            aria-label="Cart"
            className="hover:text-[#B99B6B] transition-colors relative p-2 -mr-2 md:p-0 md:mr-0"
          >
            <ShoppingCart size={22} className="md:w-5 md:h-5" />
            {cartItemsCount > 0 && (
              <span className="absolute top-0 right-0 md:-top-2 md:-right-2 bg-[#B99B6B] text-[#FFFCF7] text-[10px] w-4 h-4 flex items-center justify-center rounded-full font-medium">
                {cartItemsCount}
              </span>
            )}
          </button>
        </div>
      </div>

      {/* Persistent Search Bar Below Header */}
      <div className="w-full bg-[#FFFCF7] border-t border-[#E9E1D5] overflow-visible relative z-[9999]">
        <div className="container mx-auto px-4 py-3 md:py-3.5 relative">
          <form onSubmit={handleSearchSubmit} className="relative max-w-2xl mx-auto flex items-center group">
            <Search size={17} className="absolute left-4 text-[#817569]" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search for bracelets, intentions, crystals..."
              className="w-full bg-[#F8F1E8] border border-[#E9E1D5] py-2.5 pl-11 pr-24 focus:outline-none focus:border-[#B99B6B] transition-colors text-sm text-[#51473C] placeholder-[#817569]/70 rounded-[3px]"
            />
            <button type="submit" className="absolute right-4 text-xs font-semibold tracking-widest uppercase text-[#51473C] hover:text-[#B99B6B] transition-colors">
              Search
            </button>
            
            {/* Instant Visual Search Overlay */}
            <AnimatePresence>
              {searchQuery.trim().length > 1 && (
                <motion.div 
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 8 }}
                  className="absolute top-full left-0 w-full mt-2 bg-[#FFFFFF] border border-[#E9E1D5] shadow-[0_12px_32px_rgba(81,71,60,0.08)] rounded-[3px] z-[100] max-h-[70vh] overflow-y-auto"
                >
                  <div className="p-3 border-b border-[#E9E1D5] bg-[#F8F1E8]">
                    <span className="text-[11px] tracking-widest uppercase text-[#817569] font-medium">Instant Results</span>
                  </div>
                  {(() => {
                    const results = products.filter(p => 
                      p.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                      (p.shortIntention && p.shortIntention.toLowerCase().includes(searchQuery.toLowerCase())) ||
                      (p.description && p.description.toLowerCase().includes(searchQuery.toLowerCase()))
                    ).slice(0, 4);

                    if (results.length === 0) {
                      return <div className="p-6 text-center text-sm text-[#817569]">No products found for "{searchQuery}"</div>;
                    }

                    return (
                      <div className="flex flex-col">
                        {results.map(product => (
                          <Link 
                            href={`/product?id=${product.id}`} 
                            key={product.id}
                            onClick={() => setSearchQuery("")}
                            className="flex items-center gap-4 p-4 hover:bg-[#F4E9D9]/50 transition-colors border-b border-[#E9E1D5] last:border-0"
                          >
                            <div className="w-14 h-14 bg-[#F8F1E8] border border-[#E9E1D5] relative flex-shrink-0 rounded-[2px] overflow-hidden">
                              <img src={product.image} alt={product.name} className="absolute inset-0 w-full h-full object-cover" />
                            </div>
                            <div className="flex-grow">
                              <h4 className="text-xs font-semibold tracking-wider uppercase text-[#51473C]">{product.name}</h4>
                              <p className="text-[11px] text-[#817569] mt-0.5">{product.shortIntention}</p>
                            </div>
                            <div className="text-sm font-medium text-[#51473C] whitespace-nowrap">
                              ₹{(product.salePrice || product.price).toLocaleString('en-IN')}
                            </div>
                          </Link>
                        ))}
                        <button 
                          onClick={handleSearchSubmit}
                          className="p-3.5 bg-[#F8F1E8] text-xs font-medium tracking-widest uppercase text-[#51473C] text-center hover:bg-[#F4E9D9] hover:text-[#51473C] transition-colors border-t border-[#E9E1D5]"
                        >
                          View All Results
                        </button>
                      </div>
                    );
                  })()}
                </motion.div>
              )}
            </AnimatePresence>
          </form>
        </div>
      </div>

      {/* Mobile/Tablet Menu Dropdown */}
      {isMobileMenuOpen && (
        <div className="xl:hidden absolute top-full left-0 w-full bg-[#FFFCF7] border-t border-[#E9E1D5] py-6 px-6 flex flex-col gap-2 shadow-2xl z-[100] h-screen">
          <Link href="/" onClick={() => setIsMobileMenuOpen(false)} className="text-sm tracking-widest uppercase py-3.5 border-b border-[#E9E1D5] text-[#51473C] hover:text-[#B99B6B]">Home</Link>
          <Link href="/shop" onClick={() => setIsMobileMenuOpen(false)} className="text-sm tracking-widest uppercase py-3.5 border-b border-[#E9E1D5] text-[#51473C] hover:text-[#B99B6B]">Shop All</Link>
          <Link href="/quiz" onClick={() => setIsMobileMenuOpen(false)} className="text-sm tracking-widest uppercase py-3.5 border-b border-[#E9E1D5] text-[#51473C] hover:text-[#B99B6B]">Crystal Quiz</Link>
          <Link href="/about" onClick={() => setIsMobileMenuOpen(false)} className="text-sm tracking-widest uppercase py-3.5 border-b border-[#E9E1D5] text-[#51473C] hover:text-[#B99B6B]">About Us</Link>
          <Link href="/track" onClick={() => setIsMobileMenuOpen(false)} className="text-sm tracking-widest uppercase py-3.5 border-b border-[#E9E1D5] text-[#51473C] hover:text-[#B99B6B]">Track Order</Link>
        </div>
      )}
    </header>
    </>
  );
}
