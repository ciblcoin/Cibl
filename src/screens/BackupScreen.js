import React, { useRef } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import QRCode from 'react-native-qrcode-svg';
import ViewShot from 'react-native-view-shot'; // برای تبدیل کامپوننت به عکس

const BackupScreen = ({ encryptedData }) => {
  const viewShotRef = useRef();

  const handleDownload = async () => {
    const uri = await viewShotRef.current.capture();
    await BackupService.exportBackupImage(uri);
  };

  return (
    <View className="flex-1 bg-slate-950 items-center justify-center p-6">
      <Text className="text-white text-xl font-bold mb-2">Secure Cloud-Free Backup</Text>
      <Text className="text-slate-400 text-center mb-8">
        This QR code contains your recovery phrase encrypted with your App PIN. 
        Save it offline or print it.
      </Text>

      {/* بخشی که به عکس تبدیل می‌شود */}
      <ViewShot ref={viewShotRef} options={{ format: "jpg", quality: 0.9 }}>
        <View className="bg-white p-6 rounded-3xl items-center border-8 border-blue-500">
          <QRCode value={encryptedData} size={200} color="black" backgroundColor="white" />
          <Text className="mt-4 text-slate-900 font-black text-lg">CiBL WALLET VAULT</Text>
        </View>
      </ViewShot>

      <TouchableOpacity 
        onPress={handleDownload}
        className="bg-blue-600 w-full py-4 rounded-2xl mt-10 items-center"
      >
        <Text className="text-white font-bold text-lg">Save Backup Image</Text>
      </TouchableOpacity>
    </View>
  );
};
