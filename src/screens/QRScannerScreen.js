import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, Button, Dimensions, TouchableOpacity } from 'react-native';
import { Camera } from 'expo-camera';
import { useTheme } from '../context/ThemeContext';
import { CiBLIcon, ICONS } from '../utils/Icons';
import { InteractionService } from '../utils/InteractionService';

const { width } = Dimensions.get('window');

const QRScannerScreen = ({ navigation }) => {
  const { theme } = useTheme();
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  const handleBarCodeScanned = ({ type, data }) => {
    setScanned(true);
    // پخش صدای موفقیت اسکن
    InteractionService.playInteraction(theme); 
    alert(`QR code with data ${data} has been scanned!`);
    // اینجا باید data (آدرس) را به صفحه ارسال (Send Screen) بفرستی
    // navigation.navigate('SendScreen', { recipientAddress: data });
  };

  if (hasPermission === null) {
    return <Text style={{ color: theme.text }}>Requesting for camera permission</Text>;
  }
  if (hasPermission === false) {
    return <Text style={{ color: theme.text }}>No access to camera</Text>;
  }

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <Camera
        onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
        style={StyleSheet.absoluteFillObject}
      />
      
      {/* فریم نئونی اسکنر */}
      <View style={styles.overlay}>
        <View style={[styles.corner, styles.topLeft, { borderColor: theme.primary, shadowColor: theme.primary }]} />
        <View style={[styles.corner, styles.topRight, { borderColor: theme.primary, shadowColor: theme.primary }]} />
        <View style={[styles.corner, styles.bottomLeft, { borderColor: theme.primary, shadowColor: theme.primary }]} />
        <View style={[styles.corner, styles.bottomRight, { borderColor: theme.primary, shadowColor: theme.primary }]} />
        <Text style={[styles.scanText, { color: theme.text }]}>SCAN ADDRESS QR</Text>
      </View>

      {scanned && (
        <TouchableOpacity onPress={() => setScanned(false)} style={[styles.rescanButton, { backgroundColor: theme.primary }]}>
          <Text style={styles.rescanButtonText}>Tap to Scan Again</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    alignItems: 'center',
    justifyContent: 'center',
  },
  corner: {
    position: 'absolute',
    width: 50,
    height: 50,
    borderWidth: 4,
    shadowOpacity: 1,
    shadowRadius: 8,
    elevation: 20
  },
  topLeft: { top: width * 0.2, left: width * 0.2, borderRightWidth: 0, borderBottomWidth: 0 },
  topRight: { top: width * 0.2, right: width * 0.2, borderLeftWidth: 0, borderBottomWidth: 0 },
  bottomLeft: { bottom: width * 0.2, left: width * 0.2, borderRightWidth: 0, borderTopWidth: 0 },
  bottomRight: { bottom: width * 0.2, right: width * 0.2, borderLeftWidth: 0, borderTopWidth: 0 },
  scanText: { 
    position: 'absolute', 
    top: width * 0.2 - 30, 
    fontFamily: 'Orbitron-Bold', 
    fontSize: 12, 
    letterSpacing: 1 
  },
  rescanButton: {
    position: 'absolute',
    bottom: 50,
    padding: 15,
    borderRadius: 10,
    alignSelf: 'center',
  },
  rescanButtonText: {
    fontFamily: 'Orbitron-Bold',
    color: 'white',
    fontSize: 14,
  },
});

export default QRScannerScreen;
