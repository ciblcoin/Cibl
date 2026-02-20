import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { useTheme } from '../context/ThemeContext';
import { CiBLIcon, ICONS } from '../utils/Icons';
import CiblButton from '../components/CiblButton';

const TransactionDetails = ({ route, navigation }) => {
  const { theme } = useTheme();
  // در واقعیت این دیتا از route.params می‌آید
  const tx = {
    hash: "0x7a2b...9e4d",
    status: "SUCCESS",
    amount: "1.24 ETH",
    fee: "0.00042 ETH",
    date: "2024-05-20 14:30:05",
    network: "Ethereum Mainnet"
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <ScrollView contentContainerStyle={styles.scroll}>
        
        {/* هدر وضعیت */}
        <View style={styles.statusHeader}>
          <View style={[styles.iconCircle, { backgroundColor: theme.primary + '20', borderColor: theme.primary }]}>
            <CiBLIcon name={ICONS.SUCCESS} size={40} color={theme.primary} />
          </View>
          <Text style={[styles.amountText, { color: theme.text }]}>{tx.amount}</Text>
          <Text style={[styles.statusLabel, { color: theme.primary }]}>TRANSACTION_CONFIRMED</Text>
        </View>

        {/* بدنه اطلاعات (لاج‌سِتر) */}
        <View style={[styles.detailsBox, { backgroundColor: theme.card, borderColor: theme.border }]}>
          <DetailRow label="NETWORK" value={tx.network} />
          <DetailRow label="TIMESTAMP" value={tx.date} />
          <DetailRow label="GAS_FEE" value={tx.fee} />
          <DetailRow label="TX_HASH" value={tx.hash} isHash />
          <View style={[styles.divider, { backgroundColor: theme.border }]} />
          <DetailRow label="TOTAL_DEBIT" value={tx.amount} highlight />
        </View>

        <CiblButton 
          title="VIEW ON EXPLORER" 
          variant="outline" 
          onPress={() => {}} 
          style={{ marginTop: 20 }}
        />
      </ScrollView>
    </View>
  );
};

const DetailRow = ({ label, value, isHash, highlight }) => {
  const { theme } = useTheme();
  return (
    <View style={styles.row}>
      <Text style={[styles.rowLabel, { color: theme.textMuted }]}>{label}</Text>
      <Text style={[
        styles.rowValue, 
        { color: highlight ? theme.primary : theme.text },
        isHash && { fontFamily: 'Courier', fontSize: 11 }
      ]}>
        {value}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  scroll: { padding: 25, paddingTop: 60 },
  statusHeader: { alignItems: 'center', marginBottom: 40 },
  iconCircle: { width: 80, height: 80, borderRadius: 40, borderWidth: 2, justifyContent: 'center', alignItems: 'center', marginBottom: 20 },
  amountText: { fontFamily: 'Orbitron-Bold', fontSize: 28 },
  statusLabel: { fontFamily: 'Orbitron-Bold', fontSize: 10, letterSpacing: 2, marginTop: 10 },
  detailsBox: { padding: 20, borderRadius: 16, borderWidth: 1 },
  row: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 15, alignItems: 'center' },
  rowLabel: { fontFamily: 'Orbitron-Bold', fontSize: 9 },
  rowValue: { fontFamily: 'Cairo-Bold', fontSize: 13 },
  divider: { height: 1, marginVertical: 10, opacity: 0.5 }
});

export default TransactionDetails;
