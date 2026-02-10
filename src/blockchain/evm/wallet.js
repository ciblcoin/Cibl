import { ethers } from 'ethers';
import { EVM_CONFIG } from './config';

export const getEvmProvider = (networkKey) => {
  const config = EVM_CONFIG[networkKey];
  return new ethers.JsonRpcProvider(config.rpc);
};

export const createEvmWallet = (privateKey, networkKey) => {
  const config = EVM_CONFIG[networkKey];
  const provider = getEvmProvider(networkKey);
  const wallet = new ethers.Wallet(privateKey, provider);

  return {
    address: wallet.address,
    network: config.name,
    
    // دریافت موجودی نئونی
    getBalance: async () => {
      const balance = await provider.getBalance(wallet.address);
      return ethers.formatEther(balance);
    },

    // تخمین کارمزد (Gas Estimate) قبل از ارسال
    estimateGas: async (to, amount) => {
      const tx = { to, value: ethers.parseEther(amount) };
      const estimate = await provider.estimateGas(tx);
      const feeData = await provider.getFeeData();
      const totalCost = estimate * feeData.gasPrice;
      return ethers.formatEther(totalCost);
    },

    // ارسال تراکنش با افکت صوتی موفقیت
    sendTx: async (to, amount) => {
      const tx = await wallet.sendTransaction({
        to,
        value: ethers.parseEther(amount)
      });
      return tx.hash;
    }
  };
};
