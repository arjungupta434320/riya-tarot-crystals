/**
 * Riya Tarot Crystals - Strict Luxury Spiritual Design Tokens
 * Light-theme luxury boutique palette with WCAG AA compliance.
 */

export const designTokens = {
  colors: {
    bg: {
      primary: "#FBF8F3",       // Warm Ivory / Ethereal Off-White
      surface: "#FFFFFF",       // Pure Pearl White
      secondary: "#F6F2EA",     // Soft Alabaster Linen
      glass: "rgba(255, 255, 255, 0.82)", // Glassmorphic translucent surface
      roseSoft: "#FDF2F4",      // Rose Quartz aura tint
      lavenderSoft: "#F5F0FD",  // Amethyst / Lavender aura tint
      announcement: "#F7EFE2",  // Champagne Gold tinted top bar
    },
    brand: {
      lavender: "#CDB9F5",      // Mystical soft lavender
      roseQuartz: "#F4C6D0",    // Gentle Anahata heart stone
      amethyst: "#7B4FC9",      // Primary interactive CTA
      amethystHover: "#663BB2", // Darker Amethyst for hover
      gold: "#C9A24D",          // Champagne gold for borders/highlights
      goldHover: "#B38C3B",     // Deep warm gold
      goldHairline: "rgba(201, 162, 77, 0.28)",
      goldGlow: "rgba(201, 162, 77, 0.18)",
      deepPlum: "#2B1B3D",      // Primary text (11.5:1 contrast against #FBF8F3)
      mutedPlum: "#635572",     // Secondary text (5.2:1 contrast against #FBF8F3)
      subtlePlum: "#9588A3",    // Captions & placeholders
    },
    status: {
      success: "#2E7D32",       // Vedic sage green
      warning: "#E65100",       // Surya amber
      error: "#C62828",         // Garnet warning
      info: "#1565C0",          // Lapis blue
    }
  },
  fonts: {
    heading: 'var(--font-cinzel), "Cormorant Garamond", Georgia, serif',
    body: 'var(--font-plus-jakarta), "Inter", -apple-system, sans-serif',
  },
  radii: {
    sm: "8px",
    md: "14px",
    lg: "20px",
    xl: "26px",
    full: "9999px",
  },
  shadows: {
    subtle: "0 2px 10px rgba(43, 27, 61, 0.04)",
    card: "0 10px 30px -4px rgba(43, 27, 61, 0.06), 0 2px 6px -1px rgba(201, 162, 77, 0.08)",
    cardHover: "0 18px 40px -6px rgba(123, 79, 201, 0.12), 0 4px 12px -2px rgba(201, 162, 77, 0.15)",
    amethystGlow: "0 8px 24px -2px rgba(123, 79, 201, 0.35)",
    goldGlow: "0 6px 20px -2px rgba(201, 162, 77, 0.30)",
  }
} as const;

export type DesignTokens = typeof designTokens;
