# react-native-steerpath-smart-map

## Getting started

`$ npm install react-native-steerpath-smart-map --save`

or

`$ yarn add react-native-steerpath-smart-map`

## Example app

[here](https://bitbucket.org/nimbledevices/react-native-steerpath-smartmap/src/master/example/)

### Mostly automatic installation

We only support Cocoapod linking for iOS at the moment

#### For iOS

In your `ios/Podfile`, add the following lines to the top it:

```ruby
source 'https://github.com/CocoaPods/Specs.git'
source 'https://bitbucket.org/nimbledevices/steerpath-mapbox-ios-podspec.git'
source 'https://bitbucket.org/nimbledevices/steerpath-smart-sdk-podspec.git'
```

Run:

`$ pod install`

### For Android

In your `android/app/build.gradle`, add the following lines before the
`dependencies {}` block:

```gradle
repositories {
    // For Steerpath Smart Map SDK
    maven { url "https://android-sdk.steerpath.net" }
}
```

If you are using React-Native < 0.60:
`$ react-native link react-native-steerpath-smart-map`

## Run the example app

```bash
$ cd example
$ yarn install --force
$ cd ios
$ pod update
$ cd ..
$ react-native run-ios # for ios
$ react-native run-android # for android
```

## Usage

```javascript
import {
  SmartMapView,
  SmartMapManager,
} from "react-native-steerpath-smart-map";
const API_KEY = "...";

SmartMapManager.start(API_KEY);

<SmartMapView
  style={{ flex: 1 }}
  apiKey={API_KEY} // This is required only if you are using this component in the web
/>;
```

## Using configuration file (optional)

General naming for the configuration file is steerpath_config.json. If your Smart SDK Api Key requires other naming, name your configuration file according to that. There are two options of how to use config file:

1. Add configuration file to your react native project folder and use startWithConfig(iOS/Android) or start(web) method of SmartMapMananger. See [config.js](https://bitbucket.org/nimbledevices/react-native-steerpath-smartmap/src/master/example/src/config.js) and [App.tsx](https://bitbucket.org/nimbledevices/react-native-steerpath-smartmap/src/master/example/src/App.tsx) or [App.web.tsx](https://bitbucket.org/nimbledevices/react-native-steerpath-smartmap/src/master/example/src/App.web.tsx) of our example application.

2. Add a configuration file to your project. See platform specific instructions below.

### Android: 

Add configuration file to ***/src/main/assets*** folder of your Android project.

### iOS

Add configuration file to your Xcode project and select your application target

### Web

Add config file to your project and export it from there to the component where the **SmartMapManager.start()** is initialised. You can pass the config file as the second parameter to the **start()** method as a string. Below is the TypeScript snippet from the example project:

```javascript
(SmartMapManager as { start: (apiKey: string, config: Record<string, unknown>) => void }).start(
  API_KEY,
  JSON.parse(CONFIG_STRING),
);
```

## Using offline bundle (Optional)

OfflineBundle (.sff) is a package containing indoor map tiles, (world tiles excluded), map style, routing data, positioning data and map object meta data. With OfflineBundle, maps & indoor positioning works without network connection.

### Android

Steps to enable OfflineBundle

1. Copy provided .sff file into your application project's /assets folder
2. Add following flag to your app's Manifest.xml:

```xml
<meta-data android:name="SP_OFFLINE_DATA" android:value="theNameOfYourOffineBundle.sff"/>
```

### iOS

The offline bundle should have “.sff” extension. Rename it to “sp_offline_data.sff” and drag it to your Xcode project. Select “Copy items if needed” and select your application target.

The default offline data file name is “sp_offline_data.sff”. If you want to use a custom name, you can add the following key to your application’s Info.plist (Please make sure that the offline data file name matches):

```xml
<key>SP_OFFLINE_DATA</key>
<string>sp_offline_data.sff</string>
```

### Web

Using the offline bundle with react-native-steerpath-smartmap package on web platform is not yet supported. You can use the example of Steerpath Core SDK found in the Offline bundle ***./style*** folder to view maps.

## Documentation

- [<SmartMapView /> Component API](https://bitbucket.org/nimbledevices/react-native-steerpath-smartmap/src/master/docs/SmartMapView.md)
- [SmartGeofenceManager API](https://bitbucket.org/nimbledevices/react-native-steerpath-smartmap/src/master/docs/SmartMapManager.md)
- [SmartMapManager API](https://bitbucket.org/nimbledevices/react-native-steerpath-smartmap/src/master/docs/SmartMapManager.md)

## For Steerpath Developer

### Publishing a new version:

- For development

For the first time: Run `yarn install && yarn build` in the root project, then go to example and run
`yarn install` again.

Everytime making changes in the root project, run `yarn build` again and go to
example project and `yarn add react-native-steerpath-smart-map --force` to see
the changes in the example project. Make any changes to the example project if necessary.

- For releasing

Run the Typescript compiler and then npm publish:

```bash
$ yarn build
$ yarn publish
```
