import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import SolanaWallet from '../../blockchain/solana/wallet';
import { supabase } from '../../api/supabaseClient';

const ChallengeCard = ({ challengeData, currentUser }) => {
    const { id, amount, creator_id, creator_name, status } = challengeData;
    const [loading, setLoading] = useState(false);

    const handleAccept = async () => {
        setLoading(true);
        try {
            // ۱. امضای تراکنش ۵ دلاری در سولانا
            // این تابع به قرارداد هوشمند (Anchor) متصل می‌شود
            const txSignature = await SolanaWallet.sendChallengeDeposit(amount);
            
            if (txSignature) {
                // ۲. آپدیت وضعیت چالش در Supabase
                await supabase
                    .from('challenges')
                    .update({ 
                        status: 'active', 
                        opponent_id: currentUser.id,
                        start_time: new Date() 
                    })
                    .eq('id', id);
            }
        } catch (error) {
            console.error("Challenge Accept Failed:", error);
            alert("Transaction failed or insufficient balance");
        } finally {
            setLoading(false);
        }
    };

    return (
        <View style={styles.card}>
            <Text style={styles.title}>🔥 TRADING CHALLENGE</Text>
            <Text style={styles.details}>Creator: {creator_name}</Text>
            <Text style={styles.amount}>Stake: ${amount} USDC</Text>
            
            {creator_id === currentUser.id ? (
                <Text style={styles.waitingText}>Waiting for opponent...</Text>
            ) : (
                <TouchableOpacity 
                    style={styles.button} 
                    onStore={handleAccept}
                    disabled={loading}
                >
                    <Text style={styles.buttonText}>
                        {loading ? "Processing..." : "ACCEPT CHALLENGE"}
                    </Text>
                </TouchableOpacity>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    card: {
        backgroundColor: '#1a1a2e',
        borderRadius: 15,
        padding: 15,
        marginVertical: 10,
        borderWidth: 1,
        borderColor: '#4e4eff',
        shadowColor: '#000',
        shadowOpacity: 0.3,
    },
    title: { color: '#4e4eff', fontWeight: 'bold', fontSize: 16, marginBottom: 5 },
    amount: { color: '#00ff88', fontSize: 20, fontWeight: 'bold', marginVertical: 10 },
    button: { backgroundColor: '#4e4eff', padding: 12, borderRadius: 8, alignItems: 'center' },
    buttonText: { color: '#fff', fontWeight: 'bold' },
    waitingText: { color: '#aaa', fontStyle: 'italic', textAlign: 'center' }
});

export default ChallengeCard;
