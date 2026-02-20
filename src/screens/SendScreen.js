import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const SendScreen = () => {
  // این مقادیر از FeeService که قبلاً ساختیم می‌آیند
  const fees = {
    networkFee: '0.00021',
    platformFee: '0.00005',
    totalCost: '0.10026'
  };

  return (
    <View style={styles.container}>
      {/* سایر بخش‌های صفحه مثل فیلد آدرس و مبلغ */}

      {/* کد مورد نظر شما اینجا قرار می‌گیرد */}
      <View style={styles.feeContainer}>
        <View style={styles.feeRow}>
          <Text style={styles.feeLabel}>Network Fee (Gas)</Text>
          <Text style={styles.feeValue}>{fees.networkFee} ETH</Text>
        </View>
        
        <View style={styles.feeRow}>
          <Text style={styles.feeLabel}>CiBL Service Fee</Text>
          <Text style={[styles.feeValue, {color: '#06b6d4'}]}>{fees.platformFee} ETH</Text>
        </View>

        <View style={styles.divider} />

        <View style={styles.feeRow}>
          <Text style={styles.totalLabel}>Total Deducted</Text>
          <Text style={styles.totalValue}>{fees.totalCost} ETH</Text>
        </View>
      </View>

      {/* دکمه تایید نهایی */}
    </View>
  );
};

// حتماً استایل‌های زیر را هم به فایل اضافه کن تا نئونی شود
const styles = StyleSheet.create({
  feeContainer: {
    backgroundColor: '#0F172A', // زمینه تیره نئونی
    padding: 20,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#1E293B',
    marginTop: 20
  },
  feeRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10
  },
  feeLabel: { color: '#94A3B8', fontFamily: 'Cairo-Regular' },
  feeValue: { color: '#fff', fontFamily: 'Orbitron-Bold' },
  divider: {
    height: 1,
    backgroundColor: '#1E293B',
    marginVertical: 10
  },
  totalLabel: { color: '#fff', fontFamily: 'Cairo-Bold' },
  totalValue: { color: '#06b6d4', fontFamily: 'Orbitron-Bold', fontSize: 16 }
});

export default SendScreen;

import SliderConfirm from '../components/SliderConfirm';

// در بدنه کد:
const handleFinalConfirm = () => {
  console.log("Transaction Initialized...");
  // در اینجا تراکنش واقعی را با TransactionService ارسال کن
};

return (
  <View>
    {/* ... نمایش هزینه‌ها و فیلدها ... */}
    
    <SliderConfirm 
      onConfirm={handleFinalConfirm} 
      title="SLIDE TO SECURE SEND" 
    />
  </View>
);

import React, { useState } from 'react';
import SuccessOverlay from '../components/SuccessOverlay';
import SliderConfirm from '../components/SliderConfirm';

const SendScreen = () => {
  const [showSuccess, setShowSuccess] = useState(false);
  const [currentHash, setCurrentHash] = useState('');

  const handleFinalConfirm = async () => {
    // ۱. اجرای انیمیشن لودینگ (اختیاری)
    // ۲. فراخوانی TransactionService برای ارسال واقعی
    const result = await TransactionService.sendTransaction(...);
    
    if (result.success) {
      setCurrentHash(result.hash);
      setShowSuccess(true); // نمایش انفجار نئونی!
    }
  };

  return (
    <View style={{ flex: 1, backgroundColor: '#000' }}>
      {/* ... بخش‌های ورودی و نمایش کارمزد ... */}

      <SliderConfirm onConfirm={handleFinalConfirm} />

      <SuccessOverlay 
        visible={showSuccess} 
        txHash={currentHash}
        onFinish={() => {
          setShowSuccess(false);
          // هدایت کاربر به صفحه اصلی یا لیست تراکنش‌ها
        }} 
      />
    </View>
  );
};

const handleFinalConfirm = async () => {
  const result = await TransactionService.sendTransaction(...);
  
  if (result.success) {
    setShowSuccess(true);
    // ارسال اعلان به کاربر
    await NotifyService.sendTxSuccess(amount, selectedNet.symbol);
  }
};
import CiblButton from '../components/CiblButton';

const SendScreen = () => {
  return (
    <View>
      {/* دکمه اصلی */}
      <CiblButton 
        title="Confirm Transaction" 
        onPress={() => console.log('Sent!')} 
      />

      {/* دکمه با استایل توخالی */}
      <CiblButton 
        title="Cancel" 
        variant="outline" 
        onPress={() => navigation.goBack()} 
      />
    </View>
  );
};
