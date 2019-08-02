//
//  RNSmartMapEventManager.h
//  SteerpathOfficeApp
//
//  Created by Jarvis Luong on 30/07/2019.
//  Copyright © 2019 Facebook. All rights reserved.
//

#ifndef RNSmartMapEventManager_h
#define RNSmartMapEventManager_h

#import <React/RCTBridgeModule.h>
#import <React/RCTEventEmitter.h>
#import <SteerpathSmartSDK/SteerpathSmartSDK.h>
#import "RCTConvert+SmartMapView.h"

@interface RNSmartMapEventManager : RCTEventEmitter <RCTBridgeModule>

@end

#endif /* RNSmartMapEventManager_h */
