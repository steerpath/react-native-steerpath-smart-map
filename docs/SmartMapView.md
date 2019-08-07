`<SmartMapView />` Component API

## Props

| Prop | Type | Default | Platform | Note |
|:---|:---:|:---:|:---:|:------|
| `mapMode` | `mapOnly/static/search` | `search`  | iOS/Android | The Map Mode to display
| `apiKey`  | `string` | `null`| Web | The api key to initialise the SDK

## Events

| Event Name | Returns | Platform | Notes
|:---|:---:|:---:|:------|
| `onMapLoaded` | `void` | iOS/Android | Callback that is called once the map is fully loaded.
| `onMapClicked` | `SmartMapObject[]` | iOS/Android| Callback that is called when user tap on the map, returns a list of tapped map objects.

## Methods

| Method Name | Arguments | Platform | Notes
|:---|:---:|:---:|:------|
| `setCamera` | `CameraPosition` | iOS/Android/Web| Move the camera to a specific location and change the visible floorIndex of a building. Does not include animation. Use `animateCameraToObject` methods if you want the camera transition to be animated
| `animateCameraToObject` | `localRef: string, buildingRef: string, zoomLevel: number | null, callback?: response: MapResponse) => void` | iOS/Android/Web | Animate the camera to a specific point of interest in a particular building. The camera will also change its bearing to the ‘natural orientation’ of the building if one is defined in the map data.
| `addMarker` | `smartMapObj: SmartMapObject, layout: Layout | null, iconName: string | null, textColor: string | null, textHaloColor: string | null` | iOS/Android/Web | Adds one marker to the given SmartMapObject location. You can also specify the style the position of the text, icon of the marker and text and text halo color.
| `removeMarker` | `smartMapObj: SmartMapObject` | iOS/Android/Web | Removes single marker from the map.
| `removeAllMarkers` | | iOS/Android/Web | Remove all markers from the map
| `selectMapObject` | `smartMapObj: SmartMapObject` | iOS/Android/Web | Animates map to the selected object, adds marker, opens BottomSheet with object information.
| `startUserTask` | `userTask: SmartMapUserTask` | iOS/Android | Starts given UserTask unless some other UserTask is already in progress. Current MapMode will be suspended.
| `getCurrentUserTask` | `callback: (userTaskResponse: SmartMapUserTaskResponse) => any` | iOS/Android | Get the current User Task
| `cancelCurrentUserTask` | | iOS/Android | Cancel the current user task, if any


## Types

```
type SmartMapObject {
  latitude: number;
  longitude: number;
  floorIndex: number;
  localRef: string;
  buildingRef: string;
  title: string;
  source: SmartObjectSource;
}

enum SmartObjectSource {
  STATIC = "static",
  MARKER = "marker",
  LIVE = "live"
}

interface CameraPosition {
	latitude: number;
  longitude: number;
  zoomLevel: number;
  bearing?: number;
  pitch?: number;
  floorIndex?: number;
  buildingRef: string;
}

type SmartMapNavigationUserTask = SmartMapObject;

interface SmartMapPOISelectionUserTask extends SmartMapObject {
  shouldAddMarker: boolean;
  actionButtonText: string;
  actionButtonIcon: string;
}

enum SmartMapUserTaskType {
  NAVIGATION = "navigation",
  POI_SELECTION = "poiSelection"
}

interface SmartMapUserTask {
  type: SmartMapUserTaskType;
  payload: SmartMapNavigationUserTask | SmartMapPOISelectionUserTask;
}

```