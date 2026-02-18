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

module.exports = {
  theme: {
    extend: {
      colors: {
        brand: {
          DEFAULT: '#06B6D4',
          purple: '#A855F7',
          pink: '#F43F5E',
        },
        dark: {
          bg: '#000000',
          card: '#0F172A',
          border: '#1E293B',
        }
      }
    },
  },
};
