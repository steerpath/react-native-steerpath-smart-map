package com.steerpath.rnsmartmap;

import android.util.Log;
import android.view.Choreographer;
import android.view.View;
import android.view.ViewGroup;
import android.widget.FrameLayout;

import androidx.appcompat.app.AppCompatActivity;

import com.facebook.react.uimanager.ThemedReactContext;
import com.steerpath.smart.ObjectSource;
import com.steerpath.smart.SmartMapFragment;

public class RNSmartMapView extends FrameLayout {

    private SmartMapFragment smartMap;

    public RNSmartMapView(ThemedReactContext context) {
        super(context);
        SmartMapFragment fragment = SmartMapFragment.newInstance();
        this.smartMap = fragment;
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

}
