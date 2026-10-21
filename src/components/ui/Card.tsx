import React from "react";

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "pearl" | "glass" | "bordered" | "goldHighlight";
  hoverable?: boolean;
}

export function Card({
  children,
  variant = "pearl",
  hoverable = true,
  className = "",
  ...props
}: CardProps) {
  const variantStyles = {
    pearl: "bg-white border border-[#EFE9E2] shadow-[0_6px_24px_-4px_rgba(43,27,61,0.05)]",
    glass: "glass-surface shadow-[0_10px_30px_-6px_rgba(43,27,61,0.06)]",
    bordered: "bg-white border-2 border-[#C9A24D]/30 shadow-xs",
    goldHighlight: "bg-gradient-to-b from-[#FFFDF9] to-white border border-[#C9A24D]/35 shadow-[0_8px_24px_-4px_rgba(201,162,77,0.12)]",
  };

  const hoverStyle = hoverable
    ? "transition-all duration-300 hover:shadow-[0_16px_36px_-8px_rgba(123,79,201,0.12)] hover:-translate-y-1 hover:border-[#C9A24D]/50"
    : "";

  return (
    <div
      className={`rounded-2xl md:rounded-3xl p-5 sm:p-6 relative overflow-hidden ${variantStyles[variant]} ${hoverStyle} ${className}`}
      {...props}
    >
      {children}
    </div>
  );
}
