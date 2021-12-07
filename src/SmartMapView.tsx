/* eslint-disable no-redeclare */
/* eslint-disable prefer-destructuring */
import React, { useImperativeHandle, forwardRef, useRef } from "react";
import {
  requireNativeComponent,
  NativeModules,
  findNodeHandle,
  Platform,
  View,
  PixelRatio,
} from "react-native";
import { convertNativePixelToDp } from "./internalUtils";
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
          iconName || "category_marker",
          textColor,
          textHaloColor,
        ]);
      },
      addMarkers(mapObjectsArray, layout, iconName, textColor, textHaloColor) {
        runCommand(smartMapRef.current, "addMarkers", [
          mapObjectsArray,
          layout,
          iconName || "category_marker",
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
      getWidgetPadding(callback) {
        function processedCallback(padding: {
          left: number;
          top: number;
          right: number;
          bottom: number;
        }) {
          callback({
            left:
              Platform.OS === "android"
                ? convertNativePixelToDp(padding.left)
                : padding.left,
            top:
              Platform.OS === "android"
                ? convertNativePixelToDp(padding.top)
                : padding.top,
            right:
              Platform.OS === "android"
                ? convertNativePixelToDp(padding.right)
                : padding.right,
            bottom:
              Platform.OS === "android"
                ? convertNativePixelToDp(padding.bottom)
                : padding.bottom,
          });
        }
        if (Platform.OS == "android") {
          NativeModules.RNSmartMapModule.getWidgetPadding(
            findNodeHandle(smartMapRef.current),
            processedCallback
          );
        } else {
          runCommand(smartMapRef.current, "getWidgetPadding", [
            processedCallback,
          ]);
        }
      },
      setWidgetPadding(left, top, right, bottom) {
        runCommand(
          smartMapRef.current,
          "setWidgetPadding",
          Platform.OS === "android"
            ? [
                PixelRatio.getPixelSizeForLayoutSize(left || 0),
                PixelRatio.getPixelSizeForLayoutSize(top || 0),
                PixelRatio.getPixelSizeForLayoutSize(right || 0),
                PixelRatio.getPixelSizeForLayoutSize(bottom || 0),
              ]
            : [left || 0, top || 0, right || 0, bottom || 0]
        );
      },
      setGeoJson(sourceId, geoJson, callback) {
        if (Platform.OS === "android") {
          NativeModules.RNSmartMapModule.setGeoJson(
            findNodeHandle(smartMapRef.current),
            [sourceId, geoJson],
            callback
          );
        } else {
          runCommand(smartMapRef.current, "setGeoJson", [
            sourceId,
            geoJson,
            callback,
          ]);
        }
      },
    }));

    return (
      <View style={props.style}>
        <RNSmartMapView
          ref={smartMapRef}
          style={{ flex: 1 }}
          onMapLoaded={() => {
            props.onMapLoaded?.();
          }}
          onUserFloorChanged={(event) => {
            props.onUserFloorChanged?.(event.nativeEvent);
          }}
          onViewStatusChanged={(event) => {
            props.onViewStatusChanged?.(event.nativeEvent);
          }}
          onNavigationFailed={(event) => {
            props.onNavigationFailed?.(event.nativeEvent);
          }}
          onNavigationEnded={() => {
            props.onNavigationEnded?.();
          }}
          onNavigationStarted={() => {
            props.onNavigationStarted?.();
          }}
          onNavigationPreviewAppeared={() => {
            props.onNavigationPreviewAppeared?.();
          }}
          onNavigationDestinationReached={() => {
            props.onNavigationDestinationReached?.();
          }}
          onVisibleFloorChanged={(event) => {
            props.onVisibleFloorChanged?.(event.nativeEvent);
          }}
          onMapClicked={(event) => {
            if (Platform.OS === "ios") {
              // iOS Mapbox SDK return a reversed order of map object compared to web and android sdk, so we reverse to match the behavior

              props.onMapClicked?.({
                mapObjects: [...event.nativeEvent.mapObjects].reverse(),
              });
            } else {
              props.onMapClicked?.(event.nativeEvent);
            }
          }}
          onUserTaskResponse={(event) => {
            props.onUserTaskResponse?.(event.nativeEvent);
          }}
          onSearchResultSelected={(event) => {
            props.onSearchResultSelected?.(event.nativeEvent);
          }}
          onBottomSheetStateChanged={(event) => {
            props.onBottomSheetStateChanged?.(event.nativeEvent);
          }}
          onSearchCategorySelected={(event) => {
            props.onSearchCategorySelected?.(event.nativeEvent);
          }}
        />
      </View>
    );
  }
);

// It's tedious to type native props, so we can defer it later
// Hacky escape from requireNativeComponent as it is quite outdated
const RNSmartMapView = requireNativeComponent<any>(NATIVE_VIEW_NAME) as any;
