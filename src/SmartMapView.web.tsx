/* eslint-disable react/destructuring-assignment */
import React, { useEffect, useImperativeHandle, useRef, forwardRef } from 'react';
import { SmartMapViewProps, SmartMapObject, Layout, MapResponse } from './SmartMapViewProps';
import { steerpath } from "steerpath-smart-sdk"
import { SmartMapEvent } from "./SmartMapViewProps";

//no longer needed as the steerpath is imported from node modules
//instead of the window namespace
//declare let window: any;

<<<<<<< HEAD
=======
//TODO: Juhani replace html element id to ref
>>>>>>> e2c13222d5a3621d01dee613cf47b3034a6f8572
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
      })
    }

    if(props.onVisibleFloorChanged){
      steerpath.MapEventListener.on("steerpathLayerIndexChanged", (e) => {
        if (props.onVisibleFloorChanged) {
          props.onVisibleFloorChanged(e)
        }
      })
    }
    return () => {
      if (props.onMapClicked) {
        steerpath.MapEventListener.off("steerpathPoiClick", (e) => {
          if (props.onMapClicked) {
            props.onMapClicked(e)
          }
        })
      }

      if (props.onVisibleFloorChanged) {
        steerpath.MapEventListener.off("steerpathLayerIndexChanged", (e) => {
          if (props.onVisibleFloorChanged) {
            props.onVisibleFloorChanged(e)
          }
        })
      }
    };
  }, [props.onMapClicked]);
  
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
    setCameraToBuilding(
      buildingRef: string,
      zoomLevel: number,
      callback: (response: MapResponse) => void
    ) {
      runCommand(smartMapRef.current, "setCameraToBuilding", [
        buildingRef,
        zoomLevel,
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
<<<<<<< HEAD
    addMarkers(
      mapObjectsArray,
      layout: Layout | null,
      iconName: string | null,
      textColor: string | null,
      textHaloColor: string | null,
    ) {
      runCommand(smartMapRef.current, "addMarkers", [mapObjectsArray, layout, iconName, textColor, textHaloColor])
    },
    removeMarker(
      smartMapObj: SmartMapObject
    ) {
      runCommand(smartMapRef.current, "removeMarker", [
        convertToWebSDKSmartMapObj(smartMapObj)
      ]);
=======
    removeMarker(smartMapObj: SmartMapObject) {
      runCommand(smartMapRef.current, 'removeMarker', [convertToWebSDKSmartMapObj(smartMapObj)]);
>>>>>>> e2c13222d5a3621d01dee613cf47b3034a6f8572
    },
    removeMarkers(
      mapObjectsArray,
    ) {
      runCommand(smartMapRef.current, "removeMarkers", [mapObjectsArray])
    },
    removeAllMarkers() {
      runCommand(smartMapRef.current, 'removeAllMarkers', []);
    },
<<<<<<< HEAD
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
=======
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    selectMapObject(smartMapObj: SmartMapObject) {
      let localRef = smartMapObj.localRef
      let buildingRef = smartMapObj.buildingRef
      runCommand(smartMapRef.current, 'selectMapObject', [localRef, buildingRef]);

>>>>>>> e2c13222d5a3621d01dee613cf47b3034a6f8572
    },
    animateCameraToBuilding(
      buildingRef: string,
      zoomLevel: number,
      callback: (response: MapResponse) => void
    ) {
      runCommand(smartMapRef.current, "animateCameraToBuilding", [
        buildingRef,
        zoomLevel,
        callback
      ]);
    },
    animateCameraToObject(
      localRef: string,
      buildingRef: string,
      zoomLevel: number | null,
<<<<<<< HEAD
      callback: (response: MapResponse) => void
=======
      callback?: (response: MapResponse) => void,
>>>>>>> e2c13222d5a3621d01dee613cf47b3034a6f8572
    ) {
      runCommand(smartMapRef.current, 'animateCameraToObject', [localRef, buildingRef, zoomLevel, callback]);
    },
    setMapMode(
      mapMode: string
    ) {
<<<<<<< HEAD
      runCommand(smartMapRef.current, "setMapMode", [mapMode]);
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
=======
      runCommand(smartMapRef.current, "setMapMode", [mapMode])
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
    //TODO: Juhani add more bindings
>>>>>>> e2c13222d5a3621d01dee613cf47b3034a6f8572
  }));

  return <div id={COMPONENT_ID_PREFIX} style={{ flex: 1 }} />;
});
