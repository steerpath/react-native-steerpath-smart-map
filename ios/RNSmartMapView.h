//
//  RNSmartMapView.h
//  SteerpathSmartMapSdk
//
//  Created by Jarvis Luong on 07/08/2019.
//  Copyright © 2019 Facebook. All rights reserved.
//

#import <SteerpathSmartSDK/SteerpathSmartSDK.h>
#import <React/RCTComponent.h>

NS_ASSUME_NONNULL_BEGIN

@interface RNSmartMapView : SPSmartMapView

@property(nonatomic, copy) RCTBubblingEventBlock onMapLoaded;
@property(nonatomic, copy) RCTBubblingEventBlock onMapClicked;
@property(nonatomic, copy) RCTBubblingEventBlock onUserFloorChanged;
@property(nonatomic, copy) RCTBubblingEventBlock onVisibleFloorChanged;

@property(nonatomic, copy) RCTBubblingEventBlock onViewStatusChanged;
@property(nonatomic, copy) RCTBubblingEventBlock onBottomSheetStateChanged;

@property(nonatomic, copy) RCTBubblingEventBlock onNavigationEnded;
@property(nonatomic, copy) RCTBubblingEventBlock onNavigationFailed;
@property(nonatomic, copy) RCTBubblingEventBlock onNavigationStarted;
@property(nonatomic, copy) RCTBubblingEventBlock onNavigationPreviewAppeared;
@property(nonatomic, copy) RCTBubblingEventBlock onNavigationDestinationReached;

@property(nonatomic, copy) RCTBubblingEventBlock onUserTaskResponse;

@property(nonatomic, copy) RCTBubblingEventBlock onSearchResultSelected;
@property(nonatomic, copy) RCTBubblingEventBlock onSearchCategorySelected;

@end

NS_ASSUME_NONNULL_END
