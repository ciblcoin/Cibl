import React, { useRef } from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import { captureRef } from 'react-native-view-shot';
import * as Sharing from 'expo-sharing';
import { TrendingUp, TrendingDown } from 'lucide-react-native';

const ShareCard = ({ data, type }) => {
  const viewRef = useRef();

  const onShare = async () => {
    try {
      const uri = await captureRef(viewRef, { format: 'png', quality: 0.9 });
      await Sharing.shareAsync(uri);
    } catch (e) { console.error(e); }
  };

  return (
    <View className="items-center p-4">
      {/* Target View to Capture */}
      <View ref={viewRef} className="w-80 bg-slate-900 border-2 border-yellow-500 rounded-3xl p-6 overflow-hidden">
        {/* Neon Background Glow */}
        <View className="absolute -top-10 -right-10 w-32 h-32 bg-yellow-500/20 blur-3xl rounded-full" />
        
        <Text className="text-yellow-500 font-black text-xl mb-4 italic">CiBL PROTOCOL</Text>

        {type === 'RESULT' ? (
          <>
            <Text className="text-white text-sm uppercase tracking-widest">Duel Result</Text>
            <Text className={`text-4xl font-black my-2 ${data.isWinner ? 'text-green-500' : 'text-red-500'}`}>
              {data.isWinner ? `+${data.profit} SOL` : `-${data.loss} SOL`}
            </Text>
            <Text className="text-slate-400 text-xs">1-Minute High Stakes Duel</Text>
          </>
        ) : (
          <>
            <View className="flex-row items-center gap-2 mb-2">
              <Image source={{ uri: data.tokenIcon }} className="w-8 h-8 rounded-full" />
              <Text className="text-white font-bold text-lg">{data.tokenName}</Text>
            </View>
            <View className="flex-row items-baseline gap-2">
              <Text className="text-2xl font-black text-white">${data.price}</Text>
              <Text className={data.change >= 0 ? 'text-green-500' : 'text-red-500'}>
                {data.change}% {data.change >= 0 ? <TrendingUp size={14}/> : <TrendingDown size={14}/>}
              </Text>
            </View>
            {/* Simple Line Chart Mockup (SVG or Simple View) */}
            <View className="h-16 w-full mt-4 bg-slate-800/50 rounded-lg justify-center items-center border-b-2 border-green-500/50">
               <Text className="text-[10px] text-slate-500 tracking-tighter">24H PERFORMANCE CHART</Text>
            </View>
          </>
        )}

        <View className="mt-6 pt-4 border-t border-slate-800 flex-row justify-between items-center">
          <Text className="text-slate-500 text-[10px]">Join me: cibl.app/r/{data.refCode}</Text>
          <View className="bg-yellow-500 px-2 py-1 rounded">
             <Text className="text-[8px] font-bold text-black">SCAN TO PLAY</Text>
          </View>
        </View>
      </View>

      <TouchableOpacity onPress={onShare} className="mt-4 bg-yellow-500 px-8 py-3 rounded-full">
        <Text className="font-bold">Share to Social Media</Text>
      </TouchableOpacity>
    </View>
  );
};
