import { useState, useEffect } from 'react';
import NetInfo, { NetInfoState } from '@react-native-community/netinfo';

export const useNetworkStatus = (): boolean | null => {
  const [isOnline, setIsOnline] = useState<boolean | null>(null);

  const evaluateState = (state: NetInfoState) => {
    const isConnected = state.isConnected ?? false;
 
    const isReachable =
      state.isInternetReachable === null ? true : state.isInternetReachable;

    setIsOnline(isConnected && isReachable);
  };

  useEffect(() => {
     NetInfo.fetch().then(evaluateState); 
    const unsubscribe = NetInfo.addEventListener(evaluateState);

    return () => unsubscribe();
  }, []);

  return isOnline;
};
