//
//  RCTConvert+SmartMapView.m
//  SteerpathOfficeApp
//
//  Created by Jarvis Luong on 25/07/2019.
//  Copyright © 2019 Facebook. All rights reserved.
//

#import "RCTConvert+SmartMapView.h"

@implementation RCTConvert(SPSmartSDK)

+ (SPSmartMapObject*)SPSmartMapObject:(id)json
{
  json = [self NSDictionary:json];
  SPSmartMapObject* obj = [[SPSmartMapObject alloc] initWithLatitude:[self double:json[@"latitude"]]
                                          longitude:[self double:json[@"longitude"]]
                                         floorIndex:[self NSInteger:json[@"floorIndex"]]
                                           localRef:[self NSString:json[@"localRef"]]
                                        buildingRef:[self NSString:json[@"buildingRef"]]];
  obj.title = [self NSString:json[@"title"]];
  
  NSString* rawSource = [self NSString:json[@"source"]];
  NSArray *items = @[@"static", @"marker", @"live"];
  
  NSInteger item = [items indexOfObject:rawSource];
  switch (item) {
    case 0:
      obj.source = SPObjectSourceStatic;
      break;
    case 1:
      obj.source = SPObjectSourceMarker;
      break;
    case 2:
      obj.source = SPObjectSourceLive;
      break;
    default:
      break;
  }
  return obj;
}

+ (SPLayout)SPLayout:(NSString*)layout
{
  NSArray *items = @[@"top", @"bottom", @"left", @"right"];
  NSInteger item = [items indexOfObject:layout];
  switch (item) {
    case 0:
      return SPLayoutTop;
    case 1:
      return SPLayoutBottom;
    case 2:
      return SPLayoutLeft;
    case 3:
      return SPLayoutRight;
    default:
      return SPLayoutTop;
  }
}

+ (NSString*)SPMapResponse:(SPMapResponse)response
{
  switch (response) {
    case SPMapResponseSuccess:
      return @"success";
    
    case SPMapResponseNetworkError:
      return @"networkError";
      
    case SPMapResponseObjectNotFound:
      return @"objectNotFound";
    
    default:
      return @"invalid";
  }
}

+ (NSString*)SPSmartGeofenceResponseType:(SPSmartGeofenceResponseType)response
{
  switch (response) {
    case SPSmartGeofenceResponseTypeSuccess:
      return @"success";
    
    case SPSmartGeofenceResponseTypeMalformedData:
      return @"malformedData";
      
    case SPSmartGeofenceResponseTypeGeofenceNotFound:
      return @"notFound";
      
    default:
      return @"invalid";
  }
}

+ (SPSmartMapUserTask*)SPSmartUserTask:(id)json
{
  json = [self NSDictionary:json];
  NSString* type = [self NSString:json[@"type"]];
  NSArray *items = @[@"navigation", @"poiSelection"];
  NSInteger item = [items indexOfObject:type];
  switch (item) {
    case 0:
      return [[SPSmartMapNavigationUserTask alloc] initWithMapObject:[RCTConvert SPSmartMapObject:json[@"payload"]]];
    
    case 1:
      return [RCTConvert SPSmartMapPOISelectionUserTask:json[@"payload"]];
      
    default:
      break;
  }
  return [[SPSmartMapUserTask alloc] init];
}

+ (SPSmartMapPOISelectionUserTask*)SPSmartMapPOISelectionUserTask:(id)json
{
  json = [self NSDictionary:json];
  SPSmartMapObject* mapObj = [RCTConvert SPSmartMapObject:json[@"payload"]];
  BOOL shouldAddMarker = [self BOOL:json[@"shouldAddMarker"]];
  NSString* actionButtonText = [self NSString:json[@"actionButtonText"]];
  NSString* actionButtonIcon = [self NSString:json[@"actionButtonIcon"]];
  return [[SPSmartMapPOISelectionUserTask alloc] initWith:mapObj shouldAddMarker:shouldAddMarker actionButtonText:actionButtonText actionButtonIcon:actionButtonIcon];
}

+ (NSDictionary*)convertUserTaskToJSONWith:(SPSmartMapUserTask*)task
{
  if ([task isKindOfClass:[SPSmartMapNavigationUserTask class]]) {
    SPSmartMapNavigationUserTask* navigationTask = (SPSmartMapNavigationUserTask*) task;
    return @{
             @"type": @"navigation",
             @"payload": @{
                 @"localRef": [navigationTask getUserTaskLocalRef],
                 @"buildingRef": [navigationTask getUserTaskBuildingRef]
                 }
             };
  }
  if ([task isKindOfClass:[SPSmartMapPOISelectionUserTask class]]) {
    SPSmartMapPOISelectionUserTask* poiTask = (SPSmartMapPOISelectionUserTask*) task;
    return @{
             @"type": @"poiSelection",
             @"payload": @{
                 @"localRef": [poiTask getMapObject].localRef,
                 @"buildingRef": [poiTask getMapObject].buildingRef
                 }
             };
  }
  return @{};
}

+ (NSDictionary *)convertMapObjectToJSONWith:(SPSmartMapObject *)mapObj
{
  return @{
           @"title": mapObj.title,
           @"latitude": [NSNumber numberWithDouble:mapObj.latitude],
           @"longitude": [NSNumber numberWithDouble:mapObj.longitude],
           @"floorIndex": [NSNumber numberWithInteger:mapObj.floorIndex],
           @"localRef": mapObj.localRef,
           @"buildingRef": mapObj.buildingRef
           };
}

@end

