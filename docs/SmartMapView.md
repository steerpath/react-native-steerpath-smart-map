
`<SmartMapView />` Component API


### Props

| Props | Type | Default | Platform | Note |
|:------|:-----|:--------|:---------|:-----|
| `apiKey` | `string` | `null` | Web | The api key to initialise the SDK |

### Events

| Event Name | Payload | Platform | Notes |
|:-----------|:--------|:---------|:------|
| `onBottomSheetStateChanged` | `{ state: SmartBottomSheetState }` | iOS/Android/Web | Called when BottomSheet status changes.
| `onMapClicked` | `{ mapObjects: SmartMapObject[] }` | iOS/Android/Web | Callback that is called when user tap on the map, returns a list of tapped map objects. |
| `onMapLoaded` | `void` | iOS/Android/Web | Callback that is called once the map is fully loaded. |
| `onNavigationDestinationReached` | | iOS/Android | Called when destination is reached |
| `onNavigationEnded` | | iOS/Android | Called when navigation ended |
| `onNavigationFailed` | `{ error: NavigationError }` | iOS/Android | Called if navigation fails. |
| `onNavigationPreviewAppeared` | | iOS/Android | Called when navigation preview appeared |
| `onNavigationStarted` | | iOS/Android | Called when navigation started started |
| `onSearchCategorySelected` | `{ searchAction: SearchAction, searchResults: SmartMapObject[] }` | iOS/Android/Web | Called when user selects any search category |
| `onSearchResultSelected` | `{ mapObject: SmartMapObject }` | iOS/Android/Web | Returns a SmartMapObject that is selected in search bottom sheet |
| `onUserFloorChanged` | `{ floorIndex: number; buildingRef?: string }` | iOS/Android | Called after the user moves onto a new floor or building. The ‘buildingRef’ parameter is nil if the user has moved outside of a building. |
| `onUserTaskResponse` | `{ response: SmartMapUserTaskResponse; userTask: SmartMapUserTask }` | iOS/Android | Called when smartmap start a userTask. Whenever the user task is interrupted. The response type will be Cancelled otherwise if it is finished Completed will be returned. After a user task is finished. The map mode will be set to mapOnly. |
| `onVisibleFloorChanged` | `{ floorIndex: number; buildingRef?: string }` | iOS/Android/Web | Called after the visible floor or building on the map has changed. The ‘buildingRef’ parameter is nil if there is no ‘visible’ building. |
| `onViewStatusChanged` | `{ status: SmartMapViewStatus; poiDetail: SmartMapObject }` | iOS/Android | Called when the views of smartMap changed |
  

### Methods
  
| Method Name | Arguments | Platform | Notes |
|:------------|:----------|:---------|:------|
| `addMarker` | `smartMapObj: SmartMapObject, layout: Layout⎮null, iconName: string⎮null, textColor: string⎮null, textHaloColor: string⎮null` | iOS/Android/Web | Adds one marker to the given SmartMapObject location. You can also specify the style the position of the text, icon of the marker and text and text halo color. Use null values to use default values.|
| `addMarkers` | `mapObjectsArray: SmartMapObject[], layout: Layout⎮null, iconName: string⎮null, textColor: string⎮null, textHaloColor: string⎮null` | iOS/Android/Web | Adds one marker to each of the SmartMapObject in the array. You can also specify the style the position of the text, icon of the marker and text and text halo color. Use null values to use default values.|
| `animateCamera` | `{ latitude: number, longitude: number, zoomLevel?: number, bearing?: number, pitch?: number localRef?: string, buildingRef?: string }` | iOS/Android/Web | Animate the camera to a specific point of interest in a particular building. The camera will also change its bearing to the ‘natural orientation’ of the building if one is defined in the map data. |
| `animateCameraToBuildingRef` | `buildingRef: string, callback?: (response: MapResponse) => void` | iOS/Android/Web | Animate the camera to a specific building. |
| `animateCameraToObject` | `localRef: string, buildingRef: string, zoomLevel: number⎮null , callback?: (response: MapResponse) => void` | iOS/Android/Web | Animate the camera to specific point of interest. |
| `cancelCurrentUserTask` | | iOS/Android | Cancel the current user task, if any |
| `getCurrentUserTask` | `callback: (userTaskResponse: SmartMapUserTaskResponse) => any` | iOS/Android | Get the current User Task |
| `getMapObject` | `localRef: string, buildingRef: string, source: SmartObjectSource, callback: (mapObject: SmartMapObject ⎮ null) => void` | iOS/Android/Web | Get SmartMapObject from specified source. Use `STATIC` to get point of interests specified in map data. Returns null if no data is found.|
| `getMapObjectByProperties` | `properties: Record<string, unknown>, callback: (mapObject: SmartMapObject ⎮ null) => void` | iOS/Android/Web | Get SmartMapObject that matches given properties.
| `getWidgetPadding` | `{left, top, right, bottom}` as `numbers` | iOS/Android | get current padding for the map widgets as dp points |
| `onBackPressed` | `callback: (response: boolean) => void;` | Android | Call this to let Android's native map view handle the Android hardware back press. Can be used for example to close opened search bottom sheet.|
| `removeMarker` | `smartMapObj: SmartMapObject` | iOS/Android/Web | Removes single marker from the map. |
| `removeMarkers` | `mapObjectsArray: SmartMapObject[]` | iOS/Android/Web | Removes an array of markers from the map. |
| `removeAllMarkers` | | iOS/Android/Web | Remove all markers from the map |
| `selectMapObject` | `smartMapObj: SmartMapObject` | iOS/Android/Web | Animates map to the selected object, adds marker, opens BottomSheet with object information. |
| `setCamera` | `{ latitude: number, longitude: number, zoomLevel?: number, bearing?: number, pitch?: number localRef?: string, buildingRef?: string }` | iOS/Android/Web | Move the camera to a specific location and change the visible floorIndex of a building. Does not include animation.|
| `setCameraToBuildingRef` | `buildingRef: string, callback?: (response: MapResponse) => void` | iOS/Android/Web | Move the camera to a specific building. Does not include animation.|
| `setCameraToObject` | `localRef: string, buildingRef: string, zoomLevel: number ⎮ null, callback?: (response: MapResponse) => void` | iOS/Android/Web | Move the camera to a specific point of interest. Does not include animation.|
| `setGeoJson` | `sourceId: string, geoJson: Record<string, unknown> ⎮ null, callback: (response: MapResponse) => void` | iOS/Android/Web | Finds GeoJsonSource from the current map style and sets the given GeoJson as its data source. If source is not found, MapResponse.OBJECT_NOT_FOUND will be triggered.|
| `setMapMode` | `mapMode: SmartMapMode` | iOS/Android/Web | Change the map mode of the map view |
| `setWidgetPadding` | `left, top, right, bottom` as `numbers` | iOS/Android/Web | set padding for the map widgets, inputs are treated as dp points |
| `start` | | Android | If your application has more than one screen, it’s recommended to use this with `willFocus` subscription. Without calling `start` and `stop`methods, the app may freeze when navigating away from the map screen. |
| `startUserTask` | `userTask: SmartMapUserTask` | iOS/Android | Starts given UserTask unless some other UserTask is already in progress. Current MapMode will be suspended. |
| `stop` | | Android | If your application has more than one screen, it’s recommended to use this with `willBlur` subscription. Without calling `start` and `stop`methods, the app may freeze when navigating away from the map screen. |


## [Types](https://bitbucket.org/nimbledevices/react-native-steerpath-smartmap/src/master/src/SmartMapViewProps.ts)