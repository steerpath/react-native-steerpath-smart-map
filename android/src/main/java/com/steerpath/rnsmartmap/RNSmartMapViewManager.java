package com.steerpath.rnsmartmap;

import android.util.Log;
import android.view.View;

import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContext;
import com.facebook.react.bridge.ReadableArray;
import com.facebook.react.bridge.ReadableMap;
import com.facebook.react.bridge.WritableMap;
import com.facebook.react.common.MapBuilder;
import com.facebook.react.uimanager.ThemedReactContext;
import com.facebook.react.uimanager.ViewGroupManager;
import com.facebook.react.uimanager.annotations.ReactProp;

import com.facebook.react.uimanager.events.RCTEventEmitter;
import com.steerpath.smart.MapMode;
import com.steerpath.smart.SmartMapObject;

import java.util.Map;
import java.util.TreeMap;

import javax.annotation.Nonnull;
import javax.annotation.Nullable;

public class RNSmartMapViewManager extends ViewGroupManager<RNSmartMapView> {

    private static final int SET_CAMERA = 1;
    private static final int ADD_MARKER = 2;
    private static final int REMOVE_MARKER = 3;
    private static final int REMOVE_ALL_MARKERS = 4;
    private static final int SELECT_MAP_OBJECT = 5;
    private static final int ANIMATE_CAMERA_TO_OBJECT = 6;
    private static final int START_USER_TASK = 7;
    private static final int GET_CURRENT_USER_TASK = 9;
    private static final int CANCEL_CURRENT_USER_TASK = 10;

    private static final String REACT_CLASS = "RNSmartMapView";

    @Override
    @Nonnull
    public String getName() {
        return REACT_CLASS;
    }

    private final ReactApplicationContext reactApplicationContext;

    public RNSmartMapViewManager(ReactApplicationContext reactApplicationContext) {
        this.reactApplicationContext = reactApplicationContext;
    }

    @Override
    public RNSmartMapView createViewInstance(ThemedReactContext context) {
        RNSmartMapView smartMapView = new RNSmartMapView(context, reactApplicationContext, this);
        return smartMapView;
    }

    @ReactProp(name = "mapMode")
    public void mapMode(RNSmartMapView mapView, @Nullable String mapMode) {
        switch (mapMode) {
            case "mapOnly":
                mapView.setMapMode(MapMode.MAP_ONLY);
                break;
            case "static":
                mapView.setMapMode(MapMode.STATIC);
                break;
            case "search":
                mapView.setMapMode(MapMode.SEARCH);
                break;
            default:
                break;
        }
    }

    @Override
    public Map getExportedCustomDirectEventTypeConstants() {
        String registrationName = "registrationName";
        Map<String, Map<String, String>> map =  MapBuilder.of(
                "onMapLoaded", MapBuilder.of(registrationName, "onMapLoaded"),
                "onMapClicked", MapBuilder.of(registrationName, "onMapClicked"),
                "onUserFloorChanged", MapBuilder.of(registrationName, "onUserFloorChanged"),
                "onVisibleFloorChanged", MapBuilder.of(registrationName, "onVisibleFloorChanged"),
                "onUserTaskResponse", MapBuilder.of(registrationName, "onUserTaskResponse"),
                "onViewStatusChanged", MapBuilder.of(registrationName, "onViewStatusChanged"),
                "onNavigationFailed", MapBuilder.of(registrationName, "onNavigationFailed")
        );

        map.putAll(MapBuilder.of(
                "onNavigationEnded", MapBuilder.of(registrationName, "onNavigationEnded"),
                "onNavigationStarted", MapBuilder.of(registrationName, "onNavigationStarted"),
                "onNavigationPreviewAppeared", MapBuilder.of(registrationName, "onNavigationPreviewAppeared"),
                "onNavigationDestinationReached", MapBuilder.of(registrationName, "onNavigationDestinationReached")
        ));

        return map;
    }

    @Nullable
    @Override
    public Map<String, Integer> getCommandsMap() {
        TreeMap<String, Integer> commands = new TreeMap<>();
        commands.put("setCamera", SET_CAMERA);
        commands.put("addMarker", ADD_MARKER);
        commands.put("removeMarker", REMOVE_MARKER);
        commands.put("removeAllMarkers", REMOVE_ALL_MARKERS);
        commands.put("selectMapObject", SELECT_MAP_OBJECT);
        commands.put("animateCameraToObject", ANIMATE_CAMERA_TO_OBJECT);
        commands.put("startUserTask", START_USER_TASK);
        commands.put("getCurrentUserTask", GET_CURRENT_USER_TASK);
        commands.put("cancelCurrentUserTask", CANCEL_CURRENT_USER_TASK);
        return commands;
    }

    @Override
    public void receiveCommand(@Nonnull RNSmartMapView mapView, int commandId, @Nullable ReadableArray args) {
        ReadableMap map;
        String buildingRef;
        String localRef;
        double lat;
        double lon;
        double zoom;

        switch (commandId) {
            case SET_CAMERA:
                lat = args.getDouble(0);
                lon = args.getDouble(1);
                zoom = args.getDouble(2);
                double bearing = args.getDouble(3);
                double pitch = args.getDouble(4);
                int floorIndex = args.getInt(5);
                buildingRef = args.getString(6);
                mapView.setCamera(lat, lon, zoom, bearing, pitch, floorIndex, buildingRef);
                break;
            case ADD_MARKER:
                map = args.getMap(0);
                String layout = args.getString(1);
                String iconImage = args.getString(2);
                String rgbTextColor = args.getString(3);
                String rgbTextHaloColor = args.getString(4);
                mapView.addMarker(getLatitude(map), getLongitude(map), getFloorIndex(map), getLocalRef(map), getBuildingRef(map),
                        getSource(map), layout, iconImage, rgbTextColor, rgbTextHaloColor);
                break;
            case REMOVE_MARKER:
                map = args.getMap(0);
                mapView.removeMarker(getLatitude(map), getLongitude(map), getFloorIndex(map), getLocalRef(map), getBuildingRef(map));
                break;
            case REMOVE_ALL_MARKERS:
                mapView.removeAllMarkers();
                break;
            case SELECT_MAP_OBJECT:
                map = args.getMap(0);
                mapView.selectMapObject(getBuildingRef(map), getLocalRef(map));
                break;
            case ANIMATE_CAMERA_TO_OBJECT:
                localRef = args.getString(0);
                buildingRef = args.getString(1);
                zoom = args.getDouble(2);
                mapView.animateCameraToObject(localRef, buildingRef, zoom, s -> {
                    Log.d("Callback", s);
                });
                break;
            case START_USER_TASK:
                map = args.getMap(0);
                ReadableMap payload = map.getMap("payload");
                String taskType = map.getString("type");
                if (taskType.equals("navigation")) {
                    mapView.startNavigationUserTask(getLatitude(payload), getLongitude(payload), getFloorIndex(payload), getLocalRef(payload), getBuildingRef(payload));
                } else if (taskType.equals("poiSelection")) {

                } else {
                    Log.d("ERROR", "Invalid user task type");
                }

                break;
            case GET_CURRENT_USER_TASK:
                break;
            case CANCEL_CURRENT_USER_TASK:
                break;
        }
    }

    private double getLatitude(ReadableMap map) {
        return map.getDouble("latitude");
    }

    private double getLongitude(ReadableMap map) {
        return map.getDouble("longitude");
    }

    private int getFloorIndex(ReadableMap map) {
        return map.getInt("floorIndex");
    }

    private String getBuildingRef(ReadableMap map) {
        return map.getString("buildingRef");
    }

    private String getLocalRef(ReadableMap map) {
        return map.getString("localRef");
    }

    private String getSource(ReadableMap map) {
        return map.getString("source");
    }


    public void sendEvent(ReactContext reactContext, View view, String eventName, @Nullable WritableMap params) {
        reactContext
                .getJSModule(RCTEventEmitter.class)
                .receiveEvent(view.getId(), eventName, params);
    }
}