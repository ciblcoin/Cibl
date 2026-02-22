import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, TextInput, TouchableOpacity } from 'react-native';
import { useTheme } from '../../context/ThemeContext';
import { CiBLIcon } from '../../utils/Icons';

const TokenListScreen = ({ navigation }) => {
  const { theme } = useTheme();
  const [search, setSearch] = useState('');

  // فرض بر وجود لیستی بزرگ از توکن‌های تمام شبکه‌ها
  const allTokens = [
    { id: '1', name: 'Solana', symbol: 'SOL', network: 'SOLANA', price: '$85.93' },
    { id: '2', name: 'Ethereum', symbol: 'ETH', network: 'EVM', price: '$2,450' },
    { id: '3', name: 'Polygon', symbol: 'MATIC', network: 'EVM', price: '$0.82' },
    // ... سایر توکن‌ها
  ];

  const filteredTokens = allTokens.filter(t => 
    t.name.toLowerCase().includes(search.toLowerCase()) || 
    t.symbol.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <CiBLIcon name="ArrowLeft" size={24} color={theme.text} />
        </TouchableOpacity>
        <Text style={[styles.title, { color: theme.text }]}>ALL_ASSETS</Text>
        <View style={{ width: 24 }} />
      </View>

      <View style={[styles.searchBar, { backgroundColor: theme.card, borderColor: theme.border }]}>
        <CiBLIcon name="Search" size={18} color={theme.textMuted} />
        <TextInput
          placeholder="SEARCH_TOKEN_OR_NETWORK"
          placeholderTextColor={theme.textMuted}
          style={[styles.searchInput, { color: theme.text }]}
          value={search}
          onChangeText={setSearch}
        />
      </View>

      <FlatList
        data={filteredTokens}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <View style={styles.tokenRow}>
            <View style={styles.iconPlaceholder} />
            <View style={{ flex: 1 }}>
              <Text style={[styles.tokenName, { color: theme.text }]}>{item.name}</Text>
              <Text style={[styles.tokenNet, { color: theme.primary }]}>{item.network}</Text>
            </View>
            <Text style={[styles.tokenPrice, { color: theme.text }]}>{item.price}</Text>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, paddingHorizontal: 20 },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingTop: 60, marginBottom: 20 },
  title: { fontFamily: 'Orbitron-Bold', fontSize: 16 },
  searchBar: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 15, height: 50, borderRadius: 12, borderWidth: 1, marginBottom: 20 },
  searchInput: { flex: 1, marginLeft: 10, fontFamily: 'Courier' },
  tokenRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 20 },
  iconPlaceholder: { width: 40, height: 40, borderRadius: 20, backgroundColor: '#333', marginRight: 15 },
  tokenName: { fontFamily: 'Orbitron-Bold', fontSize: 14 },
  tokenNet: { fontFamily: 'Courier', fontSize: 10 },
  tokenPrice: { fontFamily: 'Orbitron-Bold', fontSize: 14 }
});

export default TokenListScreen;
