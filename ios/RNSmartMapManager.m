//
//  RNSmartMapSDK.m
//  SteerpathOfficeApp
//
//  Created by Jarvis Luong on 24/07/2019.
//  Copyright © 2019 Facebook. All rights reserved.
//

#import "RNSmartMapManager.h"
#import <Mapbox/Mapbox.h>

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

RCT_EXPORT_METHOD(setLiveConfig:(NSDictionary *)config)
{
    [[SPSmartSDK getInstance] setLiveConfiguration: config];
}

RCT_EXPORT_METHOD(fetchVersions:(RCTResponseSenderBlock)callback)
{
    NSDictionary *infoDictionary = [[NSBundle bundleForClass: [SPSmartSDK class]] infoDictionary];
    NSString *smartSDKVersion = [infoDictionary valueForKey:@"CFBundleShortVersionString"];
    NSDictionary *mapboxInfoDictionary = [[NSBundle bundleForClass: [MGLMapView class]] infoDictionary];
    NSString *mapboxVersion = [mapboxInfoDictionary valueForKey:@"CFBundleShortVersionString"];
    callback(@[@{
                   @"smartSDKVersion": smartSDKVersion,
                   @"mapboxSDKVersion": mapboxVersion
    }]);
}

RCT_EXPORT_METHOD(setLanguage:(nonnull NSString *)languageCode)
{
    [[SPSmartSDK getInstance] setLanguage: languageCode];
}

@end
