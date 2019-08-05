# react-native-steerpath-smart-map-sdk

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
<script src="https://s3-eu-west-1.amazonaws.com/steerpath-web-sdk/releases/smart/1.0.11/steerpath-smart-1.0.11.min.js"></script>
<link href="https://s3-eu-west-1.amazonaws.com/steerpath-web-sdk/releases/smart/1.0.11/steerpath-smart-1.0.11.css" rel="stylesheet">
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
import SteerpathSmartMapSdk from 'react-native-steerpath-smart-map';

// TODO: What to do with the module?
SteerpathSmartMapSdk;
```

## For Steerpath Developer

### Publishing a new version:

Run the Typescript compiler and then npm publish:

```bash
$ yarn build
$ yarn publish
```


