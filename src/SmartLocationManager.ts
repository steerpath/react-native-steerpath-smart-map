import { NativeModules, NativeEventEmitter } from "react-native";

const RNSmartLocationManager = NativeModules.RNSmartLocationManager;

const smartLocationManagerEmitter = new NativeEventEmitter(
  RNSmartLocationManager
);

function createSmartLocationManager() {
  let eventListenerRegistered = false;

  return {
    addLocationChangedListener(
      listener: (
        data: { latitude: number, longitude: number, buildingRef: string | null, floorIndex: number }
      ) => void
    ) {
      if (!eventListenerRegistered) {
        eventListenerRegistered = true;
        smartLocationManagerEmitter.addListener('locationChanged', (payload) => {
          listener(payload);
        })
      }
    },
    removeLocationChangedListener() {
      eventListenerRegistered = false;
      smartLocationManagerEmitter.removeListener('locationChanged', () => {})
    }
  };
}

export const SmartLocationManager = createSmartLocationManager();

