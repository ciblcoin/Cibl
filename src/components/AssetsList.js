import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList } from 'react-native';
import { useTheme } from '../context/ThemeContext';
import { CiBLIcon, ICONS } from '../utils/Icons';

const ASSETS_DATA = [
  { id: '1', name: 'Ethereum', symbol: 'ETH', balance: '1.425', value: '$3,250.80', change: '+2.4%', icon: 'Layers' },
  { id: '2', name: 'Solana', symbol: 'SOL', balance: '24.50', value: '$2,100.15', change: '-1.2%', icon: 'Cpu' },
  { id: '3', name: 'HyperEVM', symbol: 'HYP', balance: '1,200', value: '$1,200.00', change: '0.0%', icon: 'Zap' },
  { id: '4', name: 'Tether', symbol: 'USDT', balance: '500.00', value: '$500.00', change: '+0.01%', icon: 'ShieldCheck' },
];

const AssetsList = () => {
  const { theme } = useTheme();

  const renderItem = ({ item }) => (
    <TouchableOpacity 
      style={[styles.assetItem, { backgroundColor: theme.card, borderColor: theme.border }]}
      activeOpacity={0.7}
    >
      {/* آیکون ارز با پس‌زمینه محو نئونی */}
      <View style={[styles.iconWrapper, { backgroundColor: theme.primary + '15' }]}>
        <CiBLIcon name={item.icon} size={22} color={theme.primary} />
      </View>

      {/* نام و نماد ارز */}
      <View style={styles.nameContainer}>
        <Text style={[styles.assetName, { color: theme.text }]}>{item.name}</Text>
        <Text style={[styles.assetSymbol, { color: theme.textMuted }]}>{item.symbol}</Text>
      </View>

      {/* موجودی و تغییرات قیمت */}
      <View style={styles.valueContainer}>
        <Text style={[styles.assetValue, { color: theme.text }]}>{item.balance}</Text>
        <Text style={[
          styles.assetChange, 
          { color: item.change.startsWith('+') ? '#22c55e' : item.change.startsWith('-') ? '#ef4444' : theme.textMuted }
        ]}>
          {item.change}
        </Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={styles.listHeader}>
        <Text style={[styles.headerTitle, { color: theme.text }]}>ACTIVE_ASSETS</Text>
        <TouchableOpacity>
          <Text style={[styles.viewAll, { color: theme.primary }]}>VIEW_ALL</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={ASSETS_DATA}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        scrollEnabled={false} // چون داخل ScrollView اصلی داشبورد است
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { marginTop: 25, paddingHorizontal: 20 },
  listHeader: { 
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    alignItems: 'center', 
    marginBottom: 15 
  },
  headerTitle: { fontFamily: 'Orbitron-Bold', fontSize: 12, letterSpacing: 2 },
  viewAll: { fontFamily: 'Orbitron-Bold', fontSize: 10 },
  assetItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    borderRadius: 16,
    borderWidth: 1,
    marginBottom: 12,
  },
  iconWrapper: {
    width: 45,
    height: 45,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  nameContainer: { flex: 1, marginLeft: 15 },
  assetName: { fontFamily: 'Cairo-Bold', fontSize: 16 },
  assetSymbol: { fontFamily: 'Courier', fontSize: 12, marginTop: 2 },
  valueContainer: { alignItems: 'flex-end' },
  assetValue: { fontFamily: 'Orbitron-Bold', fontSize: 14 },
  assetChange: { fontFamily: 'Courier', fontSize: 11, marginTop: 4 },
});

export default AssetsList;
