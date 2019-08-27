package com.steerpath.rnsmartmap;

import android.util.Log;

import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReadableArray;
import com.facebook.react.bridge.ReadableMap;
import com.facebook.react.uimanager.ThemedReactContext;
import com.facebook.react.uimanager.ViewGroupManager;
import com.facebook.react.uimanager.annotations.ReactProp;

import com.steerpath.smart.MapMode;

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

    public static final String REACT_CLASS = "RNSmartMapView";

    @Override
    public String getName() {
        return REACT_CLASS;
    }

    private final ReactApplicationContext reactApplicationContext;

    public RNSmartMapViewManager(ReactApplicationContext reactApplicationContext) {
        this.reactApplicationContext = reactApplicationContext;
    }

    @Override
    public RNSmartMapView createViewInstance(ThemedReactContext context) {
        RNSmartMapView smartMapView = new RNSmartMapView(context);
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

        switch (commandId) {
            case SET_CAMERA:
                double lat = args.getDouble(0);
                double lon = args.getDouble(1);
                double zoom = args.getDouble(2);
                double bearing = args.getDouble(3);
                double pitch = args.getDouble(4);
                int floorIndex = args.getInt(5);
                String buildingRef = args.getString(6);
                mapView.setCamera(lat, lon, zoom, bearing, pitch, floorIndex, buildingRef);
                break;
            case ADD_MARKER:
                map = args.getMap(0);
                String layout = args.getString(1);
                String iconImage = args.getString(2);
                String rgbTextColor = args.getString(3);
                String rgbTextHaloColor = args.getString(4);
                mapView.addMarker(getSource(map), getBuildingRef(map), getLocalRef(map), layout, iconImage, rgbTextColor, rgbTextHaloColor);
                break;
            case REMOVE_MARKER:
                map = args.getMap(0);
                mapView.removeMarker(getSource(map), getBuildingRef(map), getLocalRef(map));
                break;
            case REMOVE_ALL_MARKERS:
                mapView.removeAllMarkers();
                break;
            case SELECT_MAP_OBJECT:
                map = args.getMap(0);
                mapView.selectMapObject(getBuildingRef(map), getLocalRef(map));
                break;
            case ANIMATE_CAMERA_TO_OBJECT:
                Log.d("AnimateCamera", "" + args);
                break;
        }
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
}