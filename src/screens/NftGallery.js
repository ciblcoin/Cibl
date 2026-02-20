import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, Image, Dimensions, TouchableOpacity } from 'react-native';
import { MotiView } from 'moti';
import { Sparkles, X } from 'lucide-react-native';
import SoundManager from '../utils/SoundManager';
import { fetchEvmNfts, fetchSolanaNfts } from '../services/NftService'; // API services

const { width } = Dimensions.get('window');

const NftGallery = ({ onClose }) => {
  const [nfts, setNfts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadNfts = async () => {
      // شبیه‌سازی آدرس‌های کاربر برای تست
      const userEthAddress = "0xYourEthAddressHere";
      const userSolAddress = "YourSolanaAddressHere";

      try {
        const ethNfts = await fetchEvmNfts(userEthAddress, 'ETHEREUM');
        const solNfts = await fetchSolanaNfts(userSolAddress);
        // ... اضافه کردن NFT از TON, Sui, Base, BSC

        setNfts([...(ethNfts || []), ...(solNfts || [])]);
        SoundManager.play('NOTIFY'); // صدای دریافت کالکشن
      } catch (error) {
        console.error("Failed to load NFTs:", error);
      } finally {
        setLoading(false);
      }
    };
    loadNfts();
  }, []);

  const renderNftItem = ({ item, index }) => (
    <MotiView
      from={{ opacity: 0, scale: 0.8, translateY: 50 }}
      animate={{ opacity: 1, scale: 1, translateY: 0 }}
      transition={{ delay: index * 100, type: 'timing' }}
      className="bg-slate-900/70 p-3 rounded-3xl m-2 border border-slate-800 shadow-xl shadow-cyan-500/10"
      style={{ width: width / 2 - 20 }}
    >
      <Image 
        source={{ uri: item.imageUrl || 'https://via.placeholder.com/150/000000/FFFFFF?text=NFT' }} 
        className="w-full h-40 rounded-2xl" 
      />
      <Text className="text-white font-bold text-sm mt-3">{item.name || 'Unnamed NFT'}</Text>
      <Text className="text-slate-400 text-xs mt-1">Collection: {item.collectionName || 'N/A'}</Text>
      <View className="flex-row items-center mt-2">
        <Sparkles color="#22d3ee" size={12} />
        <Text className="text-cyan-400 text-xs ml-1">{item.network || 'EVM'}</Text>
      </View>
    </MotiView>
  );

  return (
    <View className="flex-1 bg-black pt-8">
      <View className="flex-row justify-between items-center px-6 mb-6">
        <Text className="text-white text-3xl font-black">NEON GALLERY</Text>
        <TouchableOpacity onPress={onClose} className="bg-slate-900/80 p-3 rounded-full border border-slate-700">
          <X color="white" size={24} />
        </TouchableOpacity>
      </View>

      {loading ? (
        <Text className="text-cyan-400 text-center mt-20">Loading digital artifacts...</Text>
      ) : (
        <FlatList
          data={nfts}
          renderItem={renderNftItem}
          keyExtractor={(item, index) => item.id || index.toString()}
          numColumns={2}
          contentContainerStyle={{ paddingHorizontal: 10 }}
        />
      )}
    </View>
  );
};


import React from 'react';
import { View, Text, StyleSheet, FlatList, Image, Dimensions } from 'react-native';
import { useTheme } from '../context/ThemeContext';
import Animated, { useSharedValue, useAnimatedStyle, withSpring } from 'react-native-reanimated';

const { width } = Dimensions.get('window');
const COLUMN_WIDTH = width / 2 - 30;

const NFT_DATA = [
  { id: '1', name: 'Cyber Neon #01', collection: 'CiBL Origins', price: '0.5 ETH', uri: 'https://placeholder.com/nft1' },
  { id: '2', name: 'Matrix Void', collection: 'Deep Link', price: '1.2 ETH', uri: 'https://placeholder.com/nft2' },
  { id: '3', name: 'Quantum Pulse', collection: 'CiBL Origins', price: '0.8 ETH', uri: 'https://placeholder.com/nft3' },
  { id: '4', name: 'Neural Drifter', collection: 'Glitch City', price: '2.5 ETH', uri: 'https://placeholder.com/nft4' },
];

const NFTGallery = () => {
  const { theme } = useTheme();

  const renderNFT = ({ item }) => (
    <View style={[styles.nftCard, { backgroundColor: theme.card, borderColor: theme.border }]}>
      <View style={styles.imagePlaceholder}>
         {/* در پروژه واقعی از <Image source={{uri: item.uri}} /> استفاده می‌شود */}
         <View style={[styles.mockImage, { backgroundColor: theme.primary + '30' }]}>
            <Text style={{color: theme.primary, fontFamily: 'Orbitron-Bold'}}>NFT_IMG</Text>
         </View>
      </View>
      <View style={styles.infoContainer}>
        <Text style={[styles.nftName, { color: theme.text }]}>{item.name}</Text>
        <Text style={[styles.collectionName, { color: theme.textMuted }]}>{item.collection}</Text>
        <View style={[styles.priceTag, { backgroundColor: theme.primary }]}>
          <Text style={styles.priceText}>{item.price}</Text>
        </View>
      </View>
    </View>
  );

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <Text style={[styles.header, { color: theme.text }]}>DIGITAL_COLLECTIBLES</Text>
      <FlatList
        data={NFT_DATA}
        renderItem={renderNFT}
        keyExtractor={item => item.id}
        numColumns={2}
        contentContainerStyle={styles.listContent}
        columnWrapperStyle={styles.columnWrapper}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, paddingTop: 60 },
  header: { fontFamily: 'Orbitron-Bold', fontSize: 16, textAlign: 'center', marginBottom: 20, letterSpacing: 2 },
  listContent: { paddingHorizontal: 20 },
  columnWrapper: { justifyContent: 'space-between' },
  nftCard: {
    width: COLUMN_WIDTH,
    borderRadius: 20,
    borderWidth: 1,
    marginBottom: 20,
    overflow: 'hidden',
    elevation: 5,
  },
  imagePlaceholder: { width: '100%', height: COLUMN_WIDTH, padding: 10 },
  mockImage: { flex: 1, borderRadius: 15, justifyContent: 'center', alignItems: 'center' },
  infoContainer: { padding: 12 },
  nftName: { fontFamily: 'Cairo-Bold', fontSize: 13 },
  collectionName: { fontFamily: 'Courier', fontSize: 10, marginTop: 4 },
  priceTag: { alignSelf: 'flex-start', paddingHorizontal: 8, paddingVertical: 4, borderRadius: 8, marginTop: 10 },
  priceText: { fontSize: 10, fontFamily: 'Orbitron-Bold', color: '#000' }
});

export default NFTGallery;
