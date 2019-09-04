/* eslint-disable no-unused-expressions */
import React, { useEffect } from 'react';
import { SafeAreaView, ScrollView, Button } from 'react-native';
import { NavigationScreenProp } from 'react-navigation';
import { SmartObjectSource, SmartMapUserTaskType, SmartGeofenceManager, SmartGeofenceEvent } from 'react-native-steerpath-smart-map';
import { useSmartMapContext } from './SmartMapContext';

const MAP_OBJECT = {
  title: 'Test marker',
  floorIndex: 2,
  latitude: 60.22094595,
  longitude: 24.81237337,
  localRef: 'Mobile development',
  buildingRef: '67',
  source: SmartObjectSource.STATIC,
};

const NAVIGATION_TASK = {
  type: SmartMapUserTaskType.NAVIGATION,
  payload: MAP_OBJECT
}

const POI_SELECTION_TASK = {
  type: SmartMapUserTaskType.POI_SELECTION,
    payload: {
      MAP_OBJECT,
      shouldAddMarker: true,
      actionButtonText: "BUTTON",
      actionButtonIcon: 0
    }
}

function handleGeofenceEntered(eventName: SmartGeofenceEvent, payload: Record<string, any>) {
  console.log({
    eventName,
    payload
  });
}

export default function DrawerMenu() {
  const { smartMapRef } = useSmartMapContext();
  let hasListener: boolean = false;
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView>
        <Button
          title="Set camera to a place"
          onPress={() => {
            smartMapRef.current &&
              smartMapRef.current.setCamera({
                latitude: MAP_OBJECT.latitude,
                longitude: MAP_OBJECT.longitude,
                zoomLevel: 20,
                bearing: 0,
                pitch: 0,
                floorIndex: MAP_OBJECT.floorIndex,
                buildingRef: MAP_OBJECT.buildingRef,
              });
          }}
        />
        <Button
          title="Add dummy map marker"
          onPress={() => {
            smartMapRef.current && smartMapRef.current.addMarker(MAP_OBJECT, null);
          }}
        />
        <Button
          title="Remove dummy map marker"
          onPress={() => {
            smartMapRef.current && smartMapRef.current.removeMarker(MAP_OBJECT);
          }}
        />
        <Button
          title="Select dummy map object"
          onPress={() => {
            smartMapRef.current && smartMapRef.current.selectMapObject(MAP_OBJECT);
          }}
        />
        <Button
          title="Animate to dummy map object"
          onPress={() => {
            smartMapRef.current && 
              smartMapRef.current.animateCameraToObject(MAP_OBJECT.localRef, MAP_OBJECT.buildingRef, 20, null);
          }}
        />
        <Button
          title="Start navigation user task"
          onPress={() => {
            smartMapRef.current && 
              smartMapRef.current.startUserTask(NAVIGATION_TASK);
          }}
        />
        <Button
          title="Start POI Selection task"
          onPress={() => {
            smartMapRef.current && smartMapRef.current.startUserTask(POI_SELECTION_TASK); 
          }}/>
        <Button
          title="Cancel current user task"
          onPress={() => {
            smartMapRef.current && smartMapRef.current.cancelCurrentUserTask();
          }}/>
        <Button
          title="Add Geofence"
          onPress={() => {
            if (!hasListener) {
              SmartGeofenceManager.addListener(handleGeofenceEntered);
              hasListener = true;
            }
            SmartGeofenceManager.addGeofence(MAP_OBJECT.localRef, MAP_OBJECT.buildingRef, function(
              error,
              response,
            ) {
              alert(response);
            });
          }}/>
          <Button
            title="Animate camera"
            onPress={() => {
              smartMapRef.current && smartMapRef.current.animateCamera({
                latitude: MAP_OBJECT.latitude, 
                longitude: MAP_OBJECT.longitude, 
                zoomLevel: 20, 
                bearing: null, 
                pitch: null, 
                floorIndex: 2, 
                buildingRef: MAP_OBJECT.buildingRef,
              });
            }
          }/>
          <Button
            title="Animate camera to building ref"
            onPress={() => {
              smartMapRef.current && smartMapRef.current.animateCameraToBuildingRef(MAP_OBJECT.buildingRef, null);
            }}/>
          <Button
            title="Animate camera to object"
            onPress={() => {
              smartMapRef.current && smartMapRef.current.animateCameraToObject(MAP_OBJECT.localRef, MAP_OBJECT.buildingRef, 24, null);
            }}/>
          <Button
            title="Set camera to building ref"
            onPress={() => {
              smartMapRef.current && smartMapRef.current.setCameraToBuildingRef(MAP_OBJECT.buildingRef, null);
            }}/>
          <Button
            title="Set camera to object"
            onPress={() => {
              smartMapRef.current && smartMapRef.current.setCameraToObject(MAP_OBJECT.localRef, MAP_OBJECT.buildingRef, 24, null);
            }}/>      
      </ScrollView>
    </SafeAreaView>
  );
}
