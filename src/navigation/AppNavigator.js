const allTokens = [
  { name: 'Solana', symbol: 'SOL', balance: 10, price: 100, network: 'solana' },
  { name: 'Ethereum', symbol: 'ETH', balance: 0.5, price: 2500, network: 'ethereum' },
  { name: 'Tether', symbol: 'USDT', balance: 100, price: 1, network: 'polygon' },
];

// مرتب‌سازی: ابتدا بر اساس شبکه (سولانا اول)، سپس بر اساس ارزش دلاری
const sortedTokens = allTokens.sort((a, b) => {
  if (a.network === 'solana' && b.network !== 'solana') return -1;
  if (a.network !== 'solana' && b.network === 'solana') return 1;
  return (b.balance * b.price) - (a.balance * a.price); // بقیه بر اساس ارزش دلاری
});
const fetchAllBalances = async () => {
  const [solBalance, ethBalance, polyBalance] = await Promise.all([
    fetchSolanaBalance(walletAddress),
    fetchEthereumBalance(walletAddress),
    fetchPolygonBalance(walletAddress)
  ]);
  // آپدیت کردن State اصلی اپلیکیشن
};
