"use client";

import React, { useEffect, useState } from "react";
import { motion, useSpring, useMotionValue } from "framer-motion";

export function CustomCursor() {
  const [isVisible, setIsVisible] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isGemHovered, setIsGemHovered] = useState(false);

  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  const springConfig = { damping: 28, stiffness: 350, mass: 0.5 };
  const smoothX = useSpring(cursorX, springConfig);
  const smoothY = useSpring(cursorY, springConfig);

  useEffect(() => {
    // Only run on desktop/devices with fine pointer & without prefers-reduced-motion
    if (
      window.matchMedia("(pointer: coarse)").matches ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      return;
    }

    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
      if (!isVisible) setIsVisible(true);
    };

    const handleMouseLeave = () => setIsVisible(false);
    const handleMouseEnter = () => setIsVisible(true);

    const handlePointerOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      if (!target) return;

      const interactive = target.closest("button, a, input, select, textarea, [role='button']");
      const productElement = target.closest("[data-cursor='gem'], .product-card-target");

      setIsHovered(!!interactive);
      setIsGemHovered(!!productElement);
    };

    window.addEventListener("mousemove", moveCursor);
    document.addEventListener("mouseleave", handleMouseLeave);
    document.addEventListener("mouseenter", handleMouseEnter);
    document.addEventListener("mouseover", handlePointerOver);

    return () => {
      window.removeEventListener("mousemove", moveCursor);
      document.removeEventListener("mouseleave", handleMouseLeave);
      document.removeEventListener("mouseenter", handleMouseEnter);
      document.removeEventListener("mouseover", handlePointerOver);
    };
  }, [cursorX, cursorY, isVisible]);

  if (!isVisible) return null;

  return (
    <motion.div
      aria-hidden="true"
      style={{
        x: smoothX,
        y: smoothY,
        translateX: "-50%",
        translateY: "-50%",
      }}
      className="fixed top-0 left-0 pointer-events-none z-[99999] hidden md:flex items-center justify-center"
    >
      {/* Outer Ethereal Ring */}
      <motion.div
        animate={{
          scale: isGemHovered ? 2.2 : isHovered ? 1.6 : 1,
          borderColor: isGemHovered ? "rgba(123, 79, 201, 0.8)" : "rgba(201, 162, 77, 0.7)",
          backgroundColor: isGemHovered
            ? "rgba(123, 79, 201, 0.12)"
            : isHovered
            ? "rgba(201, 162, 77, 0.10)"
            : "transparent",
        }}
        transition={{ type: "spring", damping: 20, stiffness: 300 }}
        className="w-8 h-8 rounded-full border border-[#C9A24D]/60 flex items-center justify-center shadow-[0_0_15px_rgba(201,162,77,0.3)] backdrop-blur-[0.5px]"
      >
        {/* Inner Gem Icon on Product hover */}
        {isGemHovered ? (
          <motion.div
            initial={{ scale: 0, rotate: -45 }}
            animate={{ scale: 1, rotate: 0 }}
            exit={{ scale: 0 }}
            className="w-3.5 h-3.5 text-[#7B4FC9]"
          >
            <svg viewBox="0 0 24 24" fill="currentColor">
              <polygon points="12 2 22 8.5 22 15.5 12 22 2 15.5 2 8.5 12 2" />
            </svg>
          </motion.div>
        ) : (
          /* Center dot */
          <motion.div
            animate={{
              scale: isHovered ? 0.4 : 1,
              backgroundColor: isHovered ? "#7B4FC9" : "#C9A24D",
            }}
            className="w-1.5 h-1.5 rounded-full bg-[#C9A24D]"
          />
        )}
      </motion.div>
    </motion.div>
  );
}
