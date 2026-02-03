// Theme constants for ASTRA Bio-Metric HUD
// High-fidelity, military-grade UI design
// Billion-dollar visuals

export const colors = {
    // Compliance States (High luminance neon)
    compliance: {
        green: "#00FF41",      // Optimal (Matrix Green)
        greenDim: "rgba(0, 255, 65, 0.2)",
        amber: "#FFB000",      // Warning (Safety Orange/Yellow)
        amberDim: "rgba(255, 176, 0, 0.2)",
        red: "#FF2A2A",        // Critical (Alert Red)
        redDim: "rgba(255, 42, 42, 0.2)",
    },

    // Background (OLED Black depth)
    background: {
        primary: "#000000",
        secondary: "#080808",  // Subtle elevation
        tertiary: "#121212",   // Card background
        overlay: "rgba(0, 0, 0, 0.85)",
    },

    // Text & Accents
    text: {
        primary: "#FFFFFF",
        secondary: "#B0B0B0",
        tertiary: "#505050",
        muted: "#333333",
        accent: "#00FF41",
    },

    // UI Elements
    ui: {
        border: "#1C1C1C",
        borderHighlight: "#333333",
        borderActive: "#00FF41",
        scanline: "rgba(0, 255, 65, 0.05)",
    },
};

export const typography = {
    // Font families
    fontFamily: {
        mono: "Courier New",  // Classic terminal feel
        sans: "System",
    },

    // Font sizes (high-density display)
    fontSize: {
        xs: 11,
        sm: 13,
        md: 15,
        lg: 18,
        xl: 24,
        xxl: 32,
        xxxl: 48,
        display: 64,
    },

    // Font weights
    fontWeight: {
        regular: "400" as const,
        medium: "500" as const,
        bold: "700" as const,
        black: "900" as const,
    },

    letterSpacing: {
        tight: -0.5,
        normal: 0,
        wide: 1.5, // For headers
    }
};

export const spacing = {
    xxs: 2,
    xs: 4,
    sm: 8,
    md: 16,
    lg: 24,
    xl: 32,
    xxl: 48,
    xxxl: 64,
};

export const layout = {
    // Compliance Ring
    complianceRing: {
        size: 240,
        strokeWidth: 2,
        activeStrokeWidth: 8,
        glowRadius: 10,
    },

    borderRadius: {
        sm: 4,
        md: 8,
        lg: 16,
        pill: 9999,
    }
};

export const animation = {
    // Durations
    duration: {
        instant: 0,
        fast: 200,
        normal: 400,
        slow: 800,
        pulse: 2000,
    },

    // Easing
    easing: {
        default: "cubic-bezier(0.4, 0.0, 0.2, 1)", // Standard ease-in-out
        outBack: "cubic-bezier(0.175, 0.885, 0.32, 1.275)",
        sharp: "cubic-bezier(0.4, 0.0, 0.6, 1)",
    },
};
