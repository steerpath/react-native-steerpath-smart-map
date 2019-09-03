
import {
  SmartMapView,
  SmartMapModes,
  SmartGeofenceManager,
  SmartGeofenceEvent
} from "react-native-steerpath-smart-map";
import { SafeAreaView, Button } from 'react-native'
import { NavigationScreenProp } from 'react-navigation';
import { useSmartMapContext } from './SmartMapContext';
import React, { useRef, useEffect } from 'react';

interface MapScreenProps {
  navigation: NavigationScreenProp<any>;
}

function handleGeofenceEntered(eventName: SmartGeofenceEvent, payload: Record<string, any>) {
  console.log({
    eventName,
    payload
  });
}

export default function MapScreen({ navigation }: MapScreenProps) {

  const smartMapRef = useRef<any>(null);
  const { setSmartMapRef } = useSmartMapContext();

  useEffect(() => {
    SmartGeofenceManager.addListener(handleGeofenceEntered)
    setSmartMapRef(smartMapRef);
    return () => {
      SmartGeofenceManager.removeListener(handleGeofenceEntered);
    }
  }, [setSmartMapRef]);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <SmartMapView
        ref={smartMapRef}
        style={{ flex: 1 }}
        mapMode={SmartMapModes.MAP_ONLY}
        onMapLoaded={() => console.log("MapLoaded")}
        onMapClicked={payload => {
          console.log("Map Clicked: ", payload)
          const array: any[] = payload["mapObjects"]
          const map_object = array[0];
          smartMapRef.current && smartMapRef.current.selectMapObject(map_object);
        }}
        onUserFloorChanged={payload => console.log("User floor changed", payload)}
        onVisibleFloorChanged={payload =>
          console.log("Visible Floor changed", payload)
        }
        onViewStatusChanged={payload =>
          console.log("onViewstatuschanged", payload)
        }
        onNavigationEnded={() => console.log("navigation: Ended")}
        onNavigationStarted={() => console.log("navigation: Started")}
        onNavigationPreviewAppeared={() =>
          console.log("navigation: PreviewAppeared")
        }
        onNavigationDestinationReached={() =>
          console.log("navigation: DestinationReached")
        }
        onUserTaskResponse={payload => {
          console.log("onUserTaskResponse", payload)
          const response: string = payload["response"];
          const userTask = payload["userTask"];
          const type: string = userTask["type"];

          if (type === "poiSelection" && response === "completed") {
            console.log("cancelCurrentUserTask")
            smartMapRef.current && smartMapRef.current.cancelCurrentUserTask();
          }
        }}
      />
      <Button
        title="Open drawer"
        onPress={() => {
          navigation.openDrawer();
        }} />
    </SafeAreaView>
  );
}