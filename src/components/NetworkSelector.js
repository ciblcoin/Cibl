import i18n from '../i18n';

const isAr = i18n.language === 'ar';

// در استایل‌دهی به جای ML و MR از Start و End استفاده می‌کنیم
<TouchableOpacity 
  className={`flex-row${isAr ? '-reverse' : '' } items-center p-4 mb-4 bg-slate-900/80 rounded-3xl`}
>
  <NetworkIcon name={item.id} size={36} />
  
  <View style={{ marginHorizontal: 16, alignItems: isAr ? 'flex-end' : 'flex-start' }}>
    <Text className="text-white font-black">{item.name}</Text>
    <Text className="text-slate-500 text-[10px]">{item.chain}</Text>
  </View>
  
  <View style={{ marginLeft: isAr ? 0 : 'auto', marginRight: isAr ? 'auto' : 0 }}>
     <ChevronRight size={20} style={{ transform: [{ scaleX: isAr ? -1 : 1 }] }} />
  </View>
</TouchableOpacity>
