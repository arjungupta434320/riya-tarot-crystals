"use client";

import React from "react";
import { useStore } from "@/store/useStore";
import { ShoppingBag, ArrowRight, Sparkles } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function StickyMobileCartBar() {
  const { cart, toggleCart, appliedCoupon } = useStore();

  const totalQuantity = cart.reduce((sum, item) => sum + item.quantity, 0);
  const rawSubtotal = cart.reduce(
    (sum, item) => sum + (item.salePrice || item.price) * item.quantity,
    0
  );

  // Automatic tiered discount (15% when 2 or more items)
  const isTieredQualified = totalQuantity >= 2;
  const tieredDiscount = isTieredQualified ? Math.round(rawSubtotal * 0.15) : 0;

  // Coupon discount
  let couponDiscount = 0;
  if (appliedCoupon === "RIYA10") couponDiscount = Math.round(rawSubtotal * 0.10);
  else if (appliedCoupon === "LUXURY15" || appliedCoupon === "RIYA15") couponDiscount = Math.round(rawSubtotal * 0.15);
  else if (appliedCoupon === "KUNDALI20") couponDiscount = Math.round(rawSubtotal * 0.20);

  const totalSavings = tieredDiscount + couponDiscount;
  const finalSubtotal = Math.max(0, rawSubtotal - totalSavings);

  if (totalQuantity === 0) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 100, opacity: 0 }}
        transition={{ type: "spring", stiffness: 350, damping: 30 }}
        className="md:hidden fixed bottom-0 left-0 right-0 z-[55] bg-[#FFFFFF]/95 backdrop-blur-xl border-t border-[#D4AF37]/40 shadow-[0_-8px_30px_rgba(212,175,55,0.22)] px-4 py-3"
        style={{ paddingBottom: "max(env(safe-area-inset-bottom, 0px), 12px)" }}
      >
        <div className="flex items-center justify-between gap-3">
          {/* Left: Item Count & Live Subtotal & Savings Badge */}
          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-1.5">
              <span className="text-[11px] font-semibold text-[#6E6A64] uppercase tracking-wider">
                {totalQuantity} {totalQuantity === 1 ? "Item" : "Items"}
              </span>
              {totalSavings > 0 && (
                <span className="px-1.5 py-0.5 rounded-full text-[9px] font-bold bg-[#F4E1D2] text-[#9A7B2C] border border-[#D4AF37]/30 flex items-center gap-0.5">
                  <Sparkles size={9} />
                  Save ₹{totalSavings}
                </span>
              )}
            </div>

            <div className="flex items-baseline gap-1.5 mt-0.5">
              <span className="text-base font-bold text-[#2C2A29]">
                ₹{finalSubtotal.toLocaleString("en-IN")}
              </span>
              {totalSavings > 0 && (
                <span className="text-xs text-[#6E6A64] line-through">
                  ₹{rawSubtotal.toLocaleString("en-IN")}
                </span>
              )}
            </div>
          </div>

          {/* Right: Instant View Cart / Checkout Button */}
          <button
            onClick={toggleCart}
            className="px-5 py-3 rounded-full text-xs font-semibold tracking-wider uppercase text-[#2C2A29] btn-gold-shimmer flex items-center gap-2 flex-shrink-0 cursor-pointer shadow-md"
          >
            <ShoppingBag size={14} className="text-[#2C2A29]" />
            <span>View Cart</span>
            <ArrowRight size={13} />
          </button>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
