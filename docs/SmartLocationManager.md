### SmartLocationManager API.

> This API is only available for the Native Platforms

| Function | Arguments | Note |
|:---|:---|:---|
| `addLocationChangedListener` | `listener: (data: { latitude: number, longitude: number, buildingRef: string \| null, floorIndex: number, accuracyM: number }) => void` | Start listening SDK location updates. Remember to call `removeLocationChangedListener` before exiting the app to prevent memory leaks.<br><br>On iOS, it is recommended to delay the call slightly after starting the Smart SDK, otherwise the bluedot may never appear.
| `removeLocationChangedListener` |  | Remove location listener. 
