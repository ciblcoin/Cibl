import React from 'react';
import { View, Dimensions } from 'react-native';
import { LineChart } from 'react-native-wagmi-charts';

// دیتای تستی (در واقعیت این دیتا از API گرفته می‌شود)
const data = [
  { timestamp: 1, value: 1000 },
  { timestamp: 2, value: 1200 },
  { timestamp: 3, value: 1100 },
  { timestamp: 4, value: 1500 },
  { timestamp: 5, value: 1400 },
  { timestamp: 6, value: 1800 },
];

const PortfolioChart = ({ currencySymbol, color = '#06b6d4' }) => {
  return (
    <View className="my-6 items-center">
      <LineChart.Provider data={data}>
        <LineChart width={Dimensions.get('window').width - 40} height={200}>
          {/* خط اصلی نمودار با سایه نئونی */}
          <LineChart.Path color={color} width={3}>
            <LineChart.Gradient color={color} />
          </LineChart.Path>
          
          {/* نشانگر لمسی (Cursor) */}
          <LineChart.CursorCrosshair color={color}>
            <LineChart.Tooltip 
              textStyle={{ color: 'white', fontWeight: 'bold' }} 
              activeCursorColor={color}
              format={(v) => `${currencySymbol}${v}`}
            />
          </LineChart.CursorCrosshair>
        </LineChart>
      </LineChart.Provider>
    </View>
  );
};

export default PortfolioChart;
<View className="flex-row justify-center items-center">
  <View className="bg-green-500/20 px-3 py-1 rounded-full border border-green-500/50">
    <Text className="text-green-400 font-bold">+5.24% (24h)</Text>
  </View>
</View>
