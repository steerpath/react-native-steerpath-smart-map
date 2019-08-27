package com.steerpath.rnsmartmap;

import android.util.Log;
import android.view.Choreographer;
import android.view.View;
import android.view.ViewGroup;
import android.widget.FrameLayout;

import androidx.appcompat.app.AppCompatActivity;

import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContext;
import com.facebook.react.bridge.WritableArray;
import com.facebook.react.bridge.WritableMap;
import com.facebook.react.bridge.WritableNativeArray;
import com.facebook.react.bridge.WritableNativeMap;
import com.facebook.react.uimanager.ThemedReactContext;
import com.mapbox.geojson.FeatureCollection;
import com.steerpath.smart.ObjectSource;
import com.steerpath.smart.SmartMapFragment;
import com.steerpath.smart.SmartMapObject;
import com.steerpath.smart.listeners.MapEventListener;
import com.steerpath.smart.listeners.MapResponseCallback;

import java.util.List;

public class RNSmartMapView extends FrameLayout implements MapEventListener {

    private SmartMapFragment smartMap;
    private ReactContext reactContext;
    private RNSmartMapViewManager manager;

    public RNSmartMapView(ThemedReactContext context, ReactApplicationContext reactApplicationContext,
                          RNSmartMapViewManager mapViewManager) {
        super(context);


        SmartMapFragment fragment = SmartMapFragment.newInstance();
        this.reactContext = reactApplicationContext;
        this.manager = mapViewManager;

        this.smartMap = fragment;
        smartMap.setMapEventListener(this);
        AppCompatActivity activity = (AppCompatActivity) context.getCurrentActivity();

        activity.getSupportFragmentManager()
                .beginTransaction()
                .add(fragment, "tag")
                .commit();

        activity.getSupportFragmentManager().executePendingTransactions();
        fragment.setCameraToBuildingRef("67", null);
        addView(fragment.getView(), ViewGroup.LayoutParams.MATCH_PARENT);

        drawChildViews();

    }

    private void drawChildViews() {
        Choreographer.getInstance().postFrameCallback(new Choreographer.FrameCallback() {
            @Override
            public void doFrame(long l) {
                for (int i = 0; i < RNSmartMapView.this.getChildCount(); i++) {
                    View child = RNSmartMapView.this.getChildAt(i);
                    child.measure(MeasureSpec.makeMeasureSpec(RNSmartMapView.this.getMeasuredWidth(), MeasureSpec.EXACTLY),
                            MeasureSpec.makeMeasureSpec(RNSmartMapView.this.getMeasuredHeight(), MeasureSpec.EXACTLY));
                    child.layout(0, 0, child.getMeasuredWidth(), child.getMeasuredHeight());

                    RNSmartMapView.this.getViewTreeObserver().dispatchOnGlobalLayout();
                    Choreographer.getInstance().postFrameCallback(this);
                }
            }
        });
    }

    // MapEventListener CALLBACKS

    @Override
    public boolean onMapClick(List<SmartMapObject> mapObjects) {
        if (mapObjects == null) {
            return false;
        }

        WritableArray array = new WritableNativeArray();
        for (SmartMapObject object : mapObjects) {
            WritableMap map = new WritableNativeMap();
            map.putDouble("latitude", object.getLatitude());
            map.putDouble("longitude", object.getLongitude());
            map.putInt("floorIndex", object.getFloorIndex());
            map.putString("localRef", object.getLocalRef());
            map.putString("buildingRef", object.getBuildingRef());
            map.putString("title", object.getTitle());
            map.putString("source", object.getSource());
            array.pushMap(map);
        }
        manager.sendEvent(reactContext, this, "onMapClicked", array);
        return true;
    }

    @Override
    public void onMapLoaded() {
        manager.sendEvent(reactContext, this, "onMapLoaded", new WritableNativeMap());
    }

    @Override
    public void onUserFloorChanged(int floorIndex, String buildingRef) {

    }

    public void onVisibleFloorChanged(int floorIndex, String buildingRef) {

    }

    // PUBLIC METHODS

    public void setMapMode(String mapMode) {
        smartMap.setMapMode(mapMode);
    }

    public void setCamera(double latitude, double longitude, double zoomLevel, double bearing, double pitch,
                          int floorIndex, String buildingRef) {
        smartMap.setCamera(latitude, longitude, zoomLevel, bearing, pitch, floorIndex, buildingRef);
    }

    public void addMarker(String source, String buildingRef, String localRef, String layout, String iconImage,
                          String rgbTextColor, String rgbTextHaloColor) {

        @ObjectSource String objectSource;
        if (source.equals("marker")) {
            objectSource = ObjectSource.MARKER;
        } else {
            objectSource = ObjectSource.STATIC;
        }

        smartMap.getMapObject(localRef, buildingRef, objectSource, (smartMapObject, response) -> {
            if (smartMapObject != null ) {
                if (layout == null) {
                    smartMap.addMarker(smartMapObject);
                } else {
                    smartMap.addMarker(smartMapObject, layout, iconImage, rgbTextColor, rgbTextHaloColor);
                }
            } else {
                Log.e("RNSmartMapView", "Cannot add marker. " + response);
            }
        });
    }

    public void removeMarker(String source, String buildingRef, String localRef) {
        smartMap.getMapObject(localRef, buildingRef, source, (smartMapObject, response) -> {
            if (smartMapObject != null) {
                smartMap.removeMarker(smartMapObject);
            } else {
                Log.e("RNSmartMapView", "Cannot remove marker. " + response);
            }
        });
    }

    public void removeAllMarkers() {
        smartMap.removeAllMarkers();
    }

    public void selectMapObject(String buildingRef, String localRef) {
        smartMap.selectMapObject(localRef, buildingRef);
    }

    public void animateCameraToObject(String localRef, String buildingRef, double zoom, MapResponseCallback callback) {
        smartMap.animateCameraToObject(localRef, buildingRef, zoom, callback);
    }
}
