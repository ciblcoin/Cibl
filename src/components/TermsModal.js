import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet, Modal } from 'react-native';
import { ShieldCheck, AlertTriangle } from 'lucide-react-native';

const TermsModal = ({ visible, onAccept }) => {
  return (
    <Modal visible={visible} animationType="slide" transparent={true}>
      <View style={styles.overlay}>
        <View style={styles.glassContainer}>
          <View style={styles.header}>
            <ShieldCheck color="#06b6d4" size={32} />
            <Text style={styles.title}>SECURITY PROTOCOL</Text>
          </View>

          <ScrollView style={styles.scrollArea}>
            <Text style={styles.legalText}>
              <Text style={styles.highlight}>1. Non-Custodial Nature: </Text>
              CiBL is a decentralized wallet. We do not store your private keys or seed phrases on any server.
              {"\n\n"}
              <Text style={styles.highlight}>2. Responsibility: </Text>
              You are solely responsible for backing up your 12-word Seed Phrase. Loss of this phrase means permanent loss of funds.
              {"\n\n"}
              <Text style={styles.highlight}>3. Transactions: </Text>
              Blockchain transactions are irreversible. Ensure recipient addresses are correct using our Auto-Detection tool.
              {"\n\n"}
              <Text style={styles.highlight}>4. HyperEVM & Multi-chain: </Text>
              By using CiBL, you agree to interact with multiple protocols at your own risk.
            </Text>
          </ScrollView>

          <TouchableOpacity style={styles.acceptButton} onPress={onAccept}>
            <Text style={styles.acceptText}>I UNDERSTAND & AGREE</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.85)', justifyContent: 'center', padding: 20 },
  glassContainer: { 
    backgroundColor: '#0F172A', borderRadius: 30, padding: 25, 
    borderWidth: 1, borderColor: '#06b6d433', maxHeight: '80%' 
  },
  header: { flexDirection: 'row', alignItems: 'center', gap: 15, marginBottom: 20 },
  title: { fontFamily: 'Orbitron-Bold', color: '#fff', fontSize: 18, letterSpacing: 1 },
  scrollArea: { marginBottom: 20 },
  legalText: { fontFamily: 'Cairo-Regular', color: '#94A3B8', fontSize: 14, lineHeight: 22 },
  highlight: { color: '#06b6d4', fontFamily: 'Cairo-Bold' },
  acceptButton: { 
    backgroundColor: '#06b6d4', height: 60, borderRadius: 15, 
    alignItems: 'center', justifyContent: 'center', shadowColor: '#06b6d4', shadowRadius: 10, shadowOpacity: 0.5 
  },
  acceptText: { fontFamily: 'Orbitron-Bold', color: '#000', fontSize: 14 }
});

export default TermsModal;
