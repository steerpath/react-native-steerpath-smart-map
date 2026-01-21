import React, { useState, useEffect } from "react";
import { Platform, View } from "react-native";
import RNFS from "react-native-fs";
import {
  ConfigSDK,
  SmartMapManager,
} from "react-native-steerpath-smart-map";
import steerpathConfig from "./steerpath_config.json";

const CONFIG_FILE_PATH = RNFS.DocumentDirectoryPath + "/steerpath_config.json";

const API_KEY = "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsIndyYXBwZWQiOnRydWV9.eyJjbGllbnRfdG9rZW4iOiJleUpoYkdjaU9pSlNVekkxTmlJc0ltbHpjeUk2SW5OMFpXVnljR0YwYUMxemJXRnlkQzF2Wm1acFkyVWlmUS5leUpqWm1jaU9pSnpkR1ZsY25CaGRHaGZZMjl1Wm1sbkxtcHpiMjRpTENKbFpHbDBVbWxuYUhSeklqb2lJaXdpWldsa1FXTmpaWE56SWpvaUlpd2lhV0YwT2lJNk1UVTRNVFF5TWpJNU55d2lhblJwSWpvaU5HSmxZbVV4TURFdE1UUXdZUzAwWW1Nd0xXRTBORGN0TjJNME9UZzJNamN4T0RGbUlpd2liV1YwWVVGalkyVnpjeUk2SW5raUxDSnpZMjl3WlhNaU9pSjJNaTB6WVdVME1UZGlZUzB3TXpnM0xUUmxOemt0WVRVeE9TMDNaV1U1TWpFM05tUmpOamd0Y0hWaWJHbHphR1ZrT25JaUxDSnpkV0lpT2lKMk1pMHpZV1UwTVRkaVlTMHdNemczTFRSbE56a3RZVFV4T1MwM1pXVTVNakUzTm1Sak5qZ2lmUS5reVowOHFBbXprQXBNMFpRUVJDRDVjb2Z0eVNMbmpFNkkwekRqSFNsRjVSdTFIYUVWVkJqQzI1TFdaSk1wYWw4Ui14RS01NXJoUkRMNjJlcHF0TjBOZ1JtdEJNbGdWM2Q1ZElVR3F0Vl9BbDZ2bVRjWWs4RHFjLTVYZUxSby11cUFwZ0Z4a0JNQ3ZzblNzQ0hjeV9QZzNLSWNsbElFbTcybWhDUHVxVEVfdDNZUjU4MVRCUWxjM2RqU254bFpkQTNhMUVjVm1TdzB6QXhBcnV2NFRLb215LVcta2tYVEpSem9GTktCdGh4QVZrZTVvVzk3U09tNjJoQ0pBdWFtUkJ4ZzZpcEZPQ3ByNnBYQm9lNkRIb2xTWXQ2NjBqejM2cjBTWmp6aUJkbGdUcEU5WDNwMFMzMjBHVE93MzlKVDU0YkRQWkxFd0gtaTlLRTFWclFiMHFJSGciLCJpYXQiOjE1ODE0MjI0MTMsImlzcyI6InN0ZWVycGF0aF93cmFwcGVyIiwianRpIjoiZTc3Y2VmNTYtNTRmMy00ZjIzLTlmZjItY2EyM2QxMjAzZTUyIn0.SgJQ0qFc3duW-dQjCTf8okgFdQ4xBSo48V9N0NFUol2XT7UIO_EhYLNBnc2NvxO0Ijiw9rQuMwqhhzZNus2CwvlBZ6oTGWakgrnxeNingI32OBAfIMZLY46k1b_-tUzkH_kGXmG4S-plTvvXe3DYHRF4-u5i3FnRxNJCi7-8tmLRYDFpoexCM4SIgnG50ZR9TBABv8NX-42l1fyb6dKpXcvYRR2XTXVEZLAGRY_xBUsrtKycsNPslH4UTr4katYpVHoKXYfEvJbjP9Wnm3B0P-Pi1_40fui__P1_HExEzVYVfnxR-fLEuDRFrCGt7vmxbekckMqr8bDsaNh85DWBWQ";
export default function App() {
  const [sdkReady, setSDKReady] = useState(false);

  useEffect(() => {
    // Store configuration to the file system and use path to the file

    RNFS.writeFile(CONFIG_FILE_PATH, JSON.stringify(steerpathConfig), "utf8")
      .then((success) => {
        const configIOS: ConfigSDK = { apiKey: API_KEY, configFilePath: CONFIG_FILE_PATH };
        const configAndroid: ConfigSDK = { apiKey: API_KEY, configFilePath: CONFIG_FILE_PATH };
        SmartMapManager.startWithConfig(Platform.OS === 'ios' ? configIOS : configAndroid);

        setSDKReady(true);
      })
      .catch((err) => {
        console.log(err.message);
      });

    // or use configuration as a string
    /*   SmartMapManager.startWithConfig({
        apiKey: API_KEY,
        configString: JSON.stringify(steerpathConfig)
      }) */
  }, []);



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

  // TODO: add some ui, i.e. button to start/stop location listener and live
  // TODO: handle permissions first
  return (
    <View style={{ flex: 10, flexDirection: "row" }}>
    </View>
  );
}
