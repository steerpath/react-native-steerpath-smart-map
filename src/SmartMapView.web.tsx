/* eslint-disable react/destructuring-assignment */
import React, {
  useEffect,
  useImperativeHandle,
  useRef,
  forwardRef,
} from "react";
import {
  SmartMapViewProps,
  SmartMapObject,
  Layout,
  MapResponse,
  SmartMapViewMethods,
} from "./SmartMapViewProps";
import { steerpath } from "steerpath-smart-sdk";

//no longer needed as the steerpath is imported from node modules
//instead of the window namespace
//declare let window: any;

const COMPONENT_ID_PREFIX = "map_container_id";

function runCommand(handler: any, name: string, args: any[]) {
  // TODO: handle type and args type
  handler[name](...args);
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

function convertToWebUserTaskObj(userTask: any) {
  // TODO: Roope tries to fix these
  const addMarker = userTask.payload.addMarker;
  const actionButtonText = userTask.payload.actionButtonText;
  const actionButtonIcon = userTask.payload.actionButtonIcon;
  const smartMapObject = userTask.payload.smartMapObject;
  return new steerpath.POISelectionUserTask(
    smartMapObject,
    addMarker,
    actionButtonText,
    actionButtonIcon
  );
}

export const SmartMapView = forwardRef<SmartMapViewMethods, SmartMapViewProps>(
  (props, ref) => {
    const smartMapRef = useRef<{ removeMap: Function }>(null);

    useEffect(() => {
      for (const apiKey in steerpath.sdk) {
        if (steerpath.sdk.apiKey) {
          const smartSDK = steerpath.sdk[apiKey];
          // Allow setting the ref
          // @ts-ignore
          smartMapRef.current = new steerpath.SmartMapView(
            COMPONENT_ID_PREFIX,
            smartSDK
          );
          break;
        }
      }

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

      addMarker(
        smartMapObj: SmartMapObject,
        layout: Layout | null,
        iconName: string | null,
        textColor: string | null,
        textHaloColor: string | null
      ) {
        runCommand(smartMapRef.current, "addMarker", [
          convertToWebSDKSmartMapObj(smartMapObj),
          layout,
          iconName,
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
          iconName,
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
      startUserTask(userTask) {
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
    }));

    return <div id={COMPONENT_ID_PREFIX} style={{ flex: 1 }} />;
  }
);
