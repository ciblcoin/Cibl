import { ethers } from 'ethers';
import { SmartCache } from '../database/SmartCache';
import SoundManager from '../utils/SoundManager';

export const TransactionManager = {
  // ۱. تخمین هوشمند کارمزد (Gas Station)
  // بر اساس ۳ سطح: Safe Low, Average, Fast
  estimateGasPrice: async (provider, network) => {
    try {
      const feeData = await provider.getFeeData();
      return {
        low: feeData.gasPrice.mul(90).div(100), // ۱۰ درصد کمتر
        market: feeData.gasPrice,
        fast: feeData.gasPrice.mul(120).div(100), // ۲۰ درصد بیشتر (برای سرعت آنی)
      };
    } catch (e) {
      console.error("Gas Estimation Error", e);
      return null;
    }
  },

  // ۲. مدیریت Nonce (جلوگیری از تداخل تراکنش‌ها)
  getNextNonce: async (address, provider) => {
    // ابتدا از شبکه می‌پرسیم، اما با دیتابیس محلی چک می‌کنیم 
    // که اگر تراکنشی در صف ارسال داریم، Nonce بعدی را بدهد
    const networkNonce = await provider.getTransactionCount(address);
    const localNonceKey = `@nonce_${address}`;
    const cachedNonce = await SmartCache.getRaw(localNonceKey) || 0;
    
    const finalNonce = Math.max(networkNonce, cachedNonce);
    await SmartCache.setRaw(localNonceKey, finalNonce + 1);
    return finalNonce;
  },

  // ۳. ارسال و مانیتورینگ تراکنش
  sendSmartTransaction: async (signedTx, network) => {
    try {
      SoundManager.play('TX_CHARGE'); // صدای شارژ نئونی
      
      const txResponse = await network.provider.sendTransaction(signedTx);
      
      // ذخیره در تاریخچه محلی برای نمایش فوری
      await SmartCache.savePendingTx(network.id, txResponse.hash);
      
      return txResponse;
    } catch (error) {
      SoundManager.play('TX_FAILED');
      throw error;
    }
  }
};
