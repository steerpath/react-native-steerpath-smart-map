package com.steerpath.rnsmartmap;

import android.app.Activity;

import com.facebook.react.ReactPackage;
import com.facebook.react.bridge.NativeModule;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.uimanager.ViewManager;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

public class RNSmartMapPackage implements ReactPackage {
    public RNSmartMapPackage(Activity activity) {
    } // backwards compatibility

    public RNSmartMapPackage() {}

    @Override
    public List<ViewManager> createViewManagers(ReactApplicationContext reactContext) {
        return Arrays.<ViewManager>asList(
                new RNSmartMapViewManager(reactContext)
        );
    }

    @Override
    public List<NativeModule> createNativeModules(
            ReactApplicationContext reactContext) {
        List<NativeModule> modules = new ArrayList<>();

        modules.add(new RNSmartMapManager(reactContext));
        modules.add(new RNSmartGeofenceManager(reactContext));
        modules.add(new RNSmartMapModule(reactContext));
        return modules;
    }
}
