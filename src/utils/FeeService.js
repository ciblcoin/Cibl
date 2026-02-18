import { ethers } from 'ethers';
import { PLATFORM_FEE_ADDRESS, SWAP_FEE_PERCENT } from '@env';

class FeeService {
  /**
   * محاسبه کل هزینه تراکنش شامل سوخت شبکه و کارمزد پلتفرم
   */
  static async estimateTotalCosts(provider, fromAddress, toAddress, amountInEther) {
    try {
      // ۱. تخمین Gas Limit (مقدار سوخت مورد نیاز)
      const gasLimit = await provider.estimateGas({
        from: fromAddress,
        to: toAddress,
        value: ethers.parseEther(amountInEther),
      });

      // ۲. دریافت قیمت لحظه‌ای Gas در شبکه
      const feeData = await provider.getFeeData();
      const gasPrice = feeData.gasPrice;

      // ۳. محاسبه هزینه شبکه (Network Fee)
      const networkFeeWei = gasLimit * gasPrice;
      const networkFeeEth = ethers.formatEther(networkFeeWei);

      // ۴. محاسبه کارمزد پلتفرم CiBL (مثلاً 0.3%)
      const amountWei = ethers.parseEther(amountInEther);
      const platformFeeWei = (amountWei * BigInt(Math.round(SWAP_FEE_PERCENT * 10000))) / BigInt(10000);
      const platformFeeEth = ethers.formatEther(platformFeeWei);

      // ۵. مجموع مبلغی که از کیف‌پول کاربر کسر می‌شود
      const totalCostEth = parseFloat(amountInEther) + parseFloat(networkFeeEth) + parseFloat(platformFeeEth);

      return {
        networkFee: networkFeeEth,
        platformFee: platformFeeEth,
        totalCost: totalCostEth.toString(),
        gasPriceGwei: ethers.formatUnits(gasPrice, 'gwei'),
      };
    } catch (error) {
      console.error("Fee Estimation Failed:", error);
      return null;
    }
  }
}

export default FeeService;
{/* بخشی از مودال تایید تراکنش */}
<View style={styles.feeContainer}>
  <View style={styles.feeRow}>
    <Text style={styles.feeLabel}>Network Fee (Gas)</Text>
    <Text style={styles.feeValue}>{fees.networkFee} ETH</Text>
  </View>
  
  <View style={styles.feeRow}>
    <Text style={styles.feeLabel}>CiBL Service Fee</Text>
    <Text style={[styles.feeValue, {color: '#06b6d4'}]}>{fees.platformFee} ETH</Text>
  </View>

  <View style={styles.divider} />

  <View style={styles.feeRow}>
    <Text style={styles.totalLabel}>Total Deducted</Text>
    <Text style={styles.totalValue}>{fees.totalCost} ETH</Text>
  </View>
</View>
