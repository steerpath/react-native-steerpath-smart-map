package com.steerpath.rnsmartmap;

import android.util.Log;

import com.facebook.react.bridge.Callback;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.ReadableArray;
import com.facebook.react.bridge.ReadableMap;
import com.facebook.react.bridge.ReadableMapKeySetIterator;
import com.facebook.react.bridge.WritableMap;
import com.facebook.react.bridge.WritableNativeMap;
import com.facebook.react.uimanager.NativeViewHierarchyManager;
import com.facebook.react.uimanager.UIManagerModule;
import com.steerpath.smart.ObjectSource;
import com.steerpath.smart.UserTask;

import org.json.JSONException;
import org.json.JSONObject;

import java.util.HashMap;

import javax.annotation.Nonnull;

public class RNSmartMapModule extends ReactContextBaseJavaModule {

    public static final String NAME = "RNSmartMapModule";

    public RNSmartMapModule(@Nonnull ReactApplicationContext reactContext) {
        super(reactContext);
    }

    @Nonnull
    @Override
    public String getName() {
        return NAME;
    }

    @ReactMethod
    public void getMapObject(final int tag, final ReadableArray args, final Callback callback) {
        String localRef = args.getString(0);
        String buildingRef = args.getString(1);
        String source;

        if (args.getString(2).equals("MARKER")) {
            source = ObjectSource.MARKER;
        } else {
            source = ObjectSource.STATIC;
        }

        getUiManager().addUIBlock(nvhm -> {
            RNSmartMapView mapView = resolveMapView(nvhm, tag, callback);
            if (mapView == null) {
                return;
            }

            mapView.getMap().getMapObject(localRef, buildingRef, source, (smartMapObject, s) -> {
                if (smartMapObject != null) {
                    callback.invoke(mapView.smartMapObjectToWritableMap(smartMapObject, false), s);
                } else {
                    callback.invoke(null, s);
                }
            });
        });
    }

    @ReactMethod
    public void getMapObjectByProperties(final int tag, final ReadableMap map, final Callback callback) {
        HashMap<String, Object> properties = new HashMap<>();
        ReadableMapKeySetIterator iterator = map.keySetIterator();

        while (iterator.hasNextKey()) {
            String key = iterator.nextKey();
            switch (map.getType(key)) {
                case Number:
                    properties.put(key, map.getDouble(key));
                    break;
                case Boolean:
                    properties.put(key, map.getBoolean(key));
                    break;
                case String:
                    properties.put(key, map.getString(key));
                    break;
            }
        }

        getUiManager().addUIBlock(nvhm -> {
            RNSmartMapView mapView = resolveMapView(nvhm, tag, callback);
            if (mapView == null) {
                return;
            }

            mapView.getMap().getMapObjectByProperties(properties, (smartMapObject, s) -> {
                if (smartMapObject != null) {
                    callback.invoke(mapView.smartMapObjectToWritableMap(smartMapObject, false), s);
                } else {
                    callback.invoke(null, s);
                }
            });
        });
    }

    @ReactMethod
    public void animateCameraToObject(final int tag, final ReadableArray args, final Callback callback) {
        String localRef = args.getString(0);
        String buildingRef = args.getString(1);
        double zoom = args.getDouble(2);

        getUiManager().addUIBlock(nvhm -> {
            RNSmartMapView mapView = resolveMapView(nvhm, tag, callback);
            if (mapView == null) {
                return;
            }

            mapView.getMap().animateCameraToObject(localRef, buildingRef, zoom, callback::invoke);
        });
    }

    @ReactMethod
    public void animateCameraToBuildingRef(final int tag, final ReadableArray args, final Callback callback) {
        String buildingRef = args.getString(0);

        getUiManager().addUIBlock(nvhm -> {
            RNSmartMapView mapView = resolveMapView(nvhm, tag, callback);
            if (mapView == null) {
                return;
            }

            mapView.getMap().animateCameraToBuildingRef(buildingRef, callback::invoke);
        });
    }

    @ReactMethod
    public void setCameraToObject(final int tag, final ReadableArray args, final Callback callback) {
        String localRef = args.getString(0);
        String buildingRef = args.getString(1);
        double zoom = args.getDouble(2);

        getUiManager().addUIBlock(nvhm -> {
            RNSmartMapView mapView = resolveMapView(nvhm, tag, callback);
            if (mapView == null) {
                return;
            }

            mapView.getMap().setCameraToObject(localRef, buildingRef, zoom, callback::invoke);
        });
    }

    @ReactMethod
    public void setCameraToBuildingRef(final int tag, final ReadableArray args, final Callback callback) {
        String buildingRef = args.getString(0);

        getUiManager().addUIBlock(nvhm -> {
            RNSmartMapView mapView = resolveMapView(nvhm, tag, callback);
            if (mapView == null) {
                return;
            }

            mapView.getMap().setCameraToBuildingRef(buildingRef, callback::invoke);
        });
    }

    @ReactMethod
    public void getCurrentUserTask(final int tag, final Callback callback) {
        getUiManager().addUIBlock(nvhm -> {
            RNSmartMapView mapView = resolveMapView(nvhm, tag, callback);
            if (mapView == null) {
                return;
            }

            UserTask userTask = mapView.getMap().getCurrentUserTask();

            if (userTask == null) {
                callback.invoke("No active user task available");
            } else {
                // TODO: userTask does not have any getters and I cannot return it to JavaScript
                // side
                callback.invoke(mapView.getMap().getCurrentUserTask());
            }
        });
    }

    @ReactMethod
    public void getWidgetPadding(final int tag, final Callback callback) {
        getUiManager().addUIBlock(nvhm -> {
            RNSmartMapView mapView = resolveMapView(nvhm, tag, callback);
            if (mapView == null) {
                return;
            }

            int[] padding = mapView.getMap().getWidgetPadding();
            WritableMap map = new WritableNativeMap();
            map.putInt("left", padding[0]);
            map.putInt("top", padding[1]);
            map.putInt("right", padding[2]);
            map.putInt("bottom", padding[3]);

            callback.invoke(map);
        });
    }

    @ReactMethod
    public void onBackPressed(final int tag, final Callback callback) {
        getUiManager().addUIBlock(nvhm -> {
            RNSmartMapView mapView = resolveMapView(nvhm, tag, callback);
            if (mapView == null) {
                return;
            }

            if (mapView.getMap() != null) {
                boolean onBackPressed = mapView.getMap().onBackPressed();
                callback.invoke(onBackPressed);
            } else {
                Log.e("ERROR", "Could not complete method call, SmartMap is null");
            }
        });
    }

    @ReactMethod
    public void setGeoJson(final int tag, final ReadableArray args, final Callback callback) {
        getUiManager().addUIBlock(nvhm -> {
            RNSmartMapView mapView = resolveMapView(nvhm, tag, callback);
            if (mapView == null) {
                return;
            }

            if (mapView.getMap() != null) {
                String sourceId = args.getString(0);
                ReadableMap geoJsonMap = args.getMap(1);
                JSONObject geoJson = null;
                if (geoJsonMap != null) {
                    try {
                        geoJson = Utils.convertMapToJson(geoJsonMap);
                    } catch (JSONException e) {
                        e.printStackTrace();
                    }
                }

                mapView.getMap().setGeoJson(sourceId, geoJson, callback::invoke);
            }
        });
    }

    private UIManagerModule getUiManager() {
        final ReactApplicationContext context = getReactApplicationContext();
        return context.getNativeModule(UIManagerModule.class);
    }

    private RNSmartMapView resolveMapView(NativeViewHierarchyManager nvhm, final int tag, final Callback callback) {
        RNSmartMapView mapView = (RNSmartMapView) nvhm.resolveView(tag);
        if (mapView == null) {
            callback.invoke("RNSmartMapView not found");
            return null;
        }

        if (mapView.getMap() == null) {
            callback.invoke("RNSmartMapView.smartMapFragment is not valid");
            return null;
        }

        return mapView;
    }
}
