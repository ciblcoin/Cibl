const IMPORT_METHODS = [
  { id: 'mnemonic', label: 'Recovery Phrase', sub: '12, 18, or 24 words', icon: 'key-outline' },
  { id: 'privkey', label: 'Private Key', sub: 'Import a single account string', icon: 'lock-closed-outline' },
  { id: 'hardware', label: 'Hardware Wallet', sub: 'Connect Ledger or Trezor', icon: 'bluetooth-outline' },
  { id: 'watch', label: 'Watch Mode', sub: 'View-only balance tracking', icon: 'eye-outline' },
];

export default function ImportOptions({ navigation }) {
  return (
    <View className="flex-1 bg-cibl-dark px-6 pt-12">
      <Text className="text-2xl font-bold text-white mb-2">Import Wallet</Text>
      <Text className="text-slate-400 mb-8">Choose how you want to restore your assets.</Text>
      
      {IMPORT_METHODS.map((method) => (
        <TouchableOpacity 
          key={method.id}
          onPress={() => navigation.navigate(method.id)}
          className="mb-4 p-5 bg-slate-800/50 border border-slate-700 rounded-2xl flex-row items-center"
        >
          <Icon name={method.icon} size={28} color="#FFD700" />
          <div className="ml-4">
            <Text className="text-white font-bold text-lg">{method.label}</Text>
            <Text className="text-slate-400 text-sm">{method.sub}</Text>
          </div>
        </TouchableOpacity>
      ))}
    </View>
  );
}
