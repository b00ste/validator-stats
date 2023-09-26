/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        "pastel-white-pink": "#FFFAFA",
        "pastel-light-pink": "#FFF5F5",
        "soft-pink": "#F5DADF",
        "strong-pink": "#FF6A8E",
        "dark-pink": "#FF4A6E",
        "pastel-blue": "#66A6D7",
        "pastel-green": "#7AE582",
        "pastel-orange": "#FFC57E",
        "pastel-red": "#FF4D4D",

        // https://coolors.co/6b717e-efaac4-ffc4d1-ffe8e1-d4dccd
        "slate-gray": "#6b717e",
        "lavender-pink": "#efaac4",
        "misty-rose": "#ffe8e1",
        pink: "#ffc4d1",
        alabaster: "#EAEEE7",
      },
    },
  },
  plugins: [],
};
