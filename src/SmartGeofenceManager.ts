/* eslint-disable prefer-destructuring */
import { NativeModules, Platform, NativeEventEmitter } from 'react-native';
import { SmartGeofenceResponse } from './SmartMapViewProps';

function checkForWebPlatformBeforeRun(fn: Function) {
  if (Platform.OS === 'web') {
    return console.warn('This feature is not supported on the web');
  }
  fn();
  return undefined;
}

export enum SmartGeofenceEvent {
  GEOFENCE_ENTERED = 'GeofenceEntered',
  GEOFENCE_EXITED = 'GeofenceExited',
  BEACONFENCE_ENTERED = 'BeaconfenceEntered',
  BEACONFENCE_EXITED = 'BeaconfenceExited',
}

const RNSmartGeofenceManager = NativeModules.RNSmartGeofenceManager;

const smartGeofenceManagerEmitter = Platform.OS === 'web' ? null : new NativeEventEmitter(RNSmartGeofenceManager);

export const SmartGeofenceManager = {
  addGeofence(
    localRef: string,
    buildingRef: string,
    callback: (error: Error, response: SmartGeofenceResponse) => void,
  ) {
    checkForWebPlatformBeforeRun(() => RNSmartGeofenceManager.addGeofence(localRef, buildingRef, callback));
  },
  removeGeofence(localRef: string, buildingRef: string) {
    checkForWebPlatformBeforeRun(() => RNSmartGeofenceManager.removeGeofence(localRef, buildingRef));
  },
  addBeaconfences() {
    checkForWebPlatformBeforeRun(() => RNSmartGeofenceManager.addBeaconfences());
  },
  removeBeaconfences() {
    checkForWebPlatformBeforeRun(() => RNSmartGeofenceManager.removeBeaconfences());
  },
  addBeaconfence(
    beaconId: string,
    radius: number,
    loiteringDelay: number,
    callback: (error: Error, response: SmartGeofenceResponse) => void,
  ) {
    checkForWebPlatformBeforeRun(() =>
      RNSmartGeofenceManager.addBeaconfence(beaconId, radius, loiteringDelay, callback),
    );
  },
  removeBeaconfence(beaconId: string) {
    checkForWebPlatformBeforeRun(() => RNSmartGeofenceManager.removeBeaconfence(beaconId));
  },
  addListener(eventName: SmartGeofenceEvent, listener: (data: Record<string, string>) => void) {
    if (smartGeofenceManagerEmitter) {
      smartGeofenceManagerEmitter.addListener(eventName, listener);
    }
  },
  removeListener(eventName: SmartGeofenceEvent, listener: (data: Record<string, string>) => void) {
    if (smartGeofenceManagerEmitter) {
      smartGeofenceManagerEmitter.removeListener(eventName, listener);
    }
  },
};
