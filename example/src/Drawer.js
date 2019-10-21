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
        let floorIndex = 2
        this.buildingRef = "building_1_31552752-7d5a-44c6-8206-cd86bd91f7c4"
        this.hasListener = false;
        this.markerMapObject = {
            "latitude": 60.22094105045167,
            "longitude": 24.812373965978622,
            "floorIndex": floorIndex,
            "localRef": "custom_marker_local_ref",
            "buildingRef": this.buildingRef,
            "title": "Custom Marker",
            "properties": {
                "foo": "bar"
            },
        }
        this.mapMarkers = []
        this.markerMapObjects = []
        this.markerData = {
            "type": "FeatureCollection",
            "features": [{
                    "type": "Feature",
                    "properties": {
                        "buildingRef": this.buildingRef,
                        "layerIndex": floorIndex,
                        "localRef": "marker-1",
                        "title": "R&D",
                    },
                    "geometry": {
                        "type": "Point",
                        "coordinates": [24.812336917966604, 60.22097943263401]
                    }
                },
                {
                    "type": "Feature",
                    "properties": {
                        "buildingRef": this.buildingRef,
                        "layerIndex": floorIndex,
                        "localRef": "marker-2",
                        "title": "Meeting Room",
                    },
                    "geometry": {
                        "type": "Point",
                        "coordinates": [24.8124679144, 60.2209838483]
                    }
                },
                {
                    "type": "Feature",
                    "properties": {
                        "buildingRef": this.buildingRef,
                        "layerIndex": floorIndex,
                        "localRef": "marker-3",
                        "title": "Lounge",
                    },
                    "geometry": {
                        "type": "Point",
                        "coordinates": [24.81232250109315, 60.22088118747888]
                    }
                },
            ]
        }
        this.handleGeofenceEntered = this.handleGeofenceEntered.bind(this)
    }

    handleGeofenceEntered(){

    }

    setMapMode(mapMode) {
        this.props.smartMapRef.current.setMapMode(mapMode)
    }

    startUserTask = (userTask) => {
        if (userTask === "poiSelection") {
            let source = "STATIC"
            let localRef = "Kitchen"
            let properties = {
                "title": "R&D"
            }
            //either get by properties or by localRef + buildingRef
            this.props.smartMapRef.current.getMapObjectByProperties(properties, (data) => {
            //this.props.smartMapRef.getMapObject(localRef, this.buildingRef, source, (data) => {
                console.log("data " , data)
                if (data) {
                    let addMarker = true
                    let actionButtonText = "Book a room"
                    let actionButtonIcon = "category_fun"
                    let userTask = {
                        "type": "poiSelection",
                        "payload": {
                            "addMarker": addMarker,
                            "actionButtonText": actionButtonText,
                            "actionButtonIcon": actionButtonIcon,
                            "smartMapObject": data,
                            "shouldAddMarker": true
                        }
                    }
                    this.props.smartMapRef.current.startUserTask(userTask)
                }
            })
        }
    }

    getCurrentUserTask = () => {
        this.props.smartMapRef.current.getCurrentUserTask(this.getUserTaskResponseBlock);
    }

    cancelUserTask = () => {        
        this.props.smartMapRef.current.cancelCurrentUserTask(this.getUserTaskResponseBlock);
    }

    getMapObject = (source) => {
        let localRef = ""
        switch (source) {
            case "STATIC":
                localRef = "Kitchen"
                this.props.smartMapRef.current.getMapObject(localRef, this.buildingRef, source, this.getMapObjectCompletionBlock)
                break;
            case "MARKER":
                localRef = "custom_marker_local_ref"
                this.props.smartMapRef.current.getMapObject(localRef, this.buildingRef, source, this.getMapObjectCompletionBlock)
                break;
            default:
                break;
        }
    }

    getMapObjectByProperties = () => {
        let title = "Lounge"
        let properties = {
            "buildingRef": this.buildingRef,
            "title": title
        }
        this.props.smartMapRef.current.getMapObjectByProperties(properties, this.getMapObjectCompletionBlock)
    }

    getMapObjectCompletionBlock(data) {
        console.log("this.getMapObjectCompletionBlock", data)
    }

    getUserTaskResponseBlock(data) {
        console.log("this.getUserTaskResponseBlock", data);
    }

    setCamera = (type) => {
        let localRef = "Kitchen"
        let cameraOptions = {
            "latitude": 60.220945577091356,
            "longitude": 24.812374723580888,
            "zoomLevel": 17, 
            "bearing": 30,
            "pitch": 45,
            "floorIndex": 2,
            "buildingRef": this.buildingRef

        }
        if (type === "location") {            
            this.props.smartMapRef.current.setCamera(cameraOptions)
        } else if (type === "object") {
            this.props.smartMapRef.current.setCameraToObject(localRef, this.buildingRef, 21, this.cameraCompletionBlock)
        } else if (type === "building") {
            this.props.smartMapRef.current.setCameraToBuildingRef(this.buildingRef, this.cameraCompletionBlock)
        }
    }

    animateCamera(type) {        
        let localRef = "Kitchen"
        let cameraOptions = {
            "latitude": 60.220945577091356,
            "longitude": 24.812374723580888,
            "zoomLevel": 17, 
            "bearing": 30,
            "pitch": 45,
            "floorIndex": 2,
            "buildingRef": this.buildingRef

        }

        if (type === "location") {            
            this.props.smartMapRef.current.animateCamera(cameraOptions)
        } else if (type === "object") {
            this.props.smartMapRef.current.animateCameraToObject(localRef, this.buildingRef, 21, this.cameraCompletionBlock)
        } else if (type === "building") {
            this.props.smartMapRef.current.animateCameraToBuildingRef(this.buildingRef, this.cameraCompletionBlock)
        }
    }

    cameraCompletionBlock(data) {
        console.log("this.cameraCompletionBlock", data)
    }

    addMarker = () => {
        console.log("this.markerMapObject ", this.markerMapObject)
        //Either add the this.markerMapObject without the layout options
        //this.props.smartMapRef.addMarker(this.markerMapObject)
        //or set the layout options.
        this.props.smartMapRef.current.addMarker(this.markerMapObject, "bottom", "category_marker", "#ff2f92", "#fff")
    }

    removeMarker = () => {
        this.props.smartMapRef.current.removeMarker(this.markerMapObject)
    }

    addMarkers = () => {
        
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
        this.props.smartMapRef.current.addMarkers(this.markerMapObjects)
        //this.props.smartMapRef.current.addMarkers(this.markerMapObjects, "bottom", "category_marker_pink", "#ff2f92", "#fff")
    }

    removeMarkers = () => {
        this.props.smartMapRef.current.removeMarkers(this.markerMapObjects)
    }

    removeAllMarkers = () => {
        this.props.smartMapRef.current.removeAllMarkers()
    }

    selectMapObject = () => {
        let mapObject = {
            "localRef": "Kitchen",
            "buildingRef": this.buildingRef
        }
        this.props.smartMapRef.current.selectMapObject(mapObject)
    }

    navigateToLocation() {
        let lon = 24.9616104468
        let lat = 60.183513885
        let layerIndex = 2
        this.props.smartMapRef.current.navigateToLocation(lat, lon, layerIndex)
    }

    addGeofence(){
        let localRef = "R&D"
        if (this.hasListener === false) {
            SmartGeofenceManager.addListener(this.handleGeofenceEntered);
            this.hasListener = true;
        }
        SmartGeofenceManager.addGeofence(localRef, this.buildingRef, (response)=>{
            console.log("response ", response)
        })  
    }

    handleGeofenceEntered(status){
        console.log("handleGeofenceEntered " , status)
    }

    render() {
        return (
            <View
                style={{flex: 1}}>
                <SafeAreaView style={{ flex: 1 }}>
                <ScrollView>
                    <Button
                        title="Set camera location"
                        onPress={() => this.setCamera("location")}
                    />
                    <Button
                        title="Set camera object"
                        onPress={() => this.setCamera("object")}
                    />
                    <Button
                        title="Set camera building"
                        onPress={() => this.setCamera("building")}
                    />
                    <Button
                        title="Animate camera location"
                        onPress={() => this.animateCamera("location")}
                    />
                    <Button
                        title="Animate camera object"
                        onPress={() => this.animateCamera("object")}
                    />
                    <Button
                        title="Animate camera building"
                        onPress={() => this.animateCamera("building")}
                    />
                    <Button
                        title="Add marker"
                        onPress={this.addMarker}
                    />
                     <Button
                        title="Add markers"
                        onPress={this.addMarkers}
                    />
                    <Button
                        title="Remove marker"
                        onPress={this.removeMarker}
                    />
                    <Button
                        title="Remove markers"
                        onPress={this.removeMarkers}
                    />
                    <Button
                        title="Remove all markers"
                        onPress={this.removeAllMarkers}
                    />
                    <Button
                        title="Get map object STATIC"
                        onPress={() => this.getMapObject("STATIC")}
                    />
                    <Button
                        title="Get map object MARKER"
                        onPress={() => this.getMapObject("MARKER")}
                    />
                    <Button
                        title="Get map object by properties"
                        onPress={this.getMapObjectByProperties}
                    />
                    <Button
                        title="Select map object"
                        onPress={this.selectMapObject}
                    />
                    <Button
                        title="Start POI Selection task"
                        onPress={()=>this.startUserTask("poiSelection")}/>
                    <Button
                        title="Cancel current user task"
                        onPress={this.cancelUserTask}/>           
                    <Button
                        title="Add Geofence"
                        onPress={this.addGeofence}/>
                    <Button
                        title="Get current task"
                        onPress={this.getCurrentUserTask}/>    
                </ScrollView>
                </SafeAreaView>
            </View>
            );
        }
};
