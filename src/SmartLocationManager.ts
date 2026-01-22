import { NativeModules, NativeEventEmitter, EmitterSubscription, DeviceEventEmitter, Platform } from "react-native";

const { RNSmartLocationManager } = NativeModules;

const smartLocationManagerEmitter = Platform.select({
  ios: new NativeEventEmitter(RNSmartLocationManager),
  android: DeviceEventEmitter,
});

export type LocationResponse = {
  latitude: number, longitude: number, buildingRef: string | null, floorIndex: number, accuracyM: number
}

function createSmartLocationManager() {
  let eventListenerRegistered = false;
  let eventListener: EmitterSubscription;

  return {
    addLocationChangedListener(
      listener: (
        data: LocationResponse
      ) => void
    ) {
      if (!eventListenerRegistered && smartLocationManagerEmitter) {
        console.log('set location listener JS')
        eventListenerRegistered = true;
        eventListener = smartLocationManagerEmitter.addListener('locationChanged', (payload: LocationResponse) => {
          listener(payload);
        })
      } else if (eventListenerRegistered) {
        console.warn('Location listener already registered');
      } else {
        console.warn('SmartLocationManager emitter is not available');
      }
    },
    removeLocationChangedListener() {
      eventListenerRegistered = false;
      eventListener.remove();
    }
  };
}

export const SmartLocationManager = createSmartLocationManager();

