//
//  RNSmartGeofenceManager.m
//  SteerpathOfficeApp
//
//  Created by Jarvis Luong on 26/07/2019.
//  Copyright © 2019 Facebook. All rights reserved.
//

#import "RNSmartGeofenceManager.h"

@implementation RNSmartGeofenceManager
{
  bool hasListeners;
}

RCT_EXPORT_MODULE(RNSmartGeofenceManager);

// Will be called when this module's first listener is added.
-(void)startObserving {
  hasListeners = YES;
  [[SPSmartGeofenceManager sharedInstance] addDelegate:self];
  // Set up any upstream listeners or background tasks as necessary
}

// Will be called when this module's last listener is removed, or on dealloc.
-(void)stopObserving {
  hasListeners = NO;
  [[SPSmartGeofenceManager sharedInstance] removeDelegate:self];
  // Remove upstream listeners, stop unnecessary background tasks
}

- (NSArray<NSString *> *)supportedEvents
{
  return @[@"GeofenceEntered", @"GeofenceExited", @"BeaconfenceEntered", @"BeaconfenceExited"];
}

RCT_EXPORT_METHOD(addGeofence:(nonnull NSString *) localRef
                  buildingRef:(nonnull NSString*) buildingRef
                  callback:(RCTResponseSenderBlock) callback)
{
  SPSmartGeofenceManager* manager = [SPSmartGeofenceManager sharedInstance];
  
  [manager addGeofence:localRef building:buildingRef completion:^(SPSmartGeofenceResponseType response) {
    callback(@[[NSNull null], [RCTConvert SPSmartGeofenceResponseType:response]]);
  }];
}

RCT_EXPORT_METHOD(removeGeofence:(nonnull NSString *) localRef
                  buildingRef:(nonnull NSString*) buildingRef)
{
  SPSmartGeofenceManager* manager = [SPSmartGeofenceManager sharedInstance];
  
  [manager removeGeofence:localRef building:buildingRef];
}

RCT_EXPORT_METHOD(addBeaconfence:(nonnull NSString *)beaconId
                  radius:(nonnull NSNumber*)radiusInMeter
                  loiteringDelay:(nonnull NSNumber*)loiteringDelayInSecond
                  callback:(RCTResponseSenderBlock) callback)
{
  SPSmartGeofenceManager* manager = [SPSmartGeofenceManager sharedInstance];
  
  [manager addBeaconfence:beaconId radius:[radiusInMeter integerValue] loiteringDelay:[loiteringDelayInSecond doubleValue] completion:^(SPSmartGeofenceResponseType response) {
    callback(@[[NSNull null], [RCTConvert SPSmartGeofenceResponseType:response]]);
  }];
}

RCT_EXPORT_METHOD(removeBeaconfence:(nonnull NSString *)beaconId)
{
  SPSmartGeofenceManager* manager = [SPSmartGeofenceManager sharedInstance];
  
  [manager removeBeaconfence:beaconId];
}

- (void)spSmartGeofenceManager:(SPSmartGeofenceManager *)manager
              didEnterGeofence:(NSString *)localRef
                      building:(NSString *)buildingRef
{
  if (hasListeners) { // Only send events if anyone is listening
    [self sendEventWithName:@"GeofenceEntered" body:@{@"localRef": localRef, @"buildingRef": buildingRef}];
  }
}

- (void)spSmartGeofenceManager:(SPSmartGeofenceManager *)manager
               didExitGeofence:(NSString *)localRef
                      building:(NSString *)buildingRef
{
  if (hasListeners) { // Only send events if anyone is listening
    [self sendEventWithName:@"GeofenceExited" body:@{@"localRef": localRef, @"buildingRef": buildingRef}];
  }
}

- (void)spSmartGeofenceManager:(SPSmartGeofenceManager *)manager
           didEnterBeaconfence:(NSString *)beaconId
{
  if (hasListeners) { // Only send events if anyone is listening
    [self sendEventWithName:@"BeaconfenceEntered" body:@{@"beaconId": beaconId}];
  }
}

- (void)spSmartGeofenceManager:(SPSmartGeofenceManager *)manager
            didExitBeaconfence:(NSString *)beaconId
{
  if (hasListeners) { // Only send events if anyone is listening
    [self sendEventWithName:@"BeaconfenceExited" body:@{@"beaconId": beaconId}];
  }
  
}

@end
