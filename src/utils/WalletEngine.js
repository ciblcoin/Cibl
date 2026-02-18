import * as Crypto from 'expo-crypto';
import { ethers } from 'ethers';
import * as bip39 from 'bip39';

export const createNewWallet = async () => {
  try {
    // ۱. تولید انتروپی تصادفی (بسیار امن)
    const randomBytes = await Crypto.getRandomBytesAsync(16); 
    const entropy = Array.from(randomBytes)
      .map(b => b.toString(16).padStart(2, '0'))
      .join('');

    // ۲. تبدیل انتروپی به ۱۲ کلمه بازیابی (Mnemonic)
    const mnemonic = bip39.entropyToMnemonic(entropy);

    // ۳. استخراج کلید خصوصی و آدرس عمومی از کلمات
    const wallet = ethers.Wallet.fromPhrase(mnemonic);

    return {
      phrase: mnemonic,        // ۱۲ کلمه (باید به کاربر نمایش داده شود)
      address: wallet.address, // آدرس عمومی (مثلاً 0x123...)
      privateKey: wallet.privateKey // کلید خصوصی (باید مخفی بماند)
    };
  } catch (error) {
    console.error("Wallet Creation Failed:", error);
    return null;
  }
};
import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { ShieldAlert, Copy, CheckCircle } from 'lucide-react-native';

const SeedPhraseScreen = ({ mnemonic }) => {
  const words = mnemonic.split(' ');

  return (
    <View style={styles.container}>
      <ShieldAlert color="#F43F5E" size={48} />
      <Text style={styles.warningTitle}>BACKUP YOUR SEED PHRASE</Text>
      <Text style={styles.warningSub}>Write down these 12 words on paper. Do not take a screenshot.</Text>

      <View style={styles.grid}>
        {words.map((word, index) => (
          <View key={index} style={styles.wordBox}>
            <Text style={styles.wordIndex}>{index + 1}</Text>
            <Text style={styles.wordText}>{word}</Text>
          </View>
        ))}
      </View>

      <TouchableOpacity style={styles.nextButton}>
        <Text style={styles.nextButtonText}>I'VE SECURED THE PHRASE</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#000', alignItems: 'center', paddingTop: 60, paddingHorizontal: 20 },
  warningTitle: { fontFamily: 'Orbitron-Bold', color: '#F43F5E', fontSize: 18, marginTop: 20 },
  warningSub: { fontFamily: 'Cairo-Bold', color: '#94A3B8', textAlign: 'center', marginTop: 10, fontSize: 12 },
  grid: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center', marginTop: 30 },
  wordBox: {
    width: '30%', backgroundColor: '#0F172A', margin: 5, padding: 10,
    borderRadius: 12, borderWidth: 1, borderColor: '#1E293B', flexDirection: 'row'
  },
  wordIndex: { color: '#06B6D4', fontSize: 10, fontFamily: 'Orbitron-Bold', marginRight: 5 },
  wordText: { color: '#fff', fontSize: 14, fontFamily: 'Cairo-Bold' },
  nextButton: {
    marginTop: 40, backgroundColor: '#06B6D4', width: '100%', height: 60,
    borderRadius: 20, alignItems: 'center', justifyContent: 'center'
  },
  nextButtonText: { fontFamily: 'Orbitron-Bold', color: '#000', fontSize: 14 }
});

import { ethers } from 'ethers';
import * as TronWeb from 'tronweb'; // برای ترون
// سایر ایمپورت‌ها بر اساس نیاز نصب شوند

export const deriveAllAddresses = (mnemonic) => {
  const addresses = {};

  // ۱. شبکه‌های سازگار با اتریوم (EVM) - Polygon, Avalanche, HyperEVM
  // این‌ها همگی از یک فرمت آدرس (0x...) استفاده می‌کنند
  const evmWallet = ethers.Wallet.fromPhrase(mnemonic);
  addresses.EVM = evmWallet.address; 
  addresses.Polygon = evmWallet.address;
  addresses.Avalanche = evmWallet.address;
  addresses.HyperEVM = evmWallet.address;

  // ۲. شبکه ترون (Tron)
  // آدرس‌های ترون با T شروع می‌شوند
  const tronAddress = TronWeb.fromMnemonic(mnemonic); 
  addresses.Tron = tronAddress.address;

  // ۳. شبکه کاردانو (Cardano)
  // نیاز به کتابخانه @emurgo/cardano-serialization-lib-nodejs دارد
  addresses.Cardano = "باید با کتابخانه مخصوص جنریت شود";

  return addresses;
};
