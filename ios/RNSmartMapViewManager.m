//
//  RNSPSmartView.m
//  SteerpathOfficeApp
//
//  Created by Jarvis Luong on 23/07/2019.
//  Copyright © 2019 Facebook. All rights reserved.
//

#import "RNSmartMapViewManager.h"

@implementation RNSmartMapViewManager
{
    NSHashTable* mapEventManagers;
}

- (instancetype)init
{
    self = [super init];
    mapEventManagers = [NSHashTable new];
    return self;
}

+ (BOOL)requiresMainQueueSetup
{
    return YES;
}

RCT_EXPORT_MODULE(RNSmartMapView)

- (UIView *)view
{
  RNSmartMapView* view = [RNSmartMapView new];
  RNSmartMapEventManager* mapEventManager = [[RNSmartMapEventManager alloc] initWithMapView:view];
    [mapEventManagers addObject:mapEventManager];
  view.delegate = mapEventManager;
  view.userTaskDelegate = mapEventManager;
  return view;
}

RCT_EXPORT_VIEW_PROPERTY(onMapLoaded, RCTBubblingEventBlock)
RCT_EXPORT_VIEW_PROPERTY(onMapClicked, RCTBubblingEventBlock)
RCT_EXPORT_VIEW_PROPERTY(onUserFloorChanged, RCTBubblingEventBlock)
RCT_EXPORT_VIEW_PROPERTY(onVisibleFloorChanged, RCTBubblingEventBlock)
RCT_EXPORT_VIEW_PROPERTY(onViewStatusChanged, RCTBubblingEventBlock)
RCT_EXPORT_VIEW_PROPERTY(onNavigationEnded, RCTBubblingEventBlock)
RCT_EXPORT_VIEW_PROPERTY(onNavigationFailed, RCTBubblingEventBlock)
RCT_EXPORT_VIEW_PROPERTY(onNavigationStarted, RCTBubblingEventBlock)
RCT_EXPORT_VIEW_PROPERTY(onNavigationPreviewAppeared, RCTBubblingEventBlock)
RCT_EXPORT_VIEW_PROPERTY(onNavigationDestinationReached, RCTBubblingEventBlock)
RCT_EXPORT_VIEW_PROPERTY(onUserTaskResponse, RCTBubblingEventBlock)


RCT_CUSTOM_VIEW_PROPERTY(mapMode, SPMapMode, RNSmartMapView)
{   // The one we want to switch on
  NSArray *items = @[@"mapOnly", @"search", @"static"];
  int item = [items indexOfObject:json];
  switch (item) {
    case 0:
      [view setMapMode:SPMapModeMapOnly];
      break;
    case 1:
      [view setMapMode:SPMapModeSearch];
      break;
    case 2:
      [view setMapMode:SPMapModeStatic];
      break;
    default:
      break;
  }
}

RCT_EXPORT_METHOD(setCamera:(nonnull NSNumber*) reactTag
                  latitude:(nonnull NSNumber*)latitude
                  longitude:(nonnull NSNumber*)longitude
                  zoomLevel:(nonnull NSNumber*)zoomLevel
                  bearing:(nonnull NSNumber*)bearing
                  pitch:(nonnull NSNumber*)pitch
                  floorIndex:(nonnull NSNumber*)floorIndex
                  buildingRef:(nonnull NSString *)buildingRef)
{
  [self.bridge.uiManager addUIBlock:^(RCTUIManager *uiManager, NSDictionary<NSNumber *,UIView *> *viewRegistry) {
    RNSmartMapView *view = viewRegistry[reactTag];
    if (!view || ![view isKindOfClass:[RNSmartMapView class]]) {
      RCTLogError(@"Cannot find SPSmartMapView with tag #%@", reactTag);
      return;
    }
    [view setCamera:[latitude doubleValue] longitude:[longitude doubleValue] zoomLevel:[zoomLevel doubleValue] bearing:[bearing doubleValue] pitch:[pitch doubleValue] floorIndex:[floorIndex intValue] buildingRef:buildingRef];
  }];
}

RCT_EXPORT_METHOD(addMarker:(nonnull NSNumber*) reactTag
                  mapObject:(id)mapObject
                  layout:(NSString*)layout
                  iconName:(NSString*)iconName
                  textColor:(NSString*)textColor
                  textHaloColor:(NSString*)textHaloColor)
{
  [self.bridge.uiManager addUIBlock:^(RCTUIManager *uiManager, NSDictionary<NSNumber *,UIView *> *viewRegistry) {
    RNSmartMapView *view = (RNSmartMapView*)viewRegistry[reactTag];
    if (!view || ![view isKindOfClass:[RNSmartMapView class]]) {
      RCTLogError(@"Cannot find SPSmartMapView with tag #%@", reactTag);
      return;
    }
    if (mapObject) {
      if (iconName && textColor && textHaloColor) {
        [view addMarker:[RCTConvert SPSmartMapObject:mapObject]
                 layout:layout ? [RCTConvert SPLayout:layout] : SPLayoutTop
               iconName:iconName
              textColor:textColor
          textHaloColor:textHaloColor];
      } else {
        [view addMarker:[RCTConvert SPSmartMapObject:mapObject]];
      }
    }
  }];
  
}

RCT_EXPORT_METHOD(removeMarker:(nonnull NSNumber*) reactTag
                  mapObject:(id)json)
{
  [self.bridge.uiManager addUIBlock:^(RCTUIManager *uiManager, NSDictionary<NSNumber *,UIView *> *viewRegistry) {
    RNSmartMapView *view = (RNSmartMapView*)viewRegistry[reactTag];
    if (!view || ![view isKindOfClass:[RNSmartMapView class]]) {
      RCTLogError(@"Cannot find SPSmartMapView with tag #%@", reactTag);
      return;
    }
    if (json) {
      [view removeMarker:[RCTConvert SPSmartMapObject:json]];
    }
  }];
  
}

RCT_EXPORT_METHOD(removeAllMarkers:(nonnull NSNumber*) reactTag)
{
  [self.bridge.uiManager addUIBlock:^(RCTUIManager *uiManager, NSDictionary<NSNumber *,UIView *> *viewRegistry) {
    RNSmartMapView *view = (RNSmartMapView*)viewRegistry[reactTag];
    if (!view || ![view isKindOfClass:[RNSmartMapView class]]) {
      RCTLogError(@"Cannot find SPSmartMapView with tag #%@", reactTag);
      return;
    }
    [view removeAllMarkers];
  }];
}

RCT_EXPORT_METHOD(selectMapObject:(nonnull NSNumber*) reactTag
                  mapObject:(id)json)
{
  [self.bridge.uiManager addUIBlock:^(RCTUIManager *uiManager, NSDictionary<NSNumber *,UIView *> *viewRegistry) {
    RNSmartMapView *view = (RNSmartMapView*)viewRegistry[reactTag];
    if (!view || ![view isKindOfClass:[RNSmartMapView class]]) {
      RCTLogError(@"Cannot find SPSmartMapView with tag #%@", reactTag);
      return;
    }
    if (json) {
      [view selectMapObject:[RCTConvert SPSmartMapObject:json]];
    }
  }];
  
}

RCT_EXPORT_METHOD(animateCameraToObject:(nonnull NSNumber*) reactTag
                  localRef:(nonnull NSString*) localRef
                  buildingRef:(nonnull NSString*) buildingRef
                  zoomLevel:(nonnull NSNumber*) zoomLevel
                  callback:(RCTResponseSenderBlock)callback)
{
  [self.bridge.uiManager addUIBlock:^(RCTUIManager *uiManager, NSDictionary<NSNumber *,UIView *> *viewRegistry) {
    RNSmartMapView *view = (RNSmartMapView*)viewRegistry[reactTag];
    if (!view || ![view isKindOfClass:[RNSmartMapView class]]) {
      RCTLogError(@"Cannot find SPSmartMapView with tag #%@", reactTag);
      return;
    }
    [view animateCameraToObject:localRef
                     buildingRef:buildingRef
                       zoomLevel:[zoomLevel doubleValue]
                     completion:^(SPMapResponse response) {
                       callback(@[[NSNull null], [RCTConvert SPMapResponse:response]]);
                     }];
  }];
}

RCT_EXPORT_METHOD(startUserTask:(nonnull NSNumber*) reactTag
                  userTask:(id)json)
{
  [self.bridge.uiManager addUIBlock:^(RCTUIManager *uiManager, NSDictionary<NSNumber *,UIView *> *viewRegistry) {
    RNSmartMapView *view = (RNSmartMapView*)viewRegistry[reactTag];
    if (!view || ![view isKindOfClass:[RNSmartMapView class]]) {
      RCTLogError(@"Cannot find SPSmartMapView with tag #%@", reactTag);
      return;
    }
    SPSmartMapUserTask* task = [RCTConvert SPSmartUserTask:json];
    [view startUserTask:task];
  }];
}

RCT_EXPORT_METHOD(getCurrentUserTask:(nonnull NSNumber*) reactTag
                  callback:(RCTResponseSenderBlock)callback)
{
  [self.bridge.uiManager addUIBlock:^(RCTUIManager *uiManager, NSDictionary<NSNumber *,UIView *> *viewRegistry) {
    RNSmartMapView *view = (RNSmartMapView*)viewRegistry[reactTag];
    if (!view || ![view isKindOfClass:[RNSmartMapView class]]) {
      RCTLogError(@"Cannot find SPSmartMapView with tag #%@", reactTag);
      return;
    }
    SPSmartMapUserTask* task = [view getCurrentUserTask];
    callback(@[[NSNull null], [RCTConvert convertUserTaskToJSONWith:task]]);
  }];
}

RCT_EXPORT_METHOD(cancelCurrentUserTask:(nonnull NSNumber*) reactTag)
{
  [self.bridge.uiManager addUIBlock:^(RCTUIManager *uiManager, NSDictionary<NSNumber *,UIView *> *viewRegistry) {
    RNSmartMapView *view = (RNSmartMapView*)viewRegistry[reactTag];
    if (!view || ![view isKindOfClass:[RNSmartMapView class]]) {
      RCTLogError(@"Cannot find SPSmartMapView with tag #%@", reactTag);
      return;
    }
    [view cancelCurrentUserTask];
  }];
}

@end
