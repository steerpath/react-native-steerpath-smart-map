package com.steerpath.rnsmartmap

import com.facebook.react.bridge.Arguments.createArray
import com.facebook.react.bridge.Arguments.createMap
import com.facebook.react.bridge.ReadableArray
import com.facebook.react.bridge.ReadableMap
import com.facebook.react.bridge.ReadableType
import com.facebook.react.bridge.WritableArray
import com.facebook.react.bridge.WritableMap
import org.json.JSONArray
import org.json.JSONException
import org.json.JSONObject

object Utils {
    @Throws(JSONException::class)
    fun convertJsonToWritableMap(jsonObject: JSONObject): WritableMap {
        val map = createMap()
        val iterator: MutableIterator<*> = jsonObject.keys()
        while (iterator.hasNext()) {
            val key = iterator.next() as String
            val value = jsonObject.get(key)
            if (value is Float || value is Double) {
                map.putDouble(key, jsonObject.getDouble(key))
            } else if (value is Number) {
                map.putInt(key, jsonObject.getInt(key))
            } else if (value is String) {
                map.putString(key, jsonObject.getString(key))
            } else if (value is JSONObject) {
                map.putMap(key, convertJsonToWritableMap(jsonObject.getJSONObject(key)))
            } else if (value is JSONArray) {
                map.putArray(key, convertJsonArrayToWritableArray(jsonObject.getJSONArray(key)))
            } else if (value === JSONObject.NULL) {
                map.putNull(key)
            }
        }

        return map
    }

    @Throws(JSONException::class)
    fun convertJsonArrayToWritableArray(jsonArray: JSONArray): WritableArray {
        val array = createArray()
        for (i in 0..<jsonArray.length()) {
            val value = jsonArray.get(i)
            if (value is Float || value is Double) {
                array.pushDouble(jsonArray.getDouble(i))
            } else if (value is Number) {
                array.pushInt(jsonArray.getInt(i))
            } else if (value is String) {
                array.pushString(jsonArray.getString(i))
            } else if (value is JSONObject) {
                array.pushMap(convertJsonToWritableMap(jsonArray.getJSONObject(i)))
            } else if (value is JSONArray) {
                array.pushArray(convertJsonArrayToWritableArray(jsonArray.getJSONArray(i)))
            } else if (value === JSONObject.NULL) {
                array.pushNull()
            }
        }
        return array
    }

    @Throws(JSONException::class)
    fun convertMapToJson(readableMap: ReadableMap): JSONObject {
        val `object` = JSONObject()
        val iterator = readableMap.keySetIterator()
        while (iterator.hasNextKey()) {
            val key = iterator.nextKey()
            when (readableMap.getType(key)) {
                ReadableType.Null -> `object`.put(key, JSONObject.NULL)
                ReadableType.Boolean -> `object`.put(key, readableMap.getBoolean(key))
                ReadableType.Number -> `object`.put(key, readableMap.getDouble(key))
                ReadableType.String -> `object`.put(key, readableMap.getString(key))
                ReadableType.Map -> `object`.put(
                    key,
                    Utils.convertMapToJson(readableMap.getMap(key)!!)
                )

                ReadableType.Array -> `object`.put(
                    key,
                    Utils.convertArrayToJson(readableMap.getArray(key)!!)
                )
            }
        }
        return `object`
    }

    @Throws(JSONException::class)
    fun convertArrayToJson(readableArray: ReadableArray): JSONArray {
        val array = JSONArray()
        for (i in 0..<readableArray.size()) {
            when (readableArray.getType(i)) {
                ReadableType.Null -> {}
                ReadableType.Boolean -> array.put(readableArray.getBoolean(i))
                ReadableType.Number -> array.put(readableArray.getDouble(i))
                ReadableType.String -> array.put(readableArray.getString(i))
                ReadableType.Map -> array.put(Utils.convertMapToJson(readableArray.getMap(i)!!))
                ReadableType.Array -> array.put(Utils.convertArrayToJson(readableArray.getArray(i)!!))
            }
        }
        return array
    }
}
