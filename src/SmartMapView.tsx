/* eslint-disable no-redeclare */
/* eslint-disable prefer-destructuring */
import React, { useImperativeHandle, forwardRef, useRef } from "react";
import {
  requireNativeComponent,
  NativeModules,
  findNodeHandle,
  Platform,
  View,
  NativeMethods,
} from "react-native";
import { SmartMapViewProps, SmartMapViewMethods } from "./SmartMapViewProps";

const NATIVE_VIEW_NAME = "RNSmartMapView";

function runCommand<ArgsT extends Array<unknown>>(
  handler: typeof RNSmartMapView | null,
  name: string,
  args: ArgsT
) {
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
export const SmartMapView = forwardRef<SmartMapViewMethods, SmartMapViewProps>(
  function _SmartMapViewFC(props, ref) {
    const smartMapRef = useRef<typeof RNSmartMapView>(null);

    useImperativeHandle(ref, () => ({
      setMapMode(mapMode) {
        runCommand(smartMapRef.current, "setMapMode", [mapMode]);
      },
      addMarker(smartMapObj, layout, iconName, textColor, textHaloColor) {
        runCommand(smartMapRef.current, "addMarker", [
          smartMapObj,
          layout,
          iconName,
          textColor,
          textHaloColor,
        ]);
      },
      addMarkers(mapObjectsArray, layout, iconName, textColor, textHaloColor) {
        runCommand(smartMapRef.current, "addMarkers", [
          mapObjectsArray,
          layout,
          iconName,
          textColor,
          textHaloColor,
        ]);
      },
      animateCamera({
        latitude,
        longitude,
        zoomLevel,
        bearing,
        pitch,
        floorIndex,
        buildingRef,
      }) {
        runCommand(smartMapRef.current, "animateCamera", [
          latitude,
          longitude,
          zoomLevel,
          bearing || 90,
          pitch || 0,
          floorIndex || 2,
          buildingRef,
        ]);
      },
      animateCameraToBuildingRef(buildingRef, callback) {
        if (Platform.OS == "android") {
          NativeModules.RNSmartMapModule.animateCameraToBuildingRef(
            findNodeHandle(smartMapRef.current),
            [buildingRef],
            callback
          );
        } else {
          runCommand(smartMapRef.current, "animateCameraToBuildingRef", [
            buildingRef,
            callback,
          ]);
        }
      },
      animateCameraToObject(localRef, buildingRef, zoomLevel, callback) {
        if (Platform.OS == "android") {
          NativeModules.RNSmartMapModule.animateCameraToObject(
            findNodeHandle(smartMapRef.current),
            [localRef, buildingRef, zoomLevel],
            callback
          );
        } else {
          runCommand(smartMapRef.current, "animateCameraToObject", [
            localRef,
            buildingRef,
            zoomLevel,
            callback,
          ]);
        }
      },
      cancelCurrentUserTask() {
        runCommand(smartMapRef.current, "cancelCurrentUserTask", []);
      },
      getCurrentUserTask(callback) {
        if (Platform.OS == "android") {
          NativeModules.RNSmartMapModule.getCurrentUserTask(
            findNodeHandle(smartMapRef.current),
            callback
          );
        } else {
          runCommand(smartMapRef.current, "getCurrentUserTask", [callback]);
        }
      },
      getMapObject(localRef, buildingRef, source, callback) {
        if (Platform.OS == "android") {
          NativeModules.RNSmartMapModule.getMapObject(
            findNodeHandle(smartMapRef.current),
            [localRef, buildingRef, source],
            callback
          );
        } else {
          runCommand(smartMapRef.current, "getMapObject", [
            localRef,
            buildingRef,
            source,
            callback,
          ]);
        }
      },
      getMapObjectByProperties(properties, callback) {
        if (Platform.OS == "android") {
          NativeModules.RNSmartMapModule.getMapObjectByProperties(
            findNodeHandle(smartMapRef.current),
            properties,
            callback
          );
        } else {
          runCommand(smartMapRef.current, "getMapObjectByProperties", [
            properties,
            callback,
          ]);
        }
      },
      removeAllMarkers() {
        runCommand(smartMapRef.current, "removeAllMarkers", []);
      },
      removeMarker(smartMapObj) {
        runCommand(smartMapRef.current, "removeMarker", [smartMapObj]);
      },
      removeMarkers(mapObjectsArray) {
        runCommand(smartMapRef.current, "removeMarkers", [mapObjectsArray]);
      },
      selectMapObject(smartMapObj) {
        runCommand(smartMapRef.current, "selectMapObject", [smartMapObj]);
      },
      setCamera({
        latitude,
        longitude,
        zoomLevel,
        bearing,
        pitch,
        floorIndex,
        buildingRef,
      }) {
        runCommand(smartMapRef.current, "setCamera", [
          latitude,
          longitude,
          zoomLevel,
          bearing || 90,
          pitch || 0,
          floorIndex || 2,
          buildingRef,
        ]);
      },
      setCameraToBuildingRef(buildingRef, callback) {
        if (Platform.OS == "android") {
          NativeModules.RNSmartMapModule.setCameraToBuildingRef(
            findNodeHandle(smartMapRef.current),
            [buildingRef],
            callback
          );
        } else {
          runCommand(smartMapRef.current, "setCameraToBuildingRef", [
            buildingRef,
            callback,
          ]);
        }
      },
      setCameraToObject(localRef, buildingRef, zoomLevel, callback) {
        if (Platform.OS == "android") {
          NativeModules.RNSmartMapModule.setCameraToObject(
            findNodeHandle(smartMapRef.current),
            [localRef, buildingRef, zoomLevel],
            callback
          );
        } else {
          runCommand(smartMapRef.current, "setCameraToObject", [
            localRef,
            buildingRef,
            zoomLevel,
            callback,
          ]);
        }
      },
      startUserTask(userTask) {
        runCommand(smartMapRef.current, "startUserTask", [userTask]);
      },
      start() {
        if (Platform.OS === "android") {
          runCommand(smartMapRef.current, "start", []);
        }
      },
      stop() {
        if (Platform.OS === "android") {
          runCommand(smartMapRef.current, "stop", []);
        }
      },
      onBackPressed(callback) {
        if (Platform.OS === "android") {
          NativeModules.RNSmartMapModule.onBackPressed(
            findNodeHandle(smartMapRef.current),
            callback
          );
        }
      },
    }));

    return (
      <View style={props.style}>
        <RNSmartMapView
          ref={smartMapRef}
          style={{ flex: 1 }}
          onUserFloorChanged={(event) => {
            props.onUserFloorChanged &&
              props.onUserFloorChanged(event.nativeEvent);
          }}
          onViewStatusChanged={(event) => {
            props.onViewStatusChanged &&
              props.onViewStatusChanged(event.nativeEvent);
          }}
          onNavigationFailed={(event) => {
            props.onNavigationFailed &&
              props.onNavigationFailed(event.nativeEvent);
          }}
          onVisibleFloorChanged={(event) => {
            props.onVisibleFloorChanged &&
              props.onVisibleFloorChanged(event.nativeEvent);
          }}
          onMapClicked={(event) => {
            if (Platform.OS === "ios") {
              // iOS Mapbox SDK return a reversed order of map object compared to web and android sdk, so we reverse to match the behavior

              props.onMapClicked &&
                props.onMapClicked({
                  mapObjects: [...event.nativeEvent.mapObjects].reverse(),
                });
            } else {
              props.onMapClicked && props.onMapClicked(event.nativeEvent);
            }
          }}
          onUserTaskResponse={(event) => {
            props.onUserTaskResponse &&
              props.onUserTaskResponse(event.nativeEvent);
          }}
          onSearchResultSelected={(event) => {
            props.onSearchResultSelected &&
              props.onSearchResultSelected(event.nativeEvent);
          }}
        />
      </View>
    );
  }
);

// It's tedious to type native props, so we can defer it later
// Hacky escape from requireNativeComponent as it is quite outdated
const RNSmartMapView = requireNativeComponent<any>(NATIVE_VIEW_NAME) as any;
