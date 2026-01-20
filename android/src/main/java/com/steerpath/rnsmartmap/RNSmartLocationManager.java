package com.steerpath.rnsmartmap;

import androidx.annotation.NonNull;
import androidx.annotation.Nullable;

import com.facebook.react.bridge.Arguments;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.WritableMap;
import com.facebook.react.modules.core.DeviceEventManagerModule;
import com.steerpath.smart.SmartLocationManager;
import com.steerpath.smart.listeners.SmartLocationListener;

// This is the generated class from your package.json codegenConfig
import com.steerpath.rnsmartmap.NativeSmartLocationManagerSpec;

public class RNSmartLocationManager extends NativeSmartLocationManagerSpec implements SmartLocationListener {

    public static final String NAME = "RNSmartLocationManager";
    private final ReactApplicationContext appContext;
    private int listenerCount = 0;

    public RNSmartLocationManager(ReactApplicationContext reactContext) {
        super(reactContext);
        this.appContext = reactContext;
    }

    @NonNull
    @Override
    public String getName() {
        return NAME;
    }

    // --- TurboModule Event Methods ---

    @Override
    public void addListener(String eventName) {
        // React Native calls this when the first JS listener is added
        if (listenerCount == 0) {
            // Ensure we are on the main thread for SDK calls
            appContext.runOnUiQueueThread(() ->
                    SmartLocationManager.addLocationListener(this)
            );
        }
        listenerCount++;
    }

    @Override
    public void removeListeners(double count) {
        // Codegen uses 'double' for numeric types from JS
        listenerCount -= (int) count;
        if (listenerCount <= 0) {
            listenerCount = 0;
            appContext.runOnUiQueueThread(() ->
                    SmartLocationManager.removeLocationListener(this)
            );
        }
    }

    // Explicit implementation for start/stop methods from your TS Spec
    @Override
    public void startUpdatingLocation() {
        addListener("locationChanged");
    }

    @Override
    public void stopUpdatingLocation() {
        removeListeners(listenerCount);
    }

    // --- SDK Listener Callback ---

    @Override
    public void onLocationChanged(double latitude, double longitude, @Nullable String buildingRef, int floorIndex, float accuracyM) {
        // Use Arguments.createMap() - the 2026 standard for pool-managed maps
        WritableMap params = Arguments.createMap();
        params.putDouble("latitude", latitude);
        params.putDouble("longitude", longitude);

        if (buildingRef == null) {
            params.putNull("buildingRef");
        } else {
            params.putString("buildingRef", buildingRef);
        }

        params.putInt("floorIndex", floorIndex);
        params.putDouble("accuracyM", (double) accuracyM);

        sendEvent("locationChanged", params);
    }

    private void sendEvent(String eventName, @Nullable WritableMap params) {
        if (appContext.hasActiveReactInstance()) {
            appContext
                    .getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter.class)
                    .emit(eventName, params);
        }
    }
}