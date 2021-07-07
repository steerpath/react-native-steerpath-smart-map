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

import com.facebook.react.uimanager.events.RCTEventEmitter;
import com.steerpath.smart.MapMode;
import com.steerpath.smart.SmartMapObject;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.TreeMap;

import javax.annotation.Nonnull;
import javax.annotation.Nullable;

import static com.steerpath.rnsmartmap.RNEventKeys.MAP_CLICKED;
import static com.steerpath.rnsmartmap.RNEventKeys.MAP_LOADED;
import static com.steerpath.rnsmartmap.RNEventKeys.NAVIGATION_DESTINATION_REACHED;
import static com.steerpath.rnsmartmap.RNEventKeys.NAVIGATION_ENDED;
import static com.steerpath.rnsmartmap.RNEventKeys.NAVIGATION_FAILED;
import static com.steerpath.rnsmartmap.RNEventKeys.NAVIGATION_PREVIEW_APPEARED;
import static com.steerpath.rnsmartmap.RNEventKeys.NAVIGATION_STARTED;
import static com.steerpath.rnsmartmap.RNEventKeys.ON_BACK_PRESSED;
import static com.steerpath.rnsmartmap.RNEventKeys.SEARCH_CATEGORY_SELECTED;
import static com.steerpath.rnsmartmap.RNEventKeys.SEARCH_RESULT_SELECTED;
import static com.steerpath.rnsmartmap.RNEventKeys.USER_FLOOR_CHANGED;
import static com.steerpath.rnsmartmap.RNEventKeys.USER_TASK_RESPONSE;
import static com.steerpath.rnsmartmap.RNEventKeys.VIEW_STATUS_CHANGED;
import static com.steerpath.rnsmartmap.RNEventKeys.VISIBLE_FLOOR_CHANGED;
import static com.steerpath.rnsmartmap.RNEventKeys.BOTTOMSHEET_STATE_CHANGED;

public class RNSmartMapViewManager extends ViewGroupManager<RNSmartMapView> {

    private static final int ADD_MARKER = 1;
    private static final int ADD_MARKERS = 2;
    private static final int ANIMATE_CAMERA = 3;
    private static final int CANCEL_CURRENT_USER_TASK = 4;
    private static final int REMOVE_ALL_MARKERS = 5;
    private static final int REMOVE_MARKER = 6;
    private static final int REMOVE_MARKERS = 7;
    private static final int SELECT_MAP_OBJECT = 8;
    private static final int SET_CAMERA = 9;
    private static final int START_USER_TASK = 10;
    private static final int START_MAP = 11;
    private static final int STOP_MAP = 12;
    private static final int SET_MAP_MODE = 13;
    private static final int SET_WIDGET_PADDING = 14;

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

    @Override
    public Map getExportedCustomDirectEventTypeConstants() {
        String registrationName = "registrationName";
        Map<String, Map<String, String>> map = MapBuilder.of(MAP_LOADED, MapBuilder.of(registrationName, MAP_LOADED),
                MAP_CLICKED, MapBuilder.of(registrationName, MAP_CLICKED), SEARCH_RESULT_SELECTED,
                MapBuilder.of(registrationName, SEARCH_RESULT_SELECTED), USER_FLOOR_CHANGED,
                MapBuilder.of(registrationName, USER_FLOOR_CHANGED), VISIBLE_FLOOR_CHANGED,
                MapBuilder.of(registrationName, VISIBLE_FLOOR_CHANGED), USER_TASK_RESPONSE,
                MapBuilder.of(registrationName, USER_TASK_RESPONSE), VIEW_STATUS_CHANGED,
                MapBuilder.of(registrationName, VIEW_STATUS_CHANGED));

        map.putAll(MapBuilder.of(NAVIGATION_FAILED, MapBuilder.of(registrationName, NAVIGATION_FAILED),
                NAVIGATION_ENDED, MapBuilder.of(registrationName, NAVIGATION_ENDED), NAVIGATION_STARTED,
                MapBuilder.of(registrationName, NAVIGATION_STARTED), NAVIGATION_PREVIEW_APPEARED,
                MapBuilder.of(registrationName, NAVIGATION_PREVIEW_APPEARED), NAVIGATION_DESTINATION_REACHED,
                MapBuilder.of(registrationName, NAVIGATION_DESTINATION_REACHED), ON_BACK_PRESSED,
                MapBuilder.of(registrationName, ON_BACK_PRESSED), BOTTOMSHEET_STATE_CHANGED,
                MapBuilder.of(registrationName, BOTTOMSHEET_STATE_CHANGED)));
        
        map.putAll(MapBuilder.of(SEARCH_CATEGORY_SELECTED, MapBuilder.of(registrationName, SEARCH_CATEGORY_SELECTED)));

        return map;
    }

    @Nullable
    @Override
    public Map<String, Integer> getCommandsMap() {
        TreeMap<String, Integer> commands = new TreeMap<>();
        commands.put("addMarker", ADD_MARKER);
        commands.put("addMarkers", ADD_MARKERS);
        commands.put("animateCamera", ANIMATE_CAMERA);
        commands.put("cancelCurrentUserTask", CANCEL_CURRENT_USER_TASK);
        commands.put("removeAllMarkers", REMOVE_ALL_MARKERS);
        commands.put("removeMarker", REMOVE_MARKER);
        commands.put("removeMarkers", REMOVE_MARKERS);
        commands.put("selectMapObject", SELECT_MAP_OBJECT);
        commands.put("setCamera", SET_CAMERA);
        commands.put("startUserTask", START_USER_TASK);
        commands.put("start", START_MAP);
        commands.put("stop", STOP_MAP);
        commands.put("setMapMode", SET_MAP_MODE);
        commands.put("setWidgetPadding", SET_WIDGET_PADDING);
        return commands;
    }

    @Override
    public void receiveCommand(@Nonnull RNSmartMapView mapView, int commandId, @Nullable ReadableArray args) {
        ReadableMap map;
        String buildingRef;
        double lat;
        double lon;
        double zoom;
        double bearing;
        double pitch;
        int floorIndex;

        switch (commandId) {
            case ADD_MARKER:
                map = args.getMap(0);
                String layout = args.getString(1);
                String iconImage = args.getString(2);
                String rgbTextColor = args.getString(3);
                String rgbTextHaloColor = args.getString(4);
                mapView.addMarker(getLatitude(map), getLongitude(map), getFloorIndex(map), getLocalRef(map),
                        getBuildingRef(map), layout, iconImage, rgbTextColor, rgbTextHaloColor);
                break;
            case ADD_MARKERS:
                mapView.addMarkers(generateMapObjectsList(args.getArray(0)), args.getString(1), args.getString(2),
                        args.getString(3), args.getString(4));
                break;
            case ANIMATE_CAMERA:
                Log.d("animateCamera", args.toString());
                lat = args.getDouble(0);
                lon = args.getDouble(1);
                zoom = args.getDouble(2);
                bearing = args.getDouble(3);
                pitch = args.getDouble(4);
                floorIndex = args.getInt(5);
                buildingRef = args.getString(6);
                mapView.animateCamera(lat, lon, zoom, bearing, pitch, floorIndex, buildingRef);
                break;
            case CANCEL_CURRENT_USER_TASK:
                mapView.cancelCurrentUserTask();
                break;
            case REMOVE_ALL_MARKERS:
                mapView.removeAllMarkers();
                break;
            case REMOVE_MARKER:
                map = args.getMap(0);
                mapView.removeMarker(getLatitude(map), getLongitude(map), getFloorIndex(map), getLocalRef(map),
                        getBuildingRef(map));
                break;
            case REMOVE_MARKERS:
                mapView.removeMarkers(generateMapObjectsList(args.getArray(0)));
                break;
            case SELECT_MAP_OBJECT:
                map = args.getMap(0);
                mapView.selectMapObject(getBuildingRef(map), getLocalRef(map));
                break;
            case SET_CAMERA:
                lat = args.getDouble(0);
                lon = args.getDouble(1);
                zoom = args.getDouble(2);
                bearing = args.getDouble(3);
                pitch = args.getDouble(4);
                floorIndex = args.getInt(5);
                buildingRef = args.getString(6);
                mapView.setCamera(lat, lon, zoom, bearing, pitch, floorIndex, buildingRef);
                break;
            case START_USER_TASK:
                map = args.getMap(0);
                ReadableMap payload = map.getMap("payload");
                String taskType = map.getString("type");
                if (taskType.equals("navigation")) {
                    mapView.startNavigationUserTask(getLatitude(payload), getLongitude(payload), getFloorIndex(payload),
                            getLocalRef(payload), getBuildingRef(payload));
                } else if (taskType.equals("poiSelection")) {
                    map = args.getMap(0);
                    payload = map.getMap("payload");
                    ReadableMap mapObject = payload.getMap("smartMapObject");
                    mapView.startPoiSelectionUserTask(getLocalRef(mapObject), getBuildingRef(mapObject),
                            getSource(mapObject), payload.getBoolean("shouldAddMarker"),
                            payload.getString("actionButtonText"), payload.getString("actionButtonIcon"));
                } else {
                    Log.d("ERROR", "Invalid user task type");
                }
                break;
            case START_MAP:
                mapView.getMap().onStart();
                mapView.getMap().onResume();
                break;
            case STOP_MAP:
                mapView.getMap().onPause();
                mapView.getMap().onStop();
                break;
            case SET_MAP_MODE:
                String mapMode = args.getString(0);
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
                break;
            case SET_WIDGET_PADDING:
                if (args != null) {
                    mapView.setWidgetPadding(args.getInt(0), args.getInt(1), args.getInt(2), args.getInt(3));
                } else {
                    Log.w("RnSmartMapView", "No arguments for method setWidgetPadding()");
                }
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

    void sendEvent(ReactContext reactContext, View view, String eventName, @Nullable WritableMap params) {
        reactContext.getJSModule(RCTEventEmitter.class).receiveEvent(view.getId(), eventName, params);
    }

    private List<SmartMapObject> generateMapObjectsList(ReadableArray array) {
        List<SmartMapObject> mapObjects = new ArrayList<>();
        for (int i = 0; i < array.size(); i++) {
            mapObjects.add(generateMapObject(array.getMap(i)));
        }

        return mapObjects;
    }

    private SmartMapObject generateMapObject(ReadableMap map) {
        return new SmartMapObject(getLatitude(map), getLongitude(map), getFloorIndex(map), getLocalRef(map),
                getBuildingRef(map));
    }
}