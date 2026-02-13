export const PROVIDER_JS = `
  (function() {
    const bridge = {
      request: async (payload) => {
        return new Promise((resolve, reject) => {
          // ارسال پیام به کدهای React Native
          window.ReactNativeWebView.postMessage(JSON.stringify(payload));
          
          // گوش دادن به پاسخ از سمت اپلیکیشن
          window.addEventListener('message_response', (event) => {
            resolve(event.detail);
          }, { once: true });
        });
      }
    };

    // شبیه‌سازی کیف‌پول‌های معروف برای سازگاری با همه سایت‌ها
    window.ethereum = bridge;
    window.phantom = { solana: bridge };
    console.log("CiBL Web3 Bridge Injected 🚀");
  })();
`;
