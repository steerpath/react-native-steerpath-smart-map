package com.steerpath.rnsmartmap;

import android.util.Log;

import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.uimanager.ThemedReactContext;
import com.facebook.react.uimanager.ViewGroupManager;
import com.facebook.react.uimanager.annotations.ReactProp;

import com.steerpath.smart.MapMode;
import com.steerpath.smart.SmartMapFragment;

import javax.annotation.Nullable;

public class RNSmartMapViewManager extends ViewGroupManager<RNSmartMapView> {

    public static final String REACT_CLASS = "RNSmartMapView";
    private SmartMapFragment smartMap;

    @Override
    public String getName() {
        return REACT_CLASS;
    }

    private final ReactApplicationContext reactApplicationContext;

    public RNSmartMapViewManager(ReactApplicationContext reactApplicationContext) {
        this.reactApplicationContext = reactApplicationContext;
    }

    @Override
    public RNSmartMapView createViewInstance(ThemedReactContext context) {
        RNSmartMapView smartMapView = new RNSmartMapView(context);
        smartMap = smartMapView.getSmartMap();
        return smartMapView;
    }

    @ReactProp(name = "mapMode")
    public void mapMode(RNSmartMapView view, @Nullable String mapMode) {
        Log.d("mapMode", mapMode);
        if (smartMap != null) {
            switch (mapMode) {
                case "mapOnly":
                    smartMap.setMapMode(MapMode.MAP_ONLY);
                    break;
                case "static":
                    smartMap.setMapMode(MapMode.STATIC);
                    break;
                case "search":
                    smartMap.setMapMode(MapMode.SEARCH);
                    break;
                default:
                    break;
            }
        }
    }

    @ReactMethod
    public void setCamera(double latitude, double longitude, double zoomLevel, double bearing,
                          double pitch, int floorIndex, String buildingRef) {
        if (smartMap != null) {
            smartMap.setCamera(latitude, longitude, zoomLevel, bearing, pitch, floorIndex, buildingRef);
        }
    }
}