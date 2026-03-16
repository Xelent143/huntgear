/**
 * ═══════════════════════════════════════════════════════════════════════════════
 * THEME CONFIGURATION - XELENT HUNTGEAR
 * ═══════════════════════════════════════════════════════════════════════════════
 * 
 * Premium Hunting Brand Theme - Inspired by:
 * - Sitka Gear: Technical, scientific, charcoal-based
 * - KUIU: Modern dark with hunter orange accents
 * - First Lite: Earth tones, authentic rugged feel
 * 
 * After making changes, run: pnpm apply-template
 */

export const THEME_CONFIG = {
  // ═════════════════════════════════════════════════════════════════════════════
  // COLOR PALETTE - Hunting Industry Standard
  // ═════════════════════════════════════════════════════════════════════════════
  colors: {
    // Primary: Deep Forest & Charcoal (Sitka/KUIU inspired)
    primary: {
      50: "#f4f7f4",
      100: "#e3ebe3", 
      200: "#c5d8c5",
      300: "#9ebf9e",
      400: "#76a076",
      500: "#558355",
      600: "#406740",
      700: "#345234",
      800: "#2d3b2d",
      900: "#243124",
      950: "#111f11",
    },
    
    // Secondary: Earth & Terrain (First Lite inspired)
    secondary: {
      50: "#f8f6f3",
      100: "#efebe5",
      200: "#ddd5c9",
      300: "#c4b7a3",
      400: "#a8957a",
      500: "#8b7a5e",
      600: "#6d5f4a",
      700: "#574d3d",
      800: "#4a3f32",
      900: "#3d352c",
      950: "#211d18",
    },
    
    // Neutral: Charcoal & Stone (KUIU tactical inspired)
    neutral: {
      50: "#f5f5f5",
      100: "#e8e8e8",
      200: "#d1d1d1",
      300: "#b4b4b4",
      400: "#8a8a8a",
      500: "#6d6d6d",
      600: "#5c5c5c",
      700: "#4f4f4f",
      800: "#454545",
      900: "#3d3d3d",
      950: "#1a1a1a",
    },
    
    // Accent: Hunter Safety Orange + Tactical Tones
    accent: {
      // Hunter Orange - Primary CTA (safety/visibility)
      orange: "#ff6b00",
      "orange-light": "#ff8533",
      "orange-dark": "#cc5500",
      blaze: "#f97316",
      olive: "#6b8e23",
      "olive-dark": "#4a6320",
      sage: "#87a878",
      "sage-dark": "#5c7a52",
      sand: "#c2b280",
      rust: "#b7410e",
      gold: "#c9a96e",
    },
    
    // Semantic Colors
    success: {
      light: "#dcfce7",
      DEFAULT: "#22c55e",
      dark: "#15803d",
    },
    warning: {
      light: "#fef9c3",
      DEFAULT: "#eab308",
      dark: "#a16207",
    },
    error: {
      light: "#fee2e2",
      DEFAULT: "#ef4444",
      dark: "#b91c1c",
    },
    info: {
      light: "#e0f2fe",
      DEFAULT: "#0ea5e9",
      dark: "#0369a1",
    },
    
    // Dark Mode - Night Hunting Theme
    dark: {
      background: "#0d0d0d",
      surface: "#1a1a1a",
      elevated: "#252525",
      border: "#333333",
      muted: "#737373",
    }
  },

  // ═════════════════════════════════════════════════════════════════════════════
  // DARK MODE - Hunting Industry Standard
  // ═════════════════════════════════════════════════════════════════════════════
  darkMode: {
    background: "#0d0d0d",
    text: "#f5f5f0",
    textMuted: "#a8a39d",
    border: "#333333",
    surface: "#1a1a1a",
    surfaceElevated: "#252525",
  },

  // ═════════════════════════════════════════════════════════════════════════════
  // TYPOGRAPHY - Rugged & Technical
  // ═════════════════════════════════════════════════════════════════════════════
  typography: {
    heading: {
      fontFamily: "font-condensed",
      weights: {
        normal: 400,
        semibold: 600,
        bold: 700,
        extrabold: 800,
      },
      letterSpacing: {
        tight: "-0.02em",
        normal: "0",
        wide: "0.05em",
        wider: "0.1em",
        widest: "0.25em",
      },
    },
    body: {
      fontFamily: "font-sans",
      lineHeight: {
        tight: 1.25,
        normal: 1.5,
        relaxed: 1.625,
        loose: 2,
      },
    },
  },

  // ═════════════════════════════════════════════════════════════════════════════
  // BORDERS - Sharp/Tactical Feel
  // ═════════════════════════════════════════════════════════════════════════════
  borderRadius: {
    none: "0",
    sm: "0.125rem",
    DEFAULT: "0.25rem",
    md: "0.375rem",
    lg: "0.5rem",
    xl: "0.75rem",
    "2xl": "1rem",
    "3xl": "1.5rem",
    full: "9999px",
  },

  // ═════════════════════════════════════════════════════════════════════════════
  // SHADOWS - Tactical depth
  // ═════════════════════════════════════════════════════════════════════════════
  shadows: {
    sm: "0 1px 2px 0 rgb(0 0 0 / 0.3)",
    DEFAULT: "0 1px 3px 0 rgb(0 0 0 / 0.4), 0 1px 2px -1px rgb(0 0 0 / 0.4)",
    md: "0 4px 6px -1px rgb(0 0 0 / 0.4), 0 2px 4px -2px rgb(0 0 0 / 0.4)",
    lg: "0 10px 15px -3px rgb(0 0 0 / 0.5), 0 4px 6px -4px rgb(0 0 0 / 0.5)",
    glow: "0 0 20px rgba(255, 107, 0, 0.3)",
    "glow-lg": "0 0 40px rgba(255, 107, 0, 0.4)",
  },

  // ═════════════════════════════════════════════════════════════════════════════
  // FEATURES
  // ═════════════════════════════════════════════════════════════════════════════
  features: {
    darkMode: true,
    animations: true,
    roundedCorners: false,
  },

  // ═════════════════════════════════════════════════════════════════════════════
  // BRAND-SPECIFIC STYLING
  // ═════════════════════════════════════════════════════════════════════════════
  brand: {
    hero: {
      background: "#0d0d0d",
      overlay: "linear-gradient(to right, rgba(13,13,13,0.95), rgba(13,13,13,0.6), transparent)",
      textColor: "#f5f5f0",
      accentColor: "#ff6b00",
    },
    nav: {
      background: "rgba(13,13,13,0.95)",
      border: "rgba(255,255,255,0.1)",
      text: "#f5f5f0",
      textMuted: "rgba(255,255,255,0.6)",
    },
    card: {
      background: "#1a1a1a",
      border: "#333333",
      hover: "#252525",
    },
    cta: {
      primary: "#ff6b00",
      primaryHover: "#cc5500",
      secondary: "transparent",
      secondaryBorder: "rgba(255,255,255,0.3)",
    },
  },
} as const;

// Type export for TypeScript support
export type ThemeConfig = typeof THEME_CONFIG;

/**
 * Generate CSS custom properties from theme config
 */
export function generateCSSVariables(theme: ThemeConfig): string {
  const cssVars: string[] = [];
  
  // Primary colors
  Object.entries(theme.colors.primary).forEach(([key, value]) => {
    cssVars.push(`  --primary-${key}: ${value};`);
  });
  
  // Secondary colors
  Object.entries(theme.colors.secondary).forEach(([key, value]) => {
    cssVars.push(`  --secondary-${key}: ${value};`);
  });
  
  // Neutral colors
  Object.entries(theme.colors.neutral).forEach(([key, value]) => {
    cssVars.push(`  --neutral-${key}: ${value};`);
  });
  
  // Accent colors
  Object.entries(theme.colors.accent).forEach(([key, value]) => {
    cssVars.push(`  --accent-${key}: ${value};`);
  });
  
  // Semantic colors
  Object.entries(theme.colors).forEach(([key, value]) => {
    if (typeof value === 'object' && (key === 'success' || key === 'warning' || key === 'error' || key === 'info')) {
      Object.entries(value).forEach(([subKey, subValue]) => {
        if (subKey === 'DEFAULT') {
          cssVars.push(`  --${key}: ${subValue};`);
        } else {
          cssVars.push(`  --${key}-${subKey}: ${subValue};`);
        }
      });
    }
  });
  
  // Border radius
  Object.entries(theme.borderRadius).forEach(([key, value]) => {
    cssVars.push(`  --radius-${key}: ${value};`);
  });
  
  return `:root {\n${cssVars.join('\n')}\n}`;
}

export default THEME_CONFIG;
