"use client";

import React from "react";
import { Loader2 } from "lucide-react";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "amethyst" | "gold" | "pearl" | "outline" | "ghost";
  size?: "sm" | "md" | "lg";
  isLoading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      children,
      className = "",
      variant = "amethyst",
      size = "md",
      isLoading = false,
      leftIcon,
      rightIcon,
      disabled,
      ...props
    },
    ref
  ) => {
    const sizeClasses = {
      sm: "px-3.5 py-1.5 text-xs font-medium tracking-wide",
      md: "px-5 py-2.5 text-sm font-semibold tracking-wide",
      lg: "px-7 py-3.5 text-base font-semibold tracking-wider",
    };

    const variantClasses = {
      amethyst: "btn-amethyst",
      gold: "btn-gold-shimmer",
      pearl: "btn-pearl-gold",
      outline:
        "bg-transparent border border-[#C9A24D]/40 text-[#2B1B3D] hover:bg-[#C9A24D]/10 hover:border-[#C9A24D] rounded-full transition-all duration-200",
      ghost:
        "bg-transparent text-[#2B1B3D] hover:bg-[#F5F0FD] hover:text-[#7B4FC9] rounded-full transition-all duration-200",
    };

    return (
      <button
        ref={ref}
        disabled={disabled || isLoading}
        className={`inline-flex items-center justify-center gap-2 select-none cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed ${sizeClasses[size]} ${variantClasses[variant]} ${className}`}
        {...props}
      >
        {isLoading ? (
          <Loader2 className="w-4 h-4 animate-spin text-current" />
        ) : (
          leftIcon
        )}
        <span>{children}</span>
        {!isLoading && rightIcon}
      </button>
    );
  }
);

Button.displayName = "Button";
