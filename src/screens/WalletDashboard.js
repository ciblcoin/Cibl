import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useTheme } from '../context/ThemeContext';
import { CiBLIcon, ICONS } from '../utils/Icons';
import CiblButton from '../components/CiblButton';
import CiblAvatar from '../components/CiblAvatar';
import LogoHeader from '../components/LogoHeader';

const WalletDashboard = ({ navigation }) => {
  const { theme } = useTheme();
  const [showBalance, setShowBalance] = useState(true);

  // داده‌های فرضی برای نمایش
  const walletData = {
    totalBalance: "12,850.42",
    address: "0x7aC0c7...A94e2",
    change: "+5.25%"
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      {/* هدر بالایی با قابلیت Easter Egg */}
      <View style={styles.headerRow}>
        <LogoHeader onUnlockMatrix={() => console.log("Matrix Unlocked!")} />
        <TouchableOpacity onPress={() => navigation.navigate('Profile')}>
          <CiblAvatar address={walletData.address} size={40} />
        </TouchableOpacity>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* بخش موجودی کل */}
        <View style={styles.balanceContainer}>
          <Text style={[styles.label, { color: theme.textMuted }]}>TOTAL ASSETS</Text>
          <View style={styles.balanceRow}>
            <Text style={[styles.balanceText, { color: theme.text }]}>
              {showBalance ? `$${walletData.totalBalance}` : "••••••••"}
            </Text>
            <TouchableOpacity onPress={() => setShowBalance(!showBalance)} style={styles.eyeBtn}>
              <CiBLIcon name={showBalance ? ICONS.HIDE_BALANCE : ICONS.SHOW_BALANCE} size={20} />
            </TouchableOpacity>
          </View>
          <View style={[styles.changeBadge, { backgroundColor: theme.primary + '15' }]}>
            <Text style={[styles.changeText, { color: theme.primary }]}>{walletData.change} ↗</Text>
          </View>
        </View>

        {/* دکمه‌های عملیاتی سریع (Quick Actions) */}
        <View style={styles.actionRow}>
          <View style={styles.actionItem}>
            <CiblButton 
              variant="primary" 
              style={styles.roundBtn} 
              onPress={() => navigation.navigate('Send')}
              title={<CiBLIcon name={ICONS.SEND} size={24} color={theme.id === 'light' ? '#FFF' : '#000'} />}
            />
            <Text style={[styles.actionLabel, { color: theme.text }]}>SEND</Text>
          </View>
          
          <View style={styles.actionItem}>
            <CiblButton 
              variant="outline" 
              style={styles.roundBtn} 
              onPress={() => navigation.navigate('Receive')}
              title={<CiBLIcon name={ICONS.RECEIVE} size={24} color={theme.primary} />}
            />
            <Text style={[styles.actionLabel, { color: theme.text }]}>RECEIVE</Text>
          </View>

          <View style={styles.actionItem}>
            <CiblButton 
              variant="outline" 
              style={styles.roundBtn} 
              onPress={() => navigation.navigate('Scanner')}
              title={<CiBLIcon name={ICONS.FAST_PAY} size={24} color={theme.primary} />}
            />
            <Text style={[styles.actionLabel, { color: theme.text }]}>SCAN</Text>
          </View>
        </View>

        {/* بخش لیست ارزها (Assets) */}
        <View style={[styles.assetsCard, { backgroundColor: theme.card, borderColor: theme.border }]}>
          <Text style={[styles.sectionTitle, { color: theme.text }]}>MY ASSETS</Text>
          
          <AssetItem name="Ethereum" symbol="ETH" balance="1.42" value="$3,200.12" icon="Layers" />
          <AssetItem name="HyperEVM" symbol="HYP" balance="550.00" value="$1,100.00" icon="Zap" />
          <AssetItem name="Solana" symbol="SOL" balance="24.5" value="$2,450.00" icon="Cpu" />
        </View>
      </ScrollView>
    </View>
  );
};

// کامپوننت داخلی برای هر ردیف ارز
const AssetItem = ({ name, symbol, balance, value, icon }) => {
  const { theme } = useTheme();
  return (
    <TouchableOpacity style={[styles.assetRow, { borderBottomColor: theme.border }]}>
      <View style={[styles.assetIcon, { backgroundColor: theme.primary + '20' }]}>
        <CiBLIcon name={icon} size={20} color={theme.primary} />
      </View>
      <View style={{ flex: 1, marginLeft: 15 }}>
        <Text style={[styles.assetName, { color: theme.text }]}>{name}</Text>
        <Text style={[styles.assetSymbol, { color: theme.textMuted }]}>{balance} {symbol}</Text>
      </View>
      <Text style={[styles.assetValue, { color: theme.text }]}>{value}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, paddingHorizontal: 20 },
  headerRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 50, marginBottom: 20 },
  balanceContainer: { alignItems: 'center', marginVertical: 30 },
  label: { fontFamily: 'Orbitron-Bold', fontSize: 10, letterSpacing: 2 },
  balanceRow: { flexDirection: 'row', alignItems: 'center', marginTop: 10 },
  balanceText: { fontSize: 36, fontFamily: 'Orbitron-Bold' },
  eyeBtn: { marginLeft: 15 },
  changeBadge: { paddingHorizontal: 12, paddingVertical: 4, borderRadius: 20, marginTop: 10 },
  changeText: { fontSize: 12, fontFamily: 'Orbitron-Bold' },
  actionRow: { flexDirection: 'row', justifyContent: 'space-around', marginBottom: 40 },
  actionItem: { alignItems: 'center' },
  roundBtn: { width: 70, height: 70, borderRadius: 35 },
  actionLabel: { fontFamily: 'Orbitron-Bold', fontSize: 10, marginTop: 8 },
  assetsCard: { borderRadius: 24, borderWidth: 1, padding: 20, marginBottom: 100 },
  sectionTitle: { fontFamily: 'Orbitron-Bold', fontSize: 14, marginBottom: 20 },
  assetRow: { flexDirection: 'row', alignItems: 'center', paddingVertical: 15, borderBottomWidth: 1 },
  assetIcon: { width: 45, height: 45, borderRadius: 12, justifyContent: 'center', alignItems: 'center' },
  assetName: { fontFamily: 'Cairo-Bold', fontSize: 15 },
  assetSymbol: { fontSize: 12 },
  assetValue: { fontFamily: 'Orbitron-Bold', fontSize: 13 }
});

export default WalletDashboard;
