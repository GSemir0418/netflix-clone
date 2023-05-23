/** @type {import('tailwindcss').Config} */
module.exports = {
  // Tailwind 在编译 CSS 时需要扫描的文件路径
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
