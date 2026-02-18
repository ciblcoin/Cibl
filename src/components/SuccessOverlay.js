import React from 'react';
import { View, StyleSheet, Text, Modal } from 'react-native';
import LottieView from 'lottie-react-native';
import { Helpers } from '../utils/Helpers';

const SuccessOverlay = ({ visible, txHash, onFinish }) => {
  return (
    <Modal visible={visible} transparent animationType="fade">
      <View style={styles.container}>
        <LottieView
          source={require('../../assets/lottie/success-neon.json')}
          autoPlay
          loop={false}
          style={styles.lottie}
          onAnimationFinish={onFinish} // بستن خودکار بعد از اتمام انیمیشن
        />
        
        <View style={styles.infoBox}>
          <Text style={styles.title}>TRANSACTION DEPLOYED</Text>
          <Text style={styles.hash}>
            Hash: {Helpers.shortenAddress(txHash)}
          </Text>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    backgroundColor: 'rgba(0,0,0,0.9)', 
    justifyContent: 'center', 
    alignItems: 'center' 
  },
  lottie: { width: 300, height: 300 },
  infoBox: { alignItems: 'center', marginTop: -20 },
  title: { 
    fontFamily: 'Orbitron-Bold', 
    color: '#06b6d4', 
    fontSize: 18, 
    letterSpacing: 2 
  },
  hash: { 
    fontFamily: 'Cairo-Regular', 
    color: '#94A3B8', 
    marginTop: 10 
  }
});

export default SuccessOverlay;
