import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import { MotiView } from 'moti';
import { ArrowDown, Repeat, Zap } from 'lucide-react-native';
import SoundManager from '../utils/SoundManager';

const SwapScreen = () => {
  const [fromAmount, setFromAmount] = useState('');
  const [toAmount, setToAmount] = useState('0.00');

  const handleSwapTrigger = () => {
    // افکت صوتی شارژ شدن و لرزش
    SoundManager.play('TX_CHARGE');
    // منطق تبدیل ارز در اینجا قرار می‌گیرد
  };

  return (
    <View className="flex-1 bg-black p-6">
      <Text className="text-white text-3xl font-black mb-10">NEON SWAP</Text>

      {/* کارت مبدا (From) */}
      <View className="bg-slate-900 p-5 rounded-[32px] border border-cyan-500/20">
        <Text className="text-slate-500 text-xs mb-2">YOU SEND</Text>
        <View className="flex-row justify-between items-center">
          <TextInput
            placeholder="0.0"
            placeholderTextColor="#475569"
            keyboardType="decimal-pad"
            value={fromAmount}
            onChangeText={setFromAmount}
            className="text-white text-3xl font-bold flex-1"
          />
          <View className="bg-orange-500/20 px-4 py-2 rounded-2xl border border-orange-500/40">
            <Text className="text-orange-500 font-bold">BTC</Text>
          </View>
        </View>
      </View>

      {/* آیکون اتصال با انیمیشن چرخش */}
      <TouchableOpacity 
        className="align-center self-center -my-4 z-10 bg-black p-3 rounded-full border border-slate-800"
        onPress={() => SoundManager.play('NEON_TICK')}
      >
        <Repeat color="#06b6d4" size={24} />
      </TouchableOpacity>

      {/* کارت مقصد (To) */}
      <View className="bg-slate-900 p-5 rounded-[32px] border border-blue-500/20">
        <Text className="text-slate-500 text-xs mb-2">YOU RECEIVE (ESTIMATED)</Text>
        <View className="flex-row justify-between items-center">
          <Text className="text-white text-3xl font-bold">{toAmount}</Text>
          <View className="bg-blue-500/20 px-4 py-2 rounded-2xl border border-blue-500/40">
            <Text className="text-blue-500 font-bold">TON</Text>
          </View>
        </View>
      </View>

      {/* دکمه نهایی با افکت Glow */}
      <TouchableOpacity 
        onPress={handleSwapTrigger}
        className="mt-10 bg-cyan-500 h-20 rounded-[30px] items-center justify-center shadow-2xl shadow-cyan-500"
      >
        <View className="flex-row items-center">
          <Zap color="black" size={24} fill="black" />
          <Text className="text-black font-black text-xl ml-2">IGNITE SWAP</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import Animated, { 
  useSharedValue, 
  useAnimatedStyle, 
  withRepeat, 
  withTiming, 
  Easing,
  interpolate
} from 'react-native-reanimated';
import { useTheme } from '../context/ThemeContext';
import { CiBLIcon, ICONS } from '../utils/Icons';
import CiblButton from '../components/CiblButton';

const SwapScreen = () => {
  const { theme } = useTheme();
  const [loading, setLoading] = useState(false);
  const rotation = useSharedValue(0);

  // انیمیشن چرخش رآکتور
  const startSwapAnimation = () => {
    setLoading(true);
    rotation.value = withRepeat(
      withTiming(1, { duration: 1500, easing: Easing.linear }),
      -1 // چرخش بی‌پایان تا زمان اتمام عملیات
    );

    // شبیه‌سازی پایان تراکنش بعد از ۳ ثانیه
    setTimeout(() => {
      setLoading(false);
      rotation.value = 0;
    }, 3500);
  };

  const reactorStyle = useAnimatedStyle(() => {
    const rotateValue = interpolate(rotation.value, [0, 1], [0, 360]);
    return {
      transform: [{ rotate: `${rotateValue}deg` }],
    };
  });

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <Text style={[styles.title, { color: theme.text }]}>ATOMIC_SWAP</Text>

      {/* بخش ورودی ارزها */}
      <View style={[styles.swapCard, { backgroundColor: theme.card, borderColor: theme.border }]}>
        <SwapInput label="FROM" asset="ETH" amount="1.25" />
        
        {/* رآکتور مرکزی (انیمیشن چرخشی) */}
        <View style={styles.reactorContainer}>
          <View style={[styles.connector, { backgroundColor: theme.border }]} />
          <Animated.View style={[styles.reactorFrame, reactorStyle, { borderColor: theme.primary }]}>
            <CiBLIcon name={ICONS.SWAP} size={24} color={theme.primary} />
          </Animated.View>
          <View style={[styles.connector, { backgroundColor: theme.border }]} />
        </View>

        <SwapInput label="TO" asset="HYP" amount="485.20" />
      </View>

      {/* اطلاعات قیمت */}
      <View style={styles.infoRow}>
        <Text style={{ color: theme.textMuted, fontFamily: 'Courier' }}>EXCHANGE_RATE:</Text>
        <Text style={{ color: theme.primary, fontFamily: 'Orbitron-Bold' }}>1 ETH = 388 HYP</Text>
      </View>

      <CiblButton 
        title={loading ? "INITIATING..." : "EXECUTE SWAP"} 
        onPress={startSwapAnimation}
        loading={loading}
      />
    </View>
  );
};

// کامپوننت کمکی برای اینپوت‌های سوآپ
const SwapInput = ({ label, asset, amount }) => {
  const { theme } = useTheme();
  return (
    <View style={styles.inputBox}>
      <Text style={[styles.inputLabel, { color: theme.textMuted }]}>{label}</Text>
      <View style={styles.inputRow}>
        <TextInput 
          style={[styles.textInput, { color: theme.text }]} 
          value={amount} 
          keyboardType="numeric"
        />
        <TouchableOpacity style={[styles.assetPicker, { backgroundColor: theme.primary + '20' }]}>
          <Text style={{ color: theme.primary, fontFamily: 'Orbitron-Bold' }}>{asset}</Text>
          <CiBLIcon name="ChevronDown" size={16} color={theme.primary} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 25, paddingTop: 60 },
  title: { fontFamily: 'Orbitron-Bold', fontSize: 20, marginBottom: 30, textAlign: 'center' },
  swapCard: { borderRadius: 24, borderWidth: 1, padding: 20 },
  inputBox: { marginVertical: 10 },
  inputLabel: { fontFamily: 'Orbitron-Bold', fontSize: 9, marginBottom: 8 },
  inputRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  textInput: { fontSize: 24, fontFamily: 'Orbitron-Bold', flex: 1 },
  assetPicker: { flexDirection: 'row', alignItems: 'center', padding: 10, borderRadius: 12 },
  reactorContainer: { alignItems: 'center', marginVertical: -10, zIndex: 10 },
  connector: { width: 2, height: 20 },
  reactorFrame: { 
    width: 60, 
    height: 60, 
    borderRadius: 30, 
    borderWidth: 2, 
    borderStyle: 'dashed',
    justifyContent: 'center', 
    alignItems: 'center',
    backgroundColor: '#0D0208',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 1,
    shadowRadius: 10,
    elevation: 10
  },
  infoRow: { flexDirection: 'row', justifyContent: 'space-between', marginVertical: 25, paddingHorizontal: 5 }
});

export default SwapScreen;
