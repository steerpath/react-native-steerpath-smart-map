/* eslint-disable prefer-destructuring */
import { NativeModules } from 'react-native';

const RNSmartMapManager = NativeModules.RNSmartMapManager;

export const SmartMapManager = {
  start(apiKey: string): void {
    RNSmartMapManager.start(apiKey);
  },
};
