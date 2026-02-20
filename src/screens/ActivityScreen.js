import React from 'react';
import { View, Text, StyleSheet, ScrollView, Dimensions } from 'react-native';
import { LineChart } from 'react-native-chart-kit';
import { useTheme } from '../context/ThemeContext';
import { CiBLIcon, ICONS } from '../utils/Icons';

const screenWidth = Dimensions.get('window').width;

const ActivityScreen = () => {
  const { theme } = useTheme();

  // داده‌های تستی برای نمودار (قیمت‌ها در طول هفته)
  const chartData = {
    labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    datasets: [{
      data: [
        Math.random() * 1000 + 1000, 
        Math.random() * 1000 + 1000, 
        Math.random() * 1000 + 1000, 
        Math.random() * 1000 + 1000, 
        Math.random() * 1000 + 1000, 
        Math.random() * 1000 + 1000, 
        Math.random() * 1000 + 1000, 
      ]
    }]
  };

  // داده‌های تستی برای لیست تراکنش‌ها
  const transactions = [
    { id: '1', type: 'send', amount: '-0.12 ETH', status: 'CONFIRMED', to: '0xabc...123', time: '10:30 AM' },
    { id: '2', type: 'receive', amount: '+0.5 SOL', status: 'CONFIRMED', from: '0xdef...456', time: '09:15 AM' },
    { id: '3', type: 'swap', amount: '1.0 BNB -> 0.05 BTC', status: 'PENDING', time: 'Yesterday' },
    { id: '4', type: 'send', amount: '-0.001 WBTC', status: 'FAILED', to: '0xghi...789', time: 'Yesterday' },
  ];

  const chartConfig = {
    backgroundGradientFrom: theme.card,
    backgroundGradientTo: theme.card,
    decimalPlaces: 0, // تعداد ارقام بعد از اعشار
    color: (opacity = 1) => theme.primary, // رنگ خط نمودار
    labelColor: (opacity = 1) => theme.textMuted,
    strokeWidth: 2,
    propsForDots: {
      r: "4",
      strokeWidth: "2",
      stroke: theme.primary,
      fill: theme.background
    },
    propsForBackgroundLines: {
      strokeDasharray: "0", // خطوط راهنما
      stroke: theme.border
    }
  };

  const getTransactionIcon = (type, status) => {
    if (status === 'CONFIRMED') return ICONS.SUCCESS;
    if (status === 'PENDING') return ICONS.SWAP; // برای پندینگ آیکون بارگذاری
    if (status === 'FAILED') return ICONS.ERROR;
    
    return type === 'send' ? ICONS.SEND : ICONS.RECEIVE;
  };

  const getTransactionColor = (status) => {
    if (status === 'CONFIRMED') return '#22c55e'; // سبز
    if (status === 'PENDING') return '#fbbf24'; // زرد
    if (status === 'FAILED') return '#ef4444';   // قرمز
    return theme.text;
  };

  return (
    <ScrollView style={[styles.container, { backgroundColor: theme.background }]}>
      <Text style={[styles.title, { color: theme.text }]}>NETWORK ACTIVITY</Text>

      {/* نمودار نئونی نوسان */}
      <View style={[styles.chartContainer, { backgroundColor: theme.card, borderColor: theme.border }]}>
        <LineChart
          data={chartData}
          width={screenWidth - 40}
          height={220}
          chartConfig={chartConfig}
          bezier // برای خطوط منحنی نئونی
          style={{ borderRadius: 16 }}
        />
        <Text style={[styles.chartLabel, { color: theme.textMuted }]}>PORTFOLIO VALUE (LAST 7 DAYS)</Text>
      </View>

      {/* لیست تراکنش‌ها */}
      <View style={styles.transactionsList}>
        <Text style={[styles.sectionTitle, { color: theme.textMuted }]}>TRANSACTION LOG</Text>
        {transactions.map(tx => (
          <View key={tx.id} style={[styles.transactionItem, { borderColor: theme.border }]}>
            <CiBLIcon name={getTransactionIcon(tx.type, tx.status)} size={20} color={getTransactionColor(tx.status)} />
            <View style={styles.transactionDetails}>
              <Text style={[styles.transactionType, { color: theme.text }]}>
                {tx.type.toUpperCase()} {tx.amount}
              </Text>
              <Text style={[styles.transactionAddress, { color: theme.textMuted }]}>
                {tx.to || tx.from || 'Swap'}
              </Text>
            </View>
            <View style={styles.transactionStatusTime}>
              <Text style={[styles.statusText, { color: getTransactionColor(tx.status) }]}>{tx.status}</Text>
              <Text style={[styles.timeText, { color: theme.textMuted }]}>{tx.time}</Text>
            </View>
          </View>
        ))}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  title: { fontSize: 22, fontFamily: 'Orbitron-Bold', marginBottom: 25, marginTop: 40 },
  chartContainer: { 
    borderRadius: 16, 
    paddingVertical: 10, 
    borderWidth: 1, 
    marginBottom: 30,
    elevation: 5,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.8,
    shadowRadius: 10,
  },
  chartLabel: { fontSize: 10, fontFamily: 'Orbitron-Bold', textAlign: 'center', marginTop: 10 },
  transactionsList: { marginTop: 20 },
  sectionTitle: { fontSize: 10, fontFamily: 'Orbitron-Bold', letterSpacing: 2, marginBottom: 15 },
  transactionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
    borderBottomWidth: 1,
  },
  transactionDetails: { marginLeft: 15, flex: 1 },
  transactionType: { fontFamily: 'Orbitron-Bold', fontSize: 13 },
  transactionAddress: { fontFamily: 'Courier', fontSize: 11, marginTop: 4 },
  transactionStatusTime: { alignItems: 'flex-end' },
  statusText: { fontFamily: 'Orbitron-Bold', fontSize: 11 },
  timeText: { fontFamily: 'Courier', fontSize: 10, marginTop: 4 },
});

export default ActivityScreen;
