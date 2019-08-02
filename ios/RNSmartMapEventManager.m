//
//  RNSmartMapEventManager.m
//  SteerpathOfficeApp
//
//  Created by Jarvis Luong on 30/07/2019.
//  Copyright © 2019 Facebook. All rights reserved.
//

#import <Foundation/Foundation.h>
#import "RNSmartMapEventManager.h"

@implementation RNSmartMapEventManager
{
  bool hasListeners;
}

RCT_EXPORT_MODULE(RNSmartMapEventManager);

// Will be called when this module's first listener is added.
-(void)startObserving {
  hasListeners = YES;
  [[NSNotificationCenter defaultCenter] addObserver:self selector:@selector(emitEventInternal:) name:nil object:nil];
  // Set up any upstream listeners or background tasks as necessary
}

// Will be called when this module's last listener is removed, or on dealloc.
-(void)stopObserving {
  hasListeners = NO;
  [[NSNotificationCenter defaultCenter] removeObserver:self];
  // Remove upstream listeners, stop unnecessary background tasks
}

-(NSArray<NSString *> *)supportedEvents
{
  return @[@"SPSmartMapLoaded", @"SPSmartMapClicked"];
}

-(void)emitEventInternal:(NSNotification*)notification
{
  NSInteger eventIndex =[[self supportedEvents] indexOfObject:notification.name];
  if (eventIndex != NSNotFound) {
    switch (eventIndex) {
      case 1:
        // SPSmartMapClicked
        [self sendEventWithName:notification.name body:[self convertMapObjects:notification.object]];
        break;
        
      default:
        // Events with no body
        [self sendEventWithName:notification.name body:nil];
    }
    
  }
}

-(NSArray<NSDictionary*>*)convertMapObjects:(id)mapObjects
{
  if (mapObjects) {
    NSArray<SPSmartMapObject*>* convertedObjects = mapObjects;
    NSMutableArray<NSDictionary*>* convertedMapObjects = [NSMutableArray new];
    for (int i = 0; i < [convertedObjects count]; i++) {
      [convertedMapObjects addObject:[RCTConvert convertMapObjectToJSONWith:[convertedObjects objectAtIndex:i]]];
    }
    return [NSArray arrayWithArray:convertedMapObjects];
  }
  return nil;
}

@end
