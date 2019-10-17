package com.steerpath.rnsmartmap;

import android.app.Activity;

import androidx.annotation.Nullable;

import com.facebook.react.bridge.Callback;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.ReadableArray;
import com.facebook.react.bridge.ReadableMap;
import com.facebook.react.bridge.ReadableMapKeySetIterator;
import com.facebook.react.uimanager.NativeViewHierarchyManager;
import com.facebook.react.uimanager.UIBlock;
import com.facebook.react.uimanager.UIManagerModule;
import com.steerpath.smart.SmartMapObject;
import com.steerpath.smart.listeners.MapObjectCallback;

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

    public Activity getActivity() {
        return getCurrentActivity();
    }

    @ReactMethod
    public void getMapObject(final int tag, final ReadableArray args, final Callback callback) {
        final ReactApplicationContext context = getReactApplicationContext();
        String localRef = args.getString(0);
        String buildingRef = args.getString(1);
        String source = args.getString(2);

        // TODO parse options
        UIManagerModule uiManager = context.getNativeModule(UIManagerModule.class);
        uiManager.addUIBlock(new UIBlock() {
            @Override
            public void execute(NativeViewHierarchyManager nvhm) {
                RNSmartMapView mapView = (RNSmartMapView) nvhm.resolveView(tag);
                if (mapView == null) {
                    callback.invoke("RNSmartMapView not found");
                    return;
                }

                if (mapView.getMap() == null) {
                    callback.invoke("RNSmartMapView.smartMapFragment is not valid");
                }

                mapView.getMap().getMapObject(localRef, buildingRef, source, new MapObjectCallback() {
                    @Override
                    public void onResponse(@Nullable SmartMapObject smartMapObject, String s) {
                        if (smartMapObject != null) {
                            callback.invoke(mapView.smartMapObjectToWritableMap(smartMapObject), s);
                        } else {
                            callback.invoke(s);
                        }
                    }
                });
            }
        });
    }

    @ReactMethod
    public void getMapObjectByProperties(final int tag, final ReadableMap map, final Callback callback) {
        final ReactApplicationContext context = getReactApplicationContext();

        HashMap<String, String> properties = new HashMap<>();
        ReadableMapKeySetIterator iterator = map.keySetIterator();

        while (iterator.hasNextKey()) {
            String key = iterator.nextKey();
            properties.put(key, map.getString(key));
        }

        UIManagerModule uiManager = context.getNativeModule(UIManagerModule.class);
        uiManager.addUIBlock(new UIBlock() {
            @Override
            public void execute(NativeViewHierarchyManager nvhm) {
                RNSmartMapView mapView = (RNSmartMapView) nvhm.resolveView(tag);
                if (mapView == null) {
                    callback.invoke("RNSmartMapView not found");
                    return;
                }

                if (mapView.getMap() == null) {
                    callback.invoke("RNSmartMapView.smartMapFragment is not valid");
                }

                mapView.getMap().getMapObjectByProperties(properties, new MapObjectCallback() {
                    @Override
                    public void onResponse(@Nullable SmartMapObject smartMapObject, String s) {
                        if (smartMapObject != null) {
                            callback.invoke(mapView.smartMapObjectToWritableMap(smartMapObject), s);
                        } else {
                            callback.invoke(s);
                        }
                    }
                });
            }
        });
    }
}
