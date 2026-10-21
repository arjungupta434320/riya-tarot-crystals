"use client";

import { useState, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { blogPosts, BlogPost } from "@/data/blogPosts";
import { 
  Sparkles, 
  Search, 
  Clock, 
  BookOpen, 
  ArrowRight, 
  ChevronRight,
  ShieldCheck,
  Calendar
} from "lucide-react";

const categories = [
  "All Articles",
  "Crystal Encyclopedia",
  "Chakras",
  "Healing Guides",
  "Cleansing & Charging",
  "Beginner Guides",
];

export default function BlogIndexPage() {
  const [selectedCategory, setSelectedCategory] = useState("All Articles");
  const [searchQuery, setSearchQuery] = useState("");

  const featuredPost = blogPosts[0];

  const filteredPosts = useMemo(() => {
    return blogPosts.filter((post) => {
      const matchesCategory =
        selectedCategory === "All Articles" || post.category === selectedCategory;
      const q = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !q ||
        post.title.toLowerCase().includes(q) ||
        post.excerpt.toLowerCase().includes(q) ||
        post.category.toLowerCase().includes(q);
      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, searchQuery]);

  return (
    <div className="min-h-screen py-8 sm:py-14 bg-[#FBF8F3] text-[#2B1B3D]">
      <div className="container mx-auto px-4 sm:px-6 max-w-6xl">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-14">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#F5F0FD] text-[#7B4FC9] text-xs font-bold uppercase tracking-widest mb-3 border border-[#7B4FC9]/25">
            <Sparkles size={13} className="text-[#C9A24D]" />
            <span>The Crystal Journal & Encyclopedia</span>
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-serif text-[#2B1B3D] font-bold tracking-tight mb-3">
            Sacred Crystal Library
          </h1>
          <p className="text-xs sm:text-sm text-[#635572] leading-relaxed max-w-xl mx-auto">
            Explore authentic Vedic wisdom, gemstone science, chakra alignments, and practical ritual guides written by Tarot Reader & Crystal Alchemist Riya.
          </p>
        </div>

        {/* Featured Post Card */}
        {selectedCategory === "All Articles" && !searchQuery && featuredPost && (
          <div className="mb-14">
            <Link
              href={`/blog/${featuredPost.slug}`}
              className="group block rounded-3xl bg-white border border-[#EFE9E2] hover:border-[#C9A24D]/50 overflow-hidden shadow-xs hover:shadow-xl transition-all duration-300"
            >
              <div className="flex flex-col lg:flex-row">
                <div className="relative aspect-[16/10] lg:w-1/2 w-full bg-[#FAF8F3] overflow-hidden">
                  <Image
                    src={featuredPost.coverImage}
                    alt={featuredPost.title}
                    fill
                    priority
                    className="object-cover group-hover:scale-105 transition-transform duration-700"
                    sizes="(max-width: 1024px) 100vw, 50vw"
                  />
                  <div className="absolute top-4 left-4 z-10">
                    <span className="px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-white/95 backdrop-blur-md text-[#7B4FC9] border border-[#7B4FC9]/30 shadow-xs">
                      ★ Featured Master Guide
                    </span>
                  </div>
                </div>

                <div className="lg:w-1/2 p-6 sm:p-10 flex flex-col justify-between space-y-4">
                  <div className="space-y-3">
                    <div className="flex items-center gap-3 text-xs text-[#635572]">
                      <span className="text-[#8E6D24] font-bold uppercase tracking-wider text-[11px]">
                        {featuredPost.category}
                      </span>
                      <span>•</span>
                      <span className="flex items-center gap-1">
                        <Clock size={13} />
                        <span>{featuredPost.readTime}</span>
                      </span>
                    </div>

                    <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#2B1B3D] group-hover:text-[#7B4FC9] transition-colors leading-tight">
                      {featuredPost.title}
                    </h2>

                    <p className="text-xs sm:text-sm text-[#635572] leading-relaxed line-clamp-3">
                      {featuredPost.excerpt}
                    </p>
                  </div>

                  <div className="flex items-center justify-between pt-4 border-t border-[#EFE9E2]">
                    <div className="flex items-center gap-2.5">
                      <div className="w-8 h-8 rounded-full bg-[#F5F0FD] border border-[#7B4FC9]/40 flex items-center justify-center text-[#7B4FC9]">
                        <Sparkles size={14} />
                      </div>
                      <span className="text-xs font-semibold text-[#2B1B3D]">
                        {featuredPost.author.name}
                      </span>
                    </div>

                    <span className="inline-flex items-center gap-1.5 text-xs font-bold text-[#7B4FC9] group-hover:translate-x-1 transition-transform">
                      <span>Read Guide</span>
                      <ArrowRight size={14} />
                    </span>
                  </div>
                </div>
              </div>
            </Link>
          </div>
        )}

        {/* Category Filter Chips & Search Bar */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-8">
          {/* Category Chips */}
          <div className="flex gap-2 overflow-x-auto pb-2 w-full md:w-auto no-scrollbar -mx-4 px-4 sm:mx-0 sm:px-0">
            {categories.map((cat) => {
              const isSelected = selectedCategory === cat;
              return (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-4 py-2 rounded-full text-xs font-semibold whitespace-nowrap transition-all border cursor-pointer touch-press ${
                    isSelected
                      ? "bg-[#7B4FC9] text-white border-[#7B4FC9] shadow-xs"
                      : "bg-white text-[#635572] border-[#EFE9E2] hover:border-[#C9A24D]/40"
                  }`}
                >
                  {cat}
                </button>
              );
            })}
          </div>

          {/* Search Box */}
          <div className="relative w-full md:w-72">
            <Search size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#635572]" />
            <input
              type="text"
              placeholder="Search crystal guides..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-3 py-2 text-xs rounded-full bg-white border border-[#EFE9E2] text-[#2B1B3D] focus:outline-none focus:border-[#C9A24D]"
            />
          </div>
        </div>

        {/* Articles Grid */}
        {filteredPosts.length === 0 ? (
          <div className="py-20 text-center text-[#635572] space-y-3 bg-white rounded-3xl border border-[#EFE9E2]">
            <BookOpen size={36} className="mx-auto text-[#C9A24D]" />
            <h3 className="font-serif text-lg text-[#2B1B3D]">No crystal articles found</h3>
            <p className="text-xs">Try searching for another keyword or selecting "All Articles".</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {filteredPosts.map((post) => (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                className="group rounded-3xl bg-white border border-[#EFE9E2] hover:border-[#C9A24D]/50 overflow-hidden shadow-2xs hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  <div className="relative aspect-[16/10] w-full bg-[#FAF8F3] overflow-hidden">
                    <Image
                      src={post.coverImage}
                      alt={post.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-700"
                      sizes="(max-width: 768px) 100vw, 33vw"
                    />
                    <div className="absolute top-3 left-3">
                      <span className="px-2.5 py-0.5 rounded-full text-[9px] font-bold uppercase tracking-wider bg-white/95 backdrop-blur-md text-[#8E6D24] border border-[#C9A24D]/40 shadow-xs">
                        {post.category}
                      </span>
                    </div>
                  </div>

                  <div className="p-5 sm:p-6 space-y-2.5">
                    <div className="flex items-center gap-2 text-[11px] text-[#635572]">
                      <Calendar size={12} />
                      <span>{post.publishDate}</span>
                      <span>•</span>
                      <Clock size={12} />
                      <span>{post.readTime}</span>
                    </div>

                    <h3 className="font-serif text-lg font-bold text-[#2B1B3D] group-hover:text-[#7B4FC9] transition-colors leading-snug line-clamp-2">
                      {post.title}
                    </h3>

                    <p className="text-xs text-[#635572] leading-relaxed line-clamp-3">
                      {post.excerpt}
                    </p>
                  </div>
                </div>

                <div className="px-5 sm:px-6 pb-5 pt-3 border-t border-[#EFE9E2] flex items-center justify-between text-xs">
                  <span className="font-semibold text-[#635572]">
                    By {post.author.name}
                  </span>
                  <span className="font-bold text-[#7B4FC9] group-hover:translate-x-1 transition-transform inline-flex items-center gap-1">
                    <span>Read Article</span>
                    <ArrowRight size={13} />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        )}

      </div>
    </div>
  );
}
