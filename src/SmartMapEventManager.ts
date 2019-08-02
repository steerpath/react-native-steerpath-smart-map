/* eslint-disable prefer-destructuring */
import { NativeModules, Platform, NativeEventEmitter } from 'react-native';

export enum SmartMapEvent {
  MAP_LOADED = 'SPSmartMapLoaded',
  MAP_CLICKED = 'SPSmartMapClicked',
}

const RNSmartMapEventManager = NativeModules.RNSmartMapEventManager;

const SmartMapEventManagerEmitter = Platform.OS === 'web' ? null : new NativeEventEmitter(RNSmartMapEventManager);

export const SmartMapEventManager = {
  addListener(eventName: SmartMapEvent, listener: (data: any) => void) {
    if (SmartMapEventManagerEmitter) {
      SmartMapEventManagerEmitter.addListener(eventName, listener);
    }
  },
  removeListener(eventName: SmartMapEvent, listener: (data: any) => void) {
    if (SmartMapEventManagerEmitter) {
      SmartMapEventManagerEmitter.removeListener(eventName, listener);
    }
  },
};
