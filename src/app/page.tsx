"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import React, { useRef } from "react";
import { fetchProducts } from "@/data/products";
import { ArrowRight, Star, ShieldCheck, Gem, Globe, Sparkles } from "lucide-react";
import { useStore } from "@/store/useStore";

const trustFeatures = [
  { icon: ShieldCheck, title: "AUTHENTIC GEMSTONES", desc: "100% natural, untreated earth crystals." },
  { icon: Star, title: "CLEANSED & ENERGIZED", desc: "Prepared mindfully with Vedic & sacred rituals." },
  { icon: Gem, title: "HANDCRAFTED FINISH", desc: "Strung on ultra-durable elastic cord." },
  { icon: Globe, title: "ETHICALLY PROCURED", desc: "Responsibly mined and sustainably packed." },
];

const intentions = [
  { 
    name: "LOVE & COMPASSION", 
    stone: "Rose Quartz", 
    accent: "bg-[#EBCFCB]", 
    accentBorder: "border-[#EBCFCB]", 
    image: "/images/products/rose-quartz-new.jpg", 
    id: "love-attraction" 
  },
  { 
    name: "CALM & SERENITY", 
    stone: "Turquoise", 
    accent: "bg-[#DCE8DC]", 
    accentBorder: "border-[#DCE8DC]", 
    image: "/images/products/turquoise-new.jpg", 
    id: "turquoise" 
  },
  { 
    name: "PROTECTION & GROUNDING", 
    stone: "Red Carnelian", 
    accent: "bg-[#F4E9D9]", 
    accentBorder: "border-[#E9E1D5]", 
    image: "/images/products/red-carnelian-new.jpg", 
    id: "red-carnelian" 
  },
  { 
    name: "CONFIDENCE & POWER", 
    stone: "Tiger Eye", 
    accent: "bg-[#F8F1E8]", 
    accentBorder: "border-[#E9E1D5]", 
    image: "/images/products/tiger-eye-new.jpg", 
    id: "tiger-eye-celeb" 
  },
  { 
    name: "FOCUS & PROSPERITY", 
    stone: "Citrine", 
    accent: "bg-[#EAE1F0]", 
    accentBorder: "border-[#EAE1F0]", 
    image: "/images/products/citrine-new.jpg", 
    id: "citrine" 
  },
];

export default function Home() {
  const { addToCart } = useStore();
  const [dynamicProducts, setDynamicProducts] = React.useState<any[]>([]);

  React.useEffect(() => {
    fetchProducts().then(setDynamicProducts);
  }, []);

  return (
    <div className="bg-[#FFFCF7] text-[#51473C] overflow-hidden">
      
      {/* 1. HERO SECTION - LIGHT LUXURY AESTHETIC */}
      <section className="relative min-h-[85vh] md:min-h-[90vh] w-full bg-[#FFFCF7] flex items-center justify-center overflow-hidden border-b border-[#E9E1D5]">
        {/* Soft, warm ambient glow - strictly avoid dark layers */}
        <div 
          className="absolute inset-0 opacity-70 pointer-events-none" 
          style={{ 
            background: "radial-gradient(circle at 50% 35%, #F4E9D9 0%, #F8F1E8 45%, #FFFCF7 80%)" 
          }} 
        />
        
        {/* Delicate decorative geometric accents */}
        <div className="absolute top-12 left-1/2 -translate-x-1/2 flex items-center gap-3 opacity-60">
          <span className="w-12 h-px bg-[#B99B6B]"></span>
          <Sparkles size={14} className="text-[#B99B6B]" />
          <span className="w-12 h-px bg-[#B99B6B]"></span>
        </div>

        <div className="container mx-auto px-6 relative z-10 py-20 flex flex-col items-center justify-center text-center">
          <motion.div 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#FFFFFF] border border-[#E9E1D5] shadow-sm mb-8"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-[#B99B6B]"></span>
            <span className="text-[11px] tracking-[0.22em] text-[#817569] uppercase font-medium">
              Handcrafted Intention Jewelry
            </span>
          </motion.div>

          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.15 }}
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-serif font-light text-[#51473C] tracking-[0.06em] max-w-4xl mx-auto leading-[1.1] mb-6"
          >
            Crystals Designed Around Your Inner Intention
          </motion.h1>

          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.3 }}
            className="text-sm sm:text-base text-[#817569] max-w-xl mx-auto font-light leading-relaxed mb-10"
          >
            Fine natural gemstone bracelets thoughtfully selected to harmonize your energy, elevate your personal aesthetic, and ground your daily rituals.
          </motion.p>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.45 }}
            className="flex flex-col sm:flex-row gap-4 items-center justify-center"
          >
            <Link 
              href="/shop" 
              className="btn-primary min-w-[200px]"
            >
              Shop All Bracelets
            </Link>
            <Link 
              href="/quiz" 
              className="btn-secondary min-w-[200px]"
            >
              Find Your Crystal Quiz
            </Link>
          </motion.div>

          {/* Subtle Trust Indicators */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.2, delay: 0.6 }}
            className="mt-16 pt-8 border-t border-[#E9E1D5]/60 flex flex-wrap justify-center gap-6 sm:gap-12 text-xs text-[#817569] font-light"
          >
            <span className="flex items-center gap-2">
              <span className="text-[#B99B6B]">✦</span> Certified Natural Crystals
            </span>
            <span className="flex items-center gap-2">
              <span className="text-[#B99B6B]">✦</span> Vedic Cleansed & Charged
            </span>
            <span className="flex items-center gap-2">
              <span className="text-[#B99B6B]">✦</span> Discreet Luxury Packaging
            </span>
          </motion.div>
        </div>
      </section>

      {/* 2. TRUST STRIP - WARM CHAMPAGNE BACKGROUND (#F4E9D9) */}
      <section className="py-12 md:py-16 bg-[#F4E9D9] border-b border-[#E9E1D5]">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 md:gap-10">
            {trustFeatures.map((feature, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="flex flex-col items-center text-center p-4"
              >
                <div className="w-12 h-12 rounded-full bg-[#FFFFFF] border border-[#E9E1D5] flex items-center justify-center mb-4 shadow-sm">
                  <feature.icon className="w-5 h-5 text-[#B99B6B]" strokeWidth={1.5} />
                </div>
                <h3 className="text-xs tracking-[0.16em] font-semibold text-[#51473C] mb-1.5 uppercase">
                  {feature.title}
                </h3>
                <p className="text-xs text-[#817569] font-light leading-relaxed max-w-[200px]">
                  {feature.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. SHOP BY INTENTION - PRIMARY CANVAS (#FFFCF7) & PURE WHITE CARDS */}
      <section id="collections" className="py-20 md:py-28 bg-[#FFFCF7]">
        <div className="container mx-auto px-6 max-w-6xl">
          <div className="text-center mb-16">
            <span className="text-[11px] tracking-[0.25em] uppercase text-[#B99B6B] font-semibold block mb-2">
              Curated Gemstone Energy
            </span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif text-[#51473C] tracking-wide mb-4">
              Shop by Personal Intention
            </h2>
            <p className="text-sm text-[#817569] font-light max-w-md mx-auto leading-relaxed">
              Every stone holds a resonant vibrational quality. Select the daily anchor you wish to carry with you.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {intentions.map((intention, idx) => (
              <Link href={`/product?id=${intention.id}`} key={idx} className="group">
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.08 }}
                  className="card-luxury p-5 flex flex-col h-full bg-[#FFFFFF]"
                >
                  <div className="relative aspect-square mb-5 bg-[#F8F1E8] rounded-[2px] overflow-hidden border border-[#E9E1D5]/60">
                    <Image 
                      src={intention.image} 
                      alt={intention.name}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                    />
                    <div className="absolute top-3 left-3">
                      <span className={`text-[10px] tracking-widest uppercase px-2.5 py-1 rounded-[2px] font-semibold text-[#51473C] ${intention.accent} border border-black/5 shadow-xs`}>
                        {intention.stone}
                      </span>
                    </div>
                  </div>

                  <div className="flex flex-col flex-grow items-center text-center">
                    <h3 className="text-sm font-semibold tracking-[0.15em] uppercase text-[#51473C] mb-2 group-hover:text-[#B99B6B] transition-colors">
                      {intention.name}
                    </h3>
                    <span className="text-xs tracking-[0.18em] uppercase text-[#817569] group-hover:text-[#51473C] inline-flex items-center gap-1.5 transition-colors mt-auto pt-2">
                      Explore Stones <ArrowRight size={13} className="text-[#B99B6B] group-hover:translate-x-1 transition-transform" />
                    </span>
                  </div>
                </motion.div>
              </Link>
            ))}

            {/* Quiz Card as the 6th slot */}
            <Link href="/quiz" className="group">
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4 }}
                className="card-luxury p-8 flex flex-col justify-center items-center text-center h-full bg-[#F8F1E8] border border-[#E9E1D5]"
              >
                <div className="w-14 h-14 rounded-full bg-[#FFFFFF] border border-[#E9E1D5] flex items-center justify-center mb-6 shadow-sm">
                  <Sparkles size={24} className="text-[#B99B6B]" />
                </div>
                <span className="text-[10px] tracking-[0.2em] uppercase text-[#B99B6B] font-semibold mb-2">
                  Personalized Guidance
                </span>
                <h3 className="text-2xl font-serif text-[#51473C] mb-3">
                  Unsure Which Crystal Suits You?
                </h3>
                <p className="text-xs text-[#817569] font-light leading-relaxed mb-6 max-w-xs">
                  Answer 4 intuitive questions to reveal the gemstone that aligns with your current life chapter.
                </p>
                <span className="btn-secondary text-[11px] py-2.5 px-6">
                  Begin Free Quiz
                </span>
              </motion.div>
            </Link>
          </div>
        </div>
      </section>

      {/* 4. FEATURED BRACELETS - ALTERNATING WARM CHAMPAGNE (#F4E9D9) */}
      <section id="featured" className="py-20 md:py-28 bg-[#F4E9D9] border-y border-[#E9E1D5]">
        <div className="container mx-auto px-6 max-w-6xl">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-14 gap-4">
            <div>
              <span className="text-[11px] tracking-[0.25em] uppercase text-[#B99B6B] font-semibold block mb-2">
                Iconic Boutique Pieces
              </span>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif text-[#51473C]">
                Featured Intentions
              </h2>
            </div>
            <Link 
              href="/shop" 
              className="text-xs tracking-[0.18em] uppercase font-medium text-[#51473C] hover:text-[#B99B6B] transition-colors inline-flex items-center gap-2 border-b border-[#51473C]/20 hover:border-[#B99B6B] pb-1"
            >
              View All Bracelets <ArrowRight size={14} />
            </Link>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
            {dynamicProducts.slice(0, 4).map((product, idx) => (
              <motion.div 
                key={product.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
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
      </section>

      {/* 5. EDITORIAL QUOTE & QUIZ BANNER */}
      <section className="py-20 md:py-24 bg-[#F8F1E8] border-b border-[#E9E1D5] relative overflow-hidden">
        <div className="container mx-auto px-6 text-center max-w-3xl">
          <div className="flex justify-center gap-1.5 text-[#B99B6B] mb-6">
            {[1,2,3,4,5].map(i => <Star key={i} size={15} fill="currentColor" />)}
          </div>
          
          <h2 className="text-2xl md:text-4xl font-serif text-[#51473C] leading-snug tracking-wide mb-6">
            "A daily anchor for calm and mindful presence. Crafted for modern rituals, not just special occasions."
          </h2>

          <p className="text-xs tracking-[0.2em] uppercase text-[#817569] font-medium mb-8">
            — The Riya Tarot Crystals Philosophy
          </p>

          <Link href="/quiz" className="btn-primary">
            Explore Your Personal Stone
          </Link>
        </div>
      </section>

      {/* 6. SOCIAL PROOF / REVIEWS - PURE WHITE CARDS ON PEARL IVORY */}
      <section className="py-20 md:py-28 bg-[#FFFCF7]">
        <div className="container mx-auto px-6 max-w-6xl">
          <div className="text-center mb-16">
            <span className="text-[11px] tracking-[0.25em] uppercase text-[#B99B6B] font-semibold block mb-2">
              Client Experiences
            </span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif text-[#51473C]">
              Words from Our Collectors
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
            {[
              { 
                text: "The presentation alone feels genuinely luxurious. The stones have a cool, weighted feel and I wear my Dhan Yog bracelet every morning as a calm intention anchor.", 
                author: "S. K.", 
                city: "Mumbai" 
              },
              { 
                text: "Meticulously crafted. You can feel the intention that went into packing and preparing it. It came with beautiful documentation and felt like an heirloom gift.", 
                author: "A. M.", 
                city: "Bengaluru" 
              },
              { 
                text: "Minimal, elegant, and deeply grounding. It pairs effortlessly with my daily watch without feeling excessively spiritual. Exactly what I had been searching for.", 
                author: "R. P.", 
                city: "New Delhi" 
              }
            ].map((review, idx) => (
              <div key={idx} className="card-luxury p-8 text-center flex flex-col justify-between bg-[#FFFFFF]">
                <div>
                  <div className="flex justify-center gap-1 text-[#B99B6B] mb-5">
                    {[1,2,3,4,5].map(i => <Star key={i} size={14} fill="currentColor" />)}
                  </div>
                  <p className="text-sm font-light text-[#51473C] leading-relaxed mb-6 italic">
                    "{review.text}"
                  </p>
                </div>
                <div className="border-t border-[#E9E1D5] pt-4">
                  <p className="text-xs font-semibold tracking-widest uppercase text-[#51473C]">
                    {review.author}
                  </p>
                  <p className="text-[10px] text-[#817569] tracking-wider uppercase mt-0.5">
                    Verified Patron • {review.city}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

    </div>
  );
}
