import React from 'react';
import { createDrawerNavigator, NavigationScreenProp } from 'react-navigation';
import DrawerMenu from '../screens/DrawerMenu';
import MapScreen from '../screens/MapScreen';
import { SmartMapProvider } from '../screens/SmartMapContext';

const MapScreenWithDrawer = createDrawerNavigator(
  {
    MapScreen,
  },
  { contentComponent: DrawerMenu },
);

export function MapScreenWithContext({ navigation }: { navigation: NavigationScreenProp<any> }) {
  return (
    <SmartMapProvider>
      <MapScreenWithDrawer navigation={navigation} />
    </SmartMapProvider>
  );
}

MapScreenWithContext.router = MapScreenWithDrawer.router;
