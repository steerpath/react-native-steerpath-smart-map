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
  view.delegate = self;
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

RCT_EXPORT_METHOD(setCameraToBuildingRef:(nonnull NSNumber*) reactTag
                  buildingRef:(nonnull NSString*) buildingRef
                  callback:(RCTResponseSenderBlock)callback)
{
  [self.bridge.uiManager addUIBlock:^(RCTUIManager *uiManager, NSDictionary<NSNumber *,UIView *> *viewRegistry) {
    RNSmartMapView *view = (RNSmartMapView*)viewRegistry[reactTag];
    if (!view || ![view isKindOfClass:[RNSmartMapView class]]) {
      RCTLogError(@"Cannot find SPSmartMapView with tag #%@", reactTag);
      return;
    }
    [view setCameraToBuildingRef:buildingRef
                     completion:^(SPMapResponse response) {
                       callback(@[[NSNull null], [RCTConvert SPMapResponse:response]]);
                     }];
  }];
}

RCT_EXPORT_METHOD(setCameraToObject:(nonnull NSNumber*) reactTag
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
    [view setCameraToObject:localRef
                     buildingRef:buildingRef
                       zoomLevel:[zoomLevel doubleValue]
                     completion:^(SPMapResponse response) {
                       callback(@[[NSNull null], [RCTConvert SPMapResponse:response]]);
                     }];
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

RCT_EXPORT_METHOD(addMarkers:(nonnull NSNumber*) reactTag
                  mapObjectsArray:(id)mapObjectsArray
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
    if (mapObjectsArray && [mapObjectsArray isKindOfClass:[NSArray class]]) {
        NSMutableArray* smartMapObjects = [NSMutableArray array];
        for (int i = 0; i < [mapObjectsArray count];i++) {
            id mapObject = [mapObjectsArray objectAtIndex:i];
            [smartMapObjects addObject:[RCTConvert SPSmartMapObject:mapObject]];
        }
      if (iconName && textColor && textHaloColor) {
          [view addMarkers:smartMapObjects layout:[RCTConvert SPLayout:layout] iconName:iconName textColor:textColor textHaloColor:textHaloColor];
      } else {
        [view addMarkers:smartMapObjects];
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

RCT_EXPORT_METHOD(removeMarkers:(nonnull NSNumber*) reactTag
                  mapObjectsArray:(id)mapObjectsArray)
{
  [self.bridge.uiManager addUIBlock:^(RCTUIManager *uiManager, NSDictionary<NSNumber *,UIView *> *viewRegistry) {
    RNSmartMapView *view = (RNSmartMapView*)viewRegistry[reactTag];
    if (!view || ![view isKindOfClass:[RNSmartMapView class]]) {
      RCTLogError(@"Cannot find SPSmartMapView with tag #%@", reactTag);
      return;
    }
    if (mapObjectsArray && [mapObjectsArray isKindOfClass:[NSArray class]]) {
        NSMutableArray* smartMapObjects = [NSMutableArray array];
        for (int i = 0; i < [mapObjectsArray count];i++) {
            id mapObject = [mapObjectsArray objectAtIndex:i];
            [smartMapObjects addObject:[RCTConvert SPSmartMapObject:mapObject]];
        }
      [view removeMarkers:smartMapObjects];
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

RCT_EXPORT_METHOD(getMapObject:(nonnull NSNumber*) reactTag
                  localRef:(nonnull NSString *)localRef
                  buildingRef:(nonnull NSString *)buildingRef
                  source:(nonnull NSString*)source
                  callback:(RCTResponseSenderBlock)callback)
{
  [self.bridge.uiManager addUIBlock:^(RCTUIManager *uiManager, NSDictionary<NSNumber *,UIView *> *viewRegistry) {
    RNSmartMapView *view = (RNSmartMapView*)viewRegistry[reactTag];
    if (!view || ![view isKindOfClass:[RNSmartMapView class]]) {
      RCTLogError(@"Cannot find SPSmartMapView with tag #%@", reactTag);
      return;
    }
      [view getMapObject:localRef buildingRef:buildingRef source:[RCTConvert SPObjectSource:source] completion:^(SPSmartMapObject * _Nullable mapObject, SPMapResponse response) {
          callback(@[[NSNull null], [RCTConvert SPMapResponse:response]]);
      }];
  }];
  
}

RCT_EXPORT_METHOD(animateCamera:(nonnull NSNumber*) reactTag
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
    [view animateCamera:[latitude doubleValue] longitude:[longitude doubleValue] zoomLevel:[zoomLevel doubleValue] bearing:[bearing doubleValue] pitch:[pitch doubleValue] floorIndex:[floorIndex intValue] buildingRef:buildingRef completion:^(SPMapResponse response) {
        NSLog(@"Animate Camera completed");
    }];
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

RCT_EXPORT_METHOD(animateCameraToBuildingRef:(nonnull NSNumber*) reactTag
                  buildingRef:(nonnull NSString*) buildingRef
                  callback:(RCTResponseSenderBlock)callback)
{
  [self.bridge.uiManager addUIBlock:^(RCTUIManager *uiManager, NSDictionary<NSNumber *,UIView *> *viewRegistry) {
    RNSmartMapView *view = (RNSmartMapView*)viewRegistry[reactTag];
    if (!view || ![view isKindOfClass:[RNSmartMapView class]]) {
      RCTLogError(@"Cannot find SPSmartMapView with tag #%@", reactTag);
      return;
    }
    [view animateCameraToBuildingRef:buildingRef
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

#pragma MAP Events

-(void)spSmartMapViewOnMapLoaded:(RNSmartMapView*)smartMap;
{
    if (smartMap.onMapLoaded) {
        smartMap.onMapLoaded(nil);
    }
}

-(BOOL)spSmartMapView:(RNSmartMapView*)smartMap onMapClicked:(NSArray<SPSmartMapObject*>*)objects;
{
    if (smartMap.onMapClicked) {
        smartMap.onMapClicked(@{
                               @"mapObjects": [RCTConvert convertMapObjects:objects]
                               });
    }
    return YES;
}

-(void)spSmartMapView:(RNSmartMapView*)smartMap onUserFloorChanged:(NSInteger)floorIndex buildingRef:(nullable NSString*)buildingRef;
{
    if (smartMap.onUserFloorChanged) {
        smartMap.onUserFloorChanged(@{
                                     @"floorIndex": [NSNumber numberWithInteger:floorIndex],
                                     @"buildingRef": buildingRef
                                     });
    }
}

-(void)spSmartMapView:(RNSmartMapView*)smartMap onVisibleFloorChanged:(NSInteger)floorIndex buildingRef:(nullable NSString*)buildingRef;
{
    if (smartMap.onVisibleFloorChanged) {
        smartMap.onVisibleFloorChanged(@{
                                     @"floorIndex": [NSNumber numberWithInteger:floorIndex],
                                     @"buildingRef": buildingRef
                                     });
    }
}

#pragma mark ViewStatusListener

-(void)spSmartMapView:(RNSmartMapView*)smartMap onViewStatusChanged:(SPMapViewStatus)status withPOIDetail:(nullable SPSmartMapObject*)objectDetail;
{
    if (smartMap.onViewStatusChanged) {
        smartMap.onViewStatusChanged(@{
                                      @"status": [RCTConvert SPMapViewStatus:status],
                                      @"poiDetail": [RCTConvert convertMapObjectToJSONWith:objectDetail]
                                      });
    }
}

#pragma mark NavigationEvent

-(void)spSmartMapViewOnNavigationEnded:(RNSmartMapView*)smartMap;
{
    if (smartMap.onNavigationEnded) {
        smartMap.onNavigationEnded(nil);
    }
}

-(void)onNavigationFailed:(RNSmartMapView*)smartMap withError:(SPNavigationError)error;
{
    if (smartMap.onNavigationFailed) {
        smartMap.onNavigationFailed(@{
                                     @"error": [RCTConvert SPNavigationError:error]
                                     });
    }
}

-(void)spSmartMapViewOnNavigationStarted:(RNSmartMapView*)smartMap;
{
    if (smartMap.onNavigationStarted) {
        smartMap.onNavigationStarted(nil);
    }
}

-(void)spSmartMapViewOnNavigationPreviewAppeared:(RNSmartMapView*)smartMap;
{
    if (smartMap.onNavigationPreviewAppeared) {
        smartMap.onNavigationPreviewAppeared(nil);
    }
}

-(void)spSmartMapViewOnNavigationDestinationReached:(RNSmartMapView*)smartMap;
{
    if (smartMap.onNavigationDestinationReached) {
        smartMap.onNavigationDestinationReached(nil);
    }
}

@end
