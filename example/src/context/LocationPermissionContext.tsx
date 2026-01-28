import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  useCallback,
  PropsWithChildren,
} from 'react';
import { Platform, Linking } from 'react-native';
import * as ExpoLocation from 'expo-location';
import * as permissions from 'react-native-permissions';
import { promptForEnableLocationIfNeeded } from '../androidLocationEnabler';

const {
  PERMISSIONS: {
    ANDROID: { ACCESS_FINE_LOCATION, ACCESS_COARSE_LOCATION },
    IOS: { LOCATION_WHEN_IN_USE },
  },
  RESULTS: { GRANTED, BLOCKED },
} = permissions;

type LocationPermissionContextType = {
  isLocationEnabled: boolean;
  hasLocationPermission: boolean;
  requestLocationPermission: () => Promise<boolean>;
  enableLocation: () => Promise<boolean>;
};

const LocationPermissionContext = createContext<
  LocationPermissionContextType | undefined
>(undefined);

export function LocationPermissionProvider({ children }: PropsWithChildren) {
  const [isLocationEnabled, setIsLocationEnabled] = useState(false);
  const [hasLocationPermission, setHasLocationPermission] = useState(false);

  const pollLocationServices = useCallback(() => {
    ExpoLocation.hasServicesEnabledAsync().then(setIsLocationEnabled);
  }, []);

  useEffect(() => {
    pollLocationServices();
    const interval = setInterval(
      pollLocationServices,
      isLocationEnabled ? 5000 : 1000,
    );
    return () => clearInterval(interval);
  }, [isLocationEnabled, pollLocationServices]);

  const requestLocationPermission = useCallback(async (): Promise<boolean> => {
    if (Platform.OS === 'android') {
      const res = await permissions.requestMultiple([
        ACCESS_FINE_LOCATION,
        ACCESS_COARSE_LOCATION,
      ]);
      const granted =
        res[ACCESS_FINE_LOCATION] === GRANTED &&
        res[ACCESS_COARSE_LOCATION] === GRANTED;
      if (!granted && res[ACCESS_FINE_LOCATION] === BLOCKED) {
        await Linking.openSettings();
        return false;
      }
      setHasLocationPermission(granted);
      return granted;
    }

    if (Platform.OS === 'ios') {
      const status = await permissions.check(LOCATION_WHEN_IN_USE);
      if (status === GRANTED) {
        setHasLocationPermission(true);
        return true;
      }
      if (status === BLOCKED) {
        await Linking.openSettings();
        return false;
      }
      const req = await permissions.request(LOCATION_WHEN_IN_USE);
      const granted = req === GRANTED;
      setHasLocationPermission(granted);
      return granted;
    }

    return true;
  }, []);

  const enableLocation = useCallback(async () => {
    if (Platform.OS === 'android') {
      await promptForEnableLocationIfNeeded({
        interval: 10000,
      });
    } else if (Platform.OS === 'ios') {
      await Linking.openURL('App-Prefs:Privacy&path=LOCATION');
    }

    return ExpoLocation.hasServicesEnabledAsync();
  }, []);

  const checkLocationPermission = useCallback(async (): Promise<boolean> => {
    if (Platform.OS === 'android') {
      const res = await permissions.checkMultiple([
        ACCESS_FINE_LOCATION,
        ACCESS_COARSE_LOCATION,
      ]);
      const granted =
        res[ACCESS_FINE_LOCATION] === GRANTED &&
        res[ACCESS_COARSE_LOCATION] === GRANTED;
      setHasLocationPermission(granted);
      return granted;
    }

    if (Platform.OS === 'ios') {
      const status = await permissions.check(LOCATION_WHEN_IN_USE);
      const granted = status === GRANTED;
      setHasLocationPermission(granted);
      return granted;
    }

    return true;
  }, []);

  useEffect(() => {
    checkLocationPermission();
  }, [checkLocationPermission]);

  const value = useMemo(
    () => ({
      isLocationEnabled,
      hasLocationPermission,
      requestLocationPermission,
      enableLocation,
    }),
    [
      isLocationEnabled,
      hasLocationPermission,
      requestLocationPermission,
      enableLocation,
    ],
  );

  return (
    <LocationPermissionContext.Provider value={value}>
      {children}
    </LocationPermissionContext.Provider>
  );
}

export const useLocationPermission = () => {
  const ctx = useContext(LocationPermissionContext);
  if (!ctx)
    throw new Error(
      'useLocationPermission must be used within a LocationPermissionProvider',
    );
  return ctx;
};
