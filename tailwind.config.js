/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        'bgcolor': 'linear-gradient(to right, #052e16, #094023, #0d5231, #0f6641, #0f7a51, #0d8359, #0a8d61, #059669, #059669, #059669, #059669, #059669)',
        'bgslate':'linear-gradient(to right, #020617, #1c2231, #333c4d, #4b576b, #64748b)',
      },
    },
  },
  plugins: [],
}