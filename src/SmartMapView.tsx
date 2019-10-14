/* eslint-disable no-redeclare */
/* eslint-disable prefer-destructuring */
import React, { useImperativeHandle, forwardRef, useRef } from "react";
import {
  requireNativeComponent,
  NativeModules,
  findNodeHandle,
  Platform
} from "react-native";
import {
  SmartMapViewProps,
  SmartMapObject,
  Layout,
  MapResponse,
  SmartMapUserTask,
  SmartMapUserTaskResponse
} from "./SmartMapViewProps";

const NATIVE_VIEW_NAME = "RNSmartMapView";

function runCommand(handler: any, name: string, args: any[]) {
  if (Platform.OS === "ios") {
    return NativeModules[NATIVE_VIEW_NAME][name](
      findNodeHandle(handler),
      ...args
    );
  }
  return NativeModules.UIManager.dispatchViewManagerCommand(
    findNodeHandle(handler),
    NativeModules.UIManager.getViewManagerConfig(NATIVE_VIEW_NAME).Commands[
      name
    ],
    args
  );
}
export const SmartMapView: React.ComponentType<SmartMapViewProps> = forwardRef(
  function _SmartMapViewFC(props: SmartMapViewProps, ref: any) {
    const smartMapRef = useRef(null);

    useImperativeHandle(ref, () => ({
      addMarker(
        smartMapObj: SmartMapObject,
        layout: Layout | null,
        iconName: string | null,
        textColor: string | null,
        textHaloColor: string | null
      ) {
        runCommand(smartMapRef.current, "addMarker", [
          smartMapObj,
          layout,
          iconName,
          textColor,
          textHaloColor
        ]);
      },
      addMarkers(
        mapObjectsArray: SmartMapObject[],
        layout: Layout | null,
        iconName: string | null,
        textColor: string | null,
        textHaloColor: string | null
      ) {
        runCommand(smartMapRef.current, "addMarkers", [
          mapObjectsArray, 
          layout, 
          iconName, 
          textColor, 
          textHaloColor
        ])
      },
      animateCamera({
        latitude,
        longitude,
        zoomLevel,
        bearing,
        pitch,
        floorIndex,
        buildingRef,
        callback
      }: {
        latitude: number;
        longitude: number;
        zoomLevel: number;
        bearing?: number;
        pitch?: number;
        floorIndex?: number;
        buildingRef: string;
        callback?: (response: MapResponse) => void
      }) {
        const noOp = () => {}
        runCommand(smartMapRef.current, "animateCamera", [
          latitude,
          longitude,
          zoomLevel,
          bearing || 90,
          pitch || 0,
          floorIndex || 2,
          buildingRef,
          callback || noOp
        ])
      },
      animateCameraToBuildingRef(
        buildingRef: string,
        callback: (response: MapResponse) => void
      ){
        runCommand(smartMapRef.current, "animateCameraToBuildingRef", [
          buildingRef,
          callback
        ])
      },
      animateCameraToObject(
        localRef: string,
        buildingRef: string,
        zoomLevel: number,
        callback: (response: MapResponse) => void
      ) {
        runCommand(smartMapRef.current, "animateCameraToObject", [
          localRef,
          buildingRef,
          zoomLevel,
          callback
        ]);
      },
      cancelCurrentUserTask() {
        runCommand(smartMapRef.current, "cancelCurrentUserTask", []);
      },
      getCurrentUserTask(
        callback: (userTaskResponse: SmartMapUserTaskResponse) => any
      ) {
        runCommand(smartMapRef.current, "getCurrentUserTask", [callback]);
      },
      getMapObject(
        localRef: string,
        buildingRef: string,
        source: string
        /*callback: MapObjectCallback*/
        // TODO: add MapObjectCallback
      ) {
        runCommand(smartMapRef.current, "getMapObject", [
            localRef,
            buildingRef, 
            source
        ])
      },
      getMapObjectByProperties(
        properties: object,
        callback: (response: MapResponse) => void,
      ) {
        runCommand(smartMapRef.current, "getMapObjectByProperties", [properties, callback])
      },
      removeAllMarkers() {
        runCommand(smartMapRef.current, "removeAllMarkers", []);
      },
      removeMarker(smartMapObj: SmartMapObject) {
        runCommand(smartMapRef.current, "removeMarker", [smartMapObj]);
      },
      removeMarkers(mapObjectsArray) {
        runCommand(smartMapRef.current, "removeMarkers", [mapObjectsArray])
      },
      selectMapObject(smartMapObj: SmartMapObject) {
        runCommand(smartMapRef.current, "selectMapObject", [smartMapObj]);
      },
      setCamera({
        latitude,
        longitude,
        zoomLevel,
        bearing,
        pitch,
        floorIndex,
        buildingRef
      }: {
        latitude: number;
        longitude: number;
        zoomLevel: number;
        bearing?: number;
        pitch?: number;
        floorIndex?: number;
        buildingRef: string;
      }) {
        runCommand(smartMapRef.current, "setCamera", [
          latitude,
          longitude,
          zoomLevel,
          bearing || 90,
          pitch || 0,
          floorIndex || 2,
          buildingRef
        ]);
      },
      setCameraToBuildingRef(
        buildingRef: string,
        callback: (response: MapResponse) => void
      ) {
        runCommand(smartMapRef.current, "setCameraToBuildingRef", [
          buildingRef,
          callback
        ])
      },
      setCameraToObject(
        localRef: string,
        buildingRef: string,
        zoomLevel: number,
        callback: (response: MapResponse) => void
      ) {
        runCommand(smartMapRef.current, "setCameraToObject", [
          localRef,
          buildingRef,
          zoomLevel,
          callback
        ])
      },
      startUserTask(userTask: SmartMapUserTask) {
        runCommand(smartMapRef.current, "startUserTask", [userTask]);
      },
    }));

    return (
      <RNSmartMapView
        ref={smartMapRef}
        {...props}
        onUserFloorChanged={event => {
          props.onUserFloorChanged &&
            props.onUserFloorChanged(event.nativeEvent);
        }}
        onViewStatusChanged={event => {
          props.onViewStatusChanged &&
            props.onViewStatusChanged(event.nativeEvent);
        }}
        onNavigationFailed={event => {
          props.onNavigationFailed &&
            props.onNavigationFailed(event.nativeEvent);
        }}
        onVisibleFloorChanged={event => {
          props.onVisibleFloorChanged &&
            props.onVisibleFloorChanged(event.nativeEvent);
        }}
        onMapClicked={event => {
          props.onMapClicked && props.onMapClicked(event.nativeEvent);
        }}
        onUserTaskResponse={event => {
          props.onUserTaskResponse && props.onUserTaskResponse(event.nativeEvent);
        }}
      />
    );
  }
);

const RNSmartMapView = (requireNativeComponent as (
  name: string,
  componentClass: any
) => any)(NATIVE_VIEW_NAME, SmartMapView);
