# react-native-steerpath-smart-map

> Warning: This module is still under active development and not suitable for
> production. Use at your own risk!

## Getting started

`$ npm install react-native-steerpath-smart-map --save`

or 

`$ yarn add react-native-steerpath-smart-map`

### Mostly automatic installation

We only support Cocoapod linking for iOS at the moment

#### For iOS

In your `ios/Podfile`, add the following lines to the top it:

```ruby
source 'https://github.com/CocoaPods/Specs.git'
source 'https://bitbucket.org/nimbledevices/steerpath-mapbox-ios-podspec.git'
source 'https://bitbucket.org/nimbledevices/steerpath-smart-sdk-podspec.git'
```

### For Android

In your `android/app/build.gradle`, add the following lines before the
`dependencies {}` block:

```gradle
repositories {
    // For Steerpath Smart Map SDK
    maven { url "http://steerpath.bintray.com/steerpath" }
}
```

If you are using React-Native < 0.60:
`$ react-native link react-native-steerpath-smart-map`

Run:

`$ pod install`

### To use this SDK for the web:

You need to add the following lines to your html file (`index.html` if using
`create-react-app`):

```html
<script src="https://s3-eu-west-1.amazonaws.com/steerpath-web-sdk/releases/smart/1.0.14/steerpath-smart-1.0.14.min.js"></script>
<link href="https://s3-eu-west-1.amazonaws.com/steerpath-web-sdk/releases/smart/1.0.14/steerpath-smart-1.0.14.css" rel="stylesheet">
```

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
import {SmartMapView, SmartMapManager} from 'react-native-steerpath-smart-map';
const API_KEY = '...'

SmartMapManager.start(API_KEY); // This is not required in the web platform

<SmartMapView
    style={{flex: 1}}
    apiKey={API_KEY} // This is required only if you are using this component in the web
/>;
```

## Documentation

* [<SmartMapView /> Component API](https://bitbucket.org/nimbledevices/react-native-steerpath-smartmap/src/master/docs/SmartMapView.md)
* [SmartGeofenceManager API](https://bitbucket.org/nimbledevices/react-native-steerpath-smartmap/src/master/docs/SmartMapManager.md)
* [SmartMapManager API](https://bitbucket.org/nimbledevices/react-native-steerpath-smartmap/src/master/docs/SmartMapManager.md)

## For Steerpath Developer

### Publishing a new version:

* For development

For the first time: Run `yarn install && yarn build` in the root project, then go to example and run
`yarn install` again.

Everytime making changes in the root project, run `yarn build` again and go to
example project and `yarn add react-native-steerpath-smart-map --force` to see
the changes in the example project. Make any changes to the example project if necessary.

* For releasing 

Run the Typescript compiler and then npm publish:

```bash
$ yarn build
$ yarn publish
```


