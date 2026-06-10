/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#ffffff",
        "blue-primary": "#2563eb",
        "blue-dark": "#1d4ed8",
        "blue-light": "#eff6ff",
        "blue-border": "#bfdbfe",
        "text-primary": "#111827",
        "text-subtle": "#6b7280",
        "dark-bg": "#0f172a",
      },
      fontFamily: {
        sans: ["var(--font-dm-sans)", "DM Sans", "system-ui", "sans-serif"],
      },
    },
  },
  plugins: [],
};
