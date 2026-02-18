import React from 'react';
import { View, Text, TouchableOpacity, Share } from 'react-native';
import QRCode from 'react-native-qrcode-svg';
import * as Clipboard from 'expo-clipboard';
import { Copy, Share2, ShieldCheck } from 'lucide-react-native';
import NetworkIcon from '../components/NetworkIcon';
import SoundManager from '../utils/SoundManager';

const ReceiveScreen = ({ route }) => {
  const { network, address } = route.params;

  const copyToClipboard = async () => {
    await Clipboard.setStringAsync(address);
    SoundManager.play('NEON_TICK'); // افکت صوتی تیک نئونی
    // نمایش نوتیفیکیشن موفقیت (Toast)
  };

  const onShare = async () => {
    try {
      await Share.share({ message: address });
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <View className="flex-1 bg-black p-6 items-center justify-center">
      {/* 1. Network Header */}
      <View className="flex-row items-center bg-slate-900/50 p-3 rounded-full border border-slate-800 mb-8">
        <NetworkIcon name={network.id} size={24} />
        <Text className="text-white font-bold ml-2">{network.name} Network</Text>
      </View>

      {/* 2. QR Code Container with Neon Glow */}
      <View className="p-6 bg-white rounded-[40px] border-[4px] border-cyan-500 shadow-2xl shadow-cyan-500">
        <QRCode
          value={address}
          size={200}
          color="black"
          backgroundColor="white"
          logo={require('../../assets/logo.png')} // لوگوی CiBL در مرکز
          logoSize={50}
          logoBackgroundColor="white"
          logoBorderRadius={10}
        />
      </View>

      {/* 3. Address Display */}
      <View className="mt-10 w-full bg-slate-900/80 p-5 rounded-3xl border border-slate-700">
        <Text className="text-slate-500 text-[10px] font-black uppercase tracking-widest mb-2 text-center">
          Your Public Address
        </Text>
        <Text className="text-cyan-400 font-mono text-center text-sm mb-4">
          {address}
        </Text>
        
        <TouchableOpacity 
          onPress={copyToClipboard}
          className="flex-row items-center justify-center bg-cyan-500 p-4 rounded-2xl"
        >
          <Copy color="black" size={18} />
          <Text className="text-black font-black ml-2">COPY ADDRESS</Text>
        </TouchableOpacity>
      </View>

      {/* 4. Security Warning */}
      <View className="flex-row items-center mt-6 bg-yellow-500/10 p-3 rounded-2xl border border-yellow-500/20">
        <ShieldCheck color="#eab308" size={16} />
        <Text className="text-yellow-500/80 text-[10px] ml-2 font-bold">
          Send only {network.id} to this address.
        </Text>
      </View>

      {/* 5. Share Button */}
      <TouchableOpacity onPress={onShare} className="mt-8 flex-row items-center">
        <Share2 color="#64748b" size={20} />
        <Text className="text-slate-500 font-bold ml-2">Share Address</Text>
      </TouchableOpacity>
    </View>
  );
};

export default ReceiveScreen;
