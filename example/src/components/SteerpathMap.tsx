import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import WebView, { WebViewMessageEvent } from 'react-native-webview';
import { EventMessage, FunctionMessage } from '../schema/postMessageApi';
import { useLocation } from '../context/UserLocationContext';
import { useBluetoothPermission } from '../context/BluetoothPermissionContext';
import { useLocationPermission } from '../context/LocationPermissionContext';

const frameId = 'steerpath_iframe';
const kioskName = 'steerpath';
const kioskAppBaseUrl = 'https://kiosk.steerpath.dev';

const reactNativeUrl = 'http://localhost:8081';

export const trackingStatusValues = [
  'initial-state',
  'not-tracking',
  'tracking-location',
  'tracking-location-and-heading',
  'location-unavailable',
  'bluetooth-unavailable',
  'no-location-permission',
  'no-bluetooth-permission',
] as const;

export type TrackingStatus = (typeof trackingStatusValues)[number];

export function SteerpathMap() {
  const webViewRef = useRef<WebView>(null);
  const [logs, setLogs] = useState('');
  const {
    hasBluetoothPermission,
    isBluetoothEnabled,
    enableBluetooth,
    requestBluetoothPermission,
  } = useBluetoothPermission();
  const {
    hasLocationPermission,
    isLocationEnabled,
    enableLocation,
    requestLocationPermission,
  } = useLocationPermission();
  const { bluedotLocation, bluedotHeading } = useLocation();
  const [isMapLoaded, setIsMapLoaded] = useState(false);

  const sendMessage = useCallback((message: FunctionMessage) => {
    // this doesn't work on android
    // webViewRef?.current?.postMessage(JSON.stringify(message));
    // so use this workaround
    webViewRef.current?.injectJavaScript(`
      window.dispatchEvent(new MessageEvent('message', {
        data: ${JSON.stringify(JSON.stringify(message))}
      }));
    `);
  }, []);

  useEffect(() => {
    if (!isMapLoaded) return;
    sendMessage({
      type: 'FUNC_SET_USER_LOCATION',
      frameId,
      newLocation: bluedotLocation,
      newHeading: bluedotHeading,
    });
  }, [bluedotHeading, bluedotLocation, sendMessage, isMapLoaded]);

  const FUNC_SET_PERMISSION = useCallback(
    (whichOne: 'bluetooth' | 'location', status: boolean) => {
      sendMessage({
        type:
          whichOne === 'bluetooth'
            ? 'FUNC_SET_BLUETOOTH_PERMISSION_STATUS'
            : 'FUNC_SET_LOCATION_PERMISSION_STATUS',
        frameId,
        enabled: status,
      });
    },
    [sendMessage],
  );

  const FUNC_SET_STATUS = useCallback(
    (whichOne: 'bluetooth' | 'location', status: boolean) => {
      sendMessage({
        type:
          whichOne === 'bluetooth'
            ? 'FUNC_SET_BLUETOOTH_ENABLED'
            : 'FUNC_SET_LOCATION_ENABLED',
        frameId,
        enabled: status,
      });
    },
    [sendMessage],
  );

  const handleLocateMeButtonPressed = useCallback(
    async (currentTrackingStatus: TrackingStatus) => {
      if (currentTrackingStatus === 'no-location-permission') {
        await requestLocationPermission();
      } else if (currentTrackingStatus === 'no-bluetooth-permission') {
        await requestBluetoothPermission();
      } else if (currentTrackingStatus === 'bluetooth-unavailable') {
        await enableBluetooth();
      } else if (currentTrackingStatus === 'location-unavailable') {
        await enableLocation();
      }
    },
    [
      enableBluetooth,
      enableLocation,
      requestBluetoothPermission,
      requestLocationPermission,
    ],
  );

  useEffect(() => {
    if (!isMapLoaded) return;
    FUNC_SET_PERMISSION('location', hasLocationPermission);
  }, [isMapLoaded, hasLocationPermission, FUNC_SET_PERMISSION]);

  useEffect(() => {
    if (!isMapLoaded) return;
    FUNC_SET_STATUS('location', isLocationEnabled);
  }, [isMapLoaded, isLocationEnabled, FUNC_SET_STATUS]);

  useEffect(() => {
    if (!isMapLoaded) return;
    FUNC_SET_PERMISSION('bluetooth', hasBluetoothPermission);
  }, [isMapLoaded, hasBluetoothPermission, FUNC_SET_PERMISSION]);

  useEffect(() => {
    if (!isMapLoaded) return;
    FUNC_SET_STATUS('bluetooth', isBluetoothEnabled);
  }, [isMapLoaded, isBluetoothEnabled, FUNC_SET_STATUS]);

  const onMessage = useCallback(
    (event: WebViewMessageEvent | undefined) => {
      if (event?.nativeEvent.data) {
        const parsed: EventMessage = JSON.parse(event?.nativeEvent.data);
        if (parsed.frameId === frameId && parsed.type !== 'EVENT_URL_CHANGED') {
          setLogs(`LOG: ${JSON.stringify(parsed, null, 2)}`);

          if (parsed.type === 'EVENT_LOCATE_ME_BUTTON_PRESSED') {
            handleLocateMeButtonPressed(parsed.currentTrackingStatus);
          } else if (parsed.type === 'EVENT_MAP_LOADED') {
            setIsMapLoaded(true);
          }
        }
      }
    },
    [handleLocateMeButtonPressed],
  );

  const url = useMemo(() => {
    const params = {
      frameId,
      targetOrigin: reactNativeUrl,
      useExternalLocation: 'true',
    };
    const searchParams = new URLSearchParams(params).toString();
    return `${kioskAppBaseUrl}/${kioskName}?${searchParams}`;
  }, []);

  const styles = StyleSheet.create({
    container: {
      display: 'flex',
      flex: 1,
      height: '100%',
    },
  });

  return (
    <View style={styles.container}>
      <WebView
        ref={webViewRef}
        originWhitelist={['*']}
        source={{ uri: url }}
        onMessage={onMessage}
      />
    </View>
  );
}
