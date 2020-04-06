package com.steerpath.rnsmartmap;

import com.facebook.react.bridge.Arguments;
import com.facebook.react.bridge.ReadableArray;
import com.facebook.react.bridge.ReadableMap;
import com.facebook.react.bridge.ReadableMapKeySetIterator;
import com.facebook.react.bridge.WritableArray;
import com.facebook.react.bridge.WritableMap;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import java.util.Iterator;

import static com.facebook.react.bridge.ReadableType.Array;
import static com.facebook.react.bridge.ReadableType.Map;
import static com.facebook.react.bridge.ReadableType.Null;

public class Utils {

    static WritableMap convertJsonToWritableMap(JSONObject jsonObject) throws JSONException {
        WritableMap map = Arguments.createMap();
        Iterator iterator = jsonObject.keys();
        while (iterator.hasNext()) {
            String key = (String) iterator.next();
            Object value = jsonObject.get(key);
            if (value instanceof Float || value instanceof Double) {
                map.putDouble(key, jsonObject.getDouble(key));
            } else if (value instanceof Number) {
                map.putInt(key, jsonObject.getInt(key));
            } else if (value instanceof String) {
                map.putString(key, jsonObject.getString(key));
            } else if (value instanceof JSONObject) {
                map.putMap(key, convertJsonToWritableMap(jsonObject.getJSONObject(key)));
            } else if (value instanceof JSONArray) {
                map.putArray(key, convertJsonArrayToWritableArray(jsonObject.getJSONArray(key)));
            } else if (value == JSONObject.NULL) {
                map.putNull(key);
            }
        }

        return map;
    }

    static WritableArray convertJsonArrayToWritableArray(JSONArray jsonArray) throws JSONException {
        WritableArray array = Arguments.createArray();
        for (int i = 0; i < jsonArray.length(); i++) {
            Object value = jsonArray.get(i);
            if (value instanceof Float || value instanceof Double) {
                array.pushDouble(jsonArray.getDouble(i));
            } else if (value instanceof Number) {
                array.pushInt(jsonArray.getInt(i));
            } else if (value instanceof String) {
                array.pushString(jsonArray.getString(i));
            } else if (value instanceof JSONObject) {
                array.pushMap(convertJsonToWritableMap(jsonArray.getJSONObject(i)));
            } else if (value instanceof JSONArray) {
                array.pushArray(convertJsonArrayToWritableArray(jsonArray.getJSONArray(i)));
            } else if (value == JSONObject.NULL) {
                array.pushNull();
            }
        }
        return array;
    }

    static JSONObject convertMapToJson(ReadableMap readableMap) throws JSONException {
        JSONObject object = new JSONObject();
        ReadableMapKeySetIterator iterator = readableMap.keySetIterator();
        while (iterator.hasNextKey()) {
            String key = iterator.nextKey();
            switch (readableMap.getType(key)) {
            case Null:
                object.put(key, JSONObject.NULL);
                break;
            case Boolean:
                object.put(key, readableMap.getBoolean(key));
                break;
            case Number:
                object.put(key, readableMap.getDouble(key));
                break;
            case String:
                object.put(key, readableMap.getString(key));
                break;
            case Map:
                object.put(key, convertMapToJson(readableMap.getMap(key)));
                break;
            case Array:
                object.put(key, convertArrayToJson(readableMap.getArray(key)));
                break;
            }
        }
        return object;
    }

    static JSONArray convertArrayToJson(ReadableArray readableArray) throws JSONException {
        JSONArray array = new JSONArray();
        for (int i = 0; i < readableArray.size(); i++) {
            switch (readableArray.getType(i)) {
            case Null:
                break;
            case Boolean:
                array.put(readableArray.getBoolean(i));
                break;
            case Number:
                array.put(readableArray.getDouble(i));
                break;
            case String:
                array.put(readableArray.getString(i));
                break;
            case Map:
                array.put(convertMapToJson(readableArray.getMap(i)));
                break;
            case Array:
                array.put(convertArrayToJson(readableArray.getArray(i)));
                break;
            }
        }
        return array;
    }
}
