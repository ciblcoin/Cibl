import { SuiModule } from './sui/wallet';
import { getSolanaBalance } from './solana/engine';
import { getEvmBalance } from './evm/engine';

const PRICE_API = "https://api.coingecko.com/api/v3/simple/price?ids=bitcoin,solana,ethereum,binancecoin,sui,the-open-network&vs_currencies=usd";

export const fetchAllBalances = async (userAddresses) => {
  try {

    const priceResponse = await fetch(PRICE_API);
    const prices = await priceResponse.json();

 
    const [sol, eth, bsc, sui, btc] = await Promise.all([
      getSolanaBalance(userAddresses.solana),
      getEvmBalance(userAddresses.evm, 'ethereum'),
      getEvmBalance(userAddresses.evm, 'bsc'),
      SuiModule.getBalance(userAddresses.sui),
      // fetchBtcBalance(userAddresses.btc)
    ]);

    const assets = [
      { id: 'btc', name: 'Bitcoin', balance: btc || 0, value: (btc || 0) * prices.bitcoin.usd },
      { id: 'sol', name: 'Solana', balance: sol || 0, value: (sol || 0) * prices.solana.usd },
      { id: 'eth', name: 'Ethereum', balance: eth || 0, value: (eth || 0) * prices.ethereum.usd },
      { id: 'bnb', name: 'BSC', balance: bsc || 0, value: (bsc || 0) * prices.binancecoin.usd },
      { id: 'sui', name: 'Sui', balance: sui || 0, value: (sui || 0) * prices.sui.usd },
    ];

    const totalNetWorth = assets.reduce((sum, asset) => sum + asset.value, 0);

    return {
      totalNetWorth: totalNetWorth.toFixed(2),
      assets: assets
    };
  } catch (error) {
    console.error("Error aggregating balances:", error);
    return null;
  }
};
