import { ethers } from 'ethers';
import SecurityService from './SecurityService';

// آدرس نود شبکه (مثلاً Alchemy یا Infura)
const RPC_URL = "https://eth-sepolia.g.alchemy.com/v2/YOUR_API_KEY";

class TransactionService {
  static async sendEther(toAddress, amountInEther) {
    try {
      // ۱. دریافت کلید خصوصی از گاوصندوق امن گوشی
      const privateKey = await SecurityService.getPrivateKey();
      if (!privateKey) throw new Error("Private Key not found!");

      // ۲. اتصال به شبکه
      const provider = new ethers.JsonRpcProvider(RPC_URL);
      const wallet = new ethers.Wallet(privateKey, provider);

      // ۳. آماده‌سازی تراکنش
      const tx = {
        to: toAddress,
        value: ethers.parseEther(amountInEther), // تبدیل عدد به فرمت وی (Wei)
      };

      // ۴. ارسال و امضا
      const transaction = await wallet.sendTransaction(tx);
      
      console.log("Transaction Hash:", transaction.hash);
      return { success: true, hash: transaction.hash };

    } catch (error) {
      console.error("Transaction Failed:", error);
      return { success: false, error: error.message };
    }
  }
}

export default TransactionService;
import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ActivityIndicator } from 'react-native';
import { Send, CheckCircle2 } from 'lucide-react-native';
import TransactionService from '../utils/TransactionService';

const SendModal = () => {
  const [address, setAddress] = useState('');
  const [amount, setAmount] = useState('');
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState(null); // 'success' | 'error'

  const handleSend = async () => {
    setLoading(true);
    const result = await TransactionService.sendEther(address, amount);
    setLoading(false);
    
    if (result.success) {
      setStatus('success');
    } else {
      alert("Error: " + result.error);
    }
  };

  return (
    <View style={styles.card}>
      <Text style={styles.title}>SEND ASSETS</Text>
      
      <TextInput
        style={styles.input}
        placeholder="Recipient Address (0x...)"
        placeholderTextColor="#475569"
        onChangeText={setAddress}
      />

      <TextInput
        style={styles.input}
        placeholder="Amount (ETH)"
        placeholderTextColor="#475569"
        keyboardType="numeric"
        onChangeText={setAmount}
      />

      <TouchableOpacity 
        style={[styles.button, loading && { opacity: 0.5 }]} 
        onPress={handleSend}
        disabled={loading}
      >
        {loading ? (
          <ActivityIndicator color="#000" />
        ) : (
          <>
            <Text style={styles.buttonText}>CONFIRM TRANSACTION</Text>
            <Send size={18} color="#000" />
          </>
        )}
      </TouchableOpacity>

      {status === 'success' && (
        <View style={styles.successBox}>
          <CheckCircle2 color="#10B981" size={20} />
          <Text style={styles.successText}>Transaction Sent to Blockchain!</Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  card: { backgroundColor: '#0F172A', padding: 25, borderRadius: 30, borderWeight: 1, borderColor: '#06b6d433' },
  title: { fontFamily: 'Orbitron-Bold', color: '#06b6d4', fontSize: 18, marginBottom: 20 },
  input: { 
    backgroundColor: '#000', color: '#fff', borderRadius: 15, padding: 15, 
    marginBottom: 15, fontFamily: 'Cairo-Bold', borderWeight: 1, borderColor: '#1E293B' 
  },
  button: { 
    backgroundColor: '#06b6d4', height: 60, borderRadius: 20, 
    flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 10 
  },
  buttonText: { fontFamily: 'Orbitron-Bold', color: '#000', fontSize: 14 },
  successBox: { flexDirection: 'row', alignItems: 'center', gap: 10, marginTop: 20, justifyContent: 'center' },
  successText: { color: '#10B981', fontFamily: 'Cairo-Bold', fontSize: 12 }
});
