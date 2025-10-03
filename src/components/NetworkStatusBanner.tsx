import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useNetworkStatus } from '../hooks/useNetworkStatus';

const SUCCESS_COLOR = '#34C759'; // iOS Green
const DANGER_COLOR = '#FF3B30'; // iOS Red
const BG_SUCCESS = '#D8F5E1'; // Very light green
const BG_DANGER = '#FDE4E4'; // Very light red

const NetworkStatusBanner: React.FC = () => {
  const isOnline = useNetworkStatus();

  return (
    <View style={styles.shadowWrapper}>
      <View style={[styles.container, isOnline ? styles.online : styles.offline]}>
        <Text style={[styles.text, isOnline ? styles.textOnline : styles.textOffline]}>
          {isOnline ? ' Connected' : ' Connection Lost'}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  shadowWrapper: {
    // Wrapper to apply a subtle shadow that lifts the banner
    width: '100%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  container: {
    paddingVertical: 10,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection:'row',
    width: '100%',
  },
  online: {
    backgroundColor: BG_SUCCESS,
  },
  offline: {
    backgroundColor: BG_DANGER,
  },
  text: {
    fontWeight: '900',
    fontSize: 14,
  },
  textOnline: {
    color: SUCCESS_COLOR,
  },
  textOffline: {
    color: DANGER_COLOR,
  },
});

export default NetworkStatusBanner;