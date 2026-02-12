const renderChatItem = ({ item }) => {
  const rank = getRankInfo(item.balance); // دریافت اطلاعات رتبه بر اساس موجودی فرستنده

  return (
    <MotiView className="p-4 mb-2">
      <View className="flex-row items-center mb-1">
        {/* نام کاربری با رنگ رتبه */}
        <Text style={{ color: rank.color }} className="font-black text-xs uppercase">
          {item.username}
        </Text>
        
        {/* نشان رتبه (Rank Badge) با درخشش نئونی */}
        <View 
          style={{ borderColor: rank.color }}
          className={`ml-2 px-2 py-0.5 rounded border ${rank.glow}`}
        >
          <Text style={{ color: rank.color }} className="text-[8px] font-bold">
            {rank.title}
          </Text>
        </View>
      </View>

      <View className="bg-slate-900/80 p-3 rounded-2xl rounded-tl-none border border-slate-800">
        <Text className="text-slate-200">{item.message}</Text>
      </View>
    </MotiView>
  );
};
