package com.steerpath.rnsmartmap;

import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;

import com.steerpath.smart.SmartSDK;

import javax.annotation.Nonnull;

public class RNSmartMapManager extends ReactContextBaseJavaModule {

    private final ReactApplicationContext appContext;

    public RNSmartMapManager(@Nonnull ReactApplicationContext reactContext) {
        super(reactContext);
        this.appContext = reactContext;
    }

    @Nonnull
    @Override
    public String getName() {
        return "RNSmartMapManager";
    }

    @ReactMethod
    public void start(String apiKey) {
        appContext.runOnUiQueueThread(() -> SmartSDK.getInstance().start(appContext, apiKey));
    }

    @ReactMethod
    public void startWithConfig(String apiKey, String filePath) {
        File file = new File(filePath);
        appContext.runOnUiQueueThread(() -> SmartSDK.getInstance().start(appContext, apiKey, file));
    }
}
