package com.steerpath.rnsmartmap;

import android.util.Log;
import android.view.Choreographer;
import android.view.View;
import android.view.ViewGroup;
import android.widget.FrameLayout;

import androidx.annotation.NonNull;
import androidx.appcompat.app.AppCompatActivity;

import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContext;
import com.facebook.react.bridge.WritableArray;
import com.facebook.react.bridge.WritableMap;
import com.facebook.react.bridge.WritableNativeArray;
import com.facebook.react.bridge.WritableNativeMap;
import com.facebook.react.uimanager.ThemedReactContext;
import com.steerpath.smart.NavigationUserTask;
import com.steerpath.smart.ObjectSource;
import com.steerpath.smart.POISelectionUserTask;
import com.steerpath.smart.SmartMapFragment;
import com.steerpath.smart.SmartMapObject;
import com.steerpath.smart.UserTask;
import com.steerpath.smart.UserTaskResponse;
import com.steerpath.smart.listeners.MapEventListener;
import com.steerpath.smart.listeners.MapResponseCallback;
import com.steerpath.smart.listeners.NavigationEventListener;
import com.steerpath.smart.listeners.UserTaskListener;
import com.steerpath.smart.listeners.ViewStatusListener;

import java.util.List;

import javax.annotation.Nullable;

import static com.steerpath.rnsmartmap.RNEventKeys.MAP_CLICKED;
import static com.steerpath.rnsmartmap.RNEventKeys.MAP_LOADED;
import static com.steerpath.rnsmartmap.RNEventKeys.NAVIGATION_DESTINATION_REACHED;
import static com.steerpath.rnsmartmap.RNEventKeys.NAVIGATION_ENDED;
import static com.steerpath.rnsmartmap.RNEventKeys.NAVIGATION_FAILED;
import static com.steerpath.rnsmartmap.RNEventKeys.NAVIGATION_PREVIEW_APPEARED;
import static com.steerpath.rnsmartmap.RNEventKeys.NAVIGATION_STARTED;
import static com.steerpath.rnsmartmap.RNEventKeys.USER_FLOOR_CHANGED;
import static com.steerpath.rnsmartmap.RNEventKeys.USER_TASK_RESPONSE;
import static com.steerpath.rnsmartmap.RNEventKeys.VIEW_STATUS_CHANGED;
import static com.steerpath.rnsmartmap.RNEventKeys.VISIBLE_FLOOR_CHANGED;

public class RNSmartMapView extends FrameLayout implements MapEventListener, UserTaskListener, NavigationEventListener, ViewStatusListener {

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
        smartMap.setNavigationEventListener(this);
        smartMap.setUserTaskListener(this);
        smartMap.setViewStatusListener(this);

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

    /** - - - - - MAP EVENTS - - - - -  */

    @Override
    public boolean onMapClick(List<SmartMapObject> mapObjects) {
        if (mapObjects == null) {
            return false;
        }

        WritableArray array = new WritableNativeArray();
        for (SmartMapObject object : mapObjects) {
            array.pushMap(smartMapObjectToWritableMap(object));
        }

        WritableMap map = new WritableNativeMap();
        map.putArray("SmartMapObjects", array);

        manager.sendEvent(reactContext, this, MAP_CLICKED, map);

        return true;
    }

    @Override
    public void onMapLoaded() {
        manager.sendEvent(reactContext, this, MAP_LOADED, new WritableNativeMap());
    }

    @Override
    public void onUserFloorChanged(int floorIndex, String buildingRef) {
        WritableMap map = new WritableNativeMap();
        map.putInt("floorIndex", floorIndex);
        map.putString("buildingRef", buildingRef);

        manager.sendEvent(reactContext, this, USER_FLOOR_CHANGED, map);
    }

    @Override
    public void onVisibleFloorChanged(int floorIndex, String buildingRef) {
        WritableMap map = new WritableNativeMap();
        map.putInt("floorIndex", floorIndex);
        map.putString("buildingRef", buildingRef);

        manager.sendEvent(reactContext, this, VISIBLE_FLOOR_CHANGED, map);
    }

    @Override
    public void onUserTaskResponse(@NonNull UserTask userTask, String s) {
        String response;
        switch (s) {
            case UserTaskResponse.BUSY:
                response = "busy";
                break;
            case UserTaskResponse.ERROR:
                response = "error";
                break;
            case UserTaskResponse.STARTED:
                response = "started";
                break;
            case UserTaskResponse.CANCELLED:
                response = "cancelled";
                break;
            case UserTaskResponse.COMPLETED:
                response = "completed";
                break;
            case UserTaskResponse.UNSUPPORTED:
                response = "unsupported";
                break;
            default:
                response = "unknownUserTaskResponse";
                break;
        }

        WritableMap map = new WritableNativeMap();
        map.putString("response", response);

        WritableMap taskMap = new WritableNativeMap();

        if (userTask instanceof NavigationUserTask) {
            taskMap.putString("type", "navigation");
        } else if (userTask instanceof POISelectionUserTask) {
            taskMap.putString("type", "poiSelection");
        }

        taskMap.putMap("payload", new WritableNativeMap());
        map.putMap("userTask", taskMap);

        manager.sendEvent(reactContext, this, USER_TASK_RESPONSE, map);
    }

    /** - - - - - NAVIGATION EVENTS - - - - - */

    @Override
    public void onNavigationPreviewAppeared() {
        manager.sendEvent(reactContext, this, NAVIGATION_PREVIEW_APPEARED, new WritableNativeMap());
    }

    @Override
    public void onNavigationStarted() {
        manager.sendEvent(reactContext, this, NAVIGATION_STARTED, new WritableNativeMap());
    }

    @Override
    public void onNavigationEnded() {
        manager.sendEvent(reactContext, this, NAVIGATION_ENDED, new WritableNativeMap());
    }

    @Override
    public void onNavigationDestinationReached() {
        manager.sendEvent(reactContext, this, NAVIGATION_DESTINATION_REACHED, new WritableNativeMap());
    }

    @Override
    public void onNavigationFailed(String s) {
        WritableMap map = new WritableNativeMap();
        map.putString("NavigationError", s);
        manager.sendEvent(reactContext, this, NAVIGATION_FAILED, map);
    }

    /** - - - - - VIEW STATUS LISTENER - - - - -  */

    @Override
    public void onViewStatusChanged(String s, SmartMapObject smartMapObject) {
        WritableMap map = new WritableNativeMap();
        map.putString("status", s);
        if (smartMapObject != null) {
            map.putMap("smartMapObject", smartMapObjectToWritableMap(smartMapObject));
        }

        manager.sendEvent(reactContext, this, VIEW_STATUS_CHANGED, map);
    }

    /** - - - - - PUBLIC METHODS - - - - - */

    public void setMapMode(String mapMode) {
        smartMap.setMapMode(mapMode);
    }

    public void setCamera(double latitude, double longitude, double zoomLevel, double bearing, double pitch,
                          int floorIndex, String buildingRef) {
        smartMap.setCamera(latitude, longitude, zoomLevel, bearing, pitch, floorIndex, buildingRef);
    }

    public void addMarker(double lat, double lon, int floorIndex, String localRef, String buildingRef, @Nullable String objectSource, @Nullable String layout, @Nullable String iconImage,
                          @Nullable String rgbTextColor, @Nullable String rgbTextHaloColor) {

        SmartMapObject smartMapObject = new SmartMapObject(lat, lon, floorIndex, localRef, buildingRef);
        if (objectSource != null && objectSource.equals("marker")) {
            smartMapObject.setSource(ObjectSource.MARKER);
        } else {
            smartMapObject.setSource(ObjectSource.STATIC);
        }
        if (layout == null) {
            smartMap.addMarker(smartMapObject);
        } else {
            smartMap.addMarker(smartMapObject, layout, iconImage, rgbTextColor, rgbTextHaloColor);
        }
    }

    public void removeMarker(double lat, double lon, int floorIndex, String localRef, String buildingRef) {
        smartMap.removeMarker(new SmartMapObject(lat, lon, floorIndex, localRef, buildingRef));
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

    public void startNavigationUserTask(double lat, double lon, int floorIndex, String localRef,String buildingRef) {
        smartMap.startUserTask(new NavigationUserTask(new SmartMapObject(lat, lon, floorIndex, localRef, buildingRef)));
    }

    public void startPoiSelectionUserTask(String localRef, String buildingRef, String source, boolean addMarker,
                                          String actionButtonText, int actionButtonIcon) {

        String objectSource;

        if (source.toLowerCase().equals("marker")) {
            objectSource = ObjectSource.MARKER;
        } else {
            objectSource = ObjectSource.STATIC;
        }

        smartMap.getMapObject(localRef, buildingRef, objectSource, (smartMapObject, s) -> {
            if (smartMapObject != null) {
                smartMap.startUserTask(new POISelectionUserTask(smartMapObject, addMarker, actionButtonText, actionButtonIcon));
            }
        });
    }

    /** - - - - - PRIVATE METHODS - - - - - */

    private WritableMap smartMapObjectToWritableMap(SmartMapObject object) {
        WritableMap map = new WritableNativeMap();
        map.putDouble("latitude", object.getLatitude());
        map.putDouble("longitude", object.getLongitude());
        map.putInt("floorIndex", object.getFloorIndex());
        map.putString("localRef", object.getLocalRef());
        map.putString("buildingRef", object.getBuildingRef());
        map.putString("title", object.getTitle());
        map.putString("source", object.getSource());
        return map;
    }
}
