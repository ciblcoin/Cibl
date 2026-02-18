import i18n from '../i18n';

const isAr = i18n.language === 'ar';

// در استایل‌دهی به جای ML و MR از Start و End استفاده می‌کنیم
<TouchableOpacity 
  className={`flex-row${isAr ? '-reverse' : '' } items-center p-4 mb-4 bg-slate-900/80 rounded-3xl`}
>
  <NetworkIcon name={item.id} size={36} />
  
  <View style={{ marginHorizontal: 16, alignItems: isAr ? 'flex-end' : 'flex-start' }}>
    <Text className="text-white font-black">{item.name}</Text>
    <Text className="text-slate-500 text-[10px]">{item.chain}</Text>
  </View>
  
  <View style={{ marginLeft: isAr ? 0 : 'auto', marginRight: isAr ? 'auto' : 0 }}>
     <ChevronRight size={20} style={{ transform: [{ scaleX: isAr ? -1 : 1 }] }} />
  </View>
</TouchableOpacity>
import { ChevronLeft } from 'lucide-react-native';

const BackButton = () => (
  <TouchableOpacity onPress={goBack}>
    <ChevronLeft 
      color="#06b6d4" 
      style={{ transform: [{ scaleX: i18n.language === 'ar' ? -1 : 1 }] }} 
    />
  </TouchableOpacity>
);

import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import { MotiView } from 'moti';

const NETWORKS = [
  { id: 'hyperevm', name: 'HyperEVM', color: '#6366F1', symbol: 'HYP' },
  { id: 'polygon', name: 'Polygon', color: '#8247E5', symbol: 'MATIC' },
  { id: 'avalanche', name: 'Avalanche', color: '#E84142', symbol: 'AVAX' },
  { id: 'tron', name: 'Tron', color: '#FF0013', symbol: 'TRX' },
  { id: 'cardano', name: 'Cardano', color: '#0033AD', symbol: 'ADA' },
  { id: 'near', name: 'Near', color: '#000000', symbol: 'NEAR' },
  { id: 'polkadot', name: 'Polkadot', color: '#E6007A', symbol: 'DOT' },
  { id: 'bch', name: 'BCH Cash', color: '#8BC34A', symbol: 'BCH' },
];

const NetworkSelector = ({ onNetworkChange }) => {
  const [selected, setSelected] = useState('hyperevm');

  const handleSelect = (net) => {
    setSelected(net.id);
    onNetworkChange(net);
  };

  return (
    <View style={styles.wrapper}>
      <Text style={styles.header}>ACTIVE NETWORK</Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.container}>
        {NETWORKS.map((net) => {
          const isActive = selected === net.id;
          return (
            <TouchableOpacity key={net.id} onPress={() => handleSelect(net)}>
              <MotiView
                animate={{
                  backgroundColor: isActive ? net.color + '33' : '#0F172A',
                  borderColor: isActive ? net.color : '#1E293B',
                  scale: isActive ? 1.05 : 1,
                }}
                style={styles.pill}
              >
                {isActive && (
                  <MotiView 
                    from={{ scale: 0 }} 
                    animate={{ scale: 1 }} 
                    style={[styles.activeDot, { backgroundColor: net.color }]} 
                  />
                )}
                <Text style={[styles.pillText, isActive && { color: '#fff' }]}>
                  {net.name}
                </Text>
              </MotiView>
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: { marginTop: 25, marginBottom: 10 },
  header: { 
    fontFamily: 'Orbitron-Bold', color: '#475569', fontSize: 10, 
    marginLeft: 20, marginBottom: 12, letterSpacing: 2 
  },
  container: { paddingLeft: 20, paddingRight: 20, gap: 12 },
  pill: {
    flexDirection: 'row', alignItems: 'center', paddingHorizontal: 16, 
    paddingVertical: 10, borderRadius: 15, borderWidth: 1, gap: 8
  },
  pillText: { fontFamily: 'Cairo-Bold', color: '#94A3B8', fontSize: 13 },
  activeDot: { width: 6, height: 6, borderRadius: 3, shadowRadius: 4, shadowOpacity: 0.8 }
});

export default NetworkSelector;

const NETWORK_CONFIGS = {
  hyperevm: { rpc: "https://rpc.hyperevm.org", chainId: 123 }, // فرضی
  polygon: { rpc: "https://polygon-rpc.com", chainId: 137 },
  avalanche: { rpc: "https://api.avax.network/ext/bc/C/rpc", chainId: 43114 },
  // سایر شبکه‌ها...
};

// تابع ارسال تغییر می‌کند تا پارامتر شبکه را بگیرد:
static async sendTransaction(to, amount, networkId) {
   const config = NETWORK_CONFIGS[networkId];
   const provider = new ethers.JsonRpcProvider(config.rpc);
   // ادامه فرآیند ارسال...
}
