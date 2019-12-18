/* eslint-disable prefer-destructuring */
import { NativeModules, Platform } from "react-native";

const RNSmartMapManager = NativeModules.RNSmartMapManager;

interface ConfigSDK {
  apiKey: string;
  configFilePath: string;
}

export const SmartMapManager = {
  start(apiKey: string): void {
    RNSmartMapManager.start(apiKey);
  },
  startWithConfig(config: ConfigSDK): void {
    if (Platform.OS === 'web') {
      throw new Error('Not implemented');
    }
    let { configFilePath } = config;
    if (configFilePath.startsWith("file://")) {
      // iOS only accept the path like this: /var/something/file.json
      configFilePath = configFilePath.substring(7);
    }
    RNSmartMapManager.startWithConfig({
      apiKey: config.apiKey,
      configFilePath
    });
  },
  setLiveConfig(config: Record<string, any>): void {
    if (Platform.OS === "ios") {
      RNSmartMapManager.setLiveConfig(config);
    }
  }
};
