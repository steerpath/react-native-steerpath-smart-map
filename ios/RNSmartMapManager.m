//
//  RNSmartMapSDK.m
//  SteerpathOfficeApp
//
//  Created by Jarvis Luong on 24/07/2019.
//  Copyright © 2019 Facebook. All rights reserved.
//

#import "RNSmartMapManager.h"

@implementation RNSmartMapManager

RCT_EXPORT_MODULE(RNSmartMapManager);

RCT_EXPORT_METHOD(start:(NSString *) apiKey)
{
  [[SPSmartSDK getInstance] start: apiKey];
}

@end
