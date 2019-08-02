//
//  RNSmartGeofenceManager.h
//  SteerpathOfficeApp
//
//  Created by Jarvis Luong on 26/07/2019.
//  Copyright © 2019 Facebook. All rights reserved.
//

#ifndef RNSmartGeofenceManager_h
#define RNSmartGeofenceManager_h

#import <React/RCTBridgeModule.h>
#import <React/RCTEventEmitter.h>
#import <React/RCTConvert.h>

#import "RCTConvert+SmartMapView.h"

@import SteerpathSmartSDK;

@interface RNSmartGeofenceManager : RCTEventEmitter <RCTBridgeModule, SPSmartGeofenceManagerDelegate>

@end

#endif /* RNSmartGeofenceManager_h */
