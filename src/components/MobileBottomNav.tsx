"use client";

import React from "react";
import { usePathname, useRouter } from "next/navigation";
import { Home, Sparkles, ShoppingBag, Heart, Compass } from "lucide-react";
import { useStore } from "@/store/useStore";

export default function MobileBottomNav() {
  const pathname = usePathname();
  const router = useRouter();
  const { cart, wishlist, toggleCart, setDrawerTab, openQuizModal } = useStore();

  const totalCartCount = cart.reduce((acc, item) => acc + item.quantity, 0);

  // If cart has items, the dedicated StickyMobileCartBar takes over!
  if (totalCartCount > 0) return null;

  const handleNavClick = (sectionId: string, fallbackPath: string) => {
    if (pathname === "/") {
      const el = document.getElementById(sectionId);
      if (el) {
        el.scrollIntoView({ behavior: "smooth" });
        return;
      }
    }
    router.push(fallbackPath);
  };

  return (
    <nav 
      aria-label="Mobile Navigation"
      className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-[#FFFFFF]/95 backdrop-blur-xl border-t border-[#EAE5DF] shadow-[0_-4px_25px_rgba(212,175,55,0.08)]"
      style={{ paddingBottom: "max(env(safe-area-inset-bottom, 0px), 8px)" }}
    >
      <div className="grid grid-cols-4 items-center px-2 py-1.5">
        
        {/* 1. Home */}
        <button
          type="button"
          onClick={() => {
            if (pathname === "/") {
              window.scrollTo({ top: 0, behavior: "smooth" });
            } else {
              router.push("/");
            }
          }}
          className={`flex flex-col items-center justify-center py-1 text-center touch-press cursor-pointer ${
            pathname === "/" ? "text-[#2C2A29]" : "text-[#6E6A64]"
          }`}
        >
          <Home size={18} className={pathname === "/" ? "text-[#D4AF37]" : "text-[#6E6A64]"} />
          <span className={`text-[10px] tracking-wider mt-0.5 ${pathname === "/" ? "font-bold text-[#2C2A29]" : "font-normal"}`}>
            Home
          </span>
        </button>

        {/* 2. Collections / Marketplace */}
        <button
          type="button"
          onClick={() => handleNavClick("marketplace", "/#marketplace")}
          className="flex flex-col items-center justify-center py-1 text-center touch-press text-[#6E6A64] cursor-pointer"
        >
          <Compass size={18} className="text-[#6E6A64]" />
          <span className="text-[10px] tracking-wider font-normal mt-0.5">
            Crystals
          </span>
        </button>

        {/* 3. 60-Sec Quiz */}
        <button
          type="button"
          onClick={openQuizModal}
          className="flex flex-col items-center justify-center py-1 text-center touch-press relative group cursor-pointer"
        >
          <div className="w-8 h-8 rounded-full bg-[#F8F4EC] border border-[#D4AF37]/50 flex items-center justify-center shadow-xs -mt-2">
            <Sparkles size={16} className="text-[#D4AF37]" />
          </div>
          <span className="text-[10px] tracking-wider font-semibold text-[#9A7B2C] mt-0.5">
            Quiz ✨
          </span>
        </button>

        {/* 4. Wishlist */}
        <button
          type="button"
          onClick={() => {
            setDrawerTab("wishlist");
            toggleCart();
          }}
          className="flex flex-col items-center justify-center py-1 text-center touch-press text-[#6E6A64] relative cursor-pointer"
        >
          <div className="relative">
            <Heart size={18} className="text-[#6E6A64]" />
            {wishlist.length > 0 && (
              <span className="absolute -top-1.5 -right-2.5 w-4 h-4 rounded-full bg-[#F4E1D2] text-[#9A7B2C] border border-[#D4AF37]/40 text-[9px] font-bold flex items-center justify-center">
                {wishlist.length}
              </span>
            )}
          </div>
          <span className="text-[10px] tracking-wider font-normal mt-0.5">
            Saved
          </span>
        </button>

      </div>
    </nav>
  );
}
