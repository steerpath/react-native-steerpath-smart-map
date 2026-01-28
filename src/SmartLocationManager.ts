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
          const location = await RNSmartLocationManager.getLocation();
          listener(location);
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
    /**
     * Mostly for internal use. Fetches user's current location once.
     * Using this as a workaround for locationChanged event emitter not working with old bridge.
     * 
     * @returns user's current location.
     */
    getLocation(): Promise<LocationResponse> {
      return RNSmartLocationManager.getLocation();
    }
  };
}

export const SmartLocationManager = createSmartLocationManager();

