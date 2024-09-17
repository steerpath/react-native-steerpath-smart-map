//
//  RNSmartLocationManager.m
//  SteerpathSmartMapSdk
//
//  Created by Roope Vilo on 24.5.2023.
//  Copyright © 2023 Facebook. All rights reserved.
//

#import "RNSmartLocationManager.h"

@implementation RNSmartLocationManager {
    bool hasListeners;
}

RCT_EXPORT_MODULE(RNSmartLocationManager);

- (NSArray<NSString *> *)supportedEvents
{
  return @[@"locationChanged"];
}

// Start listening location updates. Starts positioning unless map has started it already.
-(void)startObserving {
    hasListeners = YES;
    dispatch_async(dispatch_get_main_queue(), ^{
        [[SPSmartLocationManager sharedInstance] addDelegate:self];
    });
}

-(void)stopObserving {
    hasListeners = NO;
    dispatch_async(dispatch_get_main_queue(), ^{
        [[SPSmartLocationManager sharedInstance] removeDelegate:self];
    });
}

-(void)spSmartLocationManager:(SPSmartLocationManager *)manager onLocationChanged:(double)latitude longitude:(double)longitude buildingRef:(nullable NSString *)buildingRef floorIndex:(NSInteger)floorIndex accuracyM:(double)accuracyM{
    if (hasListeners) {
        [self sendEventWithName:@"locationChanged" body:@{@"latitude": [NSNumber numberWithDouble:latitude], @"longitude": [NSNumber numberWithDouble:longitude], @"buildingRef": buildingRef ?: [NSNull null], @"floorIndex": [NSNumber numberWithInteger:floorIndex], @"accuracyM": [NSNumber numberWithDouble:accuracyM]}];
    }
}

@end
