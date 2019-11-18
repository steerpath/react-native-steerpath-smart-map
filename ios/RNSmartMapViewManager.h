//
//  RNSmartMapViewManager.h
//  SteerpathOfficeApp
//
//  Created by Jarvis Luong on 30/07/2019.
//  Copyright © 2019 Facebook. All rights reserved.
//

#ifndef RNSmartMapViewManager_h
#define RNSmartMapViewManager_h

#import <React/RCTViewManager.h>
#import <React/RCTUIManager.h>
#import <React/RCTConvert.h>
#import <SteerpathSmartSDK/SteerpathSmartSDK.h>
#import <Foundation/Foundation.h>

#import "RCTConvert+SmartMapView.h"
#import "RNSmartMapView.h"
#import "RNSmartMapUserTaskEventManager.h"


@interface RNSmartMapViewManager : RCTViewManager<SPSmartMapViewDelegate>

@end

#endif /* RNSmartMapViewManager_h */
