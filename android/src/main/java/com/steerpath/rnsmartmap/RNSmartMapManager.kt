package com.steerpath.rnsmartmap

import android.util.Log
import com.facebook.react.bridge.Callback
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReactContextBaseJavaModule
import com.facebook.react.bridge.ReactMethod
import com.facebook.react.bridge.ReadableMap
import com.facebook.react.bridge.WritableMap
import com.facebook.react.bridge.WritableNativeMap
import com.steerpath.smart.SmartSDK
import org.json.JSONException
import java.io.File
import javax.annotation.Nonnull

class RNSmartMapManager(@param:Nonnull private val appContext: ReactApplicationContext) :
    ReactContextBaseJavaModule(
        appContext
    ) {
    @Nonnull
    override fun getName(): String {
        return "RNSmartMapManager"
    }

    @ReactMethod
    fun start(apiKey: String?) {
        appContext.runOnUiQueueThread(Runnable { SmartSDK.getInstance().start(appContext, apiKey) })
    }

    @ReactMethod
    fun startWithConfig(map: ReadableMap) {
        val apiKey = map.getString("apiKey")
        if (map.hasKey("configFilePath")) {
            val filePath = map.getString("configFilePath")
            if (filePath != null) {
                val file = File(filePath)
                appContext.runOnUiQueueThread(Runnable {
                    SmartSDK.getInstance().start(appContext, apiKey, file)
                })
            }
        } else if (map.hasKey("configString")) {
            val configString = map.getString("configString")
            if (configString != null) {
                appContext.runOnUiQueueThread(Runnable {
                    SmartSDK.getInstance().start(appContext, apiKey, configString)
                })
            }
        } else {
            // TODO: throw error
        }
    }

    @ReactMethod
    fun loginToLive(map: ReadableMap?) {
        if (map != null) {
            try {
                val obj = Utils.convertMapToJson(map)
                appContext.runOnUiQueueThread(Runnable {
                    SmartSDK.getInstance().loginToLive(appContext, obj)
                })
            } catch (e: JSONException) {
                Log.e("Error", "Failed to login into Steerpath live service")
            }
        }
    }

    @ReactMethod
    fun logoutFromLive() {
        appContext.runOnUiQueueThread(Runnable {
            SmartSDK.getInstance().logoutFromLive(appContext)
        })
    }


    @ReactMethod
    fun fetchVersion(callback: Callback) {
        var map: WritableMap = WritableNativeMap()
        var version: String? = "Unknown"
        val versions = SmartSDK.getVersions()
        try {
            map = Utils.convertJsonToWritableMap(versions)
            version = map.getString("smartSDKVersion")
        } catch (e: JSONException) {
            e.printStackTrace()
        }
        callback.invoke(version)
    }
}
