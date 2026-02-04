import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';

const LivePnL = ({ entryPrice, assetPair, duration = 60 }) => {
    const [currentPrice, setCurrentPrice] = useState(entryPrice);
    const [timeLeft, setTimeLeft] = useState(duration);

    useEffect(() => {
        // اتصال به قیمت زنده (مثال با WebSocket بایننس یا Pyth)
        const ws = new WebSocket(`wss://stream.binance.com:9443/ws/${assetPair.toLowerCase()}@ticker`);
        
        ws.onmessage = (event) => {
            const data = JSON.parse(event.data);
            setCurrentPrice(parseFloat(data.c)); // قیمت لحظه‌ای جدید
        };

        // تایمر معکوس ۱ دقیقه‌ای
        const timer = setInterval(() => {
            setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
        }, 1000);

        return () => {
            ws.close();
            clearInterval(timer);
        };
    }, []);

    const pnl = ((currentPrice - entryPrice) / entryPrice) * 100;
    const isWinning = pnl >= 0;

    return (
        <View style={styles.container}>
            <Text style={styles.timer}>⏱ {timeLeft}s REMAINING</Text>
            <View style={[styles.pnlBox, { borderColor: isWinning ? '#00FF88' : '#FF3E3E' }]}>
                <Text style={styles.label}>YOUR PERFORMANCE</Text>
                <Text style={[styles.value, { color: isWinning ? '#00FF88' : '#FF3E3E' }]}>
                    {isWinning ? '+' : ''}{pnl.toFixed(2)}%
                </Text>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: { alignItems: 'center', padding: 10 },
    timer: { color: '#FFF', fontSize: 18, fontWeight: 'bold', marginBottom: 10 },
    pnlBox: { borderWidth: 2, padding: 20, borderRadius: 15, backgroundColor: '#161625', width: '100%' },
    label: { color: '#AAA', fontSize: 12, textAlign: 'center' },
    value: { fontSize: 32, fontWeight: '900', textAlign: 'center' }
});

export default LivePnL;
