/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        Saira: ["Saira Semi Condensed"],
        // Add more custom font families as needed
      },
    },
  },
  plugins: [],
};
