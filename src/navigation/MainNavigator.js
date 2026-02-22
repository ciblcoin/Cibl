import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

// وارد کردن تمام صفحات (Screens)
import WalletDashboard from '../screens/WalletDashboard';
import SwapScreen from '../screens/SwapScreen';
import NFTGallery from '../screens/NFTGallery';
import SeedPhraseScreen from '../screens/SeedPhraseScreen';
import NetworkSettings from '../screens/NetworkSettings';
import QRScannerScreen from '../screens/QRScannerScreen';
import TransactionDetails from '../screens/TransactionDetails';

const Stack = createStackNavigator();

const MainNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Dashboard"
        screenOptions={{
          headerShown: false, // چون ما هدر اختصاصی نئونی خودمان را داریم
          cardStyle: { backgroundColor: 'transparent' },
          presentation: 'card',
        }}
      >
        {/* صفحه اصلی */}
        <Stack.Screen name="Dashboard" component={WalletDashboard} />
        
        {/* صفحات عملیاتی */}
        <Stack.Screen name="Swap" component={SwapScreen} />
        <Stack.Screen name="Scanner" component={QRScannerScreen} />
        <Stack.Screen name="NFTs" component={NFTGallery} />
        
        {/* صفحات امنیتی و تنظیمات */}
        <Stack.Screen name="SeedPhrase" component={SeedPhraseScreen} />
        <Stack.Screen name="Network" component={NetworkSettings} />
        <Stack.Screen name="Details" component={TransactionDetails} />
        
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default MainNavigator;

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import CiblTabBar from './CiblTabBar';

const Tab = createBottomTabNavigator();

const TabNavigator = () => {
  return (
    <Tab.Navigator
      tabBar={props => <CiblTabBar {...props} />}
      screenOptions={{ headerShown: false }}
    >
      <Tab.Screen name="Home" component={WalletDashboard} />
      <Tab.Screen name="Swap" component={SwapScreen} />
      <Tab.Screen name="NFTs" component={NFTGallery} />
      <Tab.Screen name="Settings" component={NetworkSettings} />
    </Tab.Navigator>
  );
};


import WelcomeScreen from '../screens/onboarding/WelcomeScreen';
import CreateWallet from '../screens/onboarding/CreateWallet';
import ImportWallet from '../screens/onboarding/ImportWallet';

// در داخل Stack.Navigator:
<Stack.Screen name="Welcome" component={WelcomeScreen} />
<Stack.Screen name="CreateWallet" component={CreateWallet} />
<Stack.Screen name="ImportWallet" component={ImportWallet} />

import { createDrawerNavigator } from '@react-navigation/drawer';
import Dashboard from '../screens/main/Dashboard';
import ProfileSettings from '../screens/main/ProfileSettings'; // فرض بر وجود این صفحه

const Drawer = createDrawerNavigator();

const DrawerNavigator = () => {
  return (
    <Drawer.Navigator 
      screenOptions={{ 
        headerShown: false,
        drawerPosition: 'right', // منو از سمت راست باز شود (طبق طرح شما)
        drawerStyle: { width: '80%', backgroundColor: '#000' }
      }}
    >
      <Drawer.Screen name="MainDashboard" component={Dashboard} />
      <Drawer.Screen name="Profile" component={ProfileSettings} />
    </Drawer.Navigator>
  );
};
