# react-native-steerpath-smart-map-sdk

## Getting started

`$ npm install react-native-steerpath-smart-map-sdk --save`

### Mostly automatic installation

`$ react-native link react-native-steerpath-smart-map-sdk`

### Manual installation


#### iOS

1. In XCode, in the project navigator, right click `Libraries` ➜ `Add Files to [your project's name]`
2. Go to `node_modules` ➜ `react-native-steerpath-smart-map-sdk` and add `SteerpathSmartMapSdk.xcodeproj`
3. In XCode, in the project navigator, select your project. Add `libSteerpathSmartMapSdk.a` to your project's `Build Phases` ➜ `Link Binary With Libraries`
4. Run your project (`Cmd+R`)<

#### Android

1. Open up `android/app/src/main/java/[...]/MainApplication.java`
  - Add `import com.steerpath.rnsmartmap.SteerpathSmartMapSdkPackage;` to the imports at the top of the file
  - Add `new SteerpathSmartMapSdkPackage()` to the list returned by the `getPackages()` method
2. Append the following lines to `android/settings.gradle`:
  	```
  	include ':react-native-steerpath-smart-map-sdk'
  	project(':react-native-steerpath-smart-map-sdk').projectDir = new File(rootProject.projectDir, 	'../node_modules/react-native-steerpath-smart-map-sdk/android')
  	```
3. Insert the following lines inside the dependencies block in `android/app/build.gradle`:
  	```
      implementation project(':react-native-steerpath-smart-map-sdk')
  	```


## Usage
```javascript
import SteerpathSmartMapSdk from 'react-native-steerpath-smart-map-sdk';

// TODO: What to do with the module?
SteerpathSmartMapSdk;
```
