import React from "react";
import { Sparkles } from "lucide-react";

export interface SectionHeadingProps {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  align?: "left" | "center" | "right";
  className?: string;
}

export function SectionHeading({
  eyebrow,
  title,
  subtitle,
  align = "center",
  className = "",
}: SectionHeadingProps) {
  const alignClass = {
    left: "text-left items-start",
    center: "text-center items-center mx-auto",
    right: "text-right items-end ml-auto",
  }[align];

  return (
    <div className={`flex flex-col max-w-3xl mb-8 md:mb-12 ${alignClass} ${className}`}>
      {eyebrow && (
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#F7EFE2] text-[#8E6D24] text-xs font-semibold tracking-widest uppercase mb-3 border border-[#C9A24D]/30 shadow-2xs">
          <Sparkles className="w-3 h-3 text-[#C9A24D]" />
          <span>{eyebrow}</span>
        </div>
      )}
      <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-serif text-[#2B1B3D] tracking-tight leading-[1.18]">
        {title}
      </h2>
      {subtitle && (
        <p className="mt-3 sm:mt-4 text-sm sm:text-base md:text-lg text-[#635572] leading-relaxed max-w-2xl font-sans">
          {subtitle}
        </p>
      )}
    </div>
  );
}
