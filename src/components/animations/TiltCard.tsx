"use client";

import React, { useRef, useState } from "react";
import { motion, useSpring } from "framer-motion";

export interface TiltCardProps {
  children: React.ReactNode;
  className?: string;
  maxTilt?: number;
  showHolographicSheen?: boolean;
}

export function TiltCard({
  children,
  className = "",
  maxTilt = 7,
  showHolographicSheen = true,
}: TiltCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [sheenPosition, setSheenPosition] = useState({ x: 50, y: 50, opacity: 0 });

  const rotateX = useSpring(0, { damping: 20, stiffness: 200 });
  const rotateY = useSpring(0, { damping: 20, stiffness: 200 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const tiltX = ((y - centerY) / centerY) * -maxTilt;
    const tiltY = ((x - centerX) / centerX) * maxTilt;

    rotateX.set(tiltX);
    rotateY.set(tiltY);

    if (showHolographicSheen) {
      const pctX = (x / rect.width) * 100;
      const pctY = (y / rect.height) * 100;
      setSheenPosition({ x: pctX, y: pctY, opacity: 0.16 });
    }
  };

  const handleMouseLeave = () => {
    rotateX.set(0);
    rotateY.set(0);
    setSheenPosition((prev) => ({ ...prev, opacity: 0 }));
  };

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
      }}
      className={`relative transition-shadow duration-300 ${className}`}
    >
      {children}

      {/* Holographic / Iridescent Sheen Layer */}
      {showHolographicSheen && (
        <div
          aria-hidden="true"
          style={{
            background: `radial-gradient(circle at ${sheenPosition.x}% ${sheenPosition.y}%, rgba(205, 185, 245, 0.45) 0%, rgba(244, 198, 208, 0.3) 30%, rgba(201, 162, 77, 0.25) 60%, transparent 80%)`,
            opacity: sheenPosition.opacity,
            transition: "opacity 0.25s ease",
          }}
          className="pointer-events-none absolute inset-0 z-20 rounded-[inherit] mix-blend-overlay"
        />
      )}
    </motion.div>
  );
}
