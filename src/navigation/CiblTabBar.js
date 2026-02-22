import React from 'react';
import { View, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import { useTheme } from '../context/ThemeContext';
import { CiBLIcon, ICONS } from '../utils/Icons';
import { InteractionService } from '../utils/InteractionService';

const { width } = Dimensions.get('window');

const CiblTabBar = ({ state, descriptors, navigation }) => {
  const { theme } = useTheme();

  return (
    <View style={[styles.wrapper, { backgroundColor: 'transparent' }]}>
      <View style={[styles.container, { 
        backgroundColor: theme.card + 'CC', // ۸۰ درصد شفافیت برای حالت شیشه‌ای
        borderColor: theme.border,
        shadowColor: theme.primary 
      }]}>
        {state.routes.map((route, index) => {
          const { options } = descriptors[route.key];
          const isFocused = state.index === index;

          const onPress = () => {
            InteractionService.playInteraction(theme);
            const event = navigation.emit({ type: 'tabPress', target: route.key });

            if (!isFocused && !event.defaultPrevented) {
              navigation.navigate(route.name);
            }
          };

          // انتخاب آیکون بر اساس نام صفحه
          let iconName = ICONS.HOME;
          if (route.name === 'Swap') iconName = ICONS.SWAP;
          if (route.name === 'NFTs') iconName = 'Layers';
          if (route.name === 'Settings') iconName = 'Settings';

          return (
            <TouchableOpacity
              key={index}
              onPress={onPress}
              style={styles.tabItem}
            >
              <View style={[
                styles.iconContainer,
                isFocused && { shadowColor: theme.primary, shadowOpacity: 1, shadowRadius: 10 }
              ]}>
                <CiBLIcon 
                  name={iconName} 
                  size={24} 
                  color={isFocused ? theme.primary : theme.textMuted} 
                />
              </View>
              {isFocused && (
                <View style={[styles.activeIndicator, { backgroundColor: theme.primary }]} />
              )}
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    position: 'absolute',
    bottom: 30,
    width: width,
    alignItems: 'center',
  },
  container: {
    flexDirection: 'row',
    width: width - 60,
    height: 65,
    borderRadius: 32,
    borderWidth: 1,
    justifyContent: 'space-around',
    alignItems: 'center',
    elevation: 20,
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.3,
  },
  tabItem: { alignItems: 'center', justifyContent: 'center' },
  activeIndicator: {
    position: 'absolute',
    bottom: -10,
    width: 4,
    height: 4,
    borderRadius: 2,
  }
});

export default CiblTabBar;


// در BottomTabNavigator آیکون‌ها را ست می‌کنیم
<Tab.Navigator
  screenOptions={({ route }) => ({
    tabBarIcon: ({ color, size }) => {
      let iconName;
      if (route.name === 'Home') iconName = 'Home';
      else if (route.name === 'Trending') iconName = 'TrendingUp';
      else if (route.name === 'Trade') iconName = 'Repeat';
      else if (route.name === 'Rewards') iconName = 'Gift';
      else if (route.name === 'Discover') iconName = 'Compass';

      return <CiBLIcon name={iconName} size={size} color={color} />;
    },
  })}
>
  <Tab.Screen name="Home" component={Dashboard} />
  <Tab.Screen name="Trending" component={TrendingScreen} />
  <Tab.Screen name="Trade" component={SwapScreen} />
  <Tab.Screen name="Rewards" component={RewardsScreen} />
  <Tab.Screen name="Discover" component={DiscoverScreen} />
</Tab.Navigator>
