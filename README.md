cibl-wallet/
├── assets/                 # Images, Fonts, and Splash Screens
├── src/
│   ├── api/                # Axios instances for CoinGecko, Birdeye, etc.
│   ├── blockchain/         # Blockchain logic (The Core)
│   │   ├── evm/            # ETH, BSC, Polygon, Base
│   │   ├── solana/         # Solana & SPL Tokens
│   │   ├── move/           # SUI & Aptos
│   │   ├── ton/            # TON & Jettons
│   │   └── shared/         # Common logic (Price Fetcher, Security Scanner)
│   ├── components/         # Reusable UI components
│   │   ├── common/         # Buttons, Inputs, Modals
│   │   ├── dashboard/      # Asset Cards, Balance Display
│   │   ├── swap/           # Swap UI components
│   │   └── charts/         # TradingView/Wagmi charts
│   ├── hooks/              # Custom React Hooks (useBalance, useAuth)
│   ├── navigation/         # React Navigation (Stacks & Tabs)
│   ├── screens/            # Main Pages
│   │   ├── onboarding/     # Create/Import Wallet screens
│   │   ├── main/           # Dashboard, Activity, Settings
│   │   └── trade/          # Token Details, Swap, Send/Receive
│   ├── services/           # Supabase, Firebase, Push Notifications
│   ├── store/              # State Management (Zustand or Redux)
│   ├── theme/              # Tailwind configuration & Global Styles
│   └── utils/              # Formatters, Encryption (AES), Validators
├── workers/                # Cloudflare Workers for GameFi logic
├── .env                    # Environment Variables (Keep it secret!)
├── App.js                  # Entry Point
├── package.json            # Dependencies
└── tailwind.config.js      # Global Theme
