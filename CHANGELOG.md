Steerpath Smart Map

# Change Log

All app release notes of react-native-steerpath-smart-map will be documented in this file. Supported platforms are Web, iOS and Android.

The format is based on [Keep a Changelog](http://keepachangelog.com/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

Date format: YYYY-MM-DD

This package is built on top of Steerpath's Smart SDK, and most of releases are made due to changes in Web or native SDK's. More details of Smart SDK releases behind the following links:<br>

- [Android](https://s3-eu-west-1.amazonaws.com/steerpath/android/documentation/smart/index.html)
- [iOS](https://s3-eu-west-1.amazonaws.com/steerpath/ios/releases/smart-sdk-changelog/index.html)
- [Web](https://s3-eu-west-1.amazonaws.com/steerpath-web-sdk/documentation/smart/latest/index.html)

## [1.12.7] - 2021-10-25
- Bump Web SDK to steerpath-smart-sdk 1.7.2
    - Bug fix for setCamera and animateCamera methods

## [1.12.6] - 2021-10-01

- Bump Android Smart SDK to android-smart-1.11.5
    - improved search
- Moved project from bitbucket to [github](https://github.com/steerpath/react-native-steerpath-smart-map)

## [1.12.5] - 2021-10-01

- Bump Android Smart SDK to android-smart-1.11.4
    - Performance fix for `getMapObjectByProperties` method

## [1.12.4] - 2021-09-10

- Bump iOS Smart SDK to 1.15.3
- Bump Android Smart SDK version to android-smart-1.11.3

## [1.12.3] - 2021-09-08

- Bump iOS Smart SDK version to 1.15.2 to fix crucial map click crash

## [1.12.2] - 2021-08-18

- Fix SearchAction typings

## [1.12.1] - 2021-08-11

- Fix `onSearchCateogySelected` callback's payload on Android 

## [1.12.0] - 2021-08-11

- Implement `onSearchCategorySelected` callback of SmartMapView for iOS and Android

## [1.11.0] - 2021-08-10

- Bump iOS Smart SDK version to 1.15.1

## [1.10.0] - 2021-04-22

- ***IMPORTANT!*** JFrog Bintray Sunset 1st May, 2021. See our native Android SDK [Migration Guide](https://s3-eu-west-1.amazonaws.com/steerpath/android/migration/index.html) for instructions how to change maven repository url.
- Bump Android Smart SDK version to android-smart-1.11.0

## [1.9.2] - 2021-04-16

- Bump Android Smart SDK version to android-smart-1.10.2 to fix a bug in map style loading when using an offline bundle

## [1.9.1] - 2021-03-19

- Android: Fixed accessibility issues of map widget components and improved bottom sheet back navigation
- Renamed `SmartMapModes` to `SmartMapMode`

## [1.9.0] - 2021-01-27

- Added `onSearchCategorySelected` callback. Currently only Web support.
- Bump web Smart SDK version to 1.5.8
- Fix `onVisibleFloorChanged` payload for web

## [1.8.4] - 2021-01-21

- Fix `onViewStatusChanged` callback values for Android

## [1.8.3] - 2021-01-12

- Bump iOS Smart SDK to 1.14.0 (improved Voice Over support)
- Bump Android Smart SDK to android-smart-1.9.0

## [1.8.2] - 2020-12-16

- Bump Android Smart SDK to android-smart-1.8.3 (fixes problem with navigation event callbacks)
- Bump iOS Smart SDK to 1.13.1 (fixes map performance issues)

## [1.8.1] - 2020-12-10

- Android: run `RNSmartMapManager.setLiveConfiguration()` in UI thread to prevent errors
- Bump Android Smart SDK version to android-smart-1.8.1
- Bump iOS Smart SDK version to 1.12.1

## [1.8.0] - 2020-11-17

- unified the units that `setWidgetPadding` and `getWidgetPadding` are using. Previously Android used pixels instead of dp, but now we use dp for all platforms and do the conversions internally.
- added `onBottomSheetStateChanged` event and `SmartBottomSheetState` enum
- bump iOS Smart SDK version to 1.12.0
- bump Android Smart SDK version to android-smart-1.8.0

## [1.7.1] - 2020-11-03

- bump Android Smart SDK version to android-smart-1.7.1 to fix issue with translations that appeared in version 1.7.0

## [1.7.0] - 2020-10-27

- added `SmartMapView.setGeoJson()`. See more details from platform specific documentations.
- bump Android Smart SDK version to android-smart-1.7.0
- bump iOS Smart SDK version to 1.11.3
- bump web Smart SDK version to 1.4.0

## [1.6.0] - 2020-10-09

- added `setWidgetPadding` and `getWidgetPadding` methods for iOS
- bump iOS Smart SDK version 1.11.1

## [1.5.1] - 2020-09-17

- added `setWidgetPadding` binding to web
- bump web Smart SDK version to 1.3.1

## [1.5.0] - 2020-09-10

- Fixed `onUserTaskResponse` callback to return correct values.
- bump iOS Smart SDK version to '1.10.32'
- bump Android Smart SDK version to 'android-smart-1.5.0'

## [1.4.0] - 2020-09-08

- added `setWidgetPadding` and `getWidgetPadding` methods. (currently only for Android)

## [1.3.3] - 2020-09-02

- Bump Web Smart SDK verison to '1.2.5'
- updated localRef in the example folder to match map data

## [1.3.2] - 2020-09-02

- Bump Android Smart SDK version to '1.3.13.2'

## [1.3.1] - 2020‑08‑24

### Changed

- Bump web Smart SDK verison to '1.2.4'
- In `onSearchResultSelected`-event wrap the mapObject inside payload object to make it same as other platforms.

## [1.3.0] - 2020‑08‑14

### Changed

- Bump Android Smart SDK version to '1.3.13.0'
- Bump iOS Smart SDK version to '1.10.29'
- Bump web Smart SDK verison to '1.2.0'

### Changed

## [1.2.1] - 2020-07-13

### Added

- `SmartMapManager.fetchVersions()` to get the version of Steerpath Smart SDK and Mapbox SDK. (iOS and Android)

### Changed

- Bump Android Smart SDK version to '1.3.10.0'

## [1.1.1] - 2020-06-24

### Changed

- Bump Android Smart SDK version to '1.3.9.10'

## [1.1.0] - 2020-06-24

Start of the change log.

Current version:

- Web '1.1.11'
- Android '1.3.9.9'
- iOS '1.10.25'
