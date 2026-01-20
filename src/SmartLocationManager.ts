import { NativeModules, NativeEventEmitter, EmitterSubscription, TurboModuleRegistry } from "react-native";
import { Spec } from './specs/NativeSmartLocationManager';

export type LocationResponse = {
  latitude: number, longitude: number, buildingRef: string | null, floorIndex: number, accuracyM: number
}

declare var global: {
  __turboModuleProxy: any;
};

const isTurboModuleEnabled = global.__turboModuleProxy != null;

const RNSmartLocationManager = isTurboModuleEnabled
  ? TurboModuleRegistry.get<Spec>('RNSmartLocationManager')
  : NativeModules.RNSmartLocationManager;

const smartLocationManagerEmitter = new NativeEventEmitter(
  RNSmartLocationManager
);

function createSmartLocationManager() {
  let eventListenerRegistered = false;
  let eventListener: EmitterSubscription;

  return {
    addLocationChangedListener(
      listener: (
        data: LocationResponse
      ) => void
    ) {
      if (!eventListenerRegistered) {
        eventListenerRegistered = true;        
        eventListener = smartLocationManagerEmitter.addListener('locationChanged', (payload: LocationResponse) => {
          listener(payload);
        })
      }
    },
    removeLocationChangedListener() {
      eventListenerRegistered = false;
      eventListener.remove();
    }
  };
}

export const SmartLocationManager = createSmartLocationManager();

