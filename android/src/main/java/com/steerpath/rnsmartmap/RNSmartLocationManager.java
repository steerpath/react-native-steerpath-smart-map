package com.steerpath.rnsmartmap;

import static com.steerpath.rnsmartmap.RNEventKeys.ON_LOCATION_CHANGED;

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
import com.steerpath.smart.listeners.SmartLocationListener;

import javax.annotation.Nonnull;
import javax.annotation.Nullable;

public class RNSmartLocationManager extends ReactContextBaseJavaModule implements SmartLocationListener{

    private final ReactApplicationContext appContext;
    private int listenerCount = 0;

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
        Log.d("LocationManager", "add listener");
        if (listenerCount == 0) {
            SmartLocationManager.addLocationListener(this);
        }
        listenerCount++;
    }

    @ReactMethod
    public void removeListeners(Integer count) {
        Log.d("LocationManager", "remove listener");
        listenerCount -= count;
        if (listenerCount == 0) {
            SmartLocationManager.removeLocationListener(this);
        }
    }

    @Override
    public void onLocationChanged(double latitude, double longitude, @Nullable String buildingRef, int floorIndex) {
        WritableNativeMap map = new WritableNativeMap();
        map.putDouble("latitude", latitude);
        map.putDouble("longitude", longitude);
        if (buildingRef == null) {
            map.putNull("buildingRef");
        } else {
            map.putString("buildingRef", buildingRef);
        }
        map.putInt("floorIndex", floorIndex);
        sendEvent(appContext, ON_LOCATION_CHANGED, map);
    }

    private void sendEvent(ReactContext reactContext,
                           String eventName,
                           @Nullable WritableMap params) {
        reactContext
                .getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter.class)
                .emit(eventName, params);
    }
}
