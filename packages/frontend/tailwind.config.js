/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        right: "#40AC2E",
        wrong: "#AC2E2E",
        partial: "#C7B248",
        accent: "#FFEA7C",
      },
    },
  },
  plugins: [],
};
