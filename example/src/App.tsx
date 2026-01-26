import React, { useEffect, useState } from 'react';
import * as FileSystem from 'expo-file-system/legacy';
import { SmartMapManager } from 'react-native-steerpath-smart-map';
import { SteerpathMap } from './components/SteerpathMap';
import * as SplashScreen from 'expo-splash-screen';
import { UserLocationProvider } from './context/UserLocationContext';
import { BluetoothPermissionProvider } from './context/BluetoothPermissionContext';
import { LocationPermissionProvider } from './context/LocationPermissionContext';

const API_KEY = "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsIndyYXBwZWQiOnRydWV9.eyJjbGllbnRfdG9rZW4iOiJleUpoYkdjaU9pSlNVekkxTmlJc0ltbHpjeUk2SW5OMFpXVnljR0YwYUMxemJXRnlkQzF2Wm1acFkyVWlmUS5leUpqWm1jaU9pSnpkR1ZsY25CaGRHaGZZMjl1Wm1sbkxtcHpiMjRpTENKbFpHbDBVbWxuYUhSeklqb2lJaXdpWldsa1FXTmpaWE56SWpvaUlpd2lhV0YwT2lJNk1UVTRNVFF5TWpJNU55d2lhblJwSWpvaU5HSmxZbVV4TURFdE1UUXdZUzAwWW1Nd0xXRTBORGN0TjJNME9UZzJNamN4T0RGbUlpd2liV1YwWVVGalkyVnpjeUk2SW5raUxDSnpZMjl3WlhNaU9pSjJNaTB6WVdVME1UZGlZUzB3TXpnM0xUUmxOemt0WVRVeE9TMDNaV1U1TWpFM05tUmpOamd0Y0hWaWJHbHphR1ZrT25JaUxDSnpkV0lpT2lKMk1pMHpZV1UwTVRkaVlTMHdNemczTFRSbE56a3RZVFV4T1MwM1pXVTVNakUzTm1Sak5qZ2lmUS5reVowOHFBbXprQXBNMFpRUVJDRDVjb2Z0eVNMbmpFNkkwekRqSFNsRjVSdTFIYUVWVkJqQzI1TFdaSk1wYWw4Ui14RS01NXJoUkRMNjJlcHF0TjBOZ1JtdEJNbGdWM2Q1ZElVR3F0Vl9BbDZ2bVRjWWs4RHFjLTVYZUxSby11cUFwZ0Z4a0JNQ3ZzblNzQ0hjeV9QZzNLSWNsbElFbTcybWhDUHVxVEVfdDNZUjU4MVRCUWxjM2RqU254bFpkQTNhMUVjVm1TdzB6QXhBcnV2NFRLb215LVcta2tYVEpSem9GTktCdGh4QVZrZTVvVzk3U09tNjJoQ0pBdWFtUkJ4ZzZpcEZPQ3ByNnBYQm9lNkRIb2xTWXQ2NjBqejM2cjBTWmp6aUJkbGdUcEU5WDNwMFMzMjBHVE93MzlKVDU0YkRQWkxFd0gtaTlLRTFWclFiMHFJSGciLCJpYXQiOjE1ODE0MjI0MTMsImlzcyI6InN0ZWVycGF0aF93cmFwcGVyIiwianRpIjoiZTc3Y2VmNTYtNTRmMy00ZjIzLTlmZjItY2EyM2QxMjAzZTUyIn0.SgJQ0qFc3duW-dQjCTf8okgFdQ4xBSo48V9N0NFUol2XT7UIO_EhYLNBnc2NvxO0Ijiw9rQuMwqhhzZNus2CwvlBZ6oTGWakgrnxeNingI32OBAfIMZLY46k1b_-tUzkH_kGXmG4S-plTvvXe3DYHRF4-u5i3FnRxNJCi7-8tmLRYDFpoexCM4SIgnG50ZR9TBABv8NX-42l1fyb6dKpXcvYRR2XTXVEZLAGRY_xBUsrtKycsNPslH4UTr4katYpVHoKXYfEvJbjP9Wnm3B0P-Pi1_40fui__P1_HExEzVYVfnxR-fLEuDRFrCGt7vmxbekckMqr8bDsaNh85DWBWQ";
const kioskConfigBaseUrl = 'https://kiosk.steerpath.com';
const kioskName = 'steerpath';
const configName = 'steerpath_config.json';

SplashScreen.preventAutoHideAsync();

export default function App() {
  const [sdkReady, setSdkReady] = useState<boolean>(false);

  const SmartSdkConfigPath = `${`${FileSystem.documentDirectory}`}steerpath_config.json`;

  useEffect(() => {
    const setupConfigFile = async () => {
      // Construct the URL to fetch the config file.
      const kioskConfigUrl = `${kioskConfigBaseUrl}/${kioskName}/configs/${configName}`;

      // Fetch the config data from the server
      let config: any;
      try {
        const resp = await (await fetch(kioskConfigUrl));
        config = await resp.json();
      } catch (error) {
        console.error('Error fetching config file:', error);
        return;
      }

      try {
        // Or read local file. We recommend fetching from server for latest config, that can be updated with app updates.
        // const configData = require('./steerpath_config.json');

        // Write the config data to the file system
        await FileSystem.writeAsStringAsync(
          SmartSdkConfigPath,
          JSON.stringify(config, null, 2)
        );

        console.log('Config file written to:', SmartSdkConfigPath);

        SmartMapManager.startWithConfig({
          apiKey: API_KEY,
          configFilePath: SmartSdkConfigPath
        });
        setSdkReady(true);
      } catch (error) {
        console.error('Error writing config file:', error);
      }
    };

    setupConfigFile();
  }, []);

  useEffect(() => {
    if (!sdkReady) return;
    SplashScreen.hideAsync();
    console.log('hide splash');

  }, [sdkReady])

  if (!sdkReady) {
    console.log('SDK not ready yet');
    return null;
  }

  return (
    <LocationPermissionProvider>
      <BluetoothPermissionProvider>
        <UserLocationProvider>
          <SteerpathMap />
        </UserLocationProvider>
      </BluetoothPermissionProvider>
    </LocationPermissionProvider>
  );
}