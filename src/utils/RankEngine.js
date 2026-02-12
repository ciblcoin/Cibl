export const getRankInfo = (balance) => {
  if (balance >= 50000) return { title: 'WHALE', color: '#f43f5e', glow: 'shadow-red-500', icon: 'crown' };
  if (balance >= 10000) return { title: 'SHARK', color: '#06b6d4', glow: 'shadow-cyan-500', icon: 'zap' };
  if (balance >= 1000) return { title: 'PILOT', color: '#22c55e', glow: 'shadow-green-500', icon: 'navigation' };
  return { title: 'ROOKIE', color: '#94a3b8', glow: 'shadow-slate-500', icon: 'user' };
};
