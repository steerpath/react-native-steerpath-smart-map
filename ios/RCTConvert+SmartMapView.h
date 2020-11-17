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
+ (SPObjectSource)SPObjectSource:(NSString*)source;
+ (NSString*)SPMapResponse:(SPMapResponse)response;
+ (NSString*)SPSmartGeofenceResponseType:(SPSmartGeofenceResponseType)response;
+ (SPSmartMapUserTask*)SPSmartUserTask:(id)json;
+ (SPSmartMapPOISelectionUserTask*)SPSmartMapPOISelectionUserTask:(id)json;
+ (NSDictionary*)convertUserTaskToJSONWith:(SPSmartMapUserTask*)task;
+ (NSDictionary*)convertMapObjectToJSONWith:(SPSmartMapObject*)mapObj;
+ (NSArray<NSDictionary*>*)convertMapObjects:(id)mapObjects;
+ (NSString*)SPMapViewStatus:(SPMapViewStatus)status;
+ (NSString*)SPSmartMapBottomSheetViewState:(SPSmartMapBottomSheetViewState)state;
+ (NSString*)SPNavigationError:(SPNavigationError)error;
+ (NSString*)SPSmartMapUserTaskResponse:(SPSmartMapUserTaskResponse)response;

@end

#endif /* RCTConvert_SmartMapView_h */
