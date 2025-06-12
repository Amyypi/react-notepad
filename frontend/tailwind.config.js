const withMT = require("@material-tailwind/react/utils/withMT");

module.exports = withMT({
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      // Keep your custom styles here
    },
  },
  plugins: [
    // You can still use other Tailwind plugins here
  ],
});