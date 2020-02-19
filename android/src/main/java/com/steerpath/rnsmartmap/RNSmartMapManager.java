package com.steerpath.rnsmartmap;

import android.util.Log;

import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;

import com.facebook.react.bridge.ReadableMap;
import com.steerpath.smart.SmartSDK;

import java.io.File;

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
        Log.d("RNSmartMapManager", "start");
        appContext.runOnUiQueueThread(() -> SmartSDK.getInstance().start(appContext, apiKey));
    }

    @ReactMethod
    public void startWithConfig(ReadableMap map) {
        String apiKey = map.getString("apiKey");
        if (map.hasKey("configFilePath")) {
            String filePath = map.getString("configFilePath");
            if (filePath != null) {
                File file = new File(filePath);
                appContext.runOnUiQueueThread(() -> SmartSDK.getInstance().start(appContext, apiKey, file));
            }

        } else if(map.hasKey("configString")) {
            String configString = map.getString("configString");
            if(configString != null) {
                appContext.runOnUiQueueThread(() -> SmartSDK.getInstance().start(appContext, apiKey, configString));
            }
        } else {
            // TODO: throw error
        }

    }
}
