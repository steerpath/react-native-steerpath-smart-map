import React, {
    Component,
} from "react";
import { Text, View } from 'react-native';
import {
    SafeAreaView,
    ScrollView,
    Button
} from 'react-native';
import {
    SmartObjectSource,
    SmartMapUserTaskType,
    SmartGeofenceManager,
    SmartGeofenceEvent
} from 'react-native-steerpath-smart-map';


export default class Drawer extends Component {
    constructor(props){
        super(props)
        this.mapMarkers = []
        this.markerMapObjects = null
        this.markerData = {
            "type": "FeatureCollection",
            "features": [{
                    "type": "Feature",
                    "properties": {
                        "buildingRef": "347",
                        "layerIndex": 0,
                        "localRef": "marker-1",
                        "title": "Aula",
                    },
                    "geometry": {
                        "type": "Point",
                        "coordinates": [24.961674101650715, 60.18383236766701]
                    }
                },
                {
                    "type": "Feature",
                    "properties": {
                        "buildingRef": "347",
                        "layerIndex": 4,
                        "localRef": "marker-2",
                        "title": "Väläys",
                    },
                    "geometry": {
                        "type": "Point",
                        "coordinates": [
                            24.961444102227688,
                            60.183537464144365
                        ]
                    }
                },
                {
                    "type": "Feature",
                    "properties": {
                        "buildingRef": "347",
                        "layerIndex": 4,
                        "localRef": "marker-3",
                        "title": "Tulostus",
                    },
                    "geometry": {
                        "type": "Point",
                        "coordinates": [
                            24.96144963428378,
                            60.18344477487
                        ]
                    }
                },
            ]
        }
        this.handleGeofenceEntered = this.handleGeofenceEntered.bind(this)
    }

    handleGeofenceEntered(){

    }

    setMapMode(mapMode) {
        this.props.smartMapRef.setMapMode(mapMode)
    }

    startUserTask(userTask) {
        /*
        if (userTask === "POISelectionUserTask") {
            let source = "STATIC"

            //steerpath office
            let buildingRef = "building_1_31552752-7d5a-44c6-8206-cd86bd91f7c4"
            let localRef = "Kitchen"

            this.props.smartMapRef.getMapObject(localRef, buildingRef, source, (data) {
                if (data) {
                    let smartMapObject = data,
                        addMarker = true,
                        actionButtonText = "Show Details",
                        actionButtonIcon = "category_fun"
                    console.log("data ", data)
                    let poiSelectionUserTask = new window.steerpath.POISelectionUserTask(smartMapObject, addMarker, actionButtonText, actionButtonIcon)
                    this.props.smartMapRef.startUserTask(poiSelectionUserTask)
                }
            })
        } else if (userTask === "UserLocationSelectionTask") {
            let actionButtonText = "Set Location"
            let actionTitle = "Set your location"
            let actionDescription = "Move map to set your location"
            let actionButtonIcon = ""
            let userLocationSelectionTask = new window.steerpath.UserLocationSelectionTask(clientMapApiKey, actionButtonText, actionButtonIcon, actionTitle, actionDescription)
            this.props.smartMapRef.startUserTask(userLocationSelectionTask)
        }
        */
    }

    cancelUserTask() {
        this.props.smartMapRef.cancelCurrentUserTask()
    }

    getMapObject(source) {
        let localRef = ""
        let buildingRef = ""
        switch (source) {
            case "STATIC":
                buildingRef = "347"
                localRef = "Terassi"
                this.props.smartMapRef.getMapObject(localRef, buildingRef, source, this.getMapObjectCompletionBlock)
                break;
            case "MARKER":
                localRef = "custom_marker_local_ref"
                buildingRef = "347"
                this.props.smartMapRef.getMapObject(localRef, buildingRef, source, this.getMapObjectCompletionBlock)
                break;
            default:
                break;
        }
    }

    getMapObjectByProperties() {
        //steerpath office
        let buildingRef = "building_1_31552752-7d5a-44c6-8206-cd86bd91f7c4"
        let title = "Lounge"
        let properties = {
            "buildingRef": buildingRef,
            "title": title
        }
        this.props.smartMapRef.getMapObjectByProperties(properties, this.getMapObjectCompletionBlock)
    }

    selectMapObject() {
        //steerpath office
        let buildingRef = "building_1_31552752-7d5a-44c6-8206-cd86bd91f7c4"
        let localRef = "Kitchen"

        this.props.smartMapRef.selectMapObject(localRef, buildingRef)
    }

    getMapObjectCompletionBlock(data) {
        console.log("this.getMapObjectCompletionBlock", data)
        // if (data) {
        //     let smartMapObject = data,
        //         addMarker = true,
        //         actionButtonText = "this.getMapObjectCompletionBlock",
        //         actionButtonIcon = "category_fun"
        //     let poiSelectionUserTask = new window.steerpath.POISelectionUserTask(smartMapObject, addMarker, actionButtonText, actionButtonIcon)
        //     this.props.smartMapRef.startUserTask(poiSelectionUserTask)
        // }
    }

    setCamera(type) {
        if (type === 0) {
            this.props.smartMapRef.setCamera(60.220945577091356, 24.812374723580888, 15)
        } else if (type === 1) {
            this.props.smartMapRef.setCamera(60.220945577091356, 24.812374723580888, 17, 60, 45)
        } else if (type === 2) {
            this.props.smartMapRef.setCamera(60.220945577091356, 24.812374723580888, 19, 0, 45, 2, "building_1_31552752-7d5a-44c6-8206-cd86bd91f7c4")

        } else if (type === 3) {
            let localRef = "Kitchen"
            let building = "building_1_31552752-7d5a-44c6-8206-cd86bd91f7c4"
            this.props.smartMapRef.setCameraToObject(localRef, building, 21, this.cameraCompletionBlock)
        } else if (type === 4) {
            let building = "building_1_31552752-7d5a-44c6-8206-cd86bd91f7c4"
            this.props.smartMapRef.setCameraToBuilding(building, 21, this.cameraCompletionBlock)
        }
    }

    animateCamera(type) {
        if (type === 0) {
            this.props.smartMapRef.animateCamera(60.220945577091356, 24.812374723580888, 15)
        } else if (type === 1) {
            this.props.smartMapRef.animateCamera(60.220945577091356, 24.812374723580888, 17, 0, 0)
        } else if (type === 2) {
            this.props.smartMapRef.animateCamera(60.220945577091356, 24.812374723580888, 19, 60, 45, 2, "building_1_31552752-7d5a-44c6-8206-cd86bd91f7c4")

        } else if (type === 3) {
            let localRef = "Kitchen"
            let building = "building_1_31552752-7d5a-44c6-8206-cd86bd91f7c4"
            this.props.smartMapRef.animateCameraToObject(localRef, building, 21, this.cameraCompletionBlock)

        } else if (type === 4) {
            let building = "building_1_31552752-7d5a-44c6-8206-cd86bd91f7c4"
            this.props.smartMapRef.animateCameraToBuilding(building, 21, this.cameraCompletionBlock)
        }
    }

    cameraCompletionBlock(data) {
        console.log("this.cameraCompletionBlock", data);

    }

    addMarker() {
        let floorIndex = 4
        let latitude = 60.1833570371
        let localRef = "custom_marker_local_ref"
        let longitude = 24.9615011427
        let title = "Custom Marker"
        let buildingRef = "building_1_31552752-7d5a-44c6-8206-cd86bd91f7c4"
        //first create SmartMapObject based on the location, building and floor
        this.markerMapObject = {
            "latitude": latitude,
            "longitude": longitude,
            "floorIndex": floorIndex,
            "localRef": localRef,
            "buildingRef": buildingRef,
            "title": title,
            "properties": {
                "foo": "bar"
            },
        }
        console.log("this.markerMapObject ", this.markerMapObject)
        //Either add the this.markerMapObject without the layout options
        //or set the layout options. Layout options are
        //layout, iconImage, textColor, textHaloColor
        //this.props.smartMapRef.addMarker(this.markerMapObject)
        this.props.smartMapRef.addMarker(this.markerMapObject, "bottom", "category_marker", "#ff2f92", "#fff")
    }

    removeMarker() {
        this.props.smartMapRef.removeMarker(this.markerMapObject)
    }

    addMarkers() {
        
        for (let i = 0; i < this.markerData.features.length; i++) {
            const eachMarker = this.markerData.features[i];

            let latitude = eachMarker.geometry.coordinates[1]
            let longitude = eachMarker.geometry.coordinates[0]
            let floorIndex = eachMarker.properties.layerIndex
            let buildingRef = eachMarker.properties.buildingRef
            let localRef = eachMarker.properties.localRef
            let title = eachMarker.properties.title
            
            let eachSmartObject = {
                "latitude": latitude,
                "longitude": longitude,
                "floorIndex": floorIndex,
                "localRef": localRef,
                "buildingRef": buildingRef,
                "title": title,
                "properties": {
                    "foo": "bar"
                },
            }
            this.markerMapObjects.push(eachSmartObject)
        }
        //this.markerMapObjects
        this.props.smartMapRef.addMarkers(this.markerMapObjects)
        //this.markerMapObjects, layout, iconImage, textColor, textHaloColor
        //this.props.smartMapRef.addMarkers(this.markerMapObjects, "bottom", "category_marker_pink", "#ff2f92", "#fff")
    }

    removeMarkers() {
        this.props.smartMapRef.removeMarkers(this.markerMapObjects)
    }

    removeAllMarkers() {
        this.props.smartMapRef.removeAllMarkers()
    }


    //NAVIGATION METHODS
    navigateToLocation() {
        let lon = 24.9616104468
        let lat = 60.183513885
        let layerIndex = 4
        this.props.smartMapRef.navigateToLocation(lat, lon, layerIndex)
    }




    render() {
        console.log("smartMapRef ", this.props)
        let floorIndex = 2
        let lat = 60.2209793852
        let localRef = "R&D"
        let lon = 24.8123370637
        let title = "Custom Marker"
        let buildingRef = "building_1_31552752-7d5a-44c6-8206-cd86bd91f7c4"
        // let this.markerMapObject = new steerpath.SmartMapObject(lat, lon, floorIndex, buildingRef, localRef, title, {
        //   "foo": "bar"
        // })
        let MAP_OBJECT = {
            title: title,
            floorIndex: floorIndex,
            latitude: lat,
            longitude: lon,
            localRef: localRef,
            buildingRef: buildingRef,
            source: "poi"
        };
        let NAVIGATION_TASK = "NavigationUserTask"
        let POI_SELECTION_TASK = ""
        let hasListener = false;
        return (
            <View
                style={{flex: 1}}>
                <SafeAreaView style={{ flex: 1 }}>
                <ScrollView>
                    <Button
                    title="Set camera to a place"
                    onPress={() => {
                        this.props.smartMapRef &&
                        this.props.smartMapRef.setCamera({
                            latitude: MAP_OBJECT.latitude,
                            longitude: MAP_OBJECT.longitude,
                            zoomLevel: 20,
                            bearing: 0,
                            pitch: 0,
                            floorIndex: MAP_OBJECT.floorIndex,
                            buildingRef: MAP_OBJECT.buildingRef,
                        });
                    }}
                    />
                    <Button
                    title="Add marker"
                    onPress={() => {
                        this.props.smartMapRef && this.props.smartMapRef.addMarker(MAP_OBJECT, null);
                    }}
                    />
                     <Button
                    title="Add markers"
                    onPress={() => {
                        this.props.smartMapRef && this.props.smartMapRef.addMarker(MAP_OBJECT, null);
                    }}
                    />
                    <Button
                    title="Remove marker"
                    onPress={() => {
                        this.props.smartMapRef && this.props.smartMapRef.removeMarker(MAP_OBJECT);
                    }}
                    />
                    <Button
                    title="Remove markers"
                    onPress={() => {
                        this.props.smartMapRef && this.props.smartMapRef.removeMarker(MAP_OBJECT);
                    }}
                    />
                    <Button
                    title="Select dummy map object"
                    onPress={() => {
                        this.props.smartMapRef && this.props.smartMapRef.selectMapObject(MAP_OBJECT);
                    }}
                    />
                    <Button
                    title="Animate to dummy map object"
                    onPress={() => {
                        this.props.smartMapRef && 
                        this.props.smartMapRef.animateCameraToObject(MAP_OBJECT.localRef, MAP_OBJECT.buildingRef, 20, null);
                    }}
                    />
                    <Button
                    title="Start navigation user task"
                    onPress={() => {
                        this.props.smartMapRef && 
                        this.props.smartMapRef.startUserTask(NAVIGATION_TASK);
                    }}
                    />
                    <Button
                    title="Start POI Selection task"
                    onPress={() => {
                        this.props.smartMapRef && this.props.smartMapRef.startUserTask(POI_SELECTION_TASK); 
                    }}/>
                    <Button
                    title="Cancel current user task"
                    onPress={() => {
                        this.props.smartMapRef && this.props.smartMapRef.cancelCurrentUserTask();
                    }}/>
                    <Button
                    title="Add Geofence"
                    onPress={() => {
                        if (!hasListener) {
                        SmartGeofenceManager.addListener(this.handleGeofenceEntered);
                        hasListener = true;
                        }
                        SmartGeofenceManager.addGeofence(MAP_OBJECT.localRef, MAP_OBJECT.buildingRef, function(
                        error,
                        response,
                        ) {
                        alert(response);
                        });
                    }}/>
                    <Button
                        title="Animate camera"
                        onPress={() => {
                        this.props.smartMapRef && this.props.smartMapRef.animateCamera({
                            latitude: MAP_OBJECT.latitude, 
                            longitude: MAP_OBJECT.longitude, 
                            zoomLevel: 20, 
                            bearing: null, 
                            pitch: null, 
                            floorIndex: 2, 
                            buildingRef: MAP_OBJECT.buildingRef,
                        });
                        }
                    }/>
                    <Button
                        title="Animate camera to building ref"
                        onPress={() => {
                        this.props.smartMapRef && this.props.smartMapRef.animateCameraToBuildingRef(MAP_OBJECT.buildingRef, null);
                        }}/>
                    <Button
                        title="Animate camera to object"
                        onPress={() => {
                        this.props.smartMapRef && this.props.smartMapRef.animateCameraToObject(MAP_OBJECT.localRef, MAP_OBJECT.buildingRef, 24, null);
                        }}/>
                    <Button
                        title="Set camera to building ref"
                        onPress={() => {
                        this.props.smartMapRef && this.props.smartMapRef.setCameraToBuildingRef(MAP_OBJECT.buildingRef, null);
                        }}/>
                    <Button
                        title="Set camera to object"
                        onPress={() => {
                        this.props.smartMapRef && this.props.smartMapRef.setCameraToObject(MAP_OBJECT.localRef, MAP_OBJECT.buildingRef, 24, null);
                        }}/>      
                </ScrollView>
                </SafeAreaView>
            </View>
            );
        }
};
