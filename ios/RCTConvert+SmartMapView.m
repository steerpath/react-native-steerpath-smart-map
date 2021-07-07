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

+ (SPObjectSource)SPObjectSource:(NSString *)source
{
    NSArray *items = @[@"MARKER", @"LIVE", @"STATIC"];
    NSInteger item = [items indexOfObject:source];
    switch (item) {
      case 0:
        return SPObjectSourceMarker;
      case 1:
        return SPObjectSourceLive;
      case 2:
        return SPObjectSourceStatic;
      default:
        return SPObjectSourceStatic;
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

+ (NSDictionary*)convertUserTaskToJSONWith:(nullable SPSmartMapUserTask*)task
{
    if (task == nil) {
        return @{};
    }
  if ([task isKindOfClass:[SPSmartMapNavigationUserTask class]]) {
    SPSmartMapNavigationUserTask* navigationTask = (SPSmartMapNavigationUserTask*) task;
    NSArray<SPSmartMapObject*>* objects = [navigationTask getNavigationObjects];
    return @{
             @"type": @"navigation",
             @"payload": objects.count > 0 ? [RCTConvert convertMapObjectToJSONWith:[objects objectAtIndex:0]] : [NSNull null]
    };
  }
  if ([task isKindOfClass:[SPSmartMapPOISelectionUserTask class]]) {
    SPSmartMapPOISelectionUserTask* poiTask = (SPSmartMapPOISelectionUserTask*) task;
    return @{
             @"type": @"poiSelection",
             @"payload": @{
                 @"smartMapObject": [RCTConvert convertMapObjectToJSONWith:poiTask.getMapObject],
                 @"shouldAddMarker": @(poiTask.shouldAddMarker),
                 @"actionButtonText": [RCTConvert valueOrEmptyIfNil:poiTask.getActionButtonText] ,
                 @"actionButtonIcon": [RCTConvert valueOrEmptyIfNil:poiTask.iconName]
                 }
             };
  }
  return @{};
}

+ (NSDictionary *)convertMapObjectToJSONWith:(SPSmartMapObject *)mapObj
{
    if (mapObj == nil) {
        return @{};
    }
  return @{
           @"title": mapObj.title ?: @"",
           @"latitude": [NSNumber numberWithDouble:mapObj.latitude],
           @"longitude": [NSNumber numberWithDouble:mapObj.longitude],
           @"floorIndex": [NSNumber numberWithInteger:mapObj.floorIndex],
           @"localRef": mapObj.localRef ?: @"",
           @"buildingRef": mapObj.buildingRef ?: @"",
           @"properties": mapObj.properties ?: @{}
           };
}

+ (NSArray<NSDictionary*>*)convertMapObjects:(id)mapObjects
{
    if (mapObjects) {
        NSArray<SPSmartMapObject*>* convertedObjects = mapObjects;
        NSMutableArray<NSDictionary*>* convertedMapObjects = [NSMutableArray new];
        for (int i = 0; i < [convertedObjects count]; i++) {
            [convertedMapObjects addObject:[RCTConvert convertMapObjectToJSONWith:[convertedObjects objectAtIndex:i]]];
        }
        return [NSArray arrayWithArray:convertedMapObjects];
    }
    return nil;
}

+ (NSString *)SPMapViewStatus:(SPMapViewStatus)status
{
    switch (status) {
        case SPMapViewStatusOnlyMap:
            return @"onlyMap";
        case SPMapViewStatusCardView:
            return @"cardView";
        case SPMapViewStatusErrorView:
            return @"errorView";
        case SPMapViewStatusSettingView:
            return @"settingView";
        case SPMapViewStatusNavigatingView:
            return @"navigatingView";
        case SPMapViewStatusSearchView:
            return @"searchView";
        default:
            return @"unknownViewStatus";
    }
}

+ (NSString *)SPSmartMapBottomSheetViewState:(SPSmartMapBottomSheetViewState)state
{
    switch (state) {
        case SPSmartMapBottomSheetViewStateHidden:
            return @"hidden";
        case SPSmartMapBottomSheetViewStateCollapsed:
            return @"collapsed";
        case SPSmartMapBottomSheetViewStateHalfExpanded:
            return @"halfExpanded";
        case SPSmartMapBottomSheetViewStateExpanded:
            return @"expanded";
        default:
            return @"unknownState";
    }
}

+ (NSString *)SPNavigationError:(SPNavigationError)error
{
    switch (error) {
        case SPNavigationErrorRouteNotFound:
            return @"routeNotFound";
        case SPNavigationErrorObjectNotFound:
            return @"objectNotFound";
        case SPNavigationErrorUserLocationNotFound:
            return @"userLocationNotFound";
            
        default:
            return @"unknownNavigationError";
    }
}

+ (NSString *)SPSmartMapUserTaskResponse:(SPSmartMapUserTaskResponse)response
{
    switch (response) {
        case SPSmartMapUserTaskResponseBusy:
            return @"busy";
        case SPSmartMapUserTaskResponseError:
            return @"error";
        case SPSmartMapUserTaskResponseStarted:
            return @"started";
        case SPSmartMapUserTaskResponseCancelled:
            return @"cancelled";
        case SPSmartMapUserTaskResponseCompleted:
            return @"completed";
        case SPSmartMapUserTaskResponseUnSupported:
            return @"unsupported";
        
        default:
            return @"unknownUserTaskResponse";
    }
}

+ (NSString*)valueOrEmptyIfNil:(nullable NSString*)str
{
    NSString* guarded = @"";
    if (str != nil) {
        guarded = str;
    }
    return guarded;
}

@end

