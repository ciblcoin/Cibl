import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, Dimensions } from 'react-native';
import { MotiView } from 'moti';
import { LinearGradient } from 'expo-linear-gradient';
import { ArrowUpRight, ArrowDownLeft, Plus, Zap } from 'lucide-react-native';
import { SvgXml } from 'react-native-svg';

// لوگوی نئونی CiBL که قبلاً با هم ساختیم (به صورت استرینگ برای SVG XML)
const logoSvg = `<svg width="100" height="100" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M50 5L95 27.5V72.5L50 95L5 72.5V27.5L50 5Z" stroke="#06b6d4" stroke-width="4" stroke-linejoin="round"/><path d="M35 40H65M35 50H60M35 60H55" stroke="#06b6d4" stroke-width="6" stroke-linecap="round"/></svg>`;

const AssetCard = ({ name, symbol, balance, value, change, iconColor }) => (
  <TouchableOpacity className="flex-row items-center p-5 mb-3 bg-slate-900/60 border border-slate-800/50 rounded-[30px]">
    <View className="w-12 h-12 rounded-2xl items-center justify-center bg-black/40 border border-slate-700">
        <Zap color={iconColor} size={24} fill={iconColor} fillOpacity={0.2} />
    </View>
    <View className="ml-4 flex-1">
      <Text className="text-white font-black text-lg">{symbol}</Text>
      <Text className="text-slate-500 text-xs font-bold">{name}</Text>
    </View>
    <View className="items-end">
      <Text className="text-white font-black text-base">{balance}</Text>
      <Text className={`text-xs font-bold ${change.includes('+') ? 'text-emerald-400' : 'text-rose-500'}`}>
        {change}
      </Text>
    </View>
  </TouchableOpacity>
);

const AssetsScreen = () => {
  return (
    <View className="flex-1 bg-black">
      {/* هدر درخشان با موجودی کل */}
      <View className="pt-16 pb-10 px-6 bg-slate-900/30 rounded-b-[50px] border-b border-cyan-500/20">
        <MotiView
          from={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="items-center"
        >
          <View className="w-16 h-16 mb-4 shadow-lg shadow-cyan-500/50">
            <SvgXml xml={logoSvg} width="100%" height="100%" />
          </View>
          <Text className="text-slate-400 font-bold tracking-[3px] text-[10px] uppercase">Total Portfolio</Text>
          <View className="flex-row items-baseline mt-1">
            <Text className="text-cyan-400 text-5xl font-black shadow-cyan-500/80">$42,890</Text>
            <Text className="text-cyan-600 text-xl font-black ml-1">.50</Text>
          </View>
        </MotiView>

        {/* دکمه‌های عملیاتی سریع */}
        <View className="flex-row justify-between mt-8">
          {[
            { label: 'Send', icon: ArrowUpRight, color: '#f43f5e' },
            { label: 'Receive', icon: ArrowDownLeft, color: '#10b981' },
            { label: 'Buy', icon: Plus, color: '#06b6d4' }
          ].map((action, i) => (
            <TouchableOpacity key={i} className="items-center">
              <View className="w-14 h-14 bg-slate-800/80 rounded-2xl items-center justify-center border border-slate-700">
                <action.icon color={action.color} size={24} />
              </View>
              <Text className="text-slate-400 text-[10px] font-black mt-2 uppercase tracking-widest">{action.label}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* لیست دارایی‌ها */}
      <ScrollView className="flex-1 px-6 pt-6">
        <View className="flex-row justify-between items-center mb-6">
          <Text className="text-white font-black text-xl tracking-tighter">ASSETS</Text>
          <TouchableOpacity><Text className="text-cyan-500 font-bold text-xs">View All</Text></TouchableOpacity>
        </View>

        <AssetCard name="Bitcoin" symbol="BTC" balance="1.240" value="$34,120" change="+2.5%" iconColor="#f7931a" />
        <AssetCard name="Ethereum" symbol="ETH" balance="14.50" value="$6,450" change="-1.2%" iconColor="#627eea" />
        <AssetCard name="Solana" symbol="SOL" balance="120.8" value="$2,320" change="+8.7%" iconColor="#14f195" />
        
        <View className="h-20" /> {/* فضای خالی برای اسکرول */}
      </ScrollView>
    </View>
  );
};

export default AssetsScreen;

import { Helpers } from '../utils/Helpers';

// در بخش رندر آدرس کیف‌پول:
<Text style={styles.addressText}>
  {Helpers.shortenAddress(wallet.address)}
</Text>

// در بخش رندر قیمت‌ها:
<Text style={styles.fiatText}>
  {Helpers.formatUSD(item.price)}
</Text>
