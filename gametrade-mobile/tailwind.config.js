/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        brand: "#7C3AED",
        "brand-dark": "#5B21B6",
        canvas: "#090B14",
        panel: "#141827",
        "panel-muted": "#1C2234",
        ink: "#F8FAFC",
        muted: "#A8B1C5",
        danger: "#FCA5A5",
        success: "#86EFAC",
      },
    },
  },
  plugins: [],
};
