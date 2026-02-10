// src/components/SecurityDashboard.js
import { ShieldCheck, ShieldAlert, Skull } from 'lucide-react-native';

const SecurityDashboard = () => {
  return (
    <View className="flex-1 bg-black p-6">
      <Text className="text-white text-3xl font-black mb-8">SECURE SECTOR</Text>

      {/* کارت Whitelisting */}
      <TouchableOpacity className="bg-slate-900 border border-cyan-500/30 p-5 rounded-[32px] mb-6 shadow-lg shadow-cyan-500/10">
        <View className="flex-row justify-between items-center">
          <View>
            <Text className="text-cyan-400 font-bold text-lg">Address Whitelisting</Text>
            <Text className="text-slate-500 text-xs">Only send to trusted nodes</Text>
          </View>
          <ShieldCheck color="#22c55e" size={32} />
        </View>
      </TouchableOpacity>

      {/* کارت خطر Self-Destruct */}
      <TouchableOpacity className="bg-red-950/20 border border-red-500/40 p-5 rounded-[32px]">
        <View className="flex-row justify-between items-center">
          <View>
            <Text className="text-red-500 font-bold text-lg">Self-Destruct Protocol</Text>
            <Text className="text-red-900 text-xs font-bold uppercase">Nuclear Option: Enabled</Text>
          </View>
          <Skull color="#ef4444" size={32} />
        </View>
      </TouchableOpacity>
    </View>
  );
};
