package com.steerpath.rnsmartmap;

import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.WritableArray;
import com.facebook.react.bridge.WritableMap;
import com.facebook.react.bridge.WritableNativeArray;
import com.facebook.react.bridge.WritableNativeMap;
import com.facebook.react.modules.core.DeviceEventManagerModule;
import com.steerpath.smart.SmartMapFragment;
import com.steerpath.smart.SmartMapObject;
import com.steerpath.smart.listeners.MapEventListener;

import java.util.List;

import javax.annotation.Nonnull;
import javax.annotation.Nullable;

public class RNSmartMapEventManager extends ReactContextBaseJavaModule implements MapEventListener {

    private ReactApplicationContext reactContext;

    public RNSmartMapEventManager(@Nonnull ReactApplicationContext reactContext) {
        super(reactContext);
        this.reactContext = reactContext;
    }

    public void setMapEventListener(SmartMapFragment mapFragment) {
        mapFragment.setMapEventListener(this);
    }

    @Nonnull
    @Override
    public String getName() {
        return "RNSmartMapEventManager";
    }

    @Override
    public void onMapLoaded() {
        sendEvent(reactContext, "SPSmartMapLoaded", new WritableNativeMap());
    }

    @Override
    public boolean onMapClick(List<SmartMapObject> mapObjects) {
        if (mapObjects == null || mapObjects.size() == 0) {
            return false;
        }

        WritableArray array = new WritableNativeArray();
        for (SmartMapObject object : mapObjects) {
            WritableMap map = new WritableNativeMap();
            map.putDouble("latitude", object.getLatitude());
            map.putDouble("longitude", object.getLongitude());
            map.putInt("floorIndex", object.getFloorIndex());
            map.putString("localRef", object.getLocalRef());
            map.putString("buildingRef", object.getBuildingRef());
            map.putString("title", object.getTitle());
            map.putString("source", object.getSource());
            array.pushMap(map);
        }
        sendEvent(reactContext, "SPSmartMapLoaded", array);

        return true;
    }

    private void sendEvent(ReactContext reactContext, String eventName, @Nullable WritableMap params) {
        reactContext
                .getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter.class)
                .emit(eventName, params);
    }

    private void sendEvent(ReactContext reactContext, String eventName, @Nullable WritableArray params) {
        reactContext
                .getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter.class)
                .emit(eventName, params);
    }
}
