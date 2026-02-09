import axios from 'axios';

class HistoryService {
  /**
   * دریافت تاریخچه ترکیبی از تمام شبکه‌ها
   */
  static async getUniversalHistory(addresses) {
    try {
      const [solHistory, ethHistory, btcHistory] = await Promise.all([
        this.getSolanaHistory(addresses.solana),
        this.getEthereumHistory(addresses.evm),
        this.getBitcoinHistory(addresses.bitcoin)
      ]);

      // ترکیب و مرتب‌سازی بر اساس زمان (نزولی)
      return [...solHistory, ...ethHistory, ...btcHistory].sort(
        (a, b) => b.timestamp - a.timestamp
      );
    } catch (error) {
      console.error("History Sync Error:", error);
      return [];
    }
  }

  static async getSolanaHistory(address) {
    // استفاده از Helius یا مستقیم از RPC
    const response = await axios.get(`https://api.solana.com/`, { /* ... logic ... */ });
    return response.data.map(tx => ({
      id: tx.signature,
      chain: 'SOL',
      type: tx.type, // Send, Receive, Swap
      amount: tx.amount,
      status: 'success',
      timestamp: tx.blockTime * 1000
    }));
  }

  static async getBitcoinHistory(address) {
    const res = await axios.get(`https://api.blockcypher.com/v1/btc/main/addrs/${address}/full`);
    return res.data.txs.map(tx => ({
      id: tx.hash,
      chain: 'BTC',
      type: tx.outputs.some(o => o.addresses.includes(address)) ? 'Receive' : 'Send',
      amount: tx.total / 1e8,
      status: tx.confirmations > 0 ? 'success' : 'pending',
      timestamp: new Date(tx.confirmed || tx.received).getTime()
    }));
  }
}
