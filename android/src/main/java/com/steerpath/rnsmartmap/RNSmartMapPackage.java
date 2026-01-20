package com.steerpath.rnsmartmap;

import android.app.Activity;

import androidx.annotation.NonNull;
import androidx.annotation.Nullable;

import com.facebook.react.BaseReactPackage;
import com.facebook.react.TurboReactPackage;
import com.facebook.react.bridge.NativeModule;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.module.model.ReactModuleInfo;
import com.facebook.react.module.model.ReactModuleInfoProvider;

import java.util.Collections;
import java.util.HashMap;
import java.util.Map;

public class RNSmartMapPackage extends BaseReactPackage {
    public RNSmartMapPackage(Activity activity) {
    } // backwards compatibility

    // Backwards compatibility constructor
    public RNSmartMapPackage(Activity activity) {}
    public RNSmartMapPackage() {}

    /**
     * This handles the Native Modules for the New Architecture (Lazy Loading)
     */
    @Nullable
    @Override
    public NativeModule getModule(String name, ReactApplicationContext reactContext) {
        switch (name) {
            case RNSmartMapManager.NAME:
                return new RNSmartMapManager(reactContext);
            case RNSmartLocationManager.NAME:
                return new RNSmartLocationManager(reactContext);
            default:
                return null;
        }
    }

    @Override
    public ReactModuleInfoProvider getReactModuleInfoProvider() {
        return new ReactModuleInfoProvider() {
            @NonNull
            @Override
            public Map<String, ReactModuleInfo> getReactModuleInfos() {
                Map<String, ReactModuleInfo> map = new HashMap<>();
                map.put(RNSmartMapManager.NAME, new ReactModuleInfo(
                        RNSmartMapManager.NAME,
                        RNSmartMapManager.NAME,
                        false,
                        false,
                        false,
                        true
                ));
                map.put(RNSmartLocationManager.NAME, new ReactModuleInfo(
                        RNSmartLocationManager.NAME,
                        RNSmartLocationManager.NAME,
                        false,
                        false,
                        false,
                        true
                ));
                return map;
            }
        };
    }
}
