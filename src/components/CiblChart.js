import React from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import { LineChart } from 'react-native-chart-kit';
import { useTheme } from '../context/ThemeContext';

const { width } = Dimensions.get('window');

const CiblChart = ({ data, assetName }) => {
  const { theme } = useTheme();

  // داده‌های نمونه (در پروژه واقعی، از API دریافت می‌شود)
  const chartData = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
    datasets: [{
      data: [
        Math.random() * 100,
        Math.random() * 100,
        Math.random() * 100,
        Math.random() * 100,
        Math.random() * 100,
        Math.random() * 100
      ],
      color: (opacity = 1) => theme.primary, // رنگ خط نمودار
      strokeWidth: 2 // ضخامت خط
    }]
  };

  return (
    <View style={[styles.chartContainer, { backgroundColor: theme.card, borderColor: theme.border }]}>
      <Text style={[styles.chartTitle, { color: theme.text }]}>{assetName}_PERFORMANCE</Text>
      <LineChart
        data={chartData}
        width={width - 60} // عرض صفحه منهای padding
        height={220}
        chartConfig={{
          backgroundColor: 'transparent',
          backgroundGradientFrom: theme.card,
          backgroundGradientTo: theme.card,
          decimalPlaces: 2, // دقت اعداد
          color: (opacity = 1) => theme.textMuted, // رنگ متن‌ها
          labelColor: (opacity = 1) => theme.textMuted,
          style: {
            borderRadius: 16
          },
          propsForDots: {
            r: "6",
            strokeWidth: "2",
            stroke: theme.primary
          }
        }}
        bezier // افکت منحنی نرم
        style={styles.chartStyle}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  chartContainer: {
    borderRadius: 20,
    borderWidth: 1,
    paddingVertical: 15,
    marginVertical: 20,
    alignItems: 'center',
  },
  chartTitle: {
    fontFamily: 'Orbitron-Bold',
    fontSize: 12,
    letterSpacing: 1,
    marginBottom: 10,
  },
  chartStyle: {
    marginVertical: 8,
    borderRadius: 16,
  },
});

export default CiblChart;
