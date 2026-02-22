import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import Animated, { useSharedValue, useAnimatedStyle, withTiming, Easing, runOnJS } from 'react-native-reanimated';
import { useTheme } from '../../context/ThemeContext';
import { CiBLIcon } from '../../utils/Icons';
import CiblButton from '../../components/CiblButton';
import TermsModal from '../../components/TermsModal';

const { height } = Dimensions.get('window');

const WelcomeScreen = ({ navigation }) => {
  const { theme } = useTheme();
  const [showButtons, setShowButtons] = useState(false);
  const [isTermsVisible, setIsTermsVisible] = useState(false);
  
  const containerHeight = useSharedValue(height); // تمام صفحه

  useEffect(() => {
    setTimeout(() => {
      containerHeight.value = withTiming(height * 0.65, { 
        duration: 1200, 
        easing: Easing.bezier(0.4, 0, 0.2, 1) 
      }, () => {
        runOnJS(setShowButtons)(true);
      });
    }, 3000); // ۳ ثانیه توقف برای نمایش لوگو
  }, []);

  const animatedHeader = useAnimatedStyle(() => ({
    height: containerHeight.value,
    justifyContent: 'center',
    alignItems: 'center',
  }));

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <Animated.View style={animatedHeader}>
        <CiBLIcon name="LOGO_MAIN" size={140} color={theme.primary} />
        <Text style={[styles.brandName, { color: theme.text }]}>CiBL_PROTOCOL</Text>
      </Animated.View>

      {showButtons && (
        <View style={styles.content}>
          <CiblButton 
            title="GENERATE_NEW_VAULT" 
            variant="primary" 
            onPress={() => setIsTermsVisible(true)} 
          />
          <View style={{ height: 15 }} />
          <CiblButton 
            title="RESTORE_EXISTING_KEY" 
            variant="outline" 
            onPress={() => navigation.navigate('ImportWallet')} 
          />
        </View>
      )}

      <TermsModal 
        visible={isTermsVisible} 
        onAccept={() => { setIsTermsVisible(false); navigation.navigate('CreateWallet'); }}
        onClose={() => setIsTermsVisible(false)}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  brandName: { fontFamily: 'Orbitron-Bold', fontSize: 18, marginTop: 20, letterSpacing: 4 },
  content: { flex: 1, paddingHorizontal: 40, justifyContent: 'center' }
});

export default WelcomeScreen;
