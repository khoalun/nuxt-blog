/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./components/**/*.{js,vue,ts}",
    './layouts/**/*.{vue,js,ts}',
    "./pages/**/*.vue,js,ts",
    "./plugins/**/*.{js,ts}",
    "./app.vue",
    "./error.vue",
    './node_modules/reka-ui/**/*.{js,ts,vue}'
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}

