import type { Config } from 'tailwindcss'

/** @type {import('tailwindcss').Config} */
export default <Partial<Config>>{
  content: ['./pages/**/*.vue', './components/**/*.vue', './layouts/**/*.vue', './app.vue'],
  theme: {
    extend: {},
  },
  plugins: [],
}
