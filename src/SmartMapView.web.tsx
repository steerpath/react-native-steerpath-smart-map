/* eslint-disable react/destructuring-assignment */
import React, {
  useEffect,
  useImperativeHandle,
  useRef,
  forwardRef,
} from "react";
import { PixelRatio } from "react-native";
import {
  SmartMapViewProps,
  SmartMapObject,
  SmartMapViewMethods,
  SmartMapUserTask,
  SmartMapPOISelectionUserTask,
} from "./SmartMapViewProps";
import { steerpath } from "steerpath-smart-sdk";

//no longer needed as the steerpath is imported from node modules
//instead of the window namespace
//declare let window: any;

const COMPONENT_ID_PREFIX = "map_container_id";

// Implementation for the smart map reference
interface SmartMapRef {
  removeMap: Function;
}

function runCommand<ArgsT extends Array<unknown>>(
  handler: SmartMapRef | null,
  name: string,
  args: ArgsT
) {
  handler?.[name](...args);
}

function convertToWebSDKSmartMapObj(smartMapObj: SmartMapObject) {
  return new steerpath.SmartMapObject(
    smartMapObj.latitude,
    smartMapObj.longitude,
    smartMapObj.floorIndex,
    smartMapObj.buildingRef,
    smartMapObj.localRef,
    smartMapObj.title,
    smartMapObj.properties
  );
}

function convertToWebUserTaskObj(userTask: SmartMapUserTask) {
  const addMarker = (userTask.payload as SmartMapPOISelectionUserTask)
    .shouldAddMarker;
  const actionButtonText = (userTask.payload as SmartMapPOISelectionUserTask)
    .actionButtonText;
  const actionButtonIcon = (userTask.payload as SmartMapPOISelectionUserTask)
    .actionButtonIcon;
  const smartMapObject = (userTask.payload as SmartMapPOISelectionUserTask)
    .smartMapObject;
  return new steerpath.POISelectionUserTask(
    smartMapObject,
    addMarker,
    actionButtonText,
    actionButtonIcon
  );
}

function parseJwtToken(token) {
  try {
    let base64Url = token.split(".")[1];
    let base64 = base64Url.replace("-", "+").replace("_", "/");
    return JSON.parse(window.atob(base64));
  } catch (e) {
    return null;
  } finally {
  }
}

export const SmartMapView = forwardRef<SmartMapViewMethods, SmartMapViewProps>(
  (props, ref) => {
    const smartMapRef = useRef<SmartMapRef>(null);

    useEffect(() => {
      let smartSDK = {};

      if (parseJwtToken(props.apiKey).hasOwnProperty("client_token")) {
        smartSDK = steerpath.sdk[parseJwtToken(props.apiKey).client_token];
      } else {
        if (props.apiKey) {
          smartSDK = steerpath.sdk[props.apiKey];
        }
      }
      // Allow setting the ref
      // @ts-ignore
      smartMapRef.current = new steerpath.SmartMapView(
        COMPONENT_ID_PREFIX,
        smartSDK
      );
      const events = [
        {
          sdk: "onMapClick",
          binding: "onMapClicked",
        },
        {
          sdk: "onSearchResultSelected",
          binding: "onSearchResultSelected",
        },
        {
          sdk: "steerpathLayerIndexChanged",
          binding: "onVisibleFloorChanged",
        },
        {
          sdk: "steerpathMapLoaded",
          binding: "onMapLoaded",
        },
        {
          sdk: "onSearchCategorySelected",
          binding: "onSearchCategorySelected",
        },
      ];
      //add map event listeners ("on")
      events.forEach((event) => {
        if (props[event.binding]) {
          steerpath.MapEventListener.on(event.sdk, props[event.binding]);
        }
      });

      //also add user task listener
      steerpath.UserTaskListener.on(
        "onUserTaskResponse",
        props.onUserTaskResponse
      );

      return () => {
        //remove map event listeners ("off")
        events.forEach((event) => {
          if (props[event.binding]) {
            steerpath.MapEventListener.off(event.sdk, props[event.binding]);
          }
        });

        //also remove user task listener
        steerpath.UserTaskListener.off(
          "onUserTaskResponse",
          props.onUserTaskResponse
        );

        //When screen size changes and this component unmounted
        //remove the old instance of smartMapRef.current
        if (smartMapRef.current) {
          smartMapRef.current?.removeMap();
        }
      };
    }, [props.apiKey]);

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    useImperativeHandle(ref, () => ({
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
          bearing,
          pitch,
          floorIndex,
          buildingRef,
        ]);
      },
      setCameraToBuildingRef(buildingRef, callback) {
        runCommand(smartMapRef.current, "setCameraToBuilding", [
          buildingRef,
          18,
          callback,
        ]);
      },
      setCameraToObject(localRef, buildingRef, zoomLevel, callback) {
        runCommand(smartMapRef.current, "setCameraToObject", [
          localRef,
          buildingRef,
          zoomLevel,
          callback,
        ]);
      },

      addMarker(smartMapObj, layout, iconName, textColor, textHaloColor) {
        runCommand(smartMapRef.current, "addMarker", [
          convertToWebSDKSmartMapObj(smartMapObj),
          layout,
          iconName || "category_marker",
          textColor,
          textHaloColor,
        ]);
      },
      addMarkers(mapObjectsArray, layout, iconName, textColor, textHaloColor) {
        mapObjectsArray = mapObjectsArray.map((smartMapObject) => {
          return convertToWebSDKSmartMapObj(smartMapObject);
        });
        runCommand(smartMapRef.current, "addMarkers", [
          mapObjectsArray,
          layout,
          iconName || "category_marker",
          textColor,
          textHaloColor,
        ]);
      },
      removeMarker(smartMapObj) {
        runCommand(smartMapRef.current, "removeMarker", [
          convertToWebSDKSmartMapObj(smartMapObj),
        ]);
      },
      removeMarkers(mapObjectsArray) {
        mapObjectsArray = mapObjectsArray.map((smartMapObject) => {
          return convertToWebSDKSmartMapObj(smartMapObject);
        });
        runCommand(smartMapRef.current, "removeMarkers", [mapObjectsArray]);
      },
      removeAllMarkers() {
        runCommand(smartMapRef.current, "removeAllMarkers", []);
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
          bearing,
          pitch,
          floorIndex,
          buildingRef,
        ]);
      },
      animateCameraToBuildingRef(buildingRef, callback) {
        runCommand(smartMapRef.current, "animateCameraToBuilding", [
          buildingRef,
          18,
          callback,
        ]);
      },
      animateCameraToObject(localRef, buildingRef, zoomLevel, callback) {
        runCommand(smartMapRef.current, "animateCameraToObject", [
          localRef,
          buildingRef,
          zoomLevel,
          callback,
        ]);
      },
      setMapMode(mapMode) {
        runCommand(smartMapRef.current, "setMapMode", [mapMode]);
      },
      startUserTask(userTask: SmartMapUserTask) {
        // TODO: roope fixes
        runCommand(smartMapRef.current, "startUserTask", [
          convertToWebUserTaskObj(userTask),
        ]);
      },
      getCurrentUserTask() {
        //TODO: does not return current task
        return runCommand(smartMapRef.current, "getCurrentUserTask", []);
      },
      cancelCurrentUserTask() {
        runCommand(smartMapRef.current, "cancelCurrentUserTask", []);
      },
      selectMapObject(smartMapObj: SmartMapObject) {
        const localRef = smartMapObj.localRef;
        const buildingRef = smartMapObj.buildingRef;
        runCommand(smartMapRef.current, "selectMapObject", [
          localRef,
          buildingRef,
        ]);
      },
      getMapObject(localRef, buildingRef, source, callback) {
        runCommand(smartMapRef.current, "getMapObject", [
          localRef,
          buildingRef,
          source,
          callback,
        ]);
      },
      getMapObjectByProperties(properties, callback) {
        runCommand(smartMapRef.current, "getMapObjectByProperties", [
          properties,
          callback,
        ]);
      },
      onBackPressed() {
        // Web doesn't have this implementation
      },
      start() {
        // No web implementation
      },
      stop() {
        // No web implementation
      },
      getWidgetPadding() {
        // TODO: add correct callback to getWidgetPadding on web
        return runCommand(smartMapRef.current, "getWidgetPadding", []);
      },
      resetWidgetPadding() {
        runCommand(smartMapRef.current, "resetWidgetPadding", []);
      },
      setWidgetPadding(left, top, right, bottom) {
        runCommand(smartMapRef.current, "setWidgetPadding", [
          PixelRatio.getPixelSizeForLayoutSize(left || 0),
          PixelRatio.getPixelSizeForLayoutSize(top || 0),
          PixelRatio.getPixelSizeForLayoutSize(right || 0),
          PixelRatio.getPixelSizeForLayoutSize(bottom || 0),
        ]);
      },
      setGeoJson(sourceId, geoJson, callback) {
        runCommand(smartMapRef.current, "setGeoJson", [
          sourceId,
          geoJson,
          callback,
        ]);
      },
      stopLive() {
        runCommand(smartMapRef.current, "stopLive", []);
      },
    }));

    return <div id={COMPONENT_ID_PREFIX} style={{ flex: 1, height: "100%" }} />;
  }
);
