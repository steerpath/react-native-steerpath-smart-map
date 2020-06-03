/* eslint-disable prefer-destructuring */
import { NativeModules, NativeEventEmitter } from "react-native";
import { SmartGeofenceResponse } from "./SmartMapViewProps";

export enum SmartGeofenceEvent {
  GEOFENCE_ENTERED = "GeofenceEntered",
  GEOFENCE_EXITED = "GeofenceExited",
  BEACONFENCE_ENTERED = "BeaconfenceEntered",
  BEACONFENCE_EXITED = "BeaconfenceExited",
}

const POSSIBLE_EVENTS: SmartGeofenceEvent[] = [
  SmartGeofenceEvent.GEOFENCE_ENTERED,
  SmartGeofenceEvent.GEOFENCE_EXITED,
  SmartGeofenceEvent.BEACONFENCE_ENTERED,
  SmartGeofenceEvent.BEACONFENCE_EXITED,
];

const RNSmartGeofenceManager = NativeModules.RNSmartGeofenceManager;

const smartGeofenceManagerEmitter = new NativeEventEmitter(
  RNSmartGeofenceManager
);

function createSmartGeofenceManager() {
  let eventListenerRegistered = false;
  return {
    addGeofence(
      localRef: string,
      buildingRef: string,
      callback: (error: Error, response: SmartGeofenceResponse) => void
    ) {
      RNSmartGeofenceManager.addGeofence(localRef, buildingRef, callback);
    },
    removeGeofence(localRef: string, buildingRef: string) {
      RNSmartGeofenceManager.removeGeofence(localRef, buildingRef);
    },
    addBeaconfence(
      beaconId: string,
      radius: number,
      loiteringDelay: number,
      callback: (error: Error, response: SmartGeofenceResponse) => void
    ) {
      RNSmartGeofenceManager.addBeaconfence(
        beaconId,
        radius,
        loiteringDelay,
        callback
      );
    },
    removeBeaconfence(beaconId: string) {
      RNSmartGeofenceManager.removeBeaconfence(beaconId);
    },
    startListening() {
      RNSmartGeofenceManager.startListening();
    },
    stopListening() {
      RNSmartGeofenceManager.stopListening();
    },
    addListener(
      listener: (
        eventName: SmartGeofenceEvent,
        data: Record<string, string>
      ) => void
    ) {
      if (!eventListenerRegistered) {
        RNSmartGeofenceManager.startListening();
        eventListenerRegistered = true;
      }
      POSSIBLE_EVENTS.forEach((eventName) => {
        smartGeofenceManagerEmitter.addListener(eventName, (payload) => {
          listener(eventName, payload);
        });
      });
    },
    removeListener(
      listener: (
        eventName: SmartGeofenceEvent,
        data: Record<string, string>
      ) => void
    ) {
      RNSmartGeofenceManager.stopListening();
      eventListenerRegistered = false;

      POSSIBLE_EVENTS.forEach((eventName) => {
        smartGeofenceManagerEmitter.removeListener(eventName, (payload) => {
          listener(eventName, payload);
        });
      });
    },
  };
}

export const SmartGeofenceManager = createSmartGeofenceManager();
