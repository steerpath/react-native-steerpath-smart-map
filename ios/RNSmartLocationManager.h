//
//  RNSmartLocationManager.h
//  SteerpathSmartMapSdk
//
//  Created by Roope Vilo on 24.5.2023.
//  Copyright © 2023 Facebook. All rights reserved.
//

#ifndef RNSmartLocationManager_h
#define RNSmartLocationManager_h

#import <React/RCTBridgeModule.h>
#import <React/RCTEventEmitter.h>

@import SteerpathSmartSDK;

@interface RNSmartLocationManager : RCTEventEmitter<RCTBridgeModule, SPSmartLocationManagerDelegate>

@end


#endif /* RNSmartLocationManager_h */
