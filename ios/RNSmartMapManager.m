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

RCT_EXPORT_METHOD(startWithConfig:(nonnull NSDictionary *)config)
{
    NSString* apiKey = [config objectForKey:@"apiKey"];
    NSString* configFilePath = [config objectForKey:@"configFilePath"];
    
    if (!apiKey || !configFilePath || ![apiKey isKindOfClass:[NSString class]] || ![configFilePath isKindOfClass:[NSString class]]) {
        return;
    }
    
    [[SPSmartSDK getInstance] start:apiKey config:configFilePath];
}

RCT_EXPORT_METHOD(loginToLive:(NSDictionary *)config)
{
    // TODO: call loginToLive in the native iOS Smart SDK on main thead instead of here
    dispatch_async(dispatch_get_main_queue(), ^{
        [[SPSmartSDK getInstance] loginToLive: config];
    });
}

RCT_EXPORT_METHOD(logoutFromLive)
{
    // TODO: call logoutFrom in the native iOS Smart SDK on main thead instead of here
    dispatch_async(dispatch_get_main_queue(), ^{
        [[SPSmartSDK getInstance] logoutFromLive];
    });
    
}

RCT_EXPORT_METHOD(fetchVersion:(RCTResponseSenderBlock)callback)
{
    NSDictionary *infoDictionary = [[NSBundle bundleForClass: [SPSmartSDK class]] infoDictionary];
    NSString *smartSDKVersion = [infoDictionary valueForKey:@"CFBundleShortVersionString"];
    
    // Check if version is nil to avoid a crash when creating the array
    if (smartSDKVersion == nil) {
        smartSDKVersion = @"Unknown";
    }

    // Pass the string as the first and only element of the array
    callback(@[smartSDKVersion]);
}

@end
