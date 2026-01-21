package com.steerpath.rnsmartmap

import com.facebook.react.ReactPackage
import com.facebook.react.bridge.NativeModule
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.uimanager.ViewManager

class RNSmartMapPackage : ReactPackage {

    // 1. Return type must be List<NativeModule> (No '?' and no 'Mutable')
    override fun createNativeModules(
        reactContext: ReactApplicationContext
    ): List<NativeModule> {
        val modules = mutableListOf<NativeModule>() // Create it as mutable locally

        modules.add(RNSmartMapManager(reactContext))
        modules.add(RNSmartLocationManager(reactContext))

        return modules // Kotlin automatically casts MutableList to List
    }

    // 2. Return type must be List<ViewManager<*, *>> (No '?' and no 'Mutable')
    override fun createViewManagers(
        reactContext: ReactApplicationContext
    ): List<ViewManager<*, *>> {
        return emptyList() // The most idiomatic way to return an empty list in Kotlin
    }
}