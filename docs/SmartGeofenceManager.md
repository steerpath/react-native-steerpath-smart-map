### SmartGeofenceManager API.

> This API is only available for the Native Platforms

| Function | Arguments | Note |
|:---|:---|:---|:------|
| `addGeofence` | `localRef: string, buildingRef: string, callback: (error: Error, response: SmartGeofenceResponse) => void` | Searches geofence with given localRef and buildingRef, and registers it.
| `removeGeofence` | `localRef: string, buildingRef: string` | Remove the geofence with given localRef and buildingRef
| `addBeaconfence` | `beaconId: string, radius: number, loiteringDelay: number, callback: (error: Error, response: SmartGeofenceResponse) => void` | Searches beaconfence with given localRef and buildingRef, and registers it.
| `removeBeaconfence` | `beaconId: string` | Remove the beaconfence with given beaconId
| `addListener` | `eventName: SmartGeofenceEvent, listener: (data: Record<string, string>) => void` | Add event listener, see below
| `removeListener` | `eventName: SmartGeofenceEvent, listener: (data: Record<string, string>) => void` | Remove event listener, see below

#### Types:

```
enum SmartGeofenceEvent {
  GEOFENCE_ENTERED = "GeofenceEntered",
  GEOFENCE_EXITED = "GeofenceExited",
  BEACONFENCE_ENTERED = "BeaconfenceEntered",
  BEACONFENCE_EXITED = "BeaconfenceExited"
}

```