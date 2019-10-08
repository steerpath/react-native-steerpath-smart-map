/* eslint-disable react/destructuring-assignment */
import React, { useEffect, useImperativeHandle, useRef, forwardRef } from 'react';
import { SmartMapViewProps, SmartMapObject, Layout, MapResponse } from './SmartMapViewProps';
import { steerpath } from "steerpath-smart-sdk"

//no longer needed as the steerpath is imported from node modules
//instead of the window namespace
//declare let window: any;

const COMPONENT_ID_PREFIX = 'map_container_id';

function runCommand(handler: any, name: string, args: any[]) {
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


function convertToWebUserTaskObj(userTask: any){
  let addMarker = userTask.payload.addMarker
  let actionButtonText = userTask.payload.actionButtonText
  let actionButtonIcon = userTask.payload.actionButtonIcon
  let smartMapObject = userTask.payload.smartMapObject
  return new steerpath.POISelectionUserTask(smartMapObject, addMarker, actionButtonText, actionButtonIcon)
}

export const SmartMapView = forwardRef((props: SmartMapViewProps, ref: any) => {
  const smartMapRef = useRef(null);

  useEffect(() => {
    for (const apiKey in steerpath.sdk) {
      if (steerpath.sdk.hasOwnProperty(apiKey)) {
        const smartSDK = steerpath.sdk[apiKey];
        smartMapRef.current = new steerpath.SmartMapView(COMPONENT_ID_PREFIX, smartSDK);
        break;  
      }
    }

    const events = [
      {
        "sdk": "onMapClick",
        "binding": "onMapClicked"
      },
      {
        "sdk": "onUserTaskResponse",
        "binding": "onUserTaskResponse"
      },
      {
        "sdk": "steerpathLayerIndexChanged",
        "binding": "onVisibleFloorChanged"
      },
      {
        "sdk": "steerpathMapLoaded",
        "binding": "onMapLoaded"
      }
    ]
    //add event listeners ("on")
    events.forEach(event => {
      if(props[event.binding]){
        steerpath.MapEventListener.on(event.sdk, props[event.binding])
      }
    });
  
    return () => {
      //remove event listeners ("off")
      events.forEach(event => {
        if(props[event.binding]){
          steerpath.MapEventListener.off(event.sdk, props[event.binding])
        }
      });
      //When screen size changes and this component unmounted
      //remove the old instance of smartMapRef.current
      if(smartMapRef.current){
        (smartMapRef.current as any).removeMap()
      }
    }
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
    }: {
      latitude: number;
      longitude: number;
      zoomLevel: number;
      bearing?: number;
      pitch?: number;
      floorIndex?: number;
      buildingRef?: string;
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
    setCameraToBuildingRef(
      buildingRef: string,
      callback: (response: MapResponse) => void
    ) {
      runCommand(smartMapRef.current, "setCameraToBuilding", [
        buildingRef,
        18,
        callback
      ]);
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
    addMarkers(
      mapObjectsArray,
      layout: Layout | null,
      iconName: string | null,
      textColor: string | null,
      textHaloColor: string | null,
    ) {
      mapObjectsArray = mapObjectsArray.map((smartMapObject) => {
        return  convertToWebSDKSmartMapObj(smartMapObject)
      })
      runCommand(smartMapRef.current, "addMarkers", [mapObjectsArray, layout, iconName, textColor, textHaloColor])
    },
    removeMarker(
      smartMapObj: SmartMapObject
    ) {
      runCommand(smartMapRef.current, "removeMarker", [
        convertToWebSDKSmartMapObj(smartMapObj)
      ]);
    },
    removeMarkers(
      mapObjectsArray,
    ) {
      mapObjectsArray = mapObjectsArray.map((smartMapObject) => {
        return  convertToWebSDKSmartMapObj(smartMapObject)
      })
      runCommand(smartMapRef.current, "removeMarkers", [mapObjectsArray])
    },
    removeAllMarkers() {
      runCommand(smartMapRef.current, 'removeAllMarkers', []);
    },
    animateCamera({
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
      buildingRef?: string;
    }) {
      runCommand(smartMapRef.current, "animateCamera", [
        latitude,
        longitude,
        zoomLevel,
        bearing,
        pitch,
        floorIndex,
        buildingRef
      ]);
    },
    animateCameraToBuildingRef(
      buildingRef: string,
      callback: (response: MapResponse) => void
    ) {
      runCommand(smartMapRef.current, "animateCameraToBuilding", [
        buildingRef,
        18,
        callback
      ]);
    },
    animateCameraToObject(
      localRef: string,
      buildingRef: string,
      zoomLevel: number | null,
      callback: (response: MapResponse) => void
    ) {
      runCommand(smartMapRef.current, 'animateCameraToObject', [localRef, buildingRef, zoomLevel, callback]);
    },
    setMapMode(
      mapMode: string
    ) {
      runCommand(smartMapRef.current, "setMapMode", [mapMode]);
    },
    startUserTask(
      userTask: any
    ) {
      runCommand(smartMapRef.current, "startUserTask", [
        convertToWebUserTaskObj(userTask)
      ])
    },
    getCurrentUserTask() {
      //TODO: does not return current task
      return runCommand(smartMapRef.current,"getCurrentUserTask",[]) 
    },
    cancelCurrentUserTask() {
      runCommand(smartMapRef.current,"cancelCurrentUserTask",[])      
    },
    selectMapObject(smartMapObj: SmartMapObject) {
      let localRef = smartMapObj.localRef;
      let buildingRef = smartMapObj.buildingRef;
      runCommand(smartMapRef.current, "selectMapObject", [
        localRef,
        buildingRef
      ]);
    },
    getMapObject(
      localRef: string,
      buildingRef: string,
      source:string,
      callback: (response: MapResponse) => void,
    ) {
      runCommand(smartMapRef.current, "getMapObject", [localRef, buildingRef, source, callback])
    },
    getMapObjectByProperties(
      properties: object,
      callback: (response: MapResponse) => void,
    ) {
      runCommand(smartMapRef.current, "getMapObjectByProperties", [properties, callback])
    },
  }));

  return <div id={COMPONENT_ID_PREFIX} style={{ flex: 1 }} />;
});
