import { NativeModules, NativeEventEmitter, EmitterSubscription } from "react-native";

const RNSmartLocationManager = NativeModules.RNSmartLocationManager;

const smartLocationManagerEmitter = new NativeEventEmitter(
  RNSmartLocationManager
);

function createSmartLocationManager() {
  let eventListenerRegistered = false;
  let eventListener: EmitterSubscription;

  return {
    addLocationChangedListener(
      listener: (
        data: { latitude: number, longitude: number, buildingRef: string | null, floorIndex: number }
      ) => void
    ) {
      if (!eventListenerRegistered) {
        eventListenerRegistered = true;        
        eventListener = smartLocationManagerEmitter.addListener('locationChanged', (payload) => {
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

