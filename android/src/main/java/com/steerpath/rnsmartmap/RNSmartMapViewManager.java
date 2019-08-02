package com.steerpath.rnsmartmap;

import android.util.Log;
import android.view.ViewGroup;
import android.widget.FrameLayout;
import android.widget.LinearLayout;

import com.facebook.react.ReactActivity;
import com.facebook.react.bridge.LifecycleEventListener;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.uimanager.SimpleViewManager;
import com.facebook.react.uimanager.ThemedReactContext;
import com.facebook.react.uimanager.ViewGroupManager;
import com.facebook.react.uimanager.annotations.ReactProp;

import com.steerpath.smart.SteerpathMapView;

import java.util.ArrayList;
import java.util.List;

import javax.annotation.Nonnull;
import javax.annotation.Nullable;

public class RNSmartMapViewManager extends ViewGroupManager<RNSmartMapView> implements LifecycleEventListener {

    public static final String REACT_CLASS = "RNSmartMapView";

    @Override
    public String getName() {
        return REACT_CLASS;
    }

    private final ReactApplicationContext reactApplicationContext;

    public RNSmartMapViewManager(ReactApplicationContext reactApplicationContext) {
        this.reactApplicationContext = reactApplicationContext;
    }

    private List<SteerpathMapView> mapViews = new ArrayList<>();

    @Override
    public RNSmartMapView createViewInstance(ThemedReactContext context) {
        RNSmartMapView mapView = new RNSmartMapView(context);
        return mapView;
    }

    @Override
    protected void onAfterUpdateTransaction(RNSmartMapView mapView) {
        super.onAfterUpdateTransaction(mapView);

//        mapView.init();
    }

    @ReactProp(name = "mapMode")
    public void setMapMode(RNSmartMapView view, @Nullable String mapMode) {

    }

    @Override
    public void onHostResume() {

    }

    @Override
    public void onHostPause() {

    }

    @Override
    public void onHostDestroy() {

    }
}
