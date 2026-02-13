import { useState, useEffect } from 'react';
import { SmartCache } from '../database/SmartCache';
import { NetworkProvider } from '../services/NetworkProvider';

export const useBalance = (network) => {
  const [data, setData] = useState({ amount: '...', fiatValue: '...', loading: true });

  useEffect(() => {
    const loadBalance = async () => {
      // گام اول: نمایش فوری دیتای قدیمی از کش
      const cached = await SmartCache.getCachedBalance(network);
      setData({ ...cached, loading: true });

      // گام دوم: درخواست دیتای تازه از بلاک‌چین در پس‌زمینه
      try {
        const freshBalance = await NetworkProvider.fetchBalance(network);
        
        // گام سوم: آپدیت کردن استیت و ذخیره در کش برای دفعه بعد
        setData({ ...freshBalance, loading: false });
        await SmartCache.setBalance(network, freshBalance);
      } catch (error) {
        setData(prev => ({ ...prev, loading: false })); // اگر شبکه قطع بود، همان دیتای کش بماند
      }
    };

    loadBalance();
  }, [network]);

  return data;
};
