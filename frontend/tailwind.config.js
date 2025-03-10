/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}" // Ensures Tailwind scans your React files
  ],
  theme: {
    extend: {
      backgroundImage:{
      bannerImg: "url('./images/Heroimage.jpg')"
    },
    },
  },
  plugins: [],
}
