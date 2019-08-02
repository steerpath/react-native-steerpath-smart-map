/* eslint-disable no-redeclare */
/* eslint-disable prefer-destructuring */
import React, { useImperativeHandle, forwardRef, useRef, useEffect } from 'react';
import { requireNativeComponent, NativeModules, findNodeHandle, Platform } from 'react-native';
import {
  SmartMapViewProps,
  SmartMapObject,
  Layout,
  MapResponse,
  SmartMapUserTask,
  SmartMapUserTaskResponse,
} from './SmartMapViewProps';
import { SmartMapEventManager, SmartMapEvent } from './SmartMapEventManager';

const NATIVE_VIEW_NAME = 'RNSmartMapView';

function runCommand(handler: any, name: string, args: any[]) {
  if (Platform.OS === 'ios') {
    return NativeModules[NATIVE_VIEW_NAME][name](findNodeHandle(handler), ...args);
  }
  return NativeModules.UIManager.dispatchViewManagerCommand(
    findNodeHandle(handler),
    NativeModules.UIManager.getViewManagerConfig(NATIVE_VIEW_NAME).Commands[name],
    args,
  );
}
export const SmartMapView = forwardRef(function _SmartMapViewFC(props: SmartMapViewProps, ref: any) {
  const smartMapRef = useRef(null);

  useEffect(() => {
    if (props.onMapLoaded) {
      SmartMapEventManager.addListener(SmartMapEvent.MAP_LOADED, props.onMapLoaded);
    }
    return () => {
      if (props.onMapLoaded) {
        SmartMapEventManager.removeListener(SmartMapEvent.MAP_LOADED, props.onMapLoaded);
      }
    };
  }, [props.onMapLoaded]);

  useEffect(() => {
    if (props.onMapClicked) {
      SmartMapEventManager.addListener(SmartMapEvent.MAP_CLICKED, props.onMapClicked);
    }
    return () => {
      if (props.onMapClicked) {
        SmartMapEventManager.removeListener(SmartMapEvent.MAP_CLICKED, props.onMapClicked);
      }
    };
  }, [props.onMapClicked]);

  useImperativeHandle(ref, () => ({
    setCamera({
      latitude,
      longitude,
      zoomLevel,
      bearing,
      pitch,
      floorIndex,
      buildingRef,
    }: {
      latitude: number;
      longitude: number;
      zoomLevel: number;
      bearing?: number;
      pitch?: number;
      floorIndex?: number;
      buildingRef: string;
    }) {
      runCommand(smartMapRef.current, 'setCamera', [
        latitude,
        longitude,
        zoomLevel,
        bearing || 90,
        pitch || 0,
        floorIndex || 2,
        buildingRef,
      ]);
    },
    addMarker(
      smartMapObj: SmartMapObject,
      layout: Layout | null,
      iconName: string | null,
      textColor: string | null,
      textHaloColor: string | null,
    ) {
      runCommand(smartMapRef.current, 'addMarker', [smartMapObj, layout, iconName, textColor, textHaloColor]);
    },
    removeMarker(smartMapObj: SmartMapObject) {
      runCommand(smartMapRef.current, 'removeMarker', [smartMapObj]);
    },
    removeAllMarkers() {
      runCommand(smartMapRef.current, 'removeAllMarkers', []);
    },
    selectMapObject(smartMapObj: SmartMapObject) {
      runCommand(smartMapRef.current, 'selectMapObject', [smartMapObj]);
    },
    animateCameraToObject(
      localRef: string,
      buildingRef: string,
      zoomLevel: number,
      callback: (response: MapResponse) => void,
    ) {
      runCommand(smartMapRef.current, 'animateCameraToObject', [localRef, buildingRef, zoomLevel, callback]);
    },
    startUserTask(userTask: SmartMapUserTask) {
      runCommand(smartMapRef.current, 'startUserTask', [userTask]);
    },
    getCurrentUserTask(callback: (userTaskResponse: SmartMapUserTaskResponse) => any) {
      runCommand(smartMapRef.current, 'getCurrentUserTask', [callback]);
    },
    cancelCurrentUserTask() {
      runCommand(smartMapRef.current, 'cancelCurrentUserTask', []);
    },
  }));

  return <RNSmartMapView ref={smartMapRef} {...props} />;
});

const RNSmartMapView = (requireNativeComponent as (name: string, componentClass: any) => any)(
  NATIVE_VIEW_NAME,
  SmartMapView,
);
