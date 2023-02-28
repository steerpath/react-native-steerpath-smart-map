import React, { useState, useRef, useEffect } from "react";
import RNFS from "react-native-fs";
import Drawer from "./Drawer.js";
import { BackHandler, View } from "react-native";
import steerpathConfig from "./steerpath_config.json";
import { LiveConfig, SmartBottomSheetState, SmartMapManager, SmartMapMode, SmartMapNavigationUserTask, SmartMapObject, SmartMapUserTask, SmartMapUserTaskResponse, SmartMapUserTaskType, SmartMapView, SmartMapViewMethods, SmartMapViewStatus } from "react-native-steerpath-smart-map";

const CONFIG_FILE_PATH = RNFS.DocumentDirectoryPath + "/steerpath_config.json";

// const API_KEY =
//   "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsIndyYXBwZWQiOnRydWV9.eyJjbGllbnRfdG9rZW4iOiJleUpoYkdjaU9pSlNVekkxTmlJc0ltbHpjeUk2SW5OMFpXVnljR0YwYUMxemJXRnlkQzF2Wm1acFkyVWlmUS5leUpqWm1jaU9pSnpkR1ZsY25CaGRHaGZZMjl1Wm1sbkxtcHpiMjRpTENKbFpHbDBVbWxuYUhSeklqb2lJaXdpWldsa1FXTmpaWE56SWpvaUlpd2lhV0YwT2lJNk1UVTRNVFF5TWpJNU55d2lhblJwSWpvaU5HSmxZbVV4TURFdE1UUXdZUzAwWW1Nd0xXRTBORGN0TjJNME9UZzJNamN4T0RGbUlpd2liV1YwWVVGalkyVnpjeUk2SW5raUxDSnpZMjl3WlhNaU9pSjJNaTB6WVdVME1UZGlZUzB3TXpnM0xUUmxOemt0WVRVeE9TMDNaV1U1TWpFM05tUmpOamd0Y0hWaWJHbHphR1ZrT25JaUxDSnpkV0lpT2lKMk1pMHpZV1UwTVRkaVlTMHdNemczTFRSbE56a3RZVFV4T1MwM1pXVTVNakUzTm1Sak5qZ2lmUS5reVowOHFBbXprQXBNMFpRUVJDRDVjb2Z0eVNMbmpFNkkwekRqSFNsRjVSdTFIYUVWVkJqQzI1TFdaSk1wYWw4Ui14RS01NXJoUkRMNjJlcHF0TjBOZ1JtdEJNbGdWM2Q1ZElVR3F0Vl9BbDZ2bVRjWWs4RHFjLTVYZUxSby11cUFwZ0Z4a0JNQ3ZzblNzQ0hjeV9QZzNLSWNsbElFbTcybWhDUHVxVEVfdDNZUjU4MVRCUWxjM2RqU254bFpkQTNhMUVjVm1TdzB6QXhBcnV2NFRLb215LVcta2tYVEpSem9GTktCdGh4QVZrZTVvVzk3U09tNjJoQ0pBdWFtUkJ4ZzZpcEZPQ3ByNnBYQm9lNkRIb2xTWXQ2NjBqejM2cjBTWmp6aUJkbGdUcEU5WDNwMFMzMjBHVE93MzlKVDU0YkRQWkxFd0gtaTlLRTFWclFiMHFJSGciLCJpYXQiOjE1ODE0MjI0MTMsImlzcyI6InN0ZWVycGF0aF93cmFwcGVyIiwianRpIjoiZTc3Y2VmNTYtNTRmMy00ZjIzLTlmZjItY2EyM2QxMjAzZTUyIn0.SgJQ0qFc3duW-dQjCTf8okgFdQ4xBSo48V9N0NFUol2XT7UIO_EhYLNBnc2NvxO0Ijiw9rQuMwqhhzZNus2CwvlBZ6oTGWakgrnxeNingI32OBAfIMZLY46k1b_-tUzkH_kGXmG4S-plTvvXe3DYHRF4-u5i3FnRxNJCi7-8tmLRYDFpoexCM4SIgnG50ZR9TBABv8NX-42l1fyb6dKpXcvYRR2XTXVEZLAGRY_xBUsrtKycsNPslH4UTr4katYpVHoKXYfEvJbjP9Wnm3B0P-Pi1_40fui__P1_HExEzVYVfnxR-fLEuDRFrCGt7vmxbekckMqr8bDsaNh85DWBWQ";


const API_KEY = "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJjbGllbnRfdG9rZW4iOiJleUpoYkdjaU9pSlNVekkxTmlJc0ltbHpjeUk2SW5OMFpXVnljR0YwYUMxdmRXeDFJbjAuZXlKalptY2lPaUp2ZFd4MVgzVnVhWFpsY25OcGRIbGZZMjl1Wm1sbkxtcHpiMjRpTENKbFpHbDBVbWxuYUhSeklqb2lJaXdpWldsa1FXTmpaWE56SWpvaUlpd2lhV0YwT2lJNk1UVTFOVFE0TlRNeE5Td2lhblJwSWpvaU9HSmlNREl6T0RBdE5UZGpNQzAwTXpNMkxUazFOVGN0TkRGbFpHVXhZakppWmpnNUlpd2liV1YwWVVGalkyVnpjeUk2SW5raUxDSnpZMjl3WlhNaU9pSjJNaTB3WkRCak5tUmtPQzFtWWpSbUxUUTBaRFl0T1RWak15MWlNekJsTmpnMFlURmxabVl0Y0hWaWJHbHphR1ZrT25JaUxDSnpkV0lpT2lKMk1pMHdaREJqTm1Sa09DMW1ZalJtTFRRMFpEWXRPVFZqTXkxaU16QmxOamcwWVRGbFptWWlmUS5LREpENW14OGVmZ2xjeWNnWnVpdFZlNlE2TXFDYlhJMS1hNGp3WG1YakIwN2k5Y0xlS2RaUUxOZ3V3YkZZb1lVQ0lPNjhyR2h6cWJwOGR2ZlBHanpPZ3pKUVNCTTJxc00wZWV4OGhxeWRUMEU5VG9keFZVYU1HM0FXUUFMYk0yY01wM1ExbHNUNUpRaEN2LVoyakw0UU1xa05CS2d4SFcwTjlEaDhjSURrd2pSM3UybGcyV18tREt3VzU2VUlvV3g1X3J0aUtMR3g2dUJkMEhlWlUtbHlRR1JsWm51dUtOX2ROLXEtZ3Z5NlBoZlFIdmpBYmNQdm9NT25ncGozaFE4cWdJYTVlZy1vWm1IcU5SanB1ci1LLWQ5SDJNNUo0c3VZazJLc3JDcmtTazBJeFFsVEZrY2VHTC1HSlUtS2g3a3VLR3NIT1BuY3NOMU1kbjhIQi1HN3ciLCJpYXQiOjE1NjEzNzc4NTYsImlzcyI6InN0ZWVycGF0aF93cmFwcGVyIiwianRpIjoiMDMzMWIzMzUtZTIzMS00NjE0LTgwZTAtOWNkY2RhNjY3ZTIzIn0.pwvvtt45i3MGG96uzD0oYMduzbR9uzcKYOTuhXBo9I7w30_RNtwtD-S2B4uiWroCpHV4e9FAojD6cjN7HfX0521fJQcsMXruniX3bBIhUbxZCnaE4PVRccjBTPa-euNq0ICfszWaSFxvDMWSbwm9bajfAifdD6bYjoesw7pRrOA_kaPRUjqhU7VHgYF7Di_WkRGeTj2-9mVLXYyXqgKTbBXQlMtXlW8p7HQaqBX4Nt2_UGcMrpdsmxCoKfQ3HN2RY2Put7niS7L8pw3JsOC68uqRKDaIopcZSsCfgN1hLbmgAZF2eaC-kF1ulkKDYI2SPxr15TSYM8nxKMfpu7wYiw";
export default function App() {
  const smartMapRef = useRef<SmartMapViewMethods>(null);
  const [sdkReady, setSDKReady] = useState(false);
  const [selectedObject, setSelectedObject] = useState<SmartMapObject | null>();
  const [bottomSheetState, setBottomSheetState] = useState<SmartBottomSheetState>();
  const [searchResults, setSearchResults] = useState<SmartMapObject[]>();

  useEffect(() => {
    // Store configuration to the file system and use path to the file

    const transmitOptions = {
      id: "testaaja",
      password: "testaaja",
      title: 'Teppo Testaaja',
      groups: ["employee"],
    };
    const receiveOptions = {
      groups: ["employee"],
      showsThisDevice: false,
    };

    const liveCongig: LiveConfig = {
      receive: receiveOptions,
      transmit: transmitOptions,
    };
    RNFS.writeFile(CONFIG_FILE_PATH, JSON.stringify(steerpathConfig), "utf8")
      .then((success) => {
        SmartMapManager.startWithConfig({
          apiKey: API_KEY,
          configFilePath: CONFIG_FILE_PATH,
        });

        /**
         * This API sets the language for the search engine.
         *
         * To localize the map view UI i.e. search bar, see Steerpath.strings files on iOS and string.xml files on Android.
         * Smart SDK uses the device's locale to determine the language. Fallbacks to English if no appropriate localization file is found.
         */
        SmartMapManager.setLanguage("fi-FI");

        SmartMapManager.setLiveConfig(liveCongig);
        setSDKReady(true);
      })
      .catch((err) => {
        console.log(err.message);
      });

    // or use configuration as a string
    /*   SmartMapManager.startWithConfig({
        apiKey: API_KEY,
        configString: CONFIG_STRING
      }) */
  }, []);

  // navigate to selected smart map object
  const navigateToPoi = (smartmapObject: SmartMapObject) => {
    if (smartmapObject) {
      const userTask: SmartMapUserTask = {
        type: SmartMapUserTaskType.NAVIGATION,
        payload: smartmapObject,
      };

      smartMapRef.current?.startUserTask(userTask);
    }
  };

  useEffect(() => {
    if (selectedObject && searchResults) {
      const otherObjs = searchResults.filter((res) => res.localRef !== selectedObject.localRef && res.buildingRef === selectedObject.buildingRef);
      smartMapRef.current?.selectMapObject(selectedObject);
      smartMapRef.current?.addMarkers(otherObjs, null, null, null, null)
      setSelectedObject(null);
    }
  }, [selectedObject, searchResults]);

  const onMapLoaded = () => {
    BackHandler.addEventListener('hardwareBackPress', () => {
      if (bottomSheetState === SmartBottomSheetState.EXPANDED) {
        smartMapRef.current?.onBackPressed(() => { });
        return true;
      }
      return false;
    });
  }

  /**
   * Rendering SmartMapView or its parent view before sdk is fully ready, may cause some unexpected behavior i.e. 
   * some UI configurations set in config json are not working properly.
   * 
   * Issues noticed at least with initialMapMode, initialSearchBottomSheetState and settings.
   * 
   * You can start the SDK when showing a splash screen, or if you have a multi-screen app, we recommend starting the SDK
   * before user navigates to the map screen.
   */
  if (!sdkReady) return null;

  return (
    <View style={{ flex: 10, flexDirection: "row" }}>
      <View style={{ flex: 7 }}>
        <SmartMapView
          style={{ flex: 1 }}
          apiKey={API_KEY}
          ref={smartMapRef}
          onMapLoaded={onMapLoaded}
          onMapClicked={(payload) => {
            console.log("payload", payload);

            const { mapObjects } = payload;
            if (mapObjects.length > 0) {
              const smartmapObject = mapObjects[0];
              // use selectMapObject() to open the default info bottomsheet of selected smartMapObject
              smartMapRef.current?.selectMapObject(smartmapObject);
            }
          }}
          onUserFloorChanged={(payload) =>
            console.log("User floor changed", payload)
          }
          onVisibleFloorChanged={(payload) =>
            console.log("Visible Floor changed", payload)
          }
          onSearchResultSelected={(payload) => {
            setSelectedObject(payload.mapObject);
          }}
          onViewStatusChanged={(payload) => {
            console.log("onViewstatuschanged", payload);
            if (payload.status === SmartMapViewStatus.CARD_VIEW) {
              console.log('card');
            }
            if (payload.status === SmartMapViewStatus.SEARCH_VIEW) {
              console.log('search');
            }
            if (payload.status === SmartMapViewStatus.SETTING_VIEW) {
              console.log('settings');
            }
            if (payload.status === SmartMapViewStatus.NAVIGATING_VIEW) {
              console.log('nav');
            }
            if (payload.status === SmartMapViewStatus.ERROR_VIEW) {
              console.log('err');
            }
            if (payload.status === SmartMapViewStatus.ONLY_MAP) {
              console.log('map');
            }
          }}
          onBottomSheetStateChanged={(payload) => {
            setBottomSheetState(payload.state);
            console.log("onBottomSheetStatusChanged", payload.state);
          }}
          onNavigationEnded={() => console.log("navigation ended")}
          onNavigationStarted={() => console.log("navigation started")}
          onNavigationPreviewAppeared={() =>
            console.log("navigation PreviewAppeared")
          }
          onNavigationDestinationReached={() =>
            console.log("navigation DestinationReached")
          }
          onUserTaskResponse={(taskInfo) => {
            const { response, userTask } = taskInfo
            console.log('response', response)
            console.log('userTask', userTask);

            if (response === SmartMapUserTaskResponse.COMPLETED || response === SmartMapUserTaskResponse.CANCELLED) {
              if (userTask.type === SmartMapUserTaskType.NAVIGATION) {
                const smartMapObject: SmartMapObject = ((userTask.payload as SmartMapNavigationUserTask) as SmartMapObject);
                smartMapRef.current?.selectMapObject(smartMapObject);
              }
            }
          }}
          onSearchCategorySelected={(payload) => {
            if (searchResults && searchResults.length > 0) {
              setSearchResults([]);
              smartMapRef.current?.removeAllMarkers();
            }
            setSearchResults(payload.searchResults);
          }}
        />
      </View>
      {
        <View style={{ flex: 3 }}>
          <Drawer smartMapRef={smartMapRef} selectedMapObject={selectedObject} />
        </View>
      }
    </View>
  );
}
