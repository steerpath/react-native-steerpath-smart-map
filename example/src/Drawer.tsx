import React, { Component, RefObject } from "react";
import {
  Button,
  Platform,
  SafeAreaView,
  ScrollView,
  Text,
  View,
} from "react-native";

import {
  Layout,
  MapResponse,
  SmartGeofenceManager,
  SmartMapManager,
  SmartMapMode,
  SmartMapObject,
  SmartObjectSource,
  SmartMapUserTaskResponse,
  SmartMapUserTaskType,
  SmartMapViewMethods,
} from "react-native-steerpath-smart-map";

interface Props {
  selectedMapObject: SmartMapObject | null;
  smartMapRef: RefObject<SmartMapViewMethods>;
}

interface State {
  smartSDKVersion: string;
  mapboxSDKVersion: string;
}

const floorIndex = 2;

export default class Drawer extends Component<Props, State> {
  liveEnabled = false;
  buildingRef = "431";
  hasListener = false;
  markerMapObject: SmartMapObject = {
    latitude: 60.22094105045167,
    longitude: 24.812373965978622,
    floorIndex: floorIndex,
    localRef: "custom_marker_local_ref",
    buildingRef: this.buildingRef,
    title: "Custom Marker",
    properties: {
      buildingRef: "",
      css_class: "",
      layerIndex: 1,
      title: "Custom title",
    },
    source: SmartObjectSource.MARKER,
  };
  mapMarkers = [];
  markerMapObjects: SmartMapObject[] = [];
  markerData = {
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
  padding = [];
  mapMode = SmartMapMode.SEARCH;

  constructor(props: Props) {
    super(props);

    this.state = {
      smartSDKVersion: "",
      mapboxSDKVersion: "",
    };
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
          showThisDevice: false,
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

  startUserTask = (userTask: SmartMapUserTaskType) => {
    if (userTask === SmartMapUserTaskType.POI_SELECTION) {
      //either get by properties or by localRef + buildingRef
      this.props.smartMapRef.current?.getMapObjectByProperties(
        { title: "R&D" },
        (data) => {
          console.log("data ", data);
          if (data) {
            let addMarker = true;
            let actionButtonText = "Book a room";
            let actionButtonIcon = "ic_sp_category_fun";
            let userTask = {
              type: SmartMapUserTaskType.POI_SELECTION,
              payload: {
                addMarker: addMarker,
                actionButtonText: actionButtonText,
                actionButtonIcon: actionButtonIcon,
                smartMapObject: data,
                shouldAddMarker: true,
              },
            };
            this.props.smartMapRef.current?.startUserTask(userTask);
          }
        }
      );
    } else {
      console.log("obj", this.props.selectedMapObject);
      if (this.props.selectedMapObject) {
        const userTask = {
          type: SmartMapUserTaskType.NAVIGATION,
          payload: this.props.selectedMapObject,
        };

        this.props.smartMapRef.current?.startUserTask(userTask);
      } else {
        console.log("object is null");
      }
    }
  };

  getCurrentUserTask = () => {
    this.props.smartMapRef.current?.getCurrentUserTask(
      this.getUserTaskResponseBlock
    );
  };

  cancelUserTask = () => {
    this.props.smartMapRef.current?.cancelCurrentUserTask();
  };

  getMapObject = (source: SmartObjectSource) => {
    let localRef = "";
    switch (source) {
      case "STATIC":
        localRef = "R&D";
        this.props.smartMapRef.current?.getMapObject(
          localRef,
          this.buildingRef,
          source,
          this.getMapObjectCompletionBlock
        );
        break;
      case "MARKER":
        localRef = "custom_marker_local_ref";
        this.props.smartMapRef.current?.getMapObject(
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
    this.props.smartMapRef.current?.getMapObjectByProperties(
      properties,
      this.getMapObjectCompletionBlock
    );
  };

  getMapObjectCompletionBlock(mapObject: SmartMapObject | null) {
    console.log("this.getMapObjectCompletionBlock", mapObject);
  }

  getUserTaskResponseBlock(userTaskResponse: SmartMapUserTaskResponse | null) {
    console.log("this.getUserTaskResponseBlock", userTaskResponse);
  }

  setCamera = (type: "location" | "object" | "building") => {
    const localRef = "Mobile development";
    const cameraOptions = {
      latitude: 60.220945577091356,
      longitude: 24.812374723580888,
      zoomLevel: 17,
      bearing: 30,
      pitch: 45,
      floorIndex: 2,
      buildingRef: this.buildingRef,
    };
    if (type === "location") {
      this.props.smartMapRef.current?.setCamera(cameraOptions);
    } else if (type === "object") {
      this.props.smartMapRef.current?.setCameraToObject(
        localRef,
        this.buildingRef,
        21,
        this.cameraCompletionBlock
      );
    } else if (type === "building") {
      this.props.smartMapRef.current?.setCameraToBuildingRef(
        this.buildingRef,
        this.cameraCompletionBlock
      );
    }
  };

  animateCamera = (type: "location" | "object" | "building") => {
    const localRef = "Mobile development";
    const cameraOptions = {
      latitude: 60.220945577091356,
      longitude: 24.812374723580888,
      zoomLevel: 17,
      bearing: 30,
      pitch: 45,
      floorIndex: 2,
      buildingRef: this.buildingRef,
    };

    if (type === "location") {
      this.props.smartMapRef.current?.animateCamera(cameraOptions);
    } else if (type === "object") {
      this.props.smartMapRef.current?.animateCameraToObject(
        localRef,
        this.buildingRef,
        21,
        this.cameraCompletionBlock
      );
    } else if (type === "building") {
      this.props.smartMapRef.current?.animateCameraToBuildingRef(
        this.buildingRef,
        this.cameraCompletionBlock
      );
    }
  };

  cameraCompletionBlock(response: MapResponse) {
    console.log("this.cameraCompletionBlock", response);
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

    this.props.smartMapRef.current?.addMarker(
      this.markerMapObject,
      Layout.BOTTOM,
      markerIcon,
      "#ff2f92",
      "#fff"
    );
  };

  removeMarker = () => {
    this.props.smartMapRef.current?.removeMarker(this.markerMapObject);
  };

  addMarkers = () => {
    for (let i = 0; i < this.markerData.features.length; i++) {
      const eachMarker = this.markerData.features[i];
      const latitude = eachMarker.geometry.coordinates[1];
      const longitude = eachMarker.geometry.coordinates[0];
      const floorIndex = eachMarker.properties.layerIndex;
      const buildingRef = eachMarker.properties.buildingRef;
      const localRef = eachMarker.properties.localRef;
      const title = eachMarker.properties.title;

      const eachSmartObject: SmartMapObject = {
        latitude,
        longitude,
        floorIndex,
        localRef,
        buildingRef,
        title,
        properties: {
          buildingRef: "",
          css_class: "",
          layerIndex: 1,
          title: "Custom title",
        },
        source: SmartObjectSource.MARKER,
      };
      this.markerMapObjects.push(eachSmartObject);
    }
    this.props.smartMapRef.current?.addMarkers(
      this.markerMapObjects,
      Layout.BOTTOM,
      "category_marker_pink",
      "#ff2f92",
      "#fff"
    );
  };

  removeMarkers = () => {
    this.props.smartMapRef.current?.removeMarkers(this.markerMapObjects);
  };

  removeAllMarkers = () => {
    this.props.smartMapRef.current?.removeAllMarkers();
  };

  selectMapObject = () => {
    const mapObject: SmartMapObject = {
      localRef: "Lounge",
      buildingRef: this.buildingRef,
      /* added start */
      latitude: 60.220945577091356,
      longitude: 24.812374723580888,
      floorIndex: 2,
      title: "Custom title",
      properties: {
        buildingRef: "",
        css_class: "",
        layerIndex: 1,
        title: "Custom title",
      },
      source: SmartObjectSource.MARKER,
      /* added end */
    };
    this.props.smartMapRef.current?.selectMapObject(mapObject);
  };

  addGeofence = () => {
    let localRef = "R&D";
    if (this.hasListener === false) {
      SmartGeofenceManager.addListener(this.handleGeofenceEntered);
      this.hasListener = true;
    }
    SmartGeofenceManager.addGeofence(
      localRef,
      this.buildingRef,
      (error, response) => {
        if (error) {
          console.error("ERROR: SmartGeofenceManager.addGeofence", error);
        } else {
          console.log("SmartGeofenceManager.addGeofence", response);
        }
      }
    );
  };

  handleGeofenceEntered = (eventName: string, data: Record<string, string>) => {
    console.log("handleGeofenceEntered ", eventName, data);
  };

  setWidgetPadding = () => {
    this.props.smartMapRef.current?.setWidgetPadding(0, 0, 0, 150);
  };

  getWidgetPadding = () => {
    this.props.smartMapRef.current?.getWidgetPadding((padding) => {
      console.log("getPadding", padding);
    });
  };

  resetWidgetPadding = () => {
    this.props.smartMapRef.current?.setWidgetPadding(0, 0, 0, 0);
  };

  setGeoJson = () => {
    const json = {
      type: "FeatureCollection",
      features: [
        {
          type: "Feature",
          geometry: {
            type: "Point",
            coordinates: [24.8124114, 60.2209866],
          },
          properties: {
            iconImage: "category_marker",
            title: "Mobile development",
            css_class: "",
            localRef: "Mobile development",
            layerIndex: 2,
            buildingRef: "431",
            id: "",
          },
        },
      ],
    };

    console.log("setGeoJson called");
    this.props.smartMapRef.current?.setGeoJson("marker", json, (response) => {
      console.log("setGeoJson", response);
    });
  };

  toggleMapMode = () => {
    if (this.mapMode === SmartMapMode.SEARCH) {
      this.props.smartMapRef.current?.setMapMode(SmartMapMode.MAP_ONLY);
      this.mapMode = SmartMapMode.MAP_ONLY;
    } else {
      this.props.smartMapRef.current?.setMapMode(SmartMapMode.SEARCH);
      this.mapMode = SmartMapMode.SEARCH;
    }
  };

  clearGeoJson = () => {
    this.props.smartMapRef.current?.setGeoJson("marker", null, (response) => {
      console.log("clearGeoJson", response);
    });
  };

  setLanguage = (languageCode: "en-GB" | "fi-FI" | "sv-SE" | "nb-NO") => () => {
    SmartMapManager.setLanguage(languageCode);
  };

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
              onPress={() => this.getMapObject(SmartObjectSource.STATIC)}
            />
            <Button
              title="Get map object MARKER"
              onPress={() => this.getMapObject(SmartObjectSource.MARKER)}
            />
            <Button
              title="Get map object by properties"
              onPress={this.getMapObjectByProperties}
            />
            <Button title="Select map object" onPress={this.selectMapObject} />
            <Button
              title="Start POI Selection task"
              onPress={() =>
                this.startUserTask(SmartMapUserTaskType.POI_SELECTION)
              }
            />
            <Button
              title="Start navigation task"
              onPress={() =>
                this.startUserTask(SmartMapUserTaskType.NAVIGATION)
              }
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
            <Button title="Set English" onPress={this.setLanguage("en-GB")} />
            <Button title="Set Finnish" onPress={this.setLanguage("fi-FI")} />
            <Button title="Set Swedish" onPress={this.setLanguage("sv-SE")} />
            <Button title="Set Norwegian" onPress={this.setLanguage("nb-NO")} />
          </ScrollView>
        </SafeAreaView>
      </View>
    );
  }
}
