import { NativeModules, NativeEventEmitter, EmitterSubscription } from "react-native";

const { RNSmartLocationManager } = NativeModules;

const smartLocationManagerEmitter = new NativeEventEmitter(RNSmartLocationManager);

export type LocationResponse = {
  latitude: number, longitude: number, buildingRef: string | null, floorIndex: number, accuracyM: number
}

function createSmartLocationManager() {
  let eventListenerRegistered = false;
  let eventListener: EmitterSubscription;
  let locationInterval: NodeJS.Timeout | null = null;
  return {
    addLocationChangedListener(
      listener: (
        data: LocationResponse
      ) => void
    ) {
      if (!eventListenerRegistered && smartLocationManagerEmitter) {
        eventListenerRegistered = true;
        eventListener = smartLocationManagerEmitter.addListener('locationChanged', (_payload: LocationResponse) => {
          // listener(payload);
        })
        // Old-bridge for sending events was not working anymore, so using polling as a workaround, until we move to new architecture
        locationInterval = setInterval(async () => {
          try {
            this.getLocation((loc) => {
              listener(loc);
            })

          } catch (e) {
            console.error('Error getting location:', e);
          }
        }, 1000);
      }
    },
    removeLocationChangedListener() {
      eventListenerRegistered = false;
      eventListener.remove();
      if (locationInterval) {
        clearInterval(locationInterval);
        locationInterval = null;
      }
    },
    getLocation(callback: (location: LocationResponse) => void) {
      RNSmartLocationManager.getLocation(callback);
    }
  };
}

export const SmartLocationManager = createSmartLocationManager();

