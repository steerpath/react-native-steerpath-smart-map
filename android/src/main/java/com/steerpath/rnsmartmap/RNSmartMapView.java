package com.steerpath.rnsmartmap;

import android.app.Activity;
import android.content.Context;
import android.os.Bundle;
import android.util.Log;

import androidx.annotation.NonNull;

import com.facebook.react.bridge.LifecycleEventListener;
import com.facebook.react.bridge.ReactContext;
import com.facebook.react.uimanager.ThemedReactContext;

public class RNSmartMapView extends SteerpathMapView implements OnMapReadyCallback {

    private Context mContext;

    private LifecycleEventListener mLifeCycleListener;

    private boolean mPaused;
    private boolean mDestroyed;

    public RNSmartMapView(@NonNull ThemedReactContext context) {
        super(context.getCurrentActivity());
        this.mContext = context;

        onCreate(null);
        onStart();
        onResume();
        getMapAsync(this);

        setLifecycleListeners();

    }


    @Override
    public void onMapReady(SteerpathMap steerpathMap) {
        Log.d("MONITOR", "Map is now ready");
    }

    @Override
    public void onSaveInstanceState(@NonNull Bundle outState) {
        super.onSaveInstanceState(outState);
    }

    @Override
    public void onResume() {
        super.onResume();
        mPaused = false;
    }

    @Override
    public void onPause() {
        super.onPause();
        mPaused = true;
    }

    @Override
    public void onStop() {
        super.onStop();
    }

    @Override
    public void onDestroy() {
        super.onDestroy();
        mDestroyed = true;
    }

    @Override
    public void onLowMemory() {
        super.onLowMemory();
    }

    private void setLifecycleListeners() {
        final ReactContext reactContext = (ReactContext) mContext;

        mLifeCycleListener = new LifecycleEventListener() {
            @Override
            public void onHostResume() {
                onResume();
            }

            @Override
            public void onHostPause() {
                onPause();
            }

            @Override
            public void onHostDestroy() {
                dispose();
            }
        };

        reactContext.addLifecycleEventListener(mLifeCycleListener);
    }

    public synchronized void dispose() {
        if (mDestroyed) {
            return;
        }

        ReactContext reactContext = (ReactContext) mContext;
        reactContext.removeLifecycleEventListener(mLifeCycleListener);

        if (!mPaused) {
            onPause();
        }

        onStop();
        onDestroy();
    }
}
