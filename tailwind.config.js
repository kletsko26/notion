/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "dark-color": "#1E1E1E",
        "light-color": "#F5F5F5",
        "inactive-color": "#808080",
        "active-color": "#007AFF",
      },
    },
  },
  plugins: [],
};
