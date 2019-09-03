//
//  RNSmartMapEventManager.h
//  SteerpathSmartMapSdk
//
//  Created by Jarvis Luong on 07/08/2019.
//  Copyright © 2019 Facebook. All rights reserved.
//

#import <Foundation/Foundation.h>
#import "RNSmartMapView.h"
#import "RCTConvert+SmartMapView.h"

NS_ASSUME_NONNULL_BEGIN

@interface RNSmartMapEventManager : NSObject <SPSmartMapUserTaskDelegate, SPSmartMapViewDelegate>

-(instancetype)initWithMapView:(RNSmartMapView*)mapView;

@property (nonatomic) RNSmartMapView* mapView;

@end

NS_ASSUME_NONNULL_END
