export const themeColors = {
  light: {
    background: "#f9fbfb",
    backgroundSecondary: "#ffffff",
    card: "#ffffff",

    foreground: "#0f172a",
    foregroundSecondary: "#64748b",
    muted: "#94a3b8",

    border: "#e2e8f0",
    borderSubtle: "#f1f5f9",

    primary: "#10b981",
    alert: "#f97316",

    ghostSurface: "rgba(15, 23, 42, 0.03)",
    ghostBorder: "rgba(15, 23, 42, 0.06)",

    inverseButton: "#0f172a",
    inverseButtonText: "#ffffff",

    danger: "#ef4444", // red-500
  },

  dark: {
    background: "#101828",
    backgroundSecondary: "#162238",
    card: "#1f2937",

    foreground: "#ffffff",
    foregroundSecondary: "#9ca3af",
    muted: "#6b7280",

    border: "#374151",
    borderSubtle: "#1f2937",

    primary: "#10b981",
    alert: "#f97316",

    ghostSurface: "rgba(255, 255, 255, 0.04)",
    ghostBorder: "rgba(255, 255, 255, 0.08)",

    inverseButton: "#ffffff",
    inverseButtonText: "#101828",

    danger: "#f87171", // red-400
  },
} as const;

export const themeIconColor = {
  light: "#18181b", // zinc-900
  dark: "#ffffff",
  backgroundSecondary: "fffff",
};
