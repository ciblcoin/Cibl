import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase/client';
import { generateMasterWallet } from '@/blockchain/multiChainEngine';

export default function ProfileSettings({ session, userProfile }) {
  const [isEditing, setIsEditing] = useState(false);
  const [newDisplayName, setNewDisplayName] = useState(userProfile?.display_name || '');
  const [balances, setBalances] = useState({ solana: 0, evm: 0, ton: 0, total: 0 });

  // کوتاه کردن آدرس برای نمایش زیبا
  const truncateAddress = (addr) => `${addr?.slice(0, 6)}...${addr?.slice(-4)}`;

  const handleUpdateProfile = async () => {
    const { error } = await supabase
      .from('profiles')
      .update({ display_name: newDisplayName })
      .eq('id', session.user.id);

    if (!error) {
      setIsEditing(false);
      alert('نام کاربری با موفقیت بروزرسانی شد!');
    }
  };

  return (
    <div className="p-6 bg-cibl-bg-card rounded-2xl border border-cibl-blue.light/20">
      <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
        👤 Profile & Identity
      </h2>

      {/* بخش نمایش نام و ویرایش */}
      <div className="mb-8 p-4 bg-slate-800/50 rounded-xl">
        <label className="text-sm text-slate-400">Display Name (Visible in Chat)</label>
        <div className="flex items-center gap-3 mt-1">
          {isEditing ? (
            <input
              type="text"
              value={newDisplayName}
              onChange={(e) => setNewDisplayName(e.target.value)}
              className="flex-1 bg-slate-900 border border-cibl-blue.light p-2 rounded"
            />
          ) : (
            <span className="text-lg font-bold">
              {userProfile?.display_name || userProfile?.username}
            </span>
          )}
          <button 
            onClick={() => isEditing ? handleUpdateProfile() : setIsEditing(true)}
            className="text-cibl-blue.light text-sm underline"
          >
            {isEditing ? 'Save' : 'Edit'}
          </button>
        </div>
      </div>

      {/* نمایش آدرس‌های مولتی‌چین */}
      <div className="space-y-4">
        <h3 className="text-sm font-bold text-slate-400 uppercase">Your Multi-Chain Addresses</h3>
        
        <div className="flex justify-between items-center p-3 bg-slate-900 rounded-lg">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-purple-500"></span>
            <span className="text-sm">Solana</span>
          </div>
          <code className="text-xs text-slate-400">{truncateAddress(userProfile?.solana_address)}</code>
        </div>

        <div className="flex justify-between items-center p-3 bg-slate-900 rounded-lg">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-blue-500"></span>
            <span className="text-sm">EVM (Eth/Polygon)</span>
          </div>
          <code className="text-xs text-slate-400">{truncateAddress(userProfile?.evm_address)}</code>
        </div>

        <div className="flex justify-between items-center p-3 bg-slate-900 rounded-lg">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-cyan-400"></span>
            <span className="text-sm">TON (Notcoin/Hamster)</span>
          </div>
          <code className="text-xs text-slate-400">{truncateAddress(userProfile?.ton_address)}</code>
        </div>
      </div>
    </div>
  );
}
