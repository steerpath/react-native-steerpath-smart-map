package com.steerpath.rnsmartmap

import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReactContext
import com.facebook.react.bridge.ReactContextBaseJavaModule
import com.facebook.react.bridge.ReactMethod
import com.facebook.react.bridge.WritableMap
import com.facebook.react.bridge.WritableNativeMap
import com.facebook.react.modules.core.DeviceEventManagerModule
import com.steerpath.smart.SmartLocationManager
import com.steerpath.smart.listeners.SmartLocationListener
import javax.annotation.Nonnull

class RNSmartLocationManager(@param:Nonnull private val appContext: ReactApplicationContext) :
    ReactContextBaseJavaModule(
        appContext
    ), SmartLocationListener {
    private var listenerCount = 0

    override fun getName(): String {
        return "RNSmartLocationManager"
    }

    @ReactMethod
    fun addListener(eventName: String?) {
        if (listenerCount == 0) {
            SmartLocationManager.addLocationListener(this)
        }
        listenerCount++
    }

    @ReactMethod
    fun removeListeners(count: Int) {
        listenerCount -= count
        if (listenerCount == 0) {
            SmartLocationManager.removeLocationListener(this)
        }
    }

    override fun onLocationChanged(
        latitude: Double,
        longitude: Double,
        buildingRef: String?,
        floorIndex: Int,
        accuracyM: Float
    ) {
        val map = WritableNativeMap()
        map.putDouble("latitude", latitude)
        map.putDouble("longitude", longitude)
        if (buildingRef == null) {
            map.putNull("buildingRef")
        } else {
            map.putString("buildingRef", buildingRef)
        }
        map.putInt("floorIndex", floorIndex)
        map.putDouble("accuracyM", accuracyM.toDouble())
        sendEvent(appContext, ON_LOCATION_CHANGED, map)
    }

    private fun sendEvent(
        reactContext: ReactContext,
        eventName: String,
        params: WritableMap?
    ) {
        reactContext
            .getJSModule<DeviceEventManagerModule.RCTDeviceEventEmitter?>(DeviceEventManagerModule.RCTDeviceEventEmitter::class.java)
            .emit(eventName, params)
    }

    companion object {
        const val ON_LOCATION_CHANGED: String = "locationChanged"
    }
}
