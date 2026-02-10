export const EVM_CONFIG = {
  ETHEREUM: {
    chainId: 1,
    name: 'Ethereum',
    rpc: 'https://mainnet.infura.io/v3/YOUR_INFURA_KEY', // یا پروایدرهای دیگر
    explorer: 'https://etherscan.io',
    symbol: 'ETH',
    color: '#627EEA', // آبی کلاسیک اتریوم
    coingeckoId: 'ethereum'
  },
  BASE: {
    chainId: 8453,
    name: 'Base',
    rpc: 'https://mainnet.base.org',
    explorer: 'https://basescan.org',
    symbol: 'ETH',
    color: '#0052FF',
    coingeckoId: 'ethereum' // قیمت بیس بر پایه اتریوم است
  },
  BSC: {
    chainId: 56,
    name: 'BNB Smart Chain',
    rpc: 'https://bsc-dataseed.binance.org/',
    explorer: 'https://bscscan.com',
    symbol: 'BNB',
    color: '#F3BA2F',
    coingeckoId: 'binancecoin'
  }
};
