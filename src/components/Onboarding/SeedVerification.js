import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert } from 'react-native';

export default function SeedVerification({ mnemonic, onVerified, onBack }) {
  const wordsArray = mnemonic.split(' ');
  const [testIndices, setTestIndices] = useState([]);
  const [userInputs, setUserInputs] = useState({ 0: '', 1: '', 2: '' });

  useEffect(() => {
    // انتخاب ۳ موقعیت تصادفی از بین ۱۲ یا ۲۴ کلمه
    const indices = [];
    while (indices.length < 3) {
      const r = Math.floor(Math.random() * wordsArray.length);
      if (indices.indexOf(r) === -1) indices.push(r);
    }
    setTestIndices(indices.sort((a, b) => a - b));
  }, []);

  const checkVerification = () => {
    const isCorrect = testIndices.every((wordIndex, i) => {
      return userInputs[i].trim().toLowerCase() === wordsArray[wordIndex].toLowerCase();
    });

    if (isCorrect) {
      onVerified();
    } else {
      Alert.alert("خطا", "کلمات وارد شده با کلمات بازیابی شما همخوانی ندارند. لطفاً دوباره بررسی کنید.");
    }
  };

  return (
    <View className="flex-1 bg-cibl-dark p-6">
      <Text className="text-2xl font-bold text-white mb-4">تایید کلمات بازیابی</Text>
      <Text className="text-slate-400 mb-8">
        برای اطمینان، لطفاً کلمات خواسته شده را از روی نسخه‌ای که یادداشت کرده‌اید وارد کنید.
      </Text>

      {testIndices.map((wordIndex, i) => (
        <View key={i} className="mb-6">
          <Text className="text-cibl-yellow mb-2 font-bold">کلمه شماره {wordIndex + 1}:</Text>
          <TextInput
            className="bg-slate-800 text-white p-4 rounded-xl border border-slate-700 focus:border-cibl-blue"
            placeholder={`کلمه ${wordIndex + 1} را تایپ کنید...`}
            placeholderTextColor="#666"
            value={userInputs[i]}
            onChangeText={(text) => setUserInputs({ ...userInputs, [i]: text })}
            autoCapitalize="none"
          />
        </View>
      ))}

      <View className="flex-row gap-4 mt-auto">
        <TouchableOpacity onPress={onBack} className="flex-1 p-4 bg-slate-700 rounded-2xl">
          <Text className="text-center text-white font-bold">بازگشت</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          onPress={checkVerification}
          className="flex-1 p-4 bg-cibl-yellow rounded-2xl"
        >
          <Text className="text-center text-cibl-dark font-bold">تایید و ادامه</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

{
  "wallets": [
    {
      "id": "uuid-123",
      "name": "Main Wallet",
      "type": "mnemonic", // یا 'private_key' یا 'watch'
      "mnemonic_encrypted": "AES_ENCRYPTED_STRING",
      "networks": {
        "solana": "ADDR...",
        "bitcoin": "ADDR...",
        "bsc": "ADDR..."
      }
    }
  ],
  "active_wallet_id": "uuid-123"
}
