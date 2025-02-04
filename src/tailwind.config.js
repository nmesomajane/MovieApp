//  @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {fontFamily: {
      
      roboto: ["Roboto Mono", "serif"]
    },
    extend: {
      colors: {
        primary: "#282828",
      },
    },
  },
  plugins: [],
}