/**
 * CiBL Ultimate Network Configuration
 * نسخه نهایی شامل 14 شبکه اصلی + Solana, TON, Sui, Bitcoin
 */

export const NETWORKS = [
  // --- گروه ۱: EVM Networks (Ethereum Compatible) ---
  {
    id: 'hyperevm',
    name: 'HyperEVM',
    symbol: 'HYP',
    type: 'EVM',
    rpc: 'https://rpc.hyperevm.org',
    chainId: 1234,
    color: '#6366F1',
    glow: 'shadow-indigo-500/50',
    icon: 'Zap' // استفاده از آیکون Lucide
  },
  {
    id: 'ethereum',
    name: 'Ethereum',
    symbol: 'ETH',
    type: 'EVM',
    rpc: 'https://eth-mainnet.g.alchemy.com/v2/your-api-key',
    chainId: 1,
    color: '#627EEA',
    glow: 'shadow-blue-500/50',
    icon: 'Globe'
  },
  {
    id: 'polygon',
    name: 'Polygon',
    symbol: 'MATIC',
    type: 'EVM',
    rpc: 'https://polygon-rpc.com',
    chainId: 137,
    color: '#8247E5',
    glow: 'shadow-purple-600/50',
    icon: 'Layers'
  },
  {
    id: 'avalanche',
    name: 'Avalanche',
    symbol: 'AVAX',
    type: 'EVM',
    rpc: 'https://api.avax.network/ext/bc/C/rpc',
    chainId: 43114,
    color: '#E84142',
    glow: 'shadow-red-500/50',
    icon: 'Triangle'
  },

  // --- گروه ۲: Non-EVM Giants (Solana, TON, SUI) ---
  {
    id: 'solana',
    name: 'Solana',
    symbol: 'SOL',
    type: 'SOLANA',
    rpc: 'https://api.mainnet-beta.solana.com',
    color: '#14F195',
    glow: 'shadow-green-400/50',
    icon: 'Orbit' 
  },
  {
    id: 'ton',
    name: 'TON Network',
    symbol: 'TON',
    type: 'TON',
    rpc: 'https://toncenter.com/api/v2/jsonRPC',
    color: '#0098EA',
    glow: 'shadow-blue-400/60',
    icon: 'Gem' 
  },
  {
    id: 'sui',
    name: 'Sui',
    symbol: 'SUI',
    type: 'SUI',
    rpc: 'https://fullnode.mainnet.sui.io:443',
    color: '#6fbcf0',
    glow: 'shadow-cyan-400/50',
    icon: 'Droplets'
  },

  // --- گروه ۳: Legacy & Special Protocols ---
  {
    id: 'bitcoin',
    name: 'Bitcoin',
    symbol: 'BTC',
    type: 'BTC',
    color: '#F7931A',
    glow: 'shadow-orange-500/50',
    icon: 'Bitcoin'
  },
  {
    id: 'tron',
    name: 'Tron',
    symbol: 'TRX',
    type: 'TRON',
    rpc: 'https://api.tronstack.io',
    color: '#FF0013',
    glow: 'shadow-red-600/50',
    icon: 'ShieldAlert'
  },
  {
    id: 'cardano',
    name: 'Cardano',
    symbol: 'ADA',
    type: 'CARDANO',
    color: '#0033AD',
    glow: 'shadow-blue-700/50',
    icon: 'Hexagon'
  },
  {
    id: 'near',
    name: 'Near',
    symbol: 'NEAR',
    type: 'NEAR',
    color: '#575757',
    glow: 'shadow-gray-400/40',
    icon: 'Circle'
  },
  {
    id: 'polkadot',
    name: 'Polkadot',
    symbol: 'DOT',
    type: 'DOT',
    color: '#E6007A',
    glow: 'shadow-pink-500/50',
    icon: 'Cpu'
  },
  {
    id: 'bitcoin-cash',
    name: 'Bitcoin Cash',
    symbol: 'BCH',
    type: 'BCH',
    color: '#8BC34A',
    glow: 'shadow-green-500/50',
    icon: 'Coins'
  }
];

export const getNetwork = (id) => NETWORKS.find(n => n.id === id);
