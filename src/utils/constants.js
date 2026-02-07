// src/utils/constants.js

export const COLORS = {
  // Brand Colors
  primary: '#FFD700',      // CiBL Gold (Neon)
  secondary: '#00E5FF',    // Electric Blue
  dark: '#0A0E17',         // Deep Space Black (Background)
  card: '#161B28',         // Slate Gray (Cards)
  
  // Status Colors
  success: '#00C853',      // Profit Green
  danger: '#FF4B2B',       // Loss Red
  warning: '#FFAB00',      // Risk Yellow
  
  // Neutral
  textMain: '#FFFFFF',
  textMuted: '#94a3b8',
  border: '#1E293B',
};

export const API_ENDPOINTS = {
  JUPITER_QUOTE: 'https://quote-api.jup.ag/v6/quote',
  ONE_INCH_QUOTE: 'https://api.1inch.io/v5.0/1/quote',
  SOLANA_RPC: 'https://api.mainnet-beta.solana.com',
};

export const APP_CONFIG = {
  FEE_PERCENT: 0.006,      // 0.6% CiBL Fee
  REFERRAL_REWARD: 0.10,   // 10% of Fee to Referrer
  MIN_SWAP_AMOUNT: 0.01,   // Minimum SOL to swap
};
