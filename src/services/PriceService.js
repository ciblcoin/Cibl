import axios from 'axios';

const BASE_URL = 'https://api.coingecko.com/api/v3/simple/price';

export const fetchMarketPrices = async (tokenIds) => {
  try {
    // توکن‌های هدف: bitcoin, ethereum, solana, the-open-network
    const response = await axios.get(BASE_URL, {
      params: {
        ids: tokenIds.join(','),
        vs_currencies: 'usd',
        include_24hr_change: 'true'
      }
    });
    return response.data;
  } catch (error) {
    console.error("Price Fetch Error:", error);
    return null;
  }
};
import { useState, useEffect } from 'react';

export const usePortfolioData = (userAssets, currency) => {
  const [prices, setPrices] = useState({});
  const [totalBalance, setTotalBalance] = useState(0);

  const updateData = async () => {
    const ids = userAssets.map(a => a.coingeckoId); // مثلاً ['the-open-network', 'solana']
    const marketData = await fetchMarketPrices(ids);
    
    if (marketData) {
      let totalUSD = 0;
      userAssets.forEach(asset => {
        const price = marketData[asset.coingeckoId].usd;
        totalUSD += price * asset.amount;
      });
      
      setPrices(marketData);
      setTotalBalance(totalUSD);
      
      // پخش یک صدای بسیار ضعیف 'Tick' برای القای حس آپدیت شدن
      // SoundManager.play('NEON_TICK'); 
    }
  };

  useEffect(() => {
    updateData();
    const interval = setInterval(updateData, 60000); // آپدیت هر یک دقیقه
    return () => clearInterval(interval);
  }, [currency]);

  return { prices, totalBalance };
};
