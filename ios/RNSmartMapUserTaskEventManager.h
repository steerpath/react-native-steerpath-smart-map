//
//  RNSmartMapUserTaskEventManager.h
//  Pods
//
//  Created by Jarvis Luong on 18.11.2019.
//

#ifndef RNSmartMapUserTaskEventManager_h
#define RNSmartMapUserTaskEventManager_h

@interface RNSmartMapUserTaskEventManager : NSObject <SPSmartMapUserTaskDelegate>

-(instancetype)initWithMapView:(RNSmartMapView*)mapView;

@property (nonatomic) RNSmartMapView* mapView;

@end

#endif /* RNSmartMapUserTaskEventManager_h */
