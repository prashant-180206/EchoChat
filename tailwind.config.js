/** @type {import('tailwindcss').Config} */

const colors = require("./theme/colors");

module.exports = {
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  darkMode: "class",
  safelist: [
    // === PRIMARY ===
    "bg-primary",
    "bg-primary-100",
    "bg-primary-200",
    "bg-primary-dark",
    "bg-primary-100-dark",
    "bg-primary-200-dark",
    "text-primary",
    "text-primary-100",
    "text-primary-200",
    "text-primary-dark",
    "text-primary-100-dark",
    "text-primary-200-dark",
    "border-primary",
    "border-primary-100",
    "border-primary-200",
    "border-primary-dark",
    "border-primary-100-dark",
    "border-primary-200-dark",

    // === ACCENT ===
    "bg-accent",
    "bg-accent-100",
    "bg-accent-200",
    "bg-accent-dark",
    "bg-accent-100-dark",
    "bg-accent-200-dark",
    "text-accent",
    "text-accent-100",
    "text-accent-200",
    "text-accent-dark",
    "text-accent-100-dark",
    "text-accent-200-dark",
    "border-accent",
    "border-accent-100",
    "border-accent-200",
    "border-accent-dark",
    "border-accent-100-dark",
    "border-accent-200-dark",

    // === TEXT ===
    "text-text",
    "text-text-100",
    "text-text-200",
    "text-text-dark",
    "text-text-100-dark",
    "text-text-200-dark",

    // === BORDER ===
    "border-border",
    "border-border-100",
    "border-border-200",
    "border-border-dark",
    "border-border-100-dark",
    "border-border-200-dark",

    // === BG ===
    "bg-bg",
    "bg-bg-100",
    "bg-bg-200",
    "bg-bg-dark",
    "bg-bg-100-dark",
    "bg-bg-200-dark",

    // === SECONDARY ===
    "bg-secondary",
    "bg-secondary-100",
    "bg-secondary-200",
    "bg-secondary-dark",
    "bg-secondary-100-dark",
    "bg-secondary-200-dark",
    "text-secondary",
    "text-secondary-100",
    "text-secondary-200",
    "text-secondary-dark",
    "text-secondary-100-dark",
    "text-secondary-200-dark",
    "border-secondary",
    "border-secondary-100",
    "border-secondary-200",
    "border-secondary-dark",
    "border-secondary-100-dark",
    "border-secondary-200-dark",

    // === MUTED ===
    "text-muted",
    "text-muted-100",
    "text-muted-200",
    "text-muted-dark",
    "text-muted-100-dark",
    "text-muted-200-dark",
    "bg-muted",
    "bg-muted-100",
    "bg-muted-200",
    "bg-muted-dark",
    "bg-muted-100-dark",
    "bg-muted-200-dark",
    "border-muted",
    "border-muted-100",
    "border-muted-200",
    "border-muted-dark",
    "border-muted-100-dark",
    "border-muted-200-dark",
  ],

  theme: {
    extend: {
      colors, // ✔️ Still uses your custom theme
    },
  },
  plugins: [],
};
