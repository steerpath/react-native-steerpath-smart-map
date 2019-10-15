package com.steerpath.rnsmartmap;

import com.facebook.react.bridge.Arguments;
import com.facebook.react.bridge.WritableArray;
import com.facebook.react.bridge.WritableMap;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import java.util.Iterator;

public class Utils {

    static WritableMap convertJsonToWritableMap(JSONObject jsonObject) throws JSONException {
        WritableMap map = Arguments.createMap();
        Iterator iterator = jsonObject.keys();
        while(iterator.hasNext()) {
            String key = (String) iterator.next();
            Object value = jsonObject.get(key);
            if (value instanceof Float || value instanceof Double) {
                map.putDouble(key, jsonObject.getDouble(key));
            } else if (value instanceof Number) {
                map.putInt(key, jsonObject.getInt(key));
            } else if (value instanceof String) {
                map.putString(key, jsonObject.getString(key));
            } else if (value instanceof JSONObject) {
                map.putMap(key,convertJsonToWritableMap(jsonObject.getJSONObject(key)));
            } else if (value instanceof JSONArray){
                map.putArray(key, convertJsonArrayToWritableArray(jsonObject.getJSONArray(key)));
            } else if (value == JSONObject.NULL){
                map.putNull(key);
            }
        }

        return map;
    }

    static WritableArray convertJsonArrayToWritableArray(JSONArray jsonArray) throws JSONException {
        WritableArray array = Arguments.createArray();
        for(int i=0; i < jsonArray.length(); i++) {
            Object value = jsonArray.get(i);
            if (value instanceof Float || value instanceof Double) {
                array.pushDouble(jsonArray.getDouble(i));
            } else if (value instanceof Number) {
                array.pushInt(jsonArray.getInt(i));
            } else if (value instanceof String) {
                array.pushString(jsonArray.getString(i));
            } else if (value instanceof JSONObject) {
                array.pushMap(convertJsonToWritableMap(jsonArray.getJSONObject(i)));
            } else if (value instanceof JSONArray){
                array.pushArray(convertJsonArrayToWritableArray(jsonArray.getJSONArray(i)));
            } else if (value == JSONObject.NULL){
                array.pushNull();
            }
        }
        return array;
    }
}
