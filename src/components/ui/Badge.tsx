import React from "react";
import { Sparkles, ShieldCheck, Flame, Star, Heart } from "lucide-react";

export interface BadgeProps {
  children: React.ReactNode;
  variant?: "amethyst" | "gold" | "rose" | "lavender" | "emerald" | "outline";
  size?: "xs" | "sm" | "md";
  icon?: "sparkles" | "shield" | "flame" | "star" | "heart" | "none";
  className?: string;
}

export function Badge({
  children,
  variant = "gold",
  size = "sm",
  icon = "none",
  className = "",
}: BadgeProps) {
  const sizeStyles = {
    xs: "px-2 py-0.5 text-[10px] gap-1",
    sm: "px-2.5 py-1 text-xs gap-1.5",
    md: "px-3.5 py-1.5 text-xs font-medium gap-2",
  };

  const variantStyles = {
    gold: "bg-[#F7EFE2] text-[#8E6D24] border border-[#C9A24D]/35 shadow-xs",
    amethyst: "bg-[#F5F0FD] text-[#663BB2] border border-[#7B4FC9]/30 shadow-xs",
    rose: "bg-[#FDF2F4] text-[#B83D60] border border-[#F4C6D0] shadow-xs",
    lavender: "bg-[#F3EBF9] text-[#5E37A1] border border-[#CDB9F5] shadow-xs",
    emerald: "bg-[#EDF7ED] text-[#2E7D32] border border-[#A5D6A7] shadow-xs",
    outline: "bg-white/80 backdrop-blur-xs text-[#2B1B3D] border border-[#C9A24D]/30",
  };

  const renderIcon = () => {
    switch (icon) {
      case "sparkles":
        return <Sparkles className="w-3 h-3 text-current" />;
      case "shield":
        return <ShieldCheck className="w-3 h-3 text-current" />;
      case "flame":
        return <Flame className="w-3 h-3 text-current" />;
      case "star":
        return <Star className="w-3 h-3 fill-current text-current" />;
      case "heart":
        return <Heart className="w-3 h-3 fill-current text-current" />;
      default:
        return null;
    }
  };

  return (
    <span
      className={`inline-flex items-center font-medium rounded-full uppercase tracking-wider ${sizeStyles[size]} ${variantStyles[variant]} ${className}`}
    >
      {renderIcon()}
      <span>{children}</span>
    </span>
  );
}
