# react-native-steerpath-smart-map-sdk

## Getting started

`$ npm install react-native-steerpath-smart-map-sdk --save`

or 

`$ yarn add react-native-steerpath-smart-map-sdk`

### Mostly automatic installation

We only support Cocoapod linking for iOS at the moment

In your Podfile, add the following lines to the top it:

```ruby
source 'https://github.com/CocoaPods/Specs.git'
source 'https://bitbucket.org/nimbledevices/steerpath-mapbox-ios-podspec.git'
source 'https://bitbucket.org/nimbledevices/steerpath-smart-sdk-podspec.git'
```

For React-Native < 0.60:
`$ react-native link react-native-steerpath-smart-map-sdk`

Run:

`$ pod install`

## Usage
```javascript
import SteerpathSmartMapSdk from 'react-native-steerpath-smart-map-sdk';

// TODO: What to do with the module?
SteerpathSmartMapSdk;
```
