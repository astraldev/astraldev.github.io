module.exports = {
  content: [
    "*.html",
    "src/**/*.(vue|svg)",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        'cst-cyan': '#0a63d9',
        'cst-green': '#0adb72',
        'base': '#040008'
      },
      fontFamily: {
        'ubuntu-mono': "'Ubuntu Mono', monospace",
        'asap': 'Asap, sans-serif',
        'comfortaa': 'Comfortaa, sans-serif',
      }
    },
  },
  plugins: [],
}
