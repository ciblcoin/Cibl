// src/services/CurrencyService.js

const EXCHANGE_RATES = {
  USD: 1.0,
  EUR: 0.92, // مثال: نرخ برابری یورو به دلار
  GBP: 0.79, // مثال: نرخ برابری پوند به دلار
};

const SYMBOLS = {
  USD: '$',
  EUR: '€',
  GBP: '£'
};

export const formatBalance = (usdValue, currencyCode) => {
  const rate = EXCHANGE_RATES[currencyCode] || 1.0;
  const converted = usdValue * rate;
  return {
    symbol: SYMBOLS[currencyCode],
    value: converted.toLocaleString(undefined, { 
      minimumFractionDigits: 2, 
      maximumFractionDigits: 2 
    })
  };
};
// بخشی از صفحه تنظیمات
const CurrencySelector = ({ currentCurrency, setCurrency }) => {
  const currencies = ['USD', 'EUR', 'GBP'];

  return (
    <View className="flex-row bg-slate-900 p-1 rounded-2xl border border-slate-800">
      {currencies.map((curr) => (
        <TouchableOpacity
          key={curr}
          onPress={() => {
            setCurrency(curr);
            Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
          }}
          className={`flex-1 py-3 rounded-xl ${currentCurrency === curr ? 'bg-cyan-600' : ''}`}
        >
          <Text className={`text-center font-bold ${currentCurrency === curr ? 'text-white' : 'text-slate-500'}`}>
            {curr}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};
