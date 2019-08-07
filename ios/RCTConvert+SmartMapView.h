//
//  RCTConvert+SmartMapView.h
//  SteerpathOfficeApp
//
//  Created by Jarvis Luong on 25/07/2019.
//  Copyright © 2019 Facebook. All rights reserved.
//

#ifndef RCTConvert_SmartMapView_h
#define RCTConvert_SmartMapView_h

#import <SteerpathSmartSDK/SteerpathSmartSDK.h>
#import <React/RCTConvert.h>

@interface RCTConvert (SPSmartSDK)

+ (SPSmartMapObject*)SPSmartMapObject:(id)json;
+ (SPLayout)SPLayout:(NSString*)layout;
+ (NSString*)SPMapResponse:(SPMapResponse)response;
+ (NSString*)SPSmartGeofenceResponseType:(SPSmartGeofenceResponseType)response;
+ (SPSmartMapUserTask*)SPSmartUserTask:(id)json;
+ (SPSmartMapPOISelectionUserTask*)SPSmartMapPOISelectionUserTask:(id)json;
+ (NSDictionary*)convertUserTaskToJSONWith:(SPSmartMapUserTask*)task;
+ (NSDictionary*)convertMapObjectToJSONWith:(SPSmartMapObject*)mapObj;
+ (NSArray<NSDictionary*>*)convertMapObjects:(id)mapObjects;

@end

#endif /* RCTConvert_SmartMapView_h */
