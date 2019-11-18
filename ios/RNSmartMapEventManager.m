//
//  RNSmartMapEventManager.m
//  SteerpathSmartMapSdk
//
//  Created by Jarvis Luong on 07/08/2019.
//  Copyright © 2019 Facebook. All rights reserved.
//

#import "RNSmartMapEventManager.h"

@implementation RNSmartMapEventManager
@synthesize mapView = mapView;


-(instancetype)initWithMapView:(RNSmartMapView *)mapView
{
    self = [self init];
    self.mapView = mapView;
    return self;
}

#pragma mark UserTaskEvent
// Put user task event delegate here

- (void)spSmartMapUserTask:(SPSmartMapUserTask *)userTask onUserTaskResponse:(SPSmartMapUserTaskResponse)response
{
    if (mapView.onUserTaskResponse) {
        mapView.onUserTaskResponse(@{
                                     @"response": [RCTConvert SPSmartMapUserTaskResponse:response],
                                     @"userTask": [RCTConvert convertUserTaskToJSONWith:userTask]
                                     });
    }
}


@end
