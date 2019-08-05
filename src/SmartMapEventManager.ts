/* eslint-disable prefer-destructuring */
import { NativeModules, NativeEventEmitter } from "react-native";
import { SmartMapEvent } from "./SmartMapViewProps";

const RNSmartMapEventManager = NativeModules.RNSmartMapEventManager;

const SmartMapEventManagerEmitter = new NativeEventEmitter(
  RNSmartMapEventManager
);

export const SmartMapEventManager = {
  addListener(eventName: SmartMapEvent, listener: (data: any) => void) {
    SmartMapEventManagerEmitter.addListener(eventName, listener);
  },
  removeListener(eventName: SmartMapEvent, listener: (data: any) => void) {
    SmartMapEventManagerEmitter.removeListener(eventName, listener);
  }
};
