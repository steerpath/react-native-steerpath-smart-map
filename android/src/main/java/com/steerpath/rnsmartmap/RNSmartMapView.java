package com.steerpath.rnsmartmap;

import android.util.Log;
import android.view.Choreographer;
import android.view.View;
import android.view.ViewGroup;
import android.widget.FrameLayout;

import androidx.activity.OnBackPressedCallback;
import androidx.annotation.NonNull;
import androidx.appcompat.app.AppCompatActivity;

import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContext;
import com.facebook.react.bridge.WritableArray;
import com.facebook.react.bridge.WritableMap;
import com.facebook.react.bridge.WritableNativeArray;
import com.facebook.react.bridge.WritableNativeMap;
import com.facebook.react.uimanager.ThemedReactContext;
import com.steerpath.smart.BottomSheetViewState;
import com.steerpath.smart.Layout;
import com.steerpath.smart.NavigationError;
import com.steerpath.smart.NavigationUserTask;
import com.steerpath.smart.ObjectSource;
import com.steerpath.smart.POISelectionUserTask;
import com.steerpath.smart.SmartMapFragment;
import com.steerpath.smart.SmartMapObject;
import com.steerpath.smart.UserTask;
import com.steerpath.smart.UserTaskResponse;
import com.steerpath.smart.ViewStatus;
import com.steerpath.smart.listeners.MapEventListener;
import com.steerpath.smart.listeners.NavigationEventListener;
import com.steerpath.smart.listeners.UserTaskListener;
import com.steerpath.smart.listeners.ViewStatusListener;

import org.json.JSONException;
import org.json.JSONObject;

import java.util.ArrayList;
import java.util.List;

import javax.annotation.Nullable;

import static com.steerpath.rnsmartmap.RNEventKeys.BOTTOMSHEET_STATE_CHANGED;
import static com.steerpath.rnsmartmap.RNEventKeys.MAP_CLICKED;
import static com.steerpath.rnsmartmap.RNEventKeys.MAP_LOADED;
import static com.steerpath.rnsmartmap.RNEventKeys.NAVIGATION_DESTINATION_REACHED;
import static com.steerpath.rnsmartmap.RNEventKeys.NAVIGATION_ENDED;
import static com.steerpath.rnsmartmap.RNEventKeys.NAVIGATION_FAILED;
import static com.steerpath.rnsmartmap.RNEventKeys.NAVIGATION_PREVIEW_APPEARED;
import static com.steerpath.rnsmartmap.RNEventKeys.NAVIGATION_STARTED;
import static com.steerpath.rnsmartmap.RNEventKeys.ON_BACK_PRESSED;
import static com.steerpath.rnsmartmap.RNEventKeys.SEARCH_CATEGORY_SELECTED;
import static com.steerpath.rnsmartmap.RNEventKeys.SEARCH_RESULT_SELECTED;
import static com.steerpath.rnsmartmap.RNEventKeys.USER_FLOOR_CHANGED;
import static com.steerpath.rnsmartmap.RNEventKeys.USER_TASK_RESPONSE;
import static com.steerpath.rnsmartmap.RNEventKeys.VIEW_STATUS_CHANGED;
import static com.steerpath.rnsmartmap.RNEventKeys.VISIBLE_FLOOR_CHANGED;
import static com.steerpath.rnsmartmap.Utils.convertJsonToWritableMap;

public class RNSmartMapView extends FrameLayout
        implements MapEventListener, UserTaskListener, NavigationEventListener, ViewStatusListener {

    private SmartMapFragment smartMap;
    private ReactContext reactContext;
    private RNSmartMapViewManager manager;
    private ArrayList<String> addedIcons = new ArrayList<>();

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

        OnBackPressedCallback onBackPressedCallback = new OnBackPressedCallback(true) {
            @Override
            public void handleOnBackPressed() {
                WritableMap map = new WritableNativeMap();
                map.putBoolean("smartMapBackPressed", smartMap.onBackPressed());
                manager.sendEvent(reactContext, RNSmartMapView.this, ON_BACK_PRESSED, map);
            }
        };

        AppCompatActivity activity = (AppCompatActivity) context.getCurrentActivity();
        activity.getSupportFragmentManager().beginTransaction().add(fragment, "tag").commit();

        activity.getSupportFragmentManager().executePendingTransactions();
        activity.getOnBackPressedDispatcher().addCallback(onBackPressedCallback);
        addView(fragment.getView(), ViewGroup.LayoutParams.MATCH_PARENT);

        drawChildViews();
    }

    private void drawChildViews() {
        Choreographer.getInstance().postFrameCallback(new Choreographer.FrameCallback() {
            @Override
            public void doFrame(long l) {
                for (int i = 0; i < RNSmartMapView.this.getChildCount(); i++) {
                    View child = RNSmartMapView.this.getChildAt(i);
                    child.measure(
                            MeasureSpec.makeMeasureSpec(RNSmartMapView.this.getMeasuredWidth(), MeasureSpec.EXACTLY),
                            MeasureSpec.makeMeasureSpec(RNSmartMapView.this.getMeasuredHeight(), MeasureSpec.EXACTLY));
                    child.layout(0, 0, child.getMeasuredWidth(), child.getMeasuredHeight());

                    RNSmartMapView.this.getViewTreeObserver().dispatchOnGlobalLayout();
                    Choreographer.getInstance().postFrameCallback(this);
                }
            }
        });
    }

    SmartMapFragment getMap() {
        return smartMap;
    }

    /**
     * - - - - - MAP EVENTS - - - - -
     */

    @Override
    public boolean onMapClick(List<SmartMapObject> mapObjects) {
        WritableArray array = new WritableNativeArray();

        for (SmartMapObject object : mapObjects) {
            array.pushMap(smartMapObjectToWritableMap(object, false));
        }

        WritableMap map = new WritableNativeMap();
        map.putArray("mapObjects", array);

        manager.sendEvent(reactContext, this, MAP_CLICKED, map);
        return true;
    }

    @Override
    public boolean onSearchResultSelected(SmartMapObject mapObject) {
        WritableMap map = new WritableNativeMap();
        map.putMap("mapObject", smartMapObjectToWritableMap(mapObject, true));
        manager.sendEvent(reactContext, this, SEARCH_RESULT_SELECTED, map);
        return true;
    }

    @Override
    public void onSearchCategorySelected(JSONObject searchAction, List<SmartMapObject> searchResults) {
        WritableMap payload = new WritableNativeMap();
        WritableMap action = new WritableNativeMap();
        try {
           action = convertJsonToWritableMap(searchAction);
        } catch (JSONException e) {
            e.printStackTrace();
        }
        payload.putMap("searchAction", action);
        WritableNativeArray list = new WritableNativeArray();
        for (SmartMapObject obj : searchResults) {
            list.pushMap(smartMapObjectToWritableMap(obj, true));
        }

        payload.putArray("searchResults", list);
        manager.sendEvent(reactContext, this, SEARCH_CATEGORY_SELECTED, payload);
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
            taskMap.putMap("payload",
                    smartMapObjectToWritableMap(((NavigationUserTask) userTask).getMapObjects().get(0), false));
        } else if (userTask instanceof POISelectionUserTask) {
            taskMap.putString("type", "poiSelection");
            WritableMap payload = new WritableNativeMap();
            payload.putMap("smartMapObject",
                    smartMapObjectToWritableMap(((POISelectionUserTask) userTask).getMapObject(), false));
            taskMap.putMap("payload", payload);
        }

        Log.d("nativeTask", "" + taskMap);
        map.putMap("userTask", taskMap);

        manager.sendEvent(reactContext, this, USER_TASK_RESPONSE, map);
    }

    /**
     * - - - - - NAVIGATION EVENTS - - - - -
     */

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
        String error;
        switch (s) {
            case NavigationError.POI_NOT_FOUND:
                error = "objectNotFound";
                break;
            case NavigationError.ROUTE_NOT_FOUND:
                error = "routeNotFound";
                break;
            case NavigationError.USER_LOCATION_NOT_FOUND:
                error = "userLocationNotFound";
                break;
            default:
                error = s;
                break;
        }
        map.putString("error", error);
        manager.sendEvent(reactContext, this, NAVIGATION_FAILED, map);
    }

    /**
     * - - - - - VIEW STATUS LISTENER - - - - -
     */

    @Override
    public void onViewStatusChanged(String s, SmartMapObject smartMapObject) {
        WritableMap map = new WritableNativeMap();
        String status;
        switch (s) {
            case ViewStatus.CARD_VIEW:
                status = "cardView";
                break;
            case ViewStatus.ERROR_VIEW:
                status = "errorView";
                break;
            case ViewStatus.SETTINGS_VIEW:
                status = "settingView";
                break;
            case ViewStatus.MAP_ONLY:
                status = "onlyMap";
                break;
            case ViewStatus.NAVIGATION_VIEW:
                status = "navigatingView";
                break;
            case ViewStatus.SEARCH_VIEW:
                status = "searchView";
                break;
            default:
                status = "mapOnly";
                break;
        }

        if (smartMapObject != null) {
            map.putMap("smartMapObject", smartMapObjectToWritableMap(smartMapObject, false));
        }

        map.putString("status", status);
        manager.sendEvent(reactContext, this, VIEW_STATUS_CHANGED, map);
    }

    @Override
    public void onBottomSheetStateChanged(int status) {
        WritableMap map = new WritableNativeMap();
        switch (status) {
            case BottomSheetViewState.HIDDEN:
                map.putString("state", "hidden");
                break;
            case BottomSheetViewState.COLLAPSED:
                map.putString("state", "collapsed");
                break;
            case BottomSheetViewState.HALF_EXPANDED:
                map.putString("state", "halfExpanded");
                break;
            case BottomSheetViewState.EXPANDED:
                map.putString("state", "expanded");
                break;
            default:
                map.putString("state", "unknownStatus");
        }

        manager.sendEvent(reactContext, this, BOTTOMSHEET_STATE_CHANGED, map);
    }

    /**
     * - - - - - PUBLIC METHODS - - - - -
     */

    public void addMarker(double lat, double lon, int floorIndex, String localRef, String buildingRef, String layout,
            @Nullable String iconImage, String rgbTextColor, String rgbTextHaloColor) {

        if (!addedIcons.contains(iconImage)) {
            int resId = this.getResources().getIdentifier(iconImage, "drawable", getContext().getPackageName());
            smartMap.addIconImage(iconImage, resId);

        }

        SmartMapObject smartMapObject = new SmartMapObject(lat, lon, floorIndex, localRef, buildingRef);
        if (layout == null && rgbTextColor == null && rgbTextHaloColor == null) {
            smartMap.addMarker(smartMapObject);
        } else {
            smartMap.addMarker(smartMapObject, layout, iconImage, rgbTextColor, rgbTextHaloColor);
        }
    }

    public void addMarkers(List<SmartMapObject> objects, @Layout String layout, String iconName, String rgbTextColor,
            String rgbTextHaloColor) {
        if (layout == null && rgbTextColor == null && rgbTextHaloColor == null) {
            smartMap.addMarkers(objects);
        } else {
            smartMap.addMarkers(objects, layout, iconName, rgbTextColor, rgbTextHaloColor);
        }
    }

    public void animateCamera(double latitude, double longitude, double zoomLevel, double bearing, double pitch,
            int floorIndex, String buildingRef) {
        smartMap.animateCamera(latitude, longitude, zoomLevel, bearing, pitch, floorIndex, buildingRef);
    }

    public void cancelCurrentUserTask() {
        smartMap.cancelCurrentUserTask();
    }

    public void removeAllMarkers() {
        smartMap.removeAllMarkers();
    }

    public void removeMarker(double lat, double lon, int floorIndex, String localRef, String buildingRef) {
        smartMap.removeMarker(new SmartMapObject(lat, lon, floorIndex, localRef, buildingRef));
    }

    public void removeMarkers(List<SmartMapObject> smartMapObjects) {
        smartMap.removeMarkers(smartMapObjects);
    }

    public void selectMapObject(String buildingRef, String localRef) {
        smartMap.selectMapObject(localRef, buildingRef);
    }

    public void setCamera(double latitude, double longitude, double zoomLevel, double bearing, double pitch,
            int floorIndex, String buildingRef) {
        smartMap.setCamera(latitude, longitude, zoomLevel, bearing, pitch, floorIndex, buildingRef);
    }

    public void setMapMode(String mapMode) {
        smartMap.setMapMode(mapMode);
    }

    public void startNavigationUserTask(double lat, double lon, int floorIndex, String localRef, String buildingRef) {
        smartMap.startUserTask(new NavigationUserTask(new SmartMapObject(lat, lon, floorIndex, localRef, buildingRef)));
    }

    public void startPoiSelectionUserTask(String localRef, String buildingRef, String source, boolean addMarker,
            String actionButtonText, String actionButtonIcon) {

        String objectSource;
        int resId = 0;

        try {
            resId = this.getResources().getIdentifier(actionButtonIcon, "drawable", getContext().getPackageName());
        } catch (NullPointerException e) {
            Log.w("RNSmartMapView", "Couldn't find resource for actionButtonIcon");
        }

        if (source.toLowerCase().equals("marker")) {
            objectSource = ObjectSource.MARKER;
        } else {
            objectSource = ObjectSource.STATIC;
        }

        int finalResId = resId;
        Log.d("finalResId", "" + finalResId);
        smartMap.getMapObject(localRef, buildingRef, objectSource, (smartMapObject, s) -> {
            if (smartMapObject != null) {
                smartMap.startUserTask(
                        new POISelectionUserTask(smartMapObject, addMarker, actionButtonText, finalResId));
            }
        });
    }

    public void setWidgetPadding(int left, int top, int right, int bottom) {
        smartMap.setWidgetPadding(left, top, right, bottom);
    }

    /**
     * - - - - - PRIVATE METHODS - - - - -
     */

    WritableMap smartMapObjectToWritableMap(SmartMapObject object, boolean removePropertiesKey) {
        WritableMap map = new WritableNativeMap();
        try {
            if (removePropertiesKey) {
                map.putMap("properties",
                        convertJsonToWritableMap(object.getProperties().getJSONObject("properties")));
            } else {
                map.putMap("properties", convertJsonToWritableMap(object.getProperties()));
            }
        } catch (JSONException e) {
            e.printStackTrace();
        }
        map.putString("source", object.getSource());
        map.putDouble("longitude", object.getLongitude());
        map.putDouble("latitude", object.getLatitude());
        map.putInt("floorIndex", object.getFloorIndex());
        map.putString("buildingRef", object.getBuildingRef());
        map.putString("localRef", object.getLocalRef());
        map.putString("title", object.getTitle());
        return map;
    }
}
