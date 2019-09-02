/* eslint-disable prefer-destructuring */
import { SmartMapEvent } from "./SmartMapViewProps";
import {NativeEventEmitter } from "react-native";

const SmartMapEventManagerEmitter = new NativeEventEmitter();
export const SmartMapEventManager = {
  addListener(eventName: SmartMapEvent, listener: (data: any) => void) {
    SmartMapEventManagerEmitter.addListener(eventName, listener);
  },
  removeListener(eventName: SmartMapEvent, listener: (data: any) => void) {
    SmartMapEventManagerEmitter.removeListener(eventName, listener);
  }
};
