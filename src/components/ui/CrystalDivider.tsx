import React from "react";

export interface CrystalDividerProps {
  className?: string;
}

export function CrystalDivider({ className = "" }: CrystalDividerProps) {
  return (
    <div className={`relative flex items-center justify-center my-8 md:my-14 ${className}`} aria-hidden="true">
      {/* Left Hairline */}
      <div className="flex-grow h-px bg-gradient-to-r from-transparent via-[#C9A24D]/35 to-[#C9A24D]/60" />

      {/* Center Crystal Gem Motif */}
      <div className="mx-4 flex items-center gap-1.5 text-[#C9A24D]">
        <span className="w-1.5 h-1.5 rotate-45 bg-[#C9A24D]/60" />
        <svg
          className="w-5 h-5 text-[#C9A24D] animate-pulse"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.6"
        >
          <polygon points="12 2 22 8.5 22 15.5 12 22 2 15.5 2 8.5 12 2" />
          <line x1="12" y1="22" x2="12" y2="15.5" />
          <polyline points="22 8.5 12 15.5 2 8.5" />
          <polyline points="2 15.5 12 8.5 22 15.5" />
          <line x1="12" y1="2" x2="12" y2="8.5" />
        </svg>
        <span className="w-1.5 h-1.5 rotate-45 bg-[#C9A24D]/60" />
      </div>

      {/* Right Hairline */}
      <div className="flex-grow h-px bg-gradient-to-l from-transparent via-[#C9A24D]/35 to-[#C9A24D]/60" />
    </div>
  );
}
