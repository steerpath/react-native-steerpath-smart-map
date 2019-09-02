/* eslint-disable react/destructuring-assignment */
import React, { useEffect, useImperativeHandle, useRef, forwardRef } from 'react';
import { SmartMapViewProps, SmartMapObject, Layout, MapResponse } from './SmartMapViewProps';
import { steerpath } from "steerpath-smart-sdk"
import { SmartMapEventManager } from './SmartMapEventManager';
import { SmartMapEvent } from "./SmartMapViewProps";

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
  );
}

export const SmartMapView = forwardRef((props: SmartMapViewProps, ref: any) => {
  const smartMapRef = useRef(null);

  useEffect(() => {
    console.log("props " , props)
    //TODO:
    //consider if this approach would be better
    /*
      const smartSDK = steerpath.sdk[props.apiKey];
      smartMapRef.current = new steerpath.SmartMapView(COMPONENT_ID_PREFIX, smartSDK);
    */
    //dig the sdk instance from the steerpath namespace
    //and use that as default when creating SmartMapView
    for (const apiKey in steerpath.sdk) {
     if (steerpath.sdk.hasOwnProperty(apiKey)) {
       const smartSDK = steerpath.sdk[apiKey];
       smartMapRef.current = new steerpath.SmartMapView(COMPONENT_ID_PREFIX, smartSDK);
       break;  
     }
   }
    return () => {
      //When screen size changes and this component unmounted
      //remove the old instance of smartMapRef.current
      (smartMapRef.current as any).removeMap()
    }
  }, [props.apiKey]);


  //event listeners
  //TODO: consider using SmartMapEventManager
  //to make events behave in a similar way native events do 
  useEffect(() => {
    if (props.onMapClicked) {
      steerpath.MapEventListener.on("steerpathPoiClick", (e) => {
        if (props.onMapClicked) {
          props.onMapClicked(e)
        }
      });
    }
    return () => {
      if (props.onMapClicked) {
        steerpath.MapEventListener.off("steerpathPoiClick", (e) => {
          if (props.onMapClicked) {
            props.onMapClicked(e)
          }
        })
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
    addMarkers(
      mapObjectsArray,
      layout: Layout | null,
      iconName: string | null,
      textColor: string | null,
      textHaloColor: string | null,
    ) {
      runCommand(smartMapRef.current, "addMarkers", [mapObjectsArray, layout, iconName, textColor, textHaloColor])
    },
    removeMarker(smartMapObj: SmartMapObject) {
      runCommand(smartMapRef.current, 'removeMarker', [convertToWebSDKSmartMapObj(smartMapObj)]);
    },
    removeAllMarkers() {
      runCommand(smartMapRef.current, 'removeAllMarkers', []);
    },
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    selectMapObject(smartMapObj: SmartMapObject) {
      let localRef = smartMapObj.localRef
      let buildingRef = smartMapObj.buildingRef
      runCommand(smartMapRef.current, 'selectMapObject', [localRef, buildingRef]);

    },
    animateCameraToObject(
      localRef: string,
      buildingRef: string,
      zoomLevel: number | null,
      callback?: (response: MapResponse) => void,
    ) {
      runCommand(smartMapRef.current, 'animateCameraToObject', [localRef, buildingRef, zoomLevel, callback]);
    },
    setMapMode(
      mapMode: string
    ) {
      runCommand(smartMapRef.current, "setMapMode", [mapMode])
    },
    startUserTask(
      userTask: any
    ) {
      runCommand(smartMapRef.current, "startUserTask", [userTask])
    },
    getCurrentUserTask() {
      //TODO: does not return current task
      return runCommand(smartMapRef.current,"getCurrentUserTask",[]) 
    },
    cancelCurrentUserTask() {
      runCommand(smartMapRef.current,"cancelCurrentUserTask",[])      
    },
    getMapObject(
      localRef: string,
      buildingRef: string,
      source:string,
      callback?: (response: MapResponse) => void,
    ) {
      runCommand(smartMapRef.current, "getMapObject", [localRef, buildingRef, source, callback])
    },
  }));

  return <div id={COMPONENT_ID_PREFIX} style={{ flex: 1 }} />;
});
