"use client";

import React from "react";
import { useStore } from "@/store/useStore";
import { CheckCircle2, Sparkles, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function ToastNotifier() {
  const { toast, hideToast } = useStore();

  return (
    <div className="fixed top-20 right-4 sm:right-6 z-[100] pointer-events-none flex flex-col gap-2 max-w-sm w-full">
      <AnimatePresence>
        {toast && (
          <motion.div
            key={toast.id}
            initial={{ opacity: 0, y: -20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -15, scale: 0.95 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="pointer-events-auto p-3.5 sm:p-4 rounded-2xl bg-white/95 backdrop-blur-md border border-[#D4AF37]/50 shadow-[0_10px_25px_-5px_rgba(212,175,55,0.25)] flex items-center justify-between gap-3 text-xs text-[#2C2A29]"
          >
            <div className="flex items-center gap-2.5">
              <div className="w-7 h-7 rounded-full bg-[#FAF9F6] border border-[#D4AF37]/40 flex items-center justify-center text-[#D4AF37] flex-shrink-0">
                <Sparkles size={14} />
              </div>
              <span className="font-medium text-[11px] sm:text-xs leading-snug">
                {toast.message}
              </span>
            </div>
            <button
              onClick={hideToast}
              className="text-[#6E6A64] hover:text-[#2C2A29] p-1 flex-shrink-0 transition-colors"
              aria-label="Close notification"
            >
              <X size={14} />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
