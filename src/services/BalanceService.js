import axios from 'axios';
import { Connection, PublicKey } from '@solana/web3.js';
import { ethers } from 'ethers';

const SOLANA_RPC = "https://api.mainnet-beta.solana.com";
const ETH_RPC = "https://mainnet.infura.io/v3/YOUR_INFURA_KEY";

class BalanceService {
  /**
   * دریافت موجودی و قیمت لحظه‌ای
   */
  static async getFullPortfolio(addresses) {
    try {
      // ۱. دریافت قیمت‌ها از CoinGecko یا اوراکل اختصاصی CiBL
      const prices = await this.getLivePrices();

      // ۲. دریافت موجودی‌ها به صورت موازی (Parallel) برای سرعت بالا
      const [solBalance, ethBalance, btcBalance] = await Promise.all([
        this.getSolanaBalance(addresses.solana),
        this.getEthereumBalance(addresses.evm),
        this.getBitcoinBalance(addresses.bitcoin)
      ]);

      const portfolio = [
        { name: 'Bitcoin', symbol: 'BTC', balance: btcBalance, valueUsd: btcBalance * prices.btc },
        { name: 'Ethereum', symbol: 'ETH', balance: ethBalance, valueUsd: ethBalance * prices.eth },
        { name: 'Solana', symbol: 'SOL', balance: solBalance, valueUsd: solBalance * prices.sol }
      ];

      const totalValue = portfolio.reduce((sum, coin) => sum + coin.valueUsd, 0);

      return { portfolio, totalValue };
    } catch (error) {
      console.error("Balance Fetch Error:", error);
      return null;
    }
  }

  static async getSolanaBalance(address) {
    const connection = new Connection(SOLANA_RPC);
    const balance = await connection.getBalance(new PublicKey(address));
    return balance / 1e9; // تبدیل Lamports به SOL
  }

  static async getEthereumBalance(address) {
    const provider = new ethers.JsonRpcProvider(ETH_RPC);
    const balance = await provider.getBalance(address);
    return parseFloat(ethers.formatEther(balance));
  }

  static async getBitcoinBalance(address) {
    // استفاده از Blockcypher (رایگان و بدون نیاز به کلید برای تست)
    const res = await axios.get(`https://api.blockcypher.com/v1/btc/main/addrs/${address}/balance`);
    return res.data.balance / 1e8; // تبدیل Satoshis به BTC
  }

  static async getLivePrices() {
    const res = await axios.get('https://api.coingecko.com/api/v3/simple/price?ids=bitcoin,ethereum,solana&vs_currencies=usd');
    return {
      btc: res.data.bitcoin.usd,
      eth: res.data.ethereum.usd,
      sol: res.data.solana.usd
    };
  }
}

export default BalanceService;
