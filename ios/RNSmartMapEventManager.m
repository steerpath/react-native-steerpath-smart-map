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

#pragma mark MapEvents

-(void)onMapLoaded
{
    if (mapView.onMapLoaded) {
        mapView.onMapLoaded(nil);
    }
}

- (BOOL)onMapClicked:(NSArray<SPSmartMapObject *> *)objects
{
    if (mapView.onMapClicked) {
        mapView.onMapClicked(@{
                               @"mapObjects": [RCTConvert convertMapObjects:objects]
                               });
    }
    return YES;
}

- (void)onUserFloorChanged:(NSInteger)floorIndex buildingRef:(NSString *)buildingRef
{
    if (mapView.onUserFloorChanged) {
        mapView.onUserFloorChanged(@{
                                     @"floorIndex": [NSNumber numberWithInteger:floorIndex],
                                     @"buildingRef": buildingRef
                                     });
    }
}

- (void)onVisibleFloorChanged:(NSInteger)floorIndex buildingRef:(NSString *)buildingRef
{
    if (mapView.onVisibleFloorChanged) {
        mapView.onVisibleFloorChanged(@{
                                     @"floorIndex": [NSNumber numberWithInteger:floorIndex],
                                     @"buildingRef": buildingRef
                                     });
    }
}

#pragma mark ViewStatusListener

-(void)onViewStatusChanged:(SPMapViewStatus)status withPOIDetail:(SPSmartMapObject *)objectDetail
{
    
}

#pragma mark NavigationEvent

- (void)onNavigationEnded
{
    if (mapView.onNavigationEnded) {
        mapView.onNavigationEnded(nil);
    }
}

-(void)onNavigationFailed:(SPNavigationError)error
{
    
}

- (void)onNavigationStarted
{
    if (mapView.onNavigationStarted) {
        mapView.onNavigationStarted(nil);
    }
}

- (void)onNavigationPreviewAppeared
{
    if (mapView.onNavigationPreviewAppeared) {
        mapView.onNavigationPreviewAppeared(nil);
    }
}

- (void)onNavigationDestinationReached
{
    if (mapView.onNavigationDestinationReached) {
        mapView.onNavigationDestinationReached(nil);
    }
}

#pragma mark UserTaskEvent
// Put user task event delegate here

- (void)spSmartMapUserTask:(SPSmartMapUserTask *)userTask onUserTaskResponse:(SPSmartMapUserTaskResponse)response
{
    
}


@end
