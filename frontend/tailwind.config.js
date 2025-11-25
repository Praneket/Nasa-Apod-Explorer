/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      // Use one reliable background key "stars"
      backgroundImage: {
        stars: "url('/src/assets/milkyway.jpg')",
      },

      fontFamily: {
        exo: ["Exo 2", "sans-serif"],
        orbitron: ["Orbitron", "sans-serif"],
      },

      animation: {
        float: "float 6s ease-in-out infinite",
        fadeIn: "fadeIn 1.2s ease-in forwards",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(-5px)" },
          "50%": { transform: "translateY(5px)" },
        },
        fadeIn: {
          "0%": { opacity: 0 },
          "100%": { opacity: 1 },
        },
      },
    },
  },
  plugins: [],
};
