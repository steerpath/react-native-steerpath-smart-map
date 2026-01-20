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

// --- Supported Events ---
// Required for both architectures to know which strings can be sent
- (NSArray<NSString *> *)supportedEvents {
    return @[@"locationChanged"];
}

// --- Lifecycle & Observation ---
// These are called automatically by NativeEventEmitter when JS adds/removes listeners
- (void)startObserving {
    hasListeners = YES;
    dispatch_async(dispatch_get_main_queue(), ^{
        [[SPSmartLocationManager sharedInstance] addDelegate:self];
    });
}

- (void)stopObserving {
    hasListeners = NO;
    dispatch_async(dispatch_get_main_queue(), ^{
        [[SPSmartLocationManager sharedInstance] removeDelegate:self];
    });
}

// --- New Architecture Methods ---
// These map to the methods we defined in NativeSmartLocationManager.ts
RCT_EXPORT_METHOD(startUpdatingLocation) {
    [self startObserving];
}

RCT_EXPORT_METHOD(stopUpdatingLocation) {
    [self stopObserving];
}

// --- Delegate Callback ---
- (void)spSmartLocationManager:(SPSmartLocationManager *)manager
             onLocationChanged:(double)latitude
                     longitude:(double)longitude
                   buildingRef:(nullable NSString *)buildingRef
                    floorIndex:(NSInteger)floorIndex
                     accuracyM:(double)accuracyM {
    
    // Only send if JS is actually listening to save CPU/Memory
    if (hasListeners) {
        [self sendEventWithName:@"locationChanged"
                           body:@{
                               @"latitude": @(latitude),
                               @"longitude": @(longitude),
                               @"buildingRef": buildingRef ?: [NSNull null],
                               @"floorIndex": @(floorIndex),
                               @"accuracyM": @(accuracyM)
                           }];
    }
}

// --- TurboModule Boilerplate ---
#ifdef RCT_NEW_ARCH_ENABLED
- (std::shared_ptr<facebook::react::TurboModule>)getTurboModule:
    (const facebook::react::ObjCTurboModule::InitParams &)params {
    return std::make_shared<facebook::react::NativeSmartLocationManagerSpecJSI>(params);
}
#endif

@end
