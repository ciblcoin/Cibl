import { SolanaSwap } from './providers/jupiter';
import { EvmSwap } from './providers/oneInch';
import { TonSwap } from './providers/stonFi';

export const executeSwap = async (chain, fromToken, toToken, amount, wallet) => {
  switch (chain) {
    case 'solana':
      return await SolanaSwap(fromToken, toToken, amount, wallet);
    case 'evm':
      return await EvmSwap(fromToken, toToken, amount, wallet);
    case 'ton':
      return await TonSwap(fromToken, toToken, amount, wallet);
    default:
      throw new Error("Chain not supported for swap");
  }
};
