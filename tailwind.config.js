module.exports = {
  content: ["./App.{js,jsx,ts,tsx}", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        brand: {
          dark: "#0A0E17",      // Main Background
          card: "#161B28",      // Secondary Background
          primary: "#FFD700",   // CiBL Gold/Yellow
          secondary: "#00E5FF", // Neon Blue
          success: "#00C853",   // Bullish Green
          danger: "#FF4B2B",    // Bearish Red
        }
      }
    },
  },
  plugins: [],
}
theme: {
  extend: {
    boxShadow: {
      'green-neon': '0 0 20px rgba(34, 197, 94, 0.5)',
    }
  }
}
