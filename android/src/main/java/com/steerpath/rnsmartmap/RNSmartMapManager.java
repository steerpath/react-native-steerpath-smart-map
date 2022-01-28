package com.steerpath.rnsmartmap;

import android.util.Log;

import com.facebook.react.bridge.Callback;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;

import com.facebook.react.bridge.ReadableMap;
import com.facebook.react.bridge.WritableMap;
import com.facebook.react.bridge.WritableNativeMap;
import com.steerpath.smart.SmartSDK;

import org.json.JSONException;
import org.json.JSONObject;

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

        } else if (map.hasKey("configString")) {
            String configString = map.getString("configString");
            if (configString != null) {
                appContext.runOnUiQueueThread(() -> SmartSDK.getInstance().start(appContext, apiKey, configString));
            }
        } else {
            // TODO: throw error
        }
    }

    @ReactMethod
    public void setLiveConfig(ReadableMap map) {
        if (map == null) {
            // Logout and stop LiveService
            appContext.runOnUiQueueThread(() -> SmartSDK.getInstance().setLiveConfiguration(appContext, null));
        } else {
            try {
                JSONObject object = Utils.convertMapToJson(map);
                appContext.runOnUiQueueThread(() -> SmartSDK.getInstance().setLiveConfiguration(appContext, object));
            } catch (JSONException e) {
                Log.e("Error", "Failed to set live configuration for SmartSDK");
            }
        }
    }

    @ReactMethod
    public void fetchVersions(Callback callback) {
        WritableMap map = new WritableNativeMap();
        JSONObject versions = SmartSDK.getVersions();
        try {
            map = Utils.convertJsonToWritableMap(versions);
        } catch (JSONException e) {
            e.printStackTrace();
        }
        callback.invoke(map);
    }
    
    @ReactMethod
    public void setLanguage(String languageCode) {
        appContext.runOnUiQueueThread(() -> SmartSDK.getInstance().setLanguage(languageCode));
    }
}
