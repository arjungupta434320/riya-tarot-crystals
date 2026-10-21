"use client";

import React from "react";
import { usePathname, useRouter } from "next/navigation";
import { Home, Sparkles, ShoppingBag, Compass, BookOpen } from "lucide-react";
import { useStore } from "@/store/useStore";

export default function MobileBottomNav() {
  const pathname = usePathname();
  const router = useRouter();
  const { cart, toggleCart, setDrawerTab } = useStore();

  const totalCartCount = cart.reduce((acc, item) => acc + item.quantity, 0);

  // If on checkout page, keep clean
  if (pathname === "/checkout") return null;

  return (
    <nav 
      aria-label="Mobile Navigation"
      className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-[#FFFFFF]/95 backdrop-blur-xl border-t border-[#EFE9E2] shadow-[0_-4px_25px_rgba(43,27,61,0.06)]"
      style={{ paddingBottom: "max(env(safe-area-inset-bottom, 0px), 8px)" }}
    >
      <div className="grid grid-cols-5 items-center px-1 py-1.5">
        
        {/* 1. Home */}
        <button
          type="button"
          onClick={() => router.push("/")}
          className={`flex flex-col items-center justify-center py-1 text-center touch-press cursor-pointer ${
            pathname === "/" ? "text-[#7B4FC9] font-semibold" : "text-[#635572]"
          }`}
        >
          <Home size={18} className={pathname === "/" ? "text-[#7B4FC9]" : "text-[#635572]"} />
          <span className="text-[10px] tracking-wider mt-0.5">
            Home
          </span>
        </button>

        {/* 2. Shop Catalog */}
        <button
          type="button"
          onClick={() => router.push("/shop")}
          className={`flex flex-col items-center justify-center py-1 text-center touch-press cursor-pointer ${
            pathname === "/shop" ? "text-[#7B4FC9] font-semibold" : "text-[#635572]"
          }`}
        >
          <Compass size={18} className={pathname === "/shop" ? "text-[#7B4FC9]" : "text-[#635572]"} />
          <span className="text-[10px] tracking-wider mt-0.5">
            Shop
          </span>
        </button>

        {/* 3. Quiz */}
        <button
          type="button"
          onClick={() => router.push("/quiz")}
          className="flex flex-col items-center justify-center py-1 text-center touch-press relative group cursor-pointer"
        >
          <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-[#F5F0FD] to-[#FDF2F4] border border-[#7B4FC9]/40 flex items-center justify-center shadow-xs -mt-2">
            <Sparkles size={16} className="text-[#7B4FC9]" />
          </div>
          <span className="text-[10px] tracking-wider font-semibold text-[#7B4FC9] mt-0.5">
            Quiz
          </span>
        </button>

        {/* 4. Journal / Blog */}
        <button
          type="button"
          onClick={() => router.push("/blog")}
          className={`flex flex-col items-center justify-center py-1 text-center touch-press cursor-pointer ${
            pathname.startsWith("/blog") ? "text-[#7B4FC9] font-semibold" : "text-[#635572]"
          }`}
        >
          <BookOpen size={18} className={pathname.startsWith("/blog") ? "text-[#7B4FC9]" : "text-[#635572]"} />
          <span className="text-[10px] tracking-wider mt-0.5">
            Journal
          </span>
        </button>

        {/* 5. Cart */}
        <button
          type="button"
          onClick={() => {
            setDrawerTab("cart");
            toggleCart();
          }}
          className="flex flex-col items-center justify-center py-1 text-center touch-press text-[#635572] relative cursor-pointer"
        >
          <div className="relative">
            <ShoppingBag size={18} className="text-[#635572]" />
            {totalCartCount > 0 && (
              <span className="absolute -top-1 -right-2.5 w-4 h-4 rounded-full bg-[#7B4FC9] text-white text-[9px] font-bold flex items-center justify-center shadow-xs">
                {totalCartCount}
              </span>
            )}
          </div>
          <span className="text-[10px] tracking-wider font-normal mt-0.5">
            Bag
          </span>
        </button>

      </div>
    </nav>
  );
}
