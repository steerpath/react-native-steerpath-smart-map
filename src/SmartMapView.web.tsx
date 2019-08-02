/* eslint-disable react/destructuring-assignment */
import React, { useEffect, useImperativeHandle, useRef, forwardRef } from 'react';
import { SmartMapViewProps, SmartMapObject, Layout, MapResponse } from './SmartMapViewProps';

declare let window: any;

const COMPONENT_ID_PREFIX = 'map_container_id';

function runCommand(handler: any, name: string, args: any[]) {
  handler[name](...args);
}

function convertToWebSDKSmartMapObj(smartMapObj: SmartMapObject) {
  return new window.steerpath.SmartMapObject(
    smartMapObj.latitude,
    smartMapObj.longitude,
    smartMapObj.floorIndex,
    smartMapObj.buildingRef,
    smartMapObj.localRef,
    smartMapObj.title,
  );
}

export const SmartMapView = forwardRef((props: SmartMapViewProps, ref: any) => {
  const smartMapRef = useRef(null);

  useEffect(() => {
    const smartSDK = new window.steerpath.SmartSDK(props.apiKey);
    // eslint-disable-next-line no-new
    smartMapRef.current = new window.steerpath.SmartNavigationView(COMPONENT_ID_PREFIX, smartSDK);
  }, [props.apiKey]);

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
        bearing,
        pitch,
        floorIndex,
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
      runCommand(smartMapRef.current, 'addMarker', [
        convertToWebSDKSmartMapObj(smartMapObj),
        layout,
        iconName,
        textColor,
        textHaloColor,
      ]);
    },
    removeMarker(smartMapObj: SmartMapObject) {
      runCommand(smartMapRef.current, 'removeMarker', [convertToWebSDKSmartMapObj(smartMapObj)]);
    },
    removeAllMarkers() {
      runCommand(smartMapRef.current, 'removeAllMarkers', []);
    },
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    selectMapObject(smartMapObj: SmartMapObject) {
      console.warn('select Map Object is not supported on the web');
    },
    animateCameraToObject(
      localRef: string,
      buildingRef: string,
      zoomLevel: number | null,
      callback?: (response: MapResponse) => void,
    ) {
      runCommand(smartMapRef.current, 'animateCameraToObject', [localRef, buildingRef, zoomLevel, callback]);
    },
    startUserTask() {
      console.warn('startUserTask is not supported on the web');
    },
    getCurrentUserTask() {
      console.warn('getCurrentUserTask is not supported on the web');
    },
    cancelCurrentUserTask() {
      console.warn('cancelCurrentUserTask is not supported on the web');
    },
  }));

  return <div id={COMPONENT_ID_PREFIX} style={{ flex: 1 }} />;
});
