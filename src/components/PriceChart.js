import React from 'react';
import { View, Dimensions } from 'react-native';
import { CandlestickChart } from 'react-native-wagmi-charts';

const { width } = Dimensions.get('window');

const PriceChart = ({ data }) => {
  // دیتا باید شامل timestamp، open، high، low و close باشد
  if (!data || data.length === 0) return null;

  return (
    <View className="my-4 items-center bg-slate-900/30 rounded-3xl py-4">
      <CandlestickChart.Provider data={data}>
        <CandlestickChart width={width - 40} height={220}>
          <CandlestickChart.Candles 
            positiveColor="#22c55e" // سبز نئونی برای صعود
            negativeColor="#ef4444" // قرمز نئونی برای نزول
          />
          <CandlestickChart.Crosshair color="#FFD700">
            <CandlestickChart.Tooltip />
          </CandlestickChart.Crosshair>
        </CandlestickChart>
        
        <View className="flex-row justify-between w-full px-6 mt-2">
           <CandlestickChart.PriceText className="text-white font-bold text-lg" />
           <CandlestickChart.DatetimeText className="text-slate-500 text-xs" />
        </View>
      </CandlestickChart.Provider>
    </View>
  );
};

export default PriceChart;
const fetchOhlcData = async (tokenAddress) => {
  // مثال با استفاده از API دکس‌اسکرینر یا بیردآی
  const response = await fetch(`https://api.dexscreener.com/latest/dex/tokens/${tokenAddress}`);
  const json = await response.json();
  
  // تبدیل دیتای خام به فرمت استاندارد شمعی
  // Note: برخی APIها مستقیماً OHLC می‌دهند، برخی را باید خودتان فرمت کنید
  return formatToCandlesticks(json.pairs[0]);
};
