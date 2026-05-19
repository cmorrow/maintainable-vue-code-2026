/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{vue,ts}"],
  theme: {
    extend: {
      colors: {
        primary: "rgb(var(--color-accent-rgb) / <alpha-value>)",
        dark: {
          DEFAULT: "rgb(var(--color-bg-dark-rgb) / <alpha-value>)",
          100: "hsl(226, 52%, 28%)",
          200: "hsl(226, 52%, 22%)",
          300: "hsl(226, 52%, 16%)",
          400: "hsl(226, 52%, 12%)",
          500: "hsl(226, 52%, 8%)",
          600: "hsl(226, 52%, 6%)",
          700: "hsl(226, 52%, 4%)",
          800: "hsl(226, 52%, 2%)",
        },
      },
    },
  },
  plugins: [],
};
