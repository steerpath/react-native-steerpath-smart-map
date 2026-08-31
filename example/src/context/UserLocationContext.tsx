import { LocationHeadingObject } from 'expo-location';
import React, {
  createContext,
  PropsWithChildren,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import * as ExpoLocation from 'expo-location';
import {
  LocationResponse,
  SmartLocationManager,
} from 'react-native-steerpath-smart-map';
import * as RNPermissions from 'react-native-permissions';
import { useBluetoothPermission } from './BluetoothPermissionContext';
import { useLocationPermission } from './LocationPermissionContext';

type BluedotHeading = {
  heading: number;
  accuracyDeg: number;
};

type UserLocationContextData = {
  bluedotLocation: LocationResponse | undefined;
  bluedotHeading: BluedotHeading | undefined;
};

function headingAccuracyToDeg(n: number) {
  if (n === 0) return 180;
  if (n === 1) return 50;
  if (n === 2) return 35;
  if (n === 3) return 20;
  return n;
}

const UserLocationContext = createContext<UserLocationContextData | undefined>(
  undefined,
);
export function UserLocationProvider({ children }: PropsWithChildren) {
  const [bluedotLocation, setBluedotLocation] = useState<
    LocationResponse | undefined
  >(undefined);
  const [reportedHeading, setReportedHeading] = useState<
    LocationHeadingObject | undefined
  >(undefined);
  const { isBluetoothEnabled, hasBluetoothPermission } =
    useBluetoothPermission();
  const { isLocationEnabled, hasLocationPermission } = useLocationPermission();

  const reportedHeadingObject = useRef<LocationHeadingObject | undefined>(undefined);
  const reportedHeadingTime = useRef<number>(0);
  const isListenerSetRef = useRef(false);

  useEffect(() => {
    if (
      isLocationEnabled &&
      hasLocationPermission &&
      isBluetoothEnabled &&
      hasBluetoothPermission
    ) {
      if (isListenerSetRef.current === false) {
        isListenerSetRef.current = true;
        console.log('Setting up location listener');
        SmartLocationManager.addLocationChangedListener((location: LocationResponse) => {
          /// console.log('Location update received:', location);
          setBluedotLocation(location);
        });

        let headingSubscription: null | Promise<ExpoLocation.LocationSubscription> =
          null;
        headingSubscription = ExpoLocation.watchHeadingAsync((h) => {
          if (reportedHeadingObject.current) {
            const diff =
              Math.abs(
                reportedHeadingObject.current.trueHeading - h.trueHeading,
              ) % 360;
            if (
              diff >= 1 &&
              diff <= 359 &&
              reportedHeadingTime.current + 250 < Date.now()
            ) {
              reportedHeadingObject.current = h;
              reportedHeadingTime.current = Date.now();
              setReportedHeading(h);
            }
          } else {
            reportedHeadingObject.current = h;
            setReportedHeading(h);
          }
        });
        headingSubscription.catch((error) => {
          console.error('Heading subscription failed', error);
        });
      }
      return () => {
        if (isListenerSetRef.current) {
          console.log('Removing location listener');
          SmartLocationManager.removeLocationChangedListener();
          isListenerSetRef.current = false;
        }
      };
    }
    setBluedotLocation(undefined);
    setReportedHeading(undefined);

    return () => {
      if (reportedHeadingObject.current) {
        reportedHeadingObject.current = undefined;
      }
    };
  }, [
    hasBluetoothPermission,
    hasLocationPermission,
    isBluetoothEnabled,
    isLocationEnabled,
  ]);

  const bluedotHeading = useMemo<BluedotHeading | undefined>(() => {
    if (!reportedHeading) return undefined;
    return {
      accuracyDeg: headingAccuracyToDeg(reportedHeading.accuracy),
      heading: reportedHeading.trueHeading,
    };
  }, [reportedHeading]);

  const value: UserLocationContextData = useMemo(
    () => ({
      bluedotLocation,
      bluedotHeading,
    }),
    [bluedotLocation, bluedotHeading],
  );

  return (
    <UserLocationContext.Provider value={value}>
      {children}
    </UserLocationContext.Provider>
  );
}

export const useLocation = () => {
  const context = React.useContext(UserLocationContext);

  if (!context) {
    throw new Error(' UserLocation context hook is not used correctly');
  }
  return context;
};
