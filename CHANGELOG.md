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

## [1.29.0] - 2024-07-29

- Bump Android Smart SDK version to android-smart-1.23.0. This SDK version includes new foreground service type and permission to support Android 14.

## [1.28.0] - 2024-07-23

- Set namespace to project level build.gradle file to support Gradle Plugin 8

## [1.27.0] - 2024-03-26

- **BREAKING** Added accuracyM value to onLocationChanged callback
- Added typing for the onLocationChanged callback - LocationResponse

## [1.26.1] - 2023-03-11

- Bump Android Smart SDK version to android-smart-1.21.5
    - Fixes native crash caused by March 2024 security update

## [1.26.0] - 2023-12-05

- Add loginToLive and logoutFromLive methods for iOS and Android
- Deprecated setLiveConfiguration
- Changed showThisDevice to showsThisDevice in LiveConfig
- Bump iOS Smart SDK version to 1.18.0

## [1.25.3] - 2023-12-04

- Bump Android Smart SDK version to android-smart-1.21.4

## [1.25.2] - 2023-11-29

- Bump Android Smart SDK version to android-smart-1.21.3

## [1.25.1] - 2023-11-23

- Bump Android Smart SDK version to android-smart-1.21.2

## [1.25.0] - 2023-11-15

- Bump web Smart SDK version to 2.3.0

## [1.24.0] - 2023-06-29

- Added SmartLocationManager to listen for user location updates

## [1.23.2] - 2023-06-26

- Bump iOS Smart SDK version to 1.17.2
    - Fixes an issue where indoor map went blank after returning app from background 

## [1.23.1] - 2023-05-25

- Fix live category search for iOS
    - Bump iOS Smart SDK to version 1.17.1

## [1.23.0] - 2023-05-25

- New icons!
    - Bump Android Smart SDK to version android-smart-1.21.0
    - Bump iOS Smart SDK to version 1.17.0


## [1.22.1] - 2023-05-09

- Bump iOS Smart SDK to version 1.16.6 to resolve crashes happening when cancelling user tasks
- Fixed iOS bindings for POISelectionUserTask

## [1.22.0] - 2023-04-24

- Fixed issues where buildings or some POIs were not selectable when using onSearchResultSelected and selectMapObject combination
- Bump Android Smart SDK version to android-smart-1.20.0
- Bump iOS Smart SDK version to 1.16.5

## [1.21.0]- 2023-04-14

- Added externalFeedbackUrl to SmartMapObjectProperties
- Bump iOS Smart SDK version to 1.16.4

## [1.20.0] - 2023-03-02

- Added missing configString prop to ConfigSDK interface
- Bump iOS Smart SDK version to 1.16.3
- Bump Android Smart SDK version to android-smart-1.19.1
- Bump Web Smart SDK version to 2.2.8

## [1.19.2] - 2023-02-14

- Bump Web Smart SDK version to 2.2.7
- Bump Android Smart SDK version to android-smart-1.18.0
- Bump iOS Smart SDK version to 1.16.2

## [1.19.1] - 2023-02-10

- Web to return camera options from callback in getSmartMapCameraOptions

## [1.19.0] - 2023-02-06

- Bump Android Smart SDK version to android-smart-1.17.1

## [1.18.0] - 2023-01-13

- New API: SmartMapView.getSmartMapCameraOptions()
- Bump Android Smart SDK version to android-smart-1.16.0
- Bump iOS Smart SDK version to 1.16.1
- Bump Web SDK version to 2.2.6

## [1.17.7] - 2022-11-25

- Update web sdk

## [1.17.6] - 2022-11-25

- Better default values for camera animations

## [1.17.5] - 2022-11-15

- Localization updates to example app and updated documentation

## [1.17.4] - 2022-11-10

- Bump Android Smart SDK to version android-smart-1.15.2

## [1.17.3] - 2022-11-04

- Bump Android Smart SDK to version android-smart-1.15.1

## [1.17.2] - 2022-11-03

- Bump iOS Smart SDK to version 1.15.14

## [1.17.1]

- Bump Web Smart SDK version to 2.2.2
## [1.17.0] - 2022-10-06

- Bump Android Smart SDK version to android-smart-1.15.0
    - Introduced new Bluetooth scan and Bluetooth connect runtime permissions
    - target and compile sdk versions bumped to 31

## [1.16.7] - 2022-09-05

- Bump Android Smart SDK version to android-smart-1.14.8

## [1.16.6] - 2022-09-05

- Bump Android Smart SDK version to android-smart-1.14.7

## [1.16.5] - 2022-08-18

- Bump iOS Smart SDK version to 1.15.13
- Bump Android SDK version to android-smart-1.14.6

## [1.16.4] - 2022-07-26

- Bump Web Smart SDK version to 2.1.4

## [1.16.3] - 2022-07-26

- Bump Web Smart SDK version to 2.1.3

## [1.16.2] - 2022-06-16

- Bump iOS Smart SDK version to 1.15.12
- Bump Android Smart SDK version to android-smart-1.14.5

## [1.16.1] - 2022-06-08

- Fixed typoes in localized description properties in SmartMapObjectProperties interface. These props are optional.

## [1.16.0] - 2022-06-01

- Update build.gradle to make the library compatible with apps using gradle version 7+
- Update example app's react native version to 0.68.1

## [1.15.5] - 2022-05-11

- Bump Web Smart SDK to 2.1.2

## [1.15.4] - 2022-05-11

- Bump Android Smart SDK to android-smart-1.14.4
- Update default gradle plugin version to 4.0.2

## [1.15.3] - 2022-04-01

- Improved typings for SmartMapObject

## [1.15.0] - 2022-03-24

- Bump Android Smart SDK to android-smart-1.14.3

## [1.14.2] - 2022-02-16

- Bump iOS Smart SDK version to 1.15.11

## [1.14.1] - 2022-02-01

- Bump iOS Smart SDK to 1.15.10 (fixes an issue where search bottom sheet was cut off from the bottom)

## [1.14.0] - 2022-01-28
- Added ```setLanguage()``` API which sets the language that the SDK will use in search. The method setLanguage() takes one parameter ```languageCode``` which is one of the language codes listed in the config file's ```supportedLanguages```-array.
```
"defaultLanguage": "fi-FI",
"supportedLanguages": [
    "en-GB",
    "fi-FI",
    "sv-SE",
    "nb-NO"
],
```
Example: ``` SmartMapManager.setLanguage('en-GB')```
## [1.13.1] - 2022-01-25

- Bump Android Smart SDK to android-smart-1.14.1

## [1.13.0] - 2022-01-24

- Bump Web Smart SDK to 2.0.2
- Bump iOS Smart SDK to 1.15.8

## [1.12.12] - 2021-12-07

- Bump Android Smart SDK to android-smart-1.14.0

## [1.12.11] - 2021-11-22

- Bump iOS Smart SDK to 1.15.7 to make the search UI work again.

## [1.12.10] - 2021-11-22

Special release where search UI is completely disabled on iOS. Not recommended to use this.

- Bump iOS Smart SDK to 1.15.6
- Use default marker of the style when iconImage is not defined in addMarkers or addMarker methods
## [1.12.9] - 2021-11-12

- Bump iOS Smart SDK to 1.15.5
- Bump Android Smart SDK to android-smart-1.12.1

## [1.12.8] - 2021-10-27

- Bump iOS Smart SDK to 1.15.4

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
