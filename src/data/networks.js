/**
 * CiBL Network Configuration
 * شامل تمام شبکه های EVM و Non-EVM با استایل نئونی اختصاصی
 */

export const NETWORKS = [
  // --- گروه EVM (Ethereum Virtual Machine) ---
  {
    id: 'hyperevm',
    name: 'HyperEVM',
    symbol: 'HYP',
    type: 'EVM',
    rpc: 'https://rpc.hyperevm.org', // آدرس RPC واقعی را جایگزین کنید
    chainId: 1234,
    color: '#6366F1', // Indigo Neon
    explorer: 'https://explorer.hyperevm.org',
    icon: 'Zap'
  },
  {
    id: 'polygon',
    name: 'Polygon',
    symbol: 'MATIC',
    type: 'EVM',
    rpc: 'https://polygon-rpc.com',
    chainId: 137,
    color: '#8247E5', // Purple Neon
    explorer: 'https://polygonscan.com',
    icon: 'Layers'
  },
  {
    id: 'avalanche',
    name: 'Avalanche',
    symbol: 'AVAX',
    type: 'EVM',
    rpc: 'https://api.avax.network/ext/bc/C/rpc',
    chainId: 43114,
    color: '#E84142', // Red Neon
    explorer: 'https://snowtrace.io',
    icon: 'Triangle'
  },
  {
    id: 'ethereum',
    name: 'Ethereum',
    symbol: 'ETH',
    type: 'EVM',
    rpc: 'https://eth-mainnet.g.alchemy.com/v2/your-api-key',
    chainId: 1,
    color: '#06B6D4', // Cyan Neon (Brand Color)
    explorer: 'https://etherscan.io',
    icon: 'Globe'
  },

  // --- گروه Non-EVM و پروتکل‌های خاص ---
  {
    id: 'tron',
    name: 'Tron',
    symbol: 'TRX',
    type: 'TRON',
    rpc: 'https://api.tronstack.io',
    color: '#FF0013', // Sharp Red
    explorer: 'https://tronscan.org',
    icon: 'ShieldAlert'
  },
  {
    id: 'cardano',
    name: 'Cardano',
    symbol: 'ADA',
    type: 'CARDANO',
    color: '#0033AD', // Blue Neon
    explorer: 'https://cardanoscan.io',
    icon: 'Hexagon'
  },
  {
    id: 'polkadot',
    name: 'Polkadot',
    symbol: 'DOT',
    type: 'DOT',
    color: '#E6007A', // Pink Neon
    explorer: 'https://polkascan.io',
    icon: 'Cpu'
  },
  {
    id: 'bitcoin-cash',
    name: 'Bitcoin Cash',
    symbol: 'BCH',
    type: 'BCH',
    color: '#8BC34A', // Green Neon
    explorer: 'https://blockchair.com/bitcoin-cash',
    icon: 'Coins'
  },
  {
    id: 'near',
    name: 'Near Protocol',
    symbol: 'NEAR',
    type: 'NEAR',
    color: '#575757', // Slate/White
    explorer: 'https://explorer.near.org',
    icon: 'Circle'
  },
  {
    id: 'bnb-chain',
    name: 'BNB Chain',
    symbol: 'BNB',
    type: 'EVM',
    rpc: 'https://bsc-dataseed.binance.org',
    chainId: 56,
    color: '#F3BA2F', // Yellow Neon
    explorer: 'https://bscscan.com',
    icon: 'LayoutGrid'
  }
];

// تابع کمکی برای پیدا کردن تنظیمات یک شبکه بر اساس ID
export const getNetworkById = (id) => NETWORKS.find(net => net.id === id);

// جدا کردن لیست بر اساس نوع (برای استفاده در WalletEngine)
export const EVM_NETWORKS = NETWORKS.filter(net => net.type === 'EVM');
export const SPECIAL_NETWORKS = NETWORKS.filter(net => net.type !== 'EVM');
