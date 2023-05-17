/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        bg: '#2F2F2F',
        dark_bg: '#1F1F1F',
        dark_df_bg: '#1f1f1f60',
        gray: '#D9D9D9',
        dark_gray: '#A8A8A8'
      }
    }
  },
  plugins: []
}
