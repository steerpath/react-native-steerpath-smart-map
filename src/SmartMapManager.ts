/* eslint-disable prefer-destructuring */
import { NativeModules, Platform } from 'react-native';

const RNSmartMapManager = NativeModules.RNSmartMapManager;

export const SmartMapManager = {
  start(apiKey: string): void {
    RNSmartMapManager.start(apiKey);
  },
  setLiveConfig(config: Record<string, string>): void {
    if (Platform.OS === 'ios') {
      RNSmartMapManager.setLiveConfig(config);
    }
  }
};
