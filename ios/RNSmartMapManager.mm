#import "RNSmartMapManager.h"
#import <SteerpathSmartSDK/SteerpathSmartSDK.h> // Example import for native SDK

@implementation RNSmartMapManager

RCT_EXPORT_MODULE(RNSmartMapManager);

// --- START ---
RCT_EXPORT_METHOD(start:(NSString *)apiKey)
{
    [[SPSmartSDK getInstance] start:apiKey];
}

// --- START WITH CONFIG ---
RCT_EXPORT_METHOD(startWithConfig:(NSDictionary *)config)
{
    NSString* apiKey = config[@"apiKey"];
    NSString* configFilePath = config[@"configFilePath"];
    
    if (![apiKey isKindOfClass:[NSString class]]) return;
    
    // In 2.0, we treat configFilePath as optional
    if ([configFilePath isKindOfClass:[NSString class]]) {
        [[SPSmartSDK getInstance] start:apiKey config:configFilePath];
    } else {
        [[SPSmartSDK getInstance] start:apiKey];
    }
}

// --- LIVE CONFIG & LOGIN ---
// 2026 Note: We move UI-sensitive calls to main thread for stability
RCT_EXPORT_METHOD(loginToLive:(NSDictionary *)config)
{
    dispatch_async(dispatch_get_main_queue(), ^{
        [[SPSmartSDK getInstance] loginToLive:config];
    });
}

RCT_EXPORT_METHOD(logoutFromLive)
{
    dispatch_async(dispatch_get_main_queue(), ^{
        [[SPSmartSDK getInstance] logoutFromLive];
    });
}

#ifdef RCT_NEW_ARCH_ENABLED
- (void)fetchVersion:(RCTResponseSenderBlock)callback {
    [self _fetchVersionInternal:callback];
}
#else
RCT_EXPORT_METHOD(fetchVersion:(RCTResponseSenderBlock)callback) {
    [self _fetchVersionInternal:callback];
}
#endif

- (void)_fetchVersionInternal:(RCTResponseSenderBlock)callback {
    // Get the version string
    NSString *smartVersion = [[NSBundle bundleForClass:[SPSmartSDK class]]
                              infoDictionary][@"CFBundleShortVersionString"];
    
    // Return ONLY the string inside the array
    // This will appear as a single string argument in your JS callback
    callback(@[smartVersion ?: @"unknown"]);
}

RCT_EXPORT_METHOD(setLanguage:(NSString *)languageCode)
{
    [[SPSmartSDK getInstance] setLanguage:languageCode];
}

// --- NEW ARCHITECTURE BOILERPLATE ---
#ifdef RCT_NEW_ARCH_ENABLED
- (std::shared_ptr<facebook::react::TurboModule>)getTurboModule:
    (const facebook::react::ObjCTurboModule::InitParams &)params
{
    return std::make_shared<facebook::react::NativeRNSmartMapManagerSpecJSI>(params);
}
#endif

@end
