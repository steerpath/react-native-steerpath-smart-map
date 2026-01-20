package com.steerpath.rnsmartmap;

import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.Callback;
import com.steerpath.smart.SmartSDK;

// This generated class acts as the bridge between both architectures
import com.steerpath.rnsmartmap.NativeSmartMapManagerSpec;

public class RNSmartMapManager extends NativeSmartMapManagerSpec {
    public static final String NAME = "RNSmartMapManager";
    private final ReactApplicationContext appContext;

    public RNSmartMapManager(ReactApplicationContext reactContext) {
        super(reactContext);
        this.appContext = reactContext;
    }

    @Override
    public String getName() {
        return NAME;
    }

    // --- SHARED METHODS ---
    // These are called by JSI in New Arch and by the Bridge in Old Arch

    @Override
    public void start(String apiKey) {
        SmartSDK.getInstance().start(appContext, apiKey);
    }

    @Override
    public void fetchVersions(Callback callback) {
        String version = SmartSDK.getVersions().optString("smartSDKVersion", "Unknown");
        callback.invoke(version);
    }

    // ... other methods follow the same pattern
}