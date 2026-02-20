import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { useTheme } from '../context/ThemeContext';
import { useNetwork, NETWORKS } from '../context/NetworkContext';
import { CiBLIcon, ICONS } from '../utils/Icons';
import { InteractionService } from '../utils/InteractionService';

const NetworkSettings = () => {
  const { theme } = useTheme();
  const { currentNetwork, setCurrentNetwork } = useNetwork();

  const handleNetworkChange = (network) => {
    InteractionService.playInteraction(theme); // پخش صدای کلیک تم
    setCurrentNetwork(network);
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <Text style={[styles.header, { color: theme.text }]}>NETWORK_PROTOCOLS</Text>
      
      <ScrollView>
        {Object.values(NETWORKS).map((net) => {
          const isActive = currentNetwork.id === net.id;
          return (
            <TouchableOpacity 
              key={net.id}
              onPress={() => handleNetworkChange(net)}
              style={[
                styles.networkCard, 
                { backgroundColor: theme.card, borderColor: isActive ? net.color : theme.border }
              ]}
            >
              <View style={styles.info}>
                <View style={[styles.statusDot, { backgroundColor: net.color, shadowColor: net.color }]} />
                <View>
                  <Text style={[styles.netName, { color: theme.text }]}>{net.name}</Text>
                  <Text style={[styles.netRpc, { color: theme.textMuted }]}>{net.id.toUpperCase()}_GATEWAY</Text>
                </View>
              </View>

              {isActive && (
                <View style={[styles.activeBadge, { backgroundColor: net.color + '20' }]}>
                  <Text style={{ color: net.color, fontFamily: 'Orbitron-Bold', fontSize: 10 }}>CONNECTED</Text>
                </View>
              )}
            </TouchableOpacity>
          );
        })}
      </ScrollView>

      <View style={[styles.warningBox, { borderColor: theme.border }]}>
        <CiBLIcon name={ICONS.SECURITY} size={20} color={theme.textMuted} />
        <Text style={[styles.warningText, { color: theme.textMuted }]}>
          CHANGING PROTOCOLS MAY REQUIRE A SYSTEM REBOOT TO SYNC NODES.
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 25, paddingTop: 60 },
  header: { fontFamily: 'Orbitron-Bold', fontSize: 16, marginBottom: 30, letterSpacing: 2 },
  networkCard: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 20,
    borderRadius: 16,
    borderWidth: 1,
    marginBottom: 15,
  },
  info: { flexDirection: 'row', alignItems: 'center' },
  statusDot: { width: 8, height: 8, borderRadius: 4, marginRight: 15, elevation: 10, shadowOpacity: 0.8, shadowRadius: 5 },
  netName: { fontFamily: 'Orbitron-Bold', fontSize: 13 },
  netRpc: { fontFamily: 'Courier', fontSize: 10, marginTop: 4 },
  activeBadge: { paddingHorizontal: 10, paddingVertical: 4, borderRadius: 8 },
  warningBox: { marginTop: 'auto', padding: 20, borderWidth: 1, borderStyle: 'dashed', flexDirection: 'row', alignItems: 'center', borderRadius: 12 },
  warningText: { fontFamily: 'Courier', fontSize: 9, marginLeft: 10, flex: 1 }
});

export default NetworkSettings;
