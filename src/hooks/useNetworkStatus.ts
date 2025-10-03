import { useState, useEffect } from 'react';
import NetInfo, { NetInfoState } from '@react-native-community/netinfo';

export const useNetworkStatus = (): boolean | null => {
  const [isOnline, setIsOnline] = useState<boolean | null>(null);

  const evaluateState = (state: NetInfoState) => {
    const isConnected = state.isConnected ?? false;

    // Only use isInternetReachable if not null
    const isReachable =
      state.isInternetReachable === null ? true : state.isInternetReachable;

    setIsOnline(isConnected && isReachable);
  };

  useEffect(() => {
    // Initial check
    NetInfo.fetch().then(evaluateState);

    // Subscribe to updates
    const unsubscribe = NetInfo.addEventListener(evaluateState);

    return () => unsubscribe();
  }, []);

  return isOnline;
};
