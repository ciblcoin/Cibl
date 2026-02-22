import React from 'react';
import { View, Text, StyleSheet, FlatList, Image } from 'react-native';
import { useTheme } from '../../context/ThemeContext';
import { CiBLIcon } from '../../utils/Icons';

const TrendingScreen = () => {
  const { theme } = useTheme();

  const trendingData = [
    { id: '1', name: 'Monad', symbol: 'MON', change: '+15.4%', price: '$1.25', rank: '1' },
    { id: '2', name: 'Solana', symbol: 'SOL', change: '+8.2%', price: '$85.90', rank: '2' },
    { id: '3', name: 'Pepe', symbol: 'PEPE', change: '+45.1%', price: '$0.00001', rank: '3' },
  ];

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <Text style={[styles.header, { color: theme.primary }]}>MARKET_TRENDS</Text>
      
      <FlatList
        data={trendingData}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <View style={[styles.trendCard, { backgroundColor: theme.card, borderColor: theme.border }]}>
            <View style={styles.cardLeft}>
              <Text style={[styles.rank, { color: theme.textMuted }]}>#{item.rank}</Text>
              <View>
                <Text style={[styles.coinName, { color: theme.text }]}>{item.name}</Text>
                <Text style={[styles.coinSymbol, { color: theme.textMuted }]}>{item.symbol}</Text>
              </View>
            </View>
            <View style={styles.cardRight}>
              <Text style={[styles.price, { color: theme.text }]}>{item.price}</Text>
              <Text style={[styles.change, { color: '#4ADE80' }]}>{item.change}</Text>
            </View>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, paddingHorizontal: 20, paddingTop: 60 },
  header: { fontFamily: 'Orbitron-Bold', fontSize: 18, marginBottom: 25, letterSpacing: 2 },
  trendCard: { flexDirection: 'row', justifyContent: 'space-between', padding: 15, borderRadius: 15, borderWidth: 1, marginBottom: 12 },
  cardLeft: { flexDirection: 'row', alignItems: 'center' },
  rank: { fontFamily: 'Orbitron-Bold', fontSize: 12, marginRight: 15 },
  coinName: { fontFamily: 'Orbitron-Bold', fontSize: 14 },
  coinSymbol: { fontFamily: 'Courier', fontSize: 10 },
  cardRight: { alignItems: 'flex-end' },
  price: { fontFamily: 'Orbitron-Bold', fontSize: 14 },
  change: { fontFamily: 'Courier', fontSize: 12 }
});

export default TrendingScreen;
