const COINGECKO_URL = 'https://api.coingecko.com/api/v3/simple/price?ids=ethereum,solana&vs_currencies=usd';

export const BlockchainService = {
  // دریافت قیمت لحظه‌ای ارزها
  getPrices: async () => {
    try {
      const response = await fetch(COINGECKO_URL);
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Price Fetch Error:", error);
      return null;
    }
  },

  // شبیه‌سازی دریافت موجودی از شبکه (در آینده با ethers.js جایگزین می‌شود)
  getWalletBalance: async (address) => {
    // در اینجا می‌توانید از یک API مثل Etherscan استفاده کنید
    // فعلاً یک مقدار فرضی را با تاخیر برمی‌گردانیم تا لودینگ تست شود
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          eth: 1.425,
          sol: 24.50,
          hyp: 1200.00
        });
      }, 1500);
    });
  }
};

export const BlockchainService = {
  fetchWithTimeout: async (url, options, timeout = 5000) => {
    const controller = new AbortController();
    const id = setTimeout(() => controller.abort(), timeout);

    try {
      const response = await fetch(url, { ...options, signal: controller.signal });
      clearTimeout(id);
      if (!response.ok) throw new Error(`HTTP_STATUS_${response.status}`);
      return await response.json();
    } catch (err) {
      if (err.name === 'AbortError') throw new Error('REQUEST_TIMEOUT');
      throw err;
    }
  },

  getPrices: async () => {
    try {
      return await BlockchainService.fetchWithTimeout(COINGECKO_URL);
    } catch (error) {
      // ثبت خطا برای دیباگ
      console.warn("Network Fail:", error.message);
      throw error; // خطا را به UI پاس می‌دهیم
    }
  }
};
