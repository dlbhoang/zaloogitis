/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#0A66C2",
          light: "#1D74D0",
          soft: "#E2EEFF"
        },
        secondary: "#0F172A",
        accent: "#F59E0B"
      },
      boxShadow: {
        "soft-lg": "0 18px 45px rgba(15, 23, 42, 0.08)"
      }
    }
  },
  plugins: []
};

