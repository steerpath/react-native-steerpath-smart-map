package com.steerpath.rnsmartmap;

import android.view.Choreographer;
import android.view.View;
import android.view.ViewGroup;
import android.widget.FrameLayout;

import androidx.appcompat.app.AppCompatActivity;

import com.facebook.react.uimanager.ThemedReactContext;
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

    public SmartMapFragment getSmartMap() {
        return smartMap;
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
}
