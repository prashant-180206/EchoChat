// colors.ts

export const Colors = {
  primary: {
    DEFAULT: "#1a8cff",
    100: "#66b3ff",
    200: "#3b82f6",
    dark: "#155d9c",
    "100-dark": "#0f4c81",
    "200-dark": "#0a3d62",
  },
  accent: {
    DEFAULT: "#22d3ee",
    100: "#67e8f9",
    200: "#06b6d4",
    dark: "#06b6d4",
    "100-dark": "#0891b2",
    "200-dark": "#0e7490",
  },
  text: {
    DEFAULT: "#1f2937",
    100: "#4b5563",
    200: "#9ca3af",
    dark: "#f9fafb",
    "100-dark": "#d1d5db",
    "200-dark": "#9ca3af",
  },
  border: {
    DEFAULT: "#e5e7eb",
    100: "#cbd5e1",
    200: "#374151",
    dark: "#4b5563",
    "100-dark": "#6b7280",
    "200-dark": "#374151",
  },
  bg: {
    DEFAULT: "#f5f8fb",
    100: "#ffffff",
    200: "#dedede",
    dark: "#1e1e2e",
    "100-dark": "#2a2a3c",
    "200-dark": "#343447",
  },
  secondary: {
    DEFAULT: "#ff3b61",
    100: "#ff8aa1",
    200: "#ec4899",
    dark: "#b91c1c",
    "100-dark": "#be123c",
    "200-dark": "#9f1239",
  },
  muted: {
    DEFAULT: "#9ca3af",
    100: "#e5e7eb",
    200: "#6b7280",
    dark: "#6b7280",
    "100-dark": "#9ca3af",
    "200-dark": "#4b5563",
  },
} as const;

export type ColorsType = typeof Colors;
