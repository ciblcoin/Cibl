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
