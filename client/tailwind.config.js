/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        ink:  { 900:"#0E2330", 800:"#132B39", 700:"#1A3646", 100:"#E4EBEF" },
        moss: { 500:"#3F6F54", 400:"#55936F", 300:"#7AB791" },
        cream:{ 50:"#F7F1E6", 100:"#EFE7D6" },
      },
      borderRadius: { brand:"1.25rem" },
      boxShadow: {
        soft:"0 10px 30px -10px rgba(0,0,0,.1)",
      },
      backgroundImage: {
        "brand-radial":"radial-gradient(900px 420px at 70% 10%, rgba(122,183,145,.15), transparent)",
      },
    },
  },
  plugins: [],
};
