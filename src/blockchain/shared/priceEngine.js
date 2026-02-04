const CIBL_FEE_PERCENT = 0.006; // 0.6% Transaction Fee

export const PriceEngine = {
  /**
   * Fetches the best quote for a swap
   * @param {string} fromToken - Mint address of the source token
   * @param {string} toToken - Mint address of the destination token
   * @param {number} amount - Amount to swap (in smallest unit/lamports)
   * @param {string} chain - The blockchain (solana, bsc, ethereum)
   */
  async getQuote(fromToken, toToken, amount, chain) {
    try {
      let quoteData;
      
      if (chain === 'solana') {
        // Fetching from Jupiter Aggregator API
        const response = await fetch(
          `https://quote-api.jup.ag/v6/quote?inputMint=${fromToken}&outputMint=${toToken}&amount=${amount}&slippageBps=50`
        );
        quoteData = await response.json();
      } else {
        // Defaulting to 1inch or similar for EVM chains
        const response = await fetch(
          `https://api.1inch.io/v5.0/1/quote?fromTokenAddress=${fromToken}&toTokenAddress=${toToken}&amount=${amount}`
        );
        quoteData = await response.json();
      }

      return this.calculateFinalAmount(quoteData, chain);
    } catch (error) {
      console.error("Price Engine Error:", error);
      return null;
    }
  },

  /**
   * Deducts CiBL's 0.6% fee and returns the final user amount
   */
  calculateFinalAmount(quoteData, chain) {
    let rawOutput;
    
    if (chain === 'solana') {
      rawOutput = parseInt(quoteData.outAmount);
    } else {
      rawOutput = parseInt(quoteData.toTokenAmount);
    }

    const feeAmount = rawOutput * CIBL_FEE_PERCENT;
    const userAmount = rawOutput - feeAmount;

    return {
      rawOutput: rawOutput,
      ciblFee: feeAmount,
      finalUserAmount: userAmount,
      priceImpact: quoteData.priceImpactPct || 0,
    };
  }
};
