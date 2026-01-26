package com.steerpath.rnsmartmap;


import android.util.Log;

import androidx.annotation.NonNull;

import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.WritableMap;
import com.facebook.react.bridge.WritableNativeMap;
import com.facebook.react.modules.core.DeviceEventManagerModule;
import com.steerpath.smart.SmartLocationManager;
import com.steerpath.smart.SmartSDK;
import com.steerpath.smart.listeners.SmartLocationListener;

import javax.annotation.Nonnull;
import javax.annotation.Nullable;

public class RNSmartLocationManager extends ReactContextBaseJavaModule implements SmartLocationListener{

    private final ReactApplicationContext appContext;
    private int listenerCount = 0;
    private static String ON_LOCATION_CHANGED = "locationChanged";

    public RNSmartLocationManager(@Nonnull ReactApplicationContext reactContext) {
        super(reactContext);
        this.appContext = reactContext;
    }

    @NonNull
    @Override
    public String getName() {
        return "RNSmartLocationManager";
    }

    @ReactMethod
    public void addListener(String eventName) {
        if (listenerCount == 0) {
            SmartLocationManager.addLocationListener(this);
        }
        listenerCount++;
    }

    @ReactMethod
    public void removeListeners(Integer count) {
        listenerCount -= count;
        if (listenerCount == 0) {
            SmartLocationManager.removeLocationListener(this);
        }
    }

    @Override
    public void onLocationChanged(double latitude, double longitude, @Nullable String buildingRef, int floorIndex, float accuracyM) {
        WritableNativeMap map = new WritableNativeMap();
        map.putDouble("latitude", latitude);
        map.putDouble("longitude", longitude);
        if (buildingRef == null) {
            map.putNull("buildingRef");
        } else {
            map.putString("buildingRef", buildingRef);
        }
        map.putInt("floorIndex", floorIndex);
        map.putDouble("accuracyM", accuracyM);
        Log.d("RNSmartLocationManager", "lat: " + latitude + ", lon: " + longitude);
        try {
            sendEvent(map);
            Log.d("RNSmartLocationManager", "location sent to JS");
        } catch (Exception e) {
            Log.e("RNSmartLocationManager", "Exception:", e);
        }

    }

    private void sendEvent(@Nullable WritableMap params) {
        getReactApplicationContext()
                .getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter.class)
                .emit(ON_LOCATION_CHANGED, params);
    }
}