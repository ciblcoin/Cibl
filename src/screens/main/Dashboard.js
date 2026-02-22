import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image } from 'react-native';
import { useTheme } from '../../context/ThemeContext';
import { CiBLIcon, ICONS } from '../../utils/Icons';
import PageBody from '../../components/PageBody';

const Dashboard = ({ navigation }) => {
  const { theme } = useTheme();

  // داده‌های نمونه برای ۱۵ توکن از بلاک‌چین‌های مختلف
  const tokens = [
    { id: '1', name: 'Cibl', symbol: 'CIB', price: '$210.37', change: '+$2.08', balance: '30.95B', icon: 'CIBL' },
    { id: '2', name: 'Solana', symbol: 'SOL', price: '$85.93', change: '+2.57%', balance: '0.0099', icon: 'SOL' },
    { id: '3', name: 'Ethereum', symbol: 'ETH', price: '$2,450.00', change: '+1.20%', balance: '1.24', icon: 'ETH' },
    { id: '4', name: 'Bitcoin', symbol: 'BTC', price: '$48,000', change: '-0.50%', balance: '0.05', icon: 'BTC' },
    { id: '5', name: 'Monad', symbol: 'MON', price: '$1.20', change: '+5.00%', balance: '500', icon: 'MON' },
    // ... اضافه کردن سایر توکن‌ها تا ۱۵ عدد
  ];

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      
      {/* ۱. هدر (Header) */}
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <View style={[styles.pixelLogo, { backgroundColor: theme.primary }]} />
          <Text style={[styles.walletName, { color: theme.text }]}>BLMO</Text>
        </View>
        <TouchableOpacity onPress={() => navigation.toggleDrawer()}>
          <CiBLIcon name="Menu" size={24} color={theme.text} />
        </TouchableOpacity>
      </View>

      <PageBody>
        {/* ۲. موجودی کل (Total Balance) */}
        <View style={styles.balanceSection}>
          <Text style={[styles.totalBalance, { color: theme.text }]}>$218.28</Text>
          <Text style={[styles.balanceChange, { color: '#4ADE80' }]}>+$2.35 (+1.09%)</Text>
        </View>

        {/* ۳. دکمه‌های عملیاتی (Quick Actions) */}
        <View style={styles.actionRow}>
          <ActionButton label="Send" icon="Send" color={theme.card} textColor={theme.text} />
          <ActionButton label="Swap" icon="Swap" color={theme.card} textColor={theme.text} />
          <ActionButton label="Receive" icon="QrCode" color={theme.card} textColor={theme.text} />
          <ActionButton label="Buy" icon="DollarSign" color={theme.card} textColor={theme.text} />
        </View>

        {/* ۴. لیست توکن‌ها (Tokens List) */}
        <View style={styles.tokenHeader}>
          <Text style={[styles.sectionTitle, { color: theme.text }]}>Tokens</Text>
          <CiBLIcon name="ChevronRight" size={20} color={theme.textMuted} />
        </View>

        {tokens.map((token) => (
          <TokenItem key={token.id} token={token} theme={theme} />
        ))}

        <TouchableOpacity style={styles.seeMoreBtn}>
          <Text style={{ color: theme.primary, fontFamily: 'Orbitron-Bold', fontSize: 12 }}>SEE MORE</Text>
        </TouchableOpacity>
      </PageBody>

      {/* ۵. چت کشویی شناور (Floating Chat) */}
      <TouchableOpacity style={[styles.chatFloatingBtn, { backgroundColor: theme.primary }]}>
        <CiBLIcon name="MessageSquare" size={24} color="#000" />
      </TouchableOpacity>
    </View>
  );
};

// کامپوننت دکمه‌های عملیاتی
const ActionButton = ({ label, icon, color, textColor }) => (
  <TouchableOpacity style={styles.actionBtnWrapper}>
    <View style={[styles.actionIconCircle, { backgroundColor: color }]}>
      <CiBLIcon name={icon} size={22} color={textColor} />
    </View>
    <Text style={[styles.actionLabel, { color: textColor }]}>{label}</Text>
  </TouchableOpacity>
);

// کامپوننت آیتم توکن
const TokenItem = ({ token, theme }) => (
  <View style={styles.tokenItem}>
    <View style={styles.tokenLeft}>
      <View style={[styles.tokenIcon, { backgroundColor: theme.card }]} />
      <View>
        <Text style={[styles.tokenName, { color: theme.text }]}>{token.name}</Text>
        <Text style={[styles.tokenBalance, { color: theme.textMuted }]}>{token.balance} {token.symbol}</Text>
      </View>
    </View>
    <View style={styles.tokenRight}>
      <Text style={[styles.tokenPrice, { color: theme.text }]}>{token.price}</Text>
      <Text style={[styles.tokenChange, { color: token.change.includes('+') ? '#4ADE80' : '#F87171' }]}>
        {token.change}
      </Text>
    </View>
  </View>
);

const styles = StyleSheet.create({
  container: { flex: 1 },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 20, paddingTop: 50, paddingBottom: 15 },
  headerLeft: { flexDirection: 'row', alignItems: 'center' },
  pixelLogo: { width: 32, height: 32, borderRadius: 8, marginRight: 10 },
  walletName: { fontFamily: 'Orbitron-Bold', fontSize: 16 },
  balanceSection: { alignItems: 'center', marginVertical: 30 },
  totalBalance: { fontSize: 42, fontFamily: 'Orbitron-Bold' },
  balanceChange: { fontSize: 14, fontFamily: 'Courier', marginTop: 5 },
  actionRow: { flexDirection: 'row', justifyContent: 'space-around', paddingHorizontal: 10, marginBottom: 30 },
  actionBtnWrapper: { alignItems: 'center' },
  actionIconCircle: { width: 55, height: 55, borderRadius: 15, justifyContent: 'center', alignItems: 'center', marginBottom: 8 },
  actionLabel: { fontSize: 12, fontFamily: 'Courier' },
  tokenHeader: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 20, marginBottom: 15 },
  sectionTitle: { fontSize: 18, fontFamily: 'Orbitron-Bold', marginRight: 5 },
  tokenItem: { flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 20, paddingVertical: 15, alignItems: 'center' },
  tokenLeft: { flexDirection: 'row', alignItems: 'center' },
  tokenIcon: { width: 45, height: 45, borderRadius: 22.5, marginRight: 15 },
  tokenName: { fontSize: 15, fontFamily: 'Orbitron-Bold' },
  tokenBalance: { fontSize: 12, fontFamily: 'Courier', marginTop: 2 },
  tokenRight: { alignItems: 'flex-end' },
  tokenPrice: { fontSize: 15, fontFamily: 'Orbitron-Bold' },
  tokenChange: { fontSize: 12, fontFamily: 'Courier' },
  seeMoreBtn: { alignItems: 'center', paddingVertical: 20, marginBottom: 100 },
  chatFloatingBtn: { position: 'absolute', right: 20, bottom: 100, width: 60, height: 60, borderRadius: 30, justifyContent: 'center', alignItems: 'center', elevation: 10, shadowOpacity: 0.5, shadowRadius: 10 }
});

export default Dashboard;


const Dashboard = ({ navigation }) => {
  const { theme } = useTheme();

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      
      {/* هدر اصلاح شده با اتصالات کامل */}
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          {/* ۱. اتصال لوگو و نام به نمایش جزئیات کیف پول */}
          <TouchableOpacity 
            style={styles.walletInfoRow} 
            onPress={() => navigation.navigate('WalletDetails')}
          >
            <View style={[styles.pixelLogo, { backgroundColor: theme.primary }]}>
               <Text style={styles.pixelText}>C</Text>
            </View>
            <View>
              <Text style={[styles.walletName, { color: theme.text }]}>BLMO</Text>
              <Text style={[styles.walletAddress, { color: theme.textMuted }]}>@BLMO</Text>
            </View>
          </TouchableOpacity>
        </View>

        <View style={styles.headerRight}>
          {/* ۲. دکمه تاریخچه (ساعت) طبق تصویر ارسالی */}
          <TouchableOpacity 
            style={styles.headerIconBtn} 
            onPress={() => navigation.navigate('History')}
          >
            <CiBLIcon name="Clock" size={22} color={theme.text} />
          </TouchableOpacity>

          {/* ۳. دکمه جستجو یا اسکنر */}
          <TouchableOpacity 
            style={styles.headerIconBtn} 
            onPress={() => navigation.navigate('Scanner')}
          >
            <CiBLIcon name="Search" size={22} color={theme.text} />
          </TouchableOpacity>

          {/* ۴. اتصال دکمه منو به دراور (Drawer) */}
          <TouchableOpacity 
            style={styles.headerIconBtn} 
            onPress={() => navigation.openDrawer()}
          >
            <CiBLIcon name="Menu" size={24} color={theme.text} />
          </TouchableOpacity>
        </View>
      </View>

      {/* مابقی بدنه که قبلاً طراحی کردیم */}
      <PageBody>
         {/* ... */}
      </PageBody>
    </View>
  );
};


const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 15,
    paddingTop: 50,
    paddingBottom: 10,
    borderBottomWidth: 0.5,
    borderBottomColor: '#222', // خط بسیار نازک زیر هدر مشابه فانتوم
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  walletInfoRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  pixelLogo: {
    width: 35,
    height: 35,
    borderRadius: 10,
    marginRight: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  pixelText: {
    fontSize: 18,
    fontWeight: '900',
    color: '#000',
  },
  walletName: {
    fontFamily: 'Orbitron-Bold',
    fontSize: 14,
  },
  walletAddress: {
    fontFamily: 'Courier',
    fontSize: 10,
    marginTop: -2,
  },
  headerRight: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerIconBtn: {
    marginLeft: 18,
    padding: 5,
  }
});


// در فایل Dashboard.js
<TouchableOpacity 
  style={[styles.chatFloatingBtn, { backgroundColor: theme.primary }]}
  onPress={() => navigation.navigate('ChatRoom')} // یا باز کردن دراور اختصاصی چت
>
  <CiBLIcon name="MessageSquare" size={24} color="#000" />
</TouchableOpacity>
