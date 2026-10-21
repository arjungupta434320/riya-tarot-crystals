"use client";

import React, { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";

export interface DrawerProps {
  isOpen: boolean;
  onClose: () => void;
  title?: React.ReactNode;
  children: React.ReactNode;
  side?: "right" | "left" | "bottom";
  className?: string;
}

export function Drawer({
  isOpen,
  onClose,
  title,
  children,
  side = "right",
  className = "",
}: DrawerProps) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };
    if (isOpen) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  const variants = {
    right: {
      initial: { x: "100%" },
      animate: { x: 0 },
      exit: { x: "100%" },
      container: "top-0 right-0 h-full w-full max-w-md",
    },
    left: {
      initial: { x: "-100%" },
      animate: { x: 0 },
      exit: { x: "-100%" },
      container: "top-0 left-0 h-full w-full max-w-md",
    },
    bottom: {
      initial: { y: "100%" },
      animate: { y: 0 },
      exit: { y: "100%" },
      container: "bottom-0 left-0 w-full max-h-[88vh] rounded-t-3xl",
    },
  }[side];

  return (
    <AnimatePresence>
      {isOpen && (
        <div
          className="fixed inset-0 z-50 overflow-hidden"
          role="dialog"
          aria-modal="true"
        >
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={onClose}
            className="fixed inset-0 bg-[#2B1B3D]/50 backdrop-blur-xs transition-opacity"
          />

          {/* Drawer Panel */}
          <motion.div
            initial={variants.initial}
            animate={variants.animate}
            exit={variants.exit}
            transition={{ type: "spring", damping: 28, stiffness: 300 }}
            className={`fixed ${variants.container} bg-white shadow-[0_0_50px_rgba(43,27,61,0.25)] border-l border-[#C9A24D]/25 flex flex-col z-10 ${className}`}
          >
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-[#EFE9E2] bg-[#FAF8F3]/70">
              <div className="font-serif text-lg font-medium text-[#2B1B3D]">
                {title}
              </div>
              <button
                onClick={onClose}
                aria-label="Close drawer"
                className="p-2 rounded-full text-[#635572] hover:text-[#2B1B3D] hover:bg-[#EFE9E2] transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Scrollable Body */}
            <div className="flex-1 overflow-y-auto p-6 no-scrollbar">
              {children}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
