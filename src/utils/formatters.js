// src/utils/formatters.js

export const Formatters = {
  /**
   * Shortens a long wallet address (e.g., 0x1234...abcd)
   */
  shortenAddress: (address, chars = 4) => {
    if (!address) return '';
    return `${address.substring(0, chars)}...${address.substring(address.length - chars)}`;
  },

  /**
   * Formats token prices with high precision (up to 10 decimals)
   * Removes trailing zeros for cleaner look
   */
  formatPrice: (price) => {
    if (typeof price !== 'number') return '0.00';
    return price.toFixed(10).replace(/\.?0+$/, "");
  },

  /**
   * Formats large numbers like Market Cap (e.g., 1.2B, 500M)
   */
  formatCompactNumber: (number) => {
    if (!number) return '0';
    return Intl.NumberFormat('en-US', {
      notation: "compact",
      maximumFractionDigits: 2
    }).format(number);
  },

  /**
   * Formats currency (USD)
   */
  formatCurrency: (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(amount);
  },

  /**
   * Formats percentage changes with (+) or (-) sign
   */
  formatPercent: (percent) => {
    if (!percent) return '0%';
    const sign = percent > 0 ? '+' : '';
    return `${sign}${percent.toFixed(2)}%`;
  }
};
