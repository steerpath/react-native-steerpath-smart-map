import React, {
  createContext,
  PropsWithChildren,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { Linking, NativeModules, Platform } from 'react-native';
import {
  BleManager as PlxBleManager,
  State as BluetoothStatus,
} from 'react-native-ble-plx';
import * as permissions from 'react-native-permissions';

const {
  PERMISSIONS: {
    ANDROID: { BLUETOOTH_CONNECT, BLUETOOTH_SCAN },
    IOS: { BLUETOOTH },
  },
  RESULTS: { GRANTED, BLOCKED },
} = permissions;

type BluetoothPermissionContextType = {
  isBluetoothEnabled: boolean;
  hasBluetoothPermission: boolean;
  requestBluetoothPermission: () => Promise<boolean>;
  enableBluetooth: () => Promise<void>;
};

const BluetoothPermissionContext = createContext<
  BluetoothPermissionContextType | undefined
>(undefined);

export function BluetoothPermissionProvider({
  children,
}: PropsWithChildren<unknown>) {
  const [hasBluetoothPermission, setHasBluetoothPermission] = useState<boolean>(
    Platform.OS === 'android' ? Platform.Version < 31 : false,
  );
  const [isBluetoothEnabled, setIsBluetoothEnabled] = useState<boolean>(false);
  const managerRef = useRef<PlxBleManager | undefined>(undefined);

  const requestBluetoothPermission = useCallback(async (): Promise<boolean> => {
    if (Platform.OS === 'android') {
      const result = await permissions.requestMultiple([
        BLUETOOTH_CONNECT,
        BLUETOOTH_SCAN,
      ]);
      const granted =
        result[BLUETOOTH_CONNECT] === GRANTED &&
        result[BLUETOOTH_SCAN] === GRANTED;
      if (granted) {
        setHasBluetoothPermission(true);
        return true;
      }
      if (
        result[BLUETOOTH_CONNECT] === BLOCKED &&
        result[BLUETOOTH_SCAN] === BLOCKED
      ) {
        await Linking.openSettings();
        return false;
      }
      setHasBluetoothPermission(false);
      return false;
    }

    if (Platform.OS === 'ios') {
      const check = await permissions.check(BLUETOOTH);
      if (check === GRANTED) {
        setHasBluetoothPermission(true);
        return true;
      }
      if (check === BLOCKED) {
        await Linking.openSettings();
        return false;
      }
      const result = await permissions.request(BLUETOOTH);
      const granted = result === GRANTED;
      if (granted) {
        setHasBluetoothPermission(true);
        return true;
      }
      return false;
    }

    return true;
  }, []);

  const enableBluetooth = useCallback(() => {
    if (Platform.OS === 'ios') {
      return Linking.openURL('App-Prefs:Bluetooth');
    }
    if (Platform.OS === 'android') {
      return NativeModules.RNUtilsModule.requestEnableBluetooth(() => { });
    }
    return Promise.resolve();
  }, []);

  useEffect(() => {
    if (!hasBluetoothPermission) {
      setIsBluetoothEnabled(false);
    } else {
      if (!managerRef.current) {
        managerRef.current = new PlxBleManager();
      }
      const subscription = managerRef.current?.onStateChange((s) => {
        setIsBluetoothEnabled(s === BluetoothStatus.PoweredOn);
      }, true);
      return () => {
        subscription?.remove();
      };
    }
    return () => {
      if (managerRef.current) {
        managerRef.current.destroy();
        managerRef.current = undefined;
      }
    };
  }, [hasBluetoothPermission]);

  const checkBluetoothPermission = useCallback(async (): Promise<boolean> => {
    if (Platform.OS === 'android' ? Platform.Version < 31 : false) {
      setHasBluetoothPermission(true);
      return true;
    }
    if (Platform.OS === 'android') {
      const result = await permissions.checkMultiple([
        BLUETOOTH_CONNECT,
        BLUETOOTH_SCAN,
      ]);
      const granted =
        result[BLUETOOTH_CONNECT] === GRANTED &&
        result[BLUETOOTH_SCAN] === GRANTED;
      setHasBluetoothPermission(granted);
      return granted;
    }

    if (Platform.OS === 'ios') {
      const result = await permissions.check(BLUETOOTH);
      const granted = result === GRANTED;
      setHasBluetoothPermission(granted);
      return granted;
    }

    return true;
  }, []);

  useEffect(() => {
    checkBluetoothPermission();
  }, [checkBluetoothPermission]);

  const ctx = useMemo(
    () => ({
      isBluetoothEnabled,
      hasBluetoothPermission,
      requestBluetoothPermission,
      enableBluetooth,
    }),
    [
      isBluetoothEnabled,
      hasBluetoothPermission,
      requestBluetoothPermission,
      enableBluetooth,
    ],
  );

  return (
    <BluetoothPermissionContext.Provider value={ctx}>
      {children}
    </BluetoothPermissionContext.Provider>
  );
}

export const useBluetoothPermission = () => {
  const ctx = useContext(BluetoothPermissionContext);
  if (!ctx)
    throw new Error(
      'useBluetoothPermission must be used inside BluetoothPermissionProvider',
    );
  return ctx;
};
