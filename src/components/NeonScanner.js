import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { CameraView, useCameraPermissions } from 'expo-camera';
import { MotiView } from 'moti';
import { X } from 'lucide-react-native';
import SoundManager from '../utils/SoundManager';

const NeonScanner = ({ onScan, onClose }) => {
  const [permission, requestPermission] = useCameraPermissions();

  if (!permission) return <View />;
  if (!permission.granted) {
    return (
      <View className="flex-1 bg-black justify-center items-center p-6">
        <Text className="text-white text-center mb-4">We need camera access to scan QR codes</Text>
        <TouchableOpacity onPress={requestPermission} className="bg-cyan-500 p-4 rounded-2xl">
          <Text className="font-bold">Grant Permission</Text>
        </TouchableOpacity>
      </View>
    );
  }

  const handleBarCodeScanned = ({ data }) => {
    // ۱. صدای موفقیت اسکن (یک Beep دیجیتال کوتاه)
    SoundManager.playEffect('SCAN_SUCCESS'); 
    onScan(data);
  };

  return (
    <View className="flex-1 bg-black">
      <CameraView
        style={StyleSheet.absoluteFillObject}
        onBarcodeScanned={handleBarCodeScanned}
        barcodeScannerSettings={{ barcodeTypes: ['qr'] }}
      >
        {/* لایه تیره اطراف کادر اسکن */}
        <View className="flex-1 bg-black/60 justify-center items-center">
          
          {/* کادر اسکن نئونی */}
          <View className="w-72 h-72 border-2 border-cyan-500/30 rounded-[40px] overflow-hidden items-center">
             
             {/* خط لیزر متحرک */}
             <MotiView
               from={{ translateY: 0 }}
               animate={{ translateY: 288 }}
               transition={{ loop: true, duration: 2000, type: 'timing' }}
               className="w-full h-1 bg-cyan-400 shadow-lg shadow-cyan-400"
               style={{ shadowRadius: 10, shadowOpacity: 1 }}
             />

             {/* گوشه‌های درخشان */}
             <View className="absolute top-0 left-0 w-8 h-8 border-t-4 border-l-4 border-cyan-400 rounded-tl-xl" />
             <View className="absolute top-0 right-0 w-8 h-8 border-t-4 border-r-4 border-cyan-400 rounded-tr-xl" />
             <View className="absolute bottom-0 left-0 w-8 h-8 border-b-4 border-l-4 border-cyan-400 rounded-bl-xl" />
             <View className="absolute bottom-0 right-0 w-8 h-8 border-b-4 border-r-4 border-cyan-400 rounded-br-xl" />
          </View>

          <Text className="text-cyan-400 mt-8 font-bold tracking-widest">ALIGN QR CODE INSIDE FRAME</Text>
        </View>
      </CameraView>

      {/* دکمه بستن */}
      <TouchableOpacity 
        onPress={onClose}
        className="absolute top-14 right-6 bg-slate-900/80 p-3 rounded-full border border-slate-700"
      >
        <X color="white" size={24} />
      </TouchableOpacity>
    </View>
  );
};

export default NeonScanner;
