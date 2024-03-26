import { NativeModules, NativeEventEmitter, EmitterSubscription } from "react-native";

const RNSmartLocationManager = NativeModules.RNSmartLocationManager;

const smartLocationManagerEmitter = new NativeEventEmitter(
  RNSmartLocationManager
);

export type LocationResponse = {
  latitude: number, longitude: number, buildingRef: string | null, floorIndex: number, accuracyM: number
}

// TODO: verify the new type works as expexted
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

