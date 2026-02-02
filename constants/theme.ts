// Theme constants for ASTRA Bio-Metric HUD
// High-density, military-grade UI design

export const colors = {
    // Compliance States
    compliance: {
        green: "#00FF41",      // Optimal
        amber: "#FFB800",      // Warning
        red: "#FF0033",        // Critical
    },

    // Background
    background: {
        primary: "#000000",
        secondary: "#0A0A0A",
        tertiary: "#141414",
    },

    // Text
    text: {
        primary: "#FFFFFF",
        secondary: "#A0A0A0",
        tertiary: "#606060",
        accent: "#00FF41",
    },

    // UI Elements
    ui: {
        border: "#1A1A1A",
        borderActive: "#00FF41",
        overlay: "rgba(0, 0, 0, 0.8)",
    },
};

export const typography = {
    // Font families (will use system fonts for now)
    fontFamily: {
        mono: "Courier New",
        sans: "System",
    },

    // Font sizes (high-density display)
    fontSize: {
        xs: 10,
        sm: 12,
        md: 14,
        lg: 16,
        xl: 20,
        xxl: 28,
        xxxl: 36,
    },

    // Font weights
    fontWeight: {
        regular: "400" as const,
        medium: "500" as const,
        semibold: "600" as const,
        bold: "700" as const,
    },
};

export const spacing = {
    xs: 4,
    sm: 8,
    md: 16,
    lg: 24,
    xl: 32,
    xxl: 48,
};

export const layout = {
    // Compliance Ring
    complianceRing: {
        size: 200,
        strokeWidth: 12,
        pulseSpeed: 2000, // ms
    },

    // Mission Log
    missionLog: {
        itemHeight: 80,
        maxVisible: 10,
    },
};

export const animation = {
    // Durations
    duration: {
        fast: 150,
        normal: 300,
        slow: 500,
    },

    // Easing
    easing: {
        default: "ease-in-out",
        sharp: "cubic-bezier(0.4, 0.0, 0.6, 1)",
    },
};
