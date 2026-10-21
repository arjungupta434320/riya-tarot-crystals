"use client";

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence, type Variants } from "framer-motion";
import { Sparkles } from "lucide-react";

export function Preloader() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if previously loaded in this session to maintain silky fast UX
    const hasLoaded = sessionStorage.getItem("riya_preloader_seen");
    if (hasLoaded) {
      setLoading(false);
      return;
    }

    const timer = setTimeout(() => {
      setLoading(false);
      sessionStorage.setItem("riya_preloader_seen", "true");
    }, 1400);

    return () => clearTimeout(timer);
  }, []);

  const shardVariants: Variants = {
    initial: (i: number) => ({
      x: (i % 2 === 0 ? 1 : -1) * (50 + i * 15),
      y: (i < 3 ? -1 : 1) * (40 + i * 12),
      opacity: 0,
      scale: 0.2,
      rotate: i * 45,
    }),
    assembled: {
      x: 0,
      y: 0,
      opacity: 1,
      scale: 1,
      rotate: 0,
      transition: {
        type: "spring",
        damping: 18,
        stiffness: 120,
        delay: 0.1,
      },
    },
    exit: {
      scale: 2.2,
      opacity: 0,
      filter: "blur(12px)",
      transition: { duration: 0.45, ease: "easeInOut" },
    },
  };

  return (
    <AnimatePresence>
      {loading && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
          className="fixed inset-0 z-[100000] flex flex-col items-center justify-center bg-[#FBF8F3] overflow-hidden"
        >
          {/* Ambient Glow */}
          <div className="absolute w-72 h-72 rounded-full bg-gradient-to-tr from-[#CDB9F5]/40 via-[#F4C6D0]/30 to-[#C9A24D]/25 blur-3xl animate-pulse" />

          {/* Assembling Crystal Shards Container */}
          <div className="relative w-28 h-28 flex items-center justify-center">
            {[0, 1, 2, 3, 4, 5].map((i) => (
              <motion.div
                key={i}
                custom={i}
                variants={shardVariants}
                initial="initial"
                animate="assembled"
                exit="exit"
                className="absolute inset-0 flex items-center justify-center"
              >
                <svg
                  className="w-16 h-16 text-[#7B4FC9] drop-shadow-[0_4px_16px_rgba(123,79,201,0.4)]"
                  viewBox="0 0 24 24"
                  fill="url(#crystalGrad)"
                  stroke="#C9A24D"
                  strokeWidth="0.8"
                >
                  <defs>
                    <linearGradient id="crystalGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#CDB9F5" stopOpacity="0.85" />
                      <stop offset="50%" stopColor="#7B4FC9" stopOpacity="0.95" />
                      <stop offset="100%" stopColor="#5E37A1" stopOpacity="0.9" />
                    </linearGradient>
                  </defs>
                  <polygon points="12 2 22 8.5 22 15.5 12 22 2 15.5 2 8.5 12 2" />
                </svg>
              </motion.div>
            ))}

            {/* Central Light Burst */}
            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: [0, 1.4, 1], opacity: [0, 0.9, 0.7] }}
              transition={{ delay: 0.4, duration: 0.6 }}
              className="absolute w-12 h-12 rounded-full bg-gradient-to-r from-[#FFFDF9] to-[#C9A24D]/60 blur-xs"
            />
          </div>

          {/* Brand Typography Reveal */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35, duration: 0.5 }}
            className="mt-6 text-center z-10"
          >
            <h1 className="font-serif text-xl sm:text-2xl tracking-[0.2em] uppercase text-[#2B1B3D] font-medium">
              Riya Tarot Crystals
            </h1>
            <p className="mt-1.5 text-xs tracking-widest text-[#8E6D24] uppercase flex items-center justify-center gap-1.5">
              <Sparkles className="w-3 h-3 text-[#C9A24D]" />
              <span>Awakening Divine Energies</span>
              <Sparkles className="w-3 h-3 text-[#C9A24D]" />
            </p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
