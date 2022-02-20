module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./_pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: { extend: {} },
  plugins: [require("@tailwindcss/forms")],
};
