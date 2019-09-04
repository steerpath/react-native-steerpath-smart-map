package com.steerpath.rnsmartmap;

import com.facebook.react.bridge.Arguments;
import com.facebook.react.bridge.Callback;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.WritableMap;
import com.facebook.react.modules.core.DeviceEventManagerModule;
import com.steerpath.smart.SmartGeofenceManager;
import com.steerpath.smart.listeners.FenceEventListener;

import javax.annotation.Nonnull;
import javax.annotation.Nullable;

public class RNSmartGeofenceManager extends ReactContextBaseJavaModule implements FenceEventListener {

    private final ReactApplicationContext appContext;

    public RNSmartGeofenceManager(@Nonnull ReactApplicationContext reactContext) {
        super(reactContext);
        this.appContext = reactContext;
    }

    @Nonnull
    @Override
    public String getName() {
        return "RNSmartGeofenceManager";
    }

    @ReactMethod
    public void startListening() {
        SmartGeofenceManager.addListener(this);
    }

    @ReactMethod
    public void stopListening() {
        SmartGeofenceManager.removeListener(this);
    }

    @ReactMethod
    public void addGeofence(String localRef, String buildingRef, Callback callback) {
        SmartGeofenceManager.addGeofence(localRef, buildingRef, (String response) -> {
            callback.invoke(null, response);
        });
    }

    @ReactMethod
    public void removeGeofence(String localRef, String buildingRef) {
        SmartGeofenceManager.removeGeofence(localRef, buildingRef);
    }

    @ReactMethod
    public void addBeaconfence(String beaconId, Number radiusInM, Number loiteringDelayInMs, Callback callback) {
        SmartGeofenceManager.addBeaconfence(beaconId, radiusInM.intValue(), loiteringDelayInMs.intValue(), (String response) -> {
            callback.invoke(null, response);
        });
    }

    @ReactMethod
    public void removeBeaconfence(String beaconId) {
        SmartGeofenceManager.removeBeaconfence(beaconId);
    }

    @Override
    public void onGeofenceEnter(String localRef, String buildingRef) {
        WritableMap params = Arguments.createMap();
        params.putString("localRef", localRef);
        params.putString("buildingRef", buildingRef);
        sendEvent(appContext, "GeofenceEntered", params);
    }

    @Override
    public void onGeofenceExit(String localRef, String buildingRef) {
        WritableMap params = Arguments.createMap();
        params.putString("localRef", localRef);
        params.putString("buildingRef", buildingRef);
        sendEvent(appContext, "GeofenceExited", params);
    }

    @Override
    public void onBeaconfenceEnter(String beaconId) {
        WritableMap params = Arguments.createMap();
        params.putString("beaconId", beaconId);
        sendEvent(appContext, "BeaconfenceEntered", params);
    }

    @Override
    public void onBeaconfenceExit(String beaconId) {
        WritableMap params = Arguments.createMap();
        params.putString("beaconId", beaconId);
        sendEvent(appContext, "BeaconfenceExited", params);
    }

    private void sendEvent(ReactContext reactContext,
                           String eventName,
                           @Nullable WritableMap params) {
        reactContext
                .getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter.class)
                .emit(eventName, params);
    }
}
