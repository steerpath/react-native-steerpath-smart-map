/* eslint-disable prefer-destructuring */
import { NativeModules, NativeEventEmitter } from "react-native";
import { SmartGeofenceResponse } from "./SmartMapViewProps";

export enum SmartGeofenceEvent {
  GEOFENCE_ENTERED = "GeofenceEntered",
  GEOFENCE_EXITED = "GeofenceExited",
  BEACONFENCE_ENTERED = "BeaconfenceEntered",
  BEACONFENCE_EXITED = "BeaconfenceExited"
}

const RNSmartGeofenceManager = NativeModules.RNSmartGeofenceManager;

const smartGeofenceManagerEmitter = new NativeEventEmitter(
  RNSmartGeofenceManager
);

export const SmartGeofenceManager = {
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
  addListener(
    eventName: SmartGeofenceEvent,
    listener: (data: Record<string, string>) => void
  ) {
    smartGeofenceManagerEmitter.addListener(eventName, listener);
  },
  removeListener(
    eventName: SmartGeofenceEvent,
    listener: (data: Record<string, string>) => void
  ) {
    smartGeofenceManagerEmitter.removeListener(eventName, listener);
  }
};
