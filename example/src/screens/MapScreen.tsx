
import {
  SmartMapView,
  SmartMapModes,
  SmartMapUserTaskType
} from "react-native-steerpath-smart-map";
import { SafeAreaView, Button } from 'react-native'
import { NavigationScreenProp } from 'react-navigation';
import { useSmartMapContext } from './SmartMapContext';
import React, { useRef, useEffect } from 'react';

interface MapScreenProps {
  navigation: NavigationScreenProp<any>;
}

export default function MapScreen({navigation}: MapScreenProps) {

  const smartMapRef = useRef<any>(null);
  const { setSmartMapRef } = useSmartMapContext();

  useEffect(() => {
    setSmartMapRef(smartMapRef);
  }, [setSmartMapRef]);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <SmartMapView
        ref={smartMapRef}
        style={{ flex: 1 }}
        mapMode={SmartMapModes.MAP_ONLY}
        onMapLoaded={() => console.log("MapLoaded")}
        onMapClicked={mapObjects => {
          console.log("Map Clicked: ", mapObjects["SmartMapObjects"])
          const array: any[] = mapObjects["SmartMapObjects"]
          const map_object = array[0];
          const POI_SELECTION_TASK = {
            type: SmartMapUserTaskType.POI_SELECTION,
              payload: {
                map_object,
                shouldAddMarker: true,
                actionButtonText: "BUTTON",
                actionButtonIcon: 0
              }
          }
          smartMapRef.current &&
              smartMapRef.current.startUserTask(POI_SELECTION_TASK);
        }}
        onUserFloorChanged={payload => console.log("User floor changed", payload)}
        onVisibleFloorChanged={payload =>
          console.log("Visible Floor changed", payload)
        }
        onViewStatusChanged={payload =>
          console.log("onViewstatuschanged", payload)
        }
        onNavigationEnded={() => console.log("navigation ended")}
        onNavigationStarted={() => console.log("navigation started")}
        onNavigationPreviewAppeared={() =>
          console.log("navigation PreviewAppeared")
        }
        onNavigationDestinationReached={() =>
          console.log("navigation DestinationReached")
        }
        onUserTaskResponse={payload => {
          console.log("onUsertask response", payload);
        }}
      />
      <Button
        title="Open drawer"
        onPress={() => {
          navigation.openDrawer();
        }}/>
    </SafeAreaView>
  );
}