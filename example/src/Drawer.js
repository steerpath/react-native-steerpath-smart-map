import React, { Component } from "react";
import { Text, View } from "react-native";
import { SafeAreaView, ScrollView, Button, Platform } from "react-native";
import {
  SmartGeofenceManager,
  SmartMapManager,
  SmartMapMode,
  SmartMapView,
} from "react-native-steerpath-smart-map";

export default class Drawer extends Component {
  constructor(props) {
    super(props);
    this.liveEnabled = false;
    let floorIndex = 2;
    this.buildingRef = "431";
    this.hasListener = false;
    this.markerMapObject = {
      latitude: 60.22094105045167,
      longitude: 24.812373965978622,
      floorIndex: floorIndex,
      localRef: "custom_marker_local_ref",
      buildingRef: this.buildingRef,
      title: "Custom Marker",
      properties: {
        foo: "bar",
      },
    };
    this.mapMarkers = [];
    this.markerMapObjects = [];
    this.markerData = {
      type: "FeatureCollection",
      features: [
        {
          type: "Feature",
          properties: {
            buildingRef: this.buildingRef,
            layerIndex: floorIndex,
            localRef: "marker-1",
            title: "R&D",
          },
          geometry: {
            type: "Point",
            coordinates: [24.812336917966604, 60.22097943263401],
          },
        },
        {
          type: "Feature",
          properties: {
            buildingRef: this.buildingRef,
            layerIndex: floorIndex,
            localRef: "marker-2",
            title: "Meeting Room",
          },
          geometry: {
            type: "Point",
            coordinates: [24.8124679144, 60.2209838483],
          },
        },
        {
          type: "Feature",
          properties: {
            buildingRef: this.buildingRef,
            layerIndex: floorIndex,
            localRef: "marker-3",
            title: "Lounge",
          },
          geometry: {
            type: "Point",
            coordinates: [24.81232250109315, 60.22088118747888],
          },
        },
      ],
    };
    this.handleGeofenceEntered = this.handleGeofenceEntered.bind(this);
    this.state = {
      smartSDKVersion: "",
      mapboxSDKVersion: "",
    };
    this.padding = [];
    this.mapMode = SmartMapMode.SEARCH;
  }

  componentDidMount() {
    if (Platform.OS !== "web") {
      SmartMapManager.fetchVersions(({ smartSDKVersion, mapboxSDKVersion }) => {
        this.setState({ smartSDKVersion, mapboxSDKVersion });
      });
    }
  }

  startLive() {
    if (this.liveEnabled) {
      SmartMapManager.setLiveConfig(null);
    } else {
      SmartMapManager.setLiveConfig({
        receive: {
          showsThisDevice: false,
          groups: [],
        },
        transmit: {
          id: "Developer123",
          password: "W^3iP!m&GE£dq",
          title: "Developer",
          groups: ["Employees", "Bosses"],
          geofences: {
            neutral: ["Neutral-Area"],
            allowed: ["Allowed-Area"],
            forbidden: ["Forbidden-Area"],
          },
        },
      });
    }

    this.liveEnabled = !this.liveEnabled;
  }

  startUserTask = (userTask) => {
    if (userTask === "poiSelection") {
      let source = "STATIC";
      let localRef = "Kitchen";
      let properties = {
        title: "R&D",
      };
      //either get by properties or by localRef + buildingRef
      this.props.smartMapRef.current.getMapObjectByProperties(
        properties,
        (data) => {
          console.log("data ", data);
          if (data) {
            let addMarker = true;
            let actionButtonText = "Book a room";
            let actionButtonIcon = "ic_sp_category_fun";
            let userTask = {
              type: "poiSelection",
              payload: {
                addMarker: addMarker,
                actionButtonText: actionButtonText,
                actionButtonIcon: actionButtonIcon,
                smartMapObject: data,
                shouldAddMarker: true,
              },
            };
            this.props.smartMapRef.current.startUserTask(userTask);
          }
        }
      );
    } else {
      console.log("obj", this.props.smartMapObject);
      if (this.props.selectMapObject) {
        const userTask = {
          type: "navigation",
          payload: this.props.smartMapObject,
        };

        this.props.smartMapRef.startUserTask(userTask);
      } else {
        console.log("object is null");
      }
    }
  };

  getCurrentUserTask = () => {
    this.props.smartMapRef.current.getCurrentUserTask(
      this.getUserTaskResponseBlock
    );
  };

  cancelUserTask = () => {
    this.props.smartMapRef.current.cancelCurrentUserTask(
      this.getUserTaskResponseBlock
    );
  };

  getMapObject = (source) => {
    let localRef = "";
    switch (source) {
      case "STATIC":
        localRef = "R&D";
        this.props.smartMapRef.current.getMapObject(
          localRef,
          this.buildingRef,
          source,
          this.getMapObjectCompletionBlock
        );
        break;
      case "MARKER":
        localRef = "custom_marker_local_ref";
        this.props.smartMapRef.current.getMapObject(
          localRef,
          this.buildingRef,
          source,
          this.getMapObjectCompletionBlock
        );
        break;
      default:
        break;
    }
  };

  getMapObjectByProperties = () => {
    let title = "Lounge";
    let properties = {
      buildingRef: this.buildingRef,
      title: title,
    };
    this.props.smartMapRef.current.getMapObjectByProperties(
      properties,
      this.getMapObjectCompletionBlock
    );
  };

  getMapObjectCompletionBlock(data) {
    console.log("this.getMapObjectCompletionBlock", data);
  }

  getUserTaskResponseBlock(data) {
    console.log("this.getUserTaskResponseBlock", data);
  }

  setCamera = (type) => {
    let localRef = "Mobile development";
    let cameraOptions = {
      latitude: 60.220945577091356,
      longitude: 24.812374723580888,
      zoomLevel: 17,
      bearing: 30,
      pitch: 45,
      floorIndex: 2,
      buildingRef: this.buildingRef,
    };
    if (type === "location") {
      this.props.smartMapRef.current.setCamera(cameraOptions);
    } else if (type === "object") {
      this.props.smartMapRef.current.setCameraToObject(
        localRef,
        this.buildingRef,
        21,
        this.cameraCompletionBlock
      );
    } else if (type === "building") {
      this.props.smartMapRef.current.setCameraToBuildingRef(
        this.buildingRef,
        this.cameraCompletionBlock
      );
    }
  };

  animateCamera(type) {
    let localRef = "Mobile development";
    let cameraOptions = {
      latitude: 60.220945577091356,
      longitude: 24.812374723580888,
      zoomLevel: 17,
      bearing: 30,
      pitch: 45,
      floorIndex: 2,
      buildingRef: this.buildingRef,
    };

    if (type === "location") {
      this.props.smartMapRef.current.animateCamera(cameraOptions);
    } else if (type === "object") {
      this.props.smartMapRef.current.animateCameraToObject(
        localRef,
        this.buildingRef,
        21,
        this.cameraCompletionBlock
      );
    } else if (type === "building") {
      this.props.smartMapRef.current.animateCameraToBuildingRef(
        this.buildingRef,
        this.cameraCompletionBlock
      );
    }
  }

  cameraCompletionBlock(data) {
    console.log("this.cameraCompletionBlock", data);
  }

  addMarker = () => {
    console.log("this.markerMapObject ", this.markerMapObject);
    //Either add the this.markerMapObject without the layout options
    //this.props.smartMapRef.addMarker(this.markerMapObject)
    //or set the layout options.
    let markerIcon = "category_marker";
    if (Platform.OS === "android") {
      markerIcon = "ic_sp_category_marker";
    }

    this.props.smartMapRef.current.addMarker(
      this.markerMapObject,
      "bottom",
      markerIcon,
      "#ff2f92",
      "#fff"
    );
  };

  removeMarker = () => {
    this.props.smartMapRef.current.removeMarker(this.markerMapObject);
  };

  addMarkers = () => {
    for (let i = 0; i < this.markerData.features.length; i++) {
      const eachMarker = this.markerData.features[i];

      let latitude = eachMarker.geometry.coordinates[1];
      let longitude = eachMarker.geometry.coordinates[0];
      let floorIndex = eachMarker.properties.layerIndex;
      let buildingRef = eachMarker.properties.buildingRef;
      let localRef = eachMarker.properties.localRef;
      let title = eachMarker.properties.title;

      let eachSmartObject = {
        latitude: latitude,
        longitude: longitude,
        floorIndex: floorIndex,
        localRef: localRef,
        buildingRef: buildingRef,
        title: title,
        properties: {
          foo: "bar",
        },
      };
      this.markerMapObjects.push(eachSmartObject);
    }
    this.props.smartMapRef.current.addMarkers(this.markerMapObjects);
    //this.props.smartMapRef.current.addMarkers(this.markerMapObjects, "bottom", "category_marker_pink", "#ff2f92", "#fff")
  };

  removeMarkers = () => {
    this.props.smartMapRef.current.removeMarkers(this.markerMapObjects);
  };

  removeAllMarkers = () => {
    this.props.smartMapRef.current.removeAllMarkers();
  };

  selectMapObject = () => {
    let mapObject = {
      localRef: "Lounge",
      buildingRef: this.buildingRef,
    };
    this.props.smartMapRef.current.selectMapObject(mapObject);
  };

  navigateToLocation() {
    let lon = 24.9616104468;
    let lat = 60.183513885;
    let layerIndex = 2;
    this.props.smartMapRef.current.navigateToLocation(lat, lon, layerIndex);
  }

  addGeofence() {
    let localRef = "R&D";
    if (this.hasListener === false) {
      SmartGeofenceManager.addListener(this.handleGeofenceEntered);
      this.hasListener = true;
    }
    SmartGeofenceManager.addGeofence(localRef, this.buildingRef, (response) => {
      console.log("response ", response);
    });
  }

  handleGeofenceEntered(status) {
    console.log("handleGeofenceEntered ", status);
  }

  setWidgetPadding = () => {
    this.props.smartMapRef.current.setWidgetPadding(0, 0, 0, 150);
  }

  getWidgetPadding = () => {
    this.props.smartMapRef.current.getWidgetPadding((padding) => {
      console.log("getPadding", padding);
    });
  }

  resetWidgetPadding = () => {
    this.props.smartMapRef.current.setWidgetPadding(0, 0, 0, 0);
  }

  setGeoJson = () => {
    const json = {
      "type": "FeatureCollection",
      "features": [
        {
          "type":"Feature",
          "geometry": {
            "type":"Point",
            "coordinates":[24.8124114,60.2209866]
          },
          "properties":{
            "iconImage":"category_marker",
            "title":"Mobile development",
            "css_class":"",
            "localRef":"Mobile development",
            "layerIndex":2,
            "buildingRef":"431",
            "id":""
          }
        }
      ]
    };
    
    console.log('setGeoJson called');
    this.props.smartMapRef.current.setGeoJson('marker', json, (response) => {
      console.log('setGeoJson', response)
    })
  }

  toggleMapMode = () => {
    if (this.mapMode === SmartMapMode.SEARCH) {
      this.props.smartMapRef.current.setMapMode(SmartMapMode.MAP_ONLY);
      this.mapMode = SmartMapMode.MAP_ONLY;
    } else {
      this.props.smartMapRef.current.setMapMode(SmartMapMode.SEARCH);
      this.mapMode = SmartMapMode.SEARCH;
    }
  }

  clearGeoJson = () => {
    this.props.smartMapRef.current.setGeoJson('marker', null, (response) => {
      console.log('clearGeoJson', response)
    })
  }

  setLanguage = (languageCode) => {
    SmartMapManager.setLanguage(languageCode);
  }

  render() {
    return (
      <View style={{ flex: 1 }}>
        <SafeAreaView style={{ flex: 1 }}>
          <ScrollView>
            <View>
              <Text>Smart SDK Version: {this.state.smartSDKVersion}</Text>
              <Text>Mapbox Version: {this.state.mapboxSDKVersion}</Text>
            </View>
            <Button
              title={
                this.liveEnabled ? "Stop Live service" : "Start Live service"
              }
              onPress={() => this.startLive()}
            />
            <Button
              title="Set widget padding"
              onPress={this.setWidgetPadding}
            />
            <Button
              title="Get widget padding"
              onPress={this.getWidgetPadding}
            />
            <Button
              title="Reset widget padding"
              onPress={this.resetWidgetPadding}
            />
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
            <Button title="Add marker" onPress={this.addMarker} />
            <Button title="Add markers" onPress={this.addMarkers} />
            <Button title="Remove marker" onPress={this.removeMarker} />
            <Button title="Remove markers" onPress={this.removeMarkers} />
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
            <Button title="Select map object" onPress={this.selectMapObject} />
            <Button
              title="Start POI Selection task"
              onPress={() => this.startUserTask("poiSelection")}
            />
            <Button
              title="Start navigation task"
              onPress={() => this.startUserTask("navigation")}
            />
            <Button
              title="Cancel current user task"
              onPress={this.cancelUserTask}
            />
            <Button title="Add Geofence" onPress={this.addGeofence} />
            <Button
              title="Get current task"
              onPress={this.getCurrentUserTask}
            />
            <Button title="Set geoJson" onPress={this.setGeoJson} />
            <Button title="Clear geoJson" onPress={this.clearGeoJson} />
            <Button title="Toggle map mode" onPress={this.toggleMapMode} />
            <Button title="Set English" onPress={()=>{this.setLanguage("en-GB")}} />
            <Button title="Set Finnish" onPress={()=>{this.setLanguage("fi-FI")}} />
            <Button title="Set Swedish" onPress={()=>{this.setLanguage("sv-SE")}} />
            <Button title="Set Norwegian" onPress={()=>{this.setLanguage("nb-NO")}} />

          </ScrollView>
        </SafeAreaView>
      </View>
    );
  }
}
