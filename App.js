import React, { useState, useEffect } from 'react';
import { View, ScrollView, SafeAreaView, StatusBar, TouchableOpacity, Text, Dimensions } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { MotiView, AnimatePresence } from 'moti';
import { Feather } from '@expo/vector-icons';


// App.js - THE ULTIMATE NEON EDITION
import React, { useState, useEffect } from 'react';
import { View, SafeAreaView, StatusBar } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

// کامپوننت‌های وارد شده (که قبلاً ساختیم)
import SoundManager from './src/utils/SoundManager';
import NeonToast from './src/components/NeonToast';
import TotalBalance from './src/components/TotalBalance';
import NetworkScroller from './src/components/NetworkScroller';
import SwapScreen from './src/screens/SwapScreen';
import CombatChat from './src/screens/CombatChat';
import Marketplace from './src/screens/Marketplace';
import NftGallery from './src/screens/NftGallery';
import SecurityVault from './src/components/SecurityVault';

export default function App() {
  const [activeTab, setActiveTab] = useState('wallet');
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    SoundManager.init().then(() => {
      SoundManager.play('AUTH');
      setIsLoaded(true);
    });
  }, []);

  if (!isLoaded) return null;

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaView className="flex-1 bg-black">
        <StatusBar barStyle="light-content" />
        
        {/* بدنه اصلی بر اساس تب فعال */}
        <View className="flex-1">
          {activeTab === 'wallet' && <View className="flex-1"><TotalBalance totalValue={9450.75} currencyCode="USD" /><NetworkScroller onSelect={() => SoundManager.play('NEON_TICK')} /></View>}
          {activeTab === 'swap' && <SwapScreen />}
          {activeTab === 'chat' && <CombatChat />}
          {activeTab === 'market' && <Marketplace />}
          {activeTab === 'nfts' && <NftGallery onClose={() => setActiveTab('wallet')} />}
        </View>

        {/* نوار ابزار نئونی (TabBar) */}
        <View className="absolute bottom-6 left-4 right-4 h-20 bg-slate-900/95 border border-slate-800 rounded-[35px] flex-row justify-around items-center px-2">
          <TabButton icon="wallet" isActive={activeTab === 'wallet'} onPress={() => {setActiveTab('wallet'); SoundManager.play('NEON_TICK');}} />
          <TabButton icon="image" isActive={activeTab === 'nfts'} onPress={() => {setActiveTab('nfts'); SoundManager.play('NAV_SWOOSH');}} />
          
          {/* دکمه مرکزی شناور سوآپ */}
          <TouchableOpacity 
            onPress={() => {setActiveTab('swap'); SoundManager.play('TX_CHARGE');}}
            className="bg-cyan-500 w-16 h-16 rounded-full -top-6 items-center justify-center shadow-lg shadow-cyan-500"
          >
            <Feather name="repeat" size={28} color="black" />
          </TouchableOpacity>

          <TabButton icon="shopping-bag" isActive={activeTab === 'market'} onPress={() => {setActiveTab('market'); SoundManager.play('NOTIFY');}} />
          <TabButton icon="message-square" isActive={activeTab === 'chat'} onPress={() => {setActiveTab('chat'); SoundManager.play('SWORD');}} />
        </View>
      </SafeAreaView>
    </GestureHandlerRootView>
  );
}




// --- ابزارها و مدیریت صدا ---
import SoundManager from './src/utils/SoundManager';
import { EVM_CONFIG } from './src/blockchain/evm/config';

// --- کامپوننت‌های بخش‌های مختلف ---
import TotalBalance from './src/components/TotalBalance';
import NetworkScroller from './src/components/NetworkScroller';
import PortfolioChart from './src/components/PortfolioChart';
import TokenAssetsList from './src/components/TokenAssetsList';
import FlyOutEffect from './src/components/FlyOutEffect';
import CombatChat from './src/screens/CombatChat'; 
import NftGallery from './src/screens/NftGallery';
import StakingVault from './src/components/StakingVault';
import SecurityVault from './src/components/SecurityVault';
import SwapScreen from './src/screens/SwapScreen'; // بخش جدید سوآپ

const { width } = Dimensions.get('window');

export default function App() {
  // --- استیت‌های مدیریتی ---
  const [activeTab, setActiveTab] = useState('wallet');
  const [selectedNetwork, setSelectedNetwork] = useState('ALL');
  const [isLoaded, setIsLoaded] = useState(false);

  // --- راه‌اندازی سیستم نئونی ---
  useEffect(() => {
    const startCiBL = async () => {
      await SoundManager.init();
      SoundManager.play('AUTH'); // صدای ورود امنیتی
      setIsLoaded(true);
    };
    startCiBL();
  }, []);

  if (!isLoaded) return null;

  // تابع تغییر تب با افکت صوتی اختصاصی
  const changeTab = (tab) => {
    setActiveTab(tab);
    if (tab === 'wallet') SoundManager.play('NEON_TICK');
    if (tab === 'swap') SoundManager.play('TX_CHARGE'); // صدای شارژ برای سوآپ
    if (tab === 'chat') SoundManager.play('SWORD');
    if (tab === 'nfts') SoundManager.play('NAV_SWOOSH');
  };

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaView className="flex-1 bg-black">
        <StatusBar barStyle="light-content" />
        
        {/* افکت بصری پرتاب تراکنش */}
        <FlyOutEffect isVisible={false} color="#06b6d4" />

        <View className="flex-1">
          <AnimatePresence exitBeforeEnter>
            {/* ۱. ویوی کیف پول */}
            {activeTab === 'wallet' && (
              <MotiView from={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}} key="wallet">
                <ScrollView showsVerticalScrollIndicator={false} className="mb-24">
                  <TotalBalance totalValue={9450.75} currencyCode="USD" />
                  <NetworkScroller activeNet={selectedNetwork} onSelect={setSelectedNetwork} />
                  <PortfolioChart color={EVM_CONFIG[selectedNetwork]?.color || '#06b6d4'} />
                  <TokenAssetsList filterNetwork={selectedNetwork} />
                </ScrollView>
              </MotiView>
            )}

            {/* ۲. ویوی سوآپ (بخش مرکزی) */}
            {activeTab === 'swap' && (
              <MotiView from={{opacity:0, scale:0.9}} animate={{opacity:1, scale:1}} key="swap">
                <SwapScreen />
              </MotiView>
            )}

            {/* ۳. سایر بخش‌ها */}
            {activeTab === 'nfts' && <NftGallery key="nfts" onClose={() => setActiveTab('wallet')} />}
            {activeTab === 'staking' && <StakingVault key="staking" asset="TON" apy={12.5} />}
            {activeTab === 'chat' && <CombatChat key="chat" />}
            {activeTab === 'security' && <SecurityVault key="security" />}
          </AnimatePresence>
        </View>

        {/* --- نوار ابزار نئونی نهایی با دکمه شناور سوآپ --- */}
        <View className="absolute bottom-8 left-4 right-4 h-20 bg-slate-900/90 border border-slate-800 rounded-[35px] flex-row justify-between items-center px-4 shadow-2xl shadow-cyan-500/20">
          
          <TabButton icon="wallet" isActive={activeTab === 'wallet'} onPress={() => changeTab('wallet')} />
          <TabButton icon="image" isActive={activeTab === 'nfts'} onPress={() => changeTab('nfts')} />

          {/* دکمه مرکزی شناور برای SWAP */}
          <TouchableOpacity 
            onPress={() => changeTab('swap')}
            style={{ 
              top: -30, 
              width: 70, height: 70, 
              borderRadius: 35, 
              backgroundColor: '#06b6d4',
              justifyContent: 'center', alignItems: 'center',
              borderWidth: 5, borderColor: '#000',
              shadowColor: '#06b6d4', shadowOffset: {width:0, height:10}, shadowOpacity: 0.5, shadowRadius: 15
            }}
          >
            <MotiView
              animate={{ rotate: activeTab === 'swap' ? '180deg' : '0deg' }}
              transition={{ type: 'spring' }}
            >
              <Feather name="repeat" size={28} color="black" />
            </MotiView>
          </TouchableOpacity>

          <TabButton icon="zap" isActive={activeTab === 'staking'} onPress={() => changeTab('staking')} />
          <TabButton icon="message-square" isActive={activeTab === 'chat'} onPress={() => changeTab('chat')} />

        </View>

        {/* دکمه کوچک امنیت در گوشه بالا برای دسترسی سریع */}
        <TouchableOpacity 
          onPress={() => changeTab('security')}
          className="absolute top-14 right-6 bg-slate-900/50 p-2 rounded-full border border-slate-800"
        >
          <Feather name="shield" size={20} color={activeTab === 'security' ? '#22d3ee' : '#475569'} />
        </TouchableOpacity>

      </SafeAreaView>
    </GestureHandlerRootView>
  );
}

// کامپوننت دکمه‌های تب‌بار
const TabButton = ({ icon, isActive, onPress }) => (
  <TouchableOpacity onPress={onPress} className="items-center justify-center w-12">
    <MotiView animate={{ scale: isActive ? 1.2 : 1, opacity: isActive ? 1 : 0.4 }}>
      <Feather name={icon} size={22} color={isActive ? '#22d3ee' : '#94a3b8'} />
    </MotiView>
    {isActive && <View className="w-1 h-1 bg-cyan-400 rounded-full mt-1" />}
  </TouchableOpacity>
);
import * as SplashScreen from 'expo-splash-screen';
import { Asset } from 'expo-asset';
import * as Font from 'expo-font';

// جلوگیری از مخفی شدن خودکار صفحه اسپلش
SplashScreen.preventAutoHideAsync();

export default function App() {
  const [appIsReady, setAppIsReady] = useState(false);

  useEffect(() => {
    async function prepare() {
      try {
        // ۱. لود کردن فونت‌ها
        await Font.loadAsync({
          'Orbitron-Bold': require('./assets/fonts/Orbitron-Bold.ttf'),
          'Cairo-Bold': require('./assets/fonts/Cairo-Bold.ttf'),
        });

        // ۲. پیش‌بارگذاری تصاویر سنگین (WebP)
        await Asset.loadAsync([
          require('./assets/images/background-neon.webp'),
          require('./assets/icons/app-icon.png'),
        ]);

        // ۳. شبیه‌سازی لودینگ سیستم (اختیاری)
        await new Promise(resolve => setTimeout(resolve, 2000));
      } catch (e) {
        console.warn(e);
      } finally {
        setAppIsReady(true);
        await SplashScreen.hideAsync(); // حالا صفحه اصلی را نشان بده
      }
    }

    prepare();
  }, []);

  if (!appIsReady) return null;

  return <MainNavigation />;
}
export default function App() {
  const [showAnimatedSplash, setShowAnimatedSplash] = useState(true);
  const [appIsReady, setAppIsReady] = useState(false);

  // منطق لود کردن دارایی‌ها (که قبلاً نوشتیم)
  useEffect(() => {
    prepareAssets().then(() => setAppIsReady(true));
  }, []);

  if (!appIsReady) return null; // نمایش اسپلش استاتیک اکسپو

  if (showAnimatedSplash) {
    return <AnimatedSplash onFinish={() => setShowAnimatedSplash(false)} />;
  }

  return (
    <NavigationContainer>
      <MainStack />
    </NavigationContainer>
  );
}


