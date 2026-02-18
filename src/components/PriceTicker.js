import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { TrendingUp, TrendingDown } from 'lucide-react-native';
import { MotiView } from 'moti';

const PriceTicker = () => {
  const [prices, setPrices] = useState([
    { id: 'bitcoin', symbol: 'BTC', price: 0, change: 0 },
    { id: 'ethereum', symbol: 'ETH', price: 0, change: 0 },
    { id: 'solana', symbol: 'SOL', price: 0, change: 0 },
  ]);

  const fetchPrices = async () => {
    try {
      const response = await fetch(
        'https://api.coingecko.com/api/v3/simple/price?ids=bitcoin,ethereum,solana&vs_currencies=usd&include_24hr_change=true'
      );
      const data = await response.json();
      
      setPrices([
        { id: 'bitcoin', symbol: 'BTC', price: data.bitcoin.usd, change: data.bitcoin.usd_24h_change },
        { id: 'ethereum', symbol: 'ETH', price: data.ethereum.usd, change: data.ethereum.usd_24h_change },
        { id: 'solana', symbol: 'SOL', price: data.solana.usd, change: data.solana.usd_24h_change },
      ]);
    } catch (error) {
      console.error("Price Fetch Error:", error);
    }
  };

  useEffect(() => {
    fetchPrices();
    const interval = setInterval(fetchPrices, 60000); // به‌روزرسانی هر یک دقیقه
    return () => clearInterval(interval);
  }, []);

  return (
    <View style={styles.container}>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.scroll}>
        {prices.map((item) => (
          <MotiView 
            key={item.id}
            from={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            style={styles.card}
          >
            <Text style={styles.symbol}>{item.symbol}</Text>
            <Text style={styles.price}>${item.price.toLocaleString()}</Text>
            <View style={styles.changeRow}>
              {item.change >= 0 ? (
                <TrendingUp size={12} color="#10B981" />
              ) : (
                <TrendingDown size={12} color="#F43F5E" />
              )}
              <Text style={[styles.change, { color: item.change >= 0 ? '#10B981' : '#F43F5E' }]}>
                {item.change.toFixed(2)}%
              </Text>
            </View>
          </MotiView>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { marginTop: 20, height: 100 },
  scroll: { paddingLeft: 20, gap: 15 },
  card: {
    backgroundColor: '#0F172A',
    padding: 15,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#1E293B',
    minWidth: 120,
    alignItems: 'center',
    shadowColor: '#06b6d4',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
  },
  symbol: { fontFamily: 'Orbitron-Bold', color: '#94A3B8', fontSize: 10 },
  price: { fontFamily: 'Orbitron-Bold', color: '#fff', fontSize: 16, marginVertical: 5 },
  changeRow: { flexDirection: 'row', alignItems: 'center', gap: 4 },
  change: { fontFamily: 'Cairo-Bold', fontSize: 12 }
});

export default PriceTicker;
