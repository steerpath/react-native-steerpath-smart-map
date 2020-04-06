/* eslint-disable prefer-destructuring */
import { NativeModules, Platform } from "react-native";

const RNSmartMapManager = NativeModules.RNSmartMapManager;

interface ConfigSDK {
  apiKey: string;
  configFilePath?: string | null;
  configString?: string | null;
}

export const SmartMapManager = {
  start(apiKey: string): void {
    RNSmartMapManager.start(apiKey);
  },
  startWithConfig(config: ConfigSDK): void {
    if (Platform.OS === "web") {
      throw new Error("Not implemented");
    }
    let { configFilePath, configString } = config;

    if (configFilePath && configFilePath.startsWith("file://")) {
      // iOS only accept the path like this: /var/something/file.json
      configFilePath = configFilePath.substring(7);
    }

    RNSmartMapManager.startWithConfig({
      apiKey: config.apiKey,
      configFilePath,
      configString
    });
  },
  setLiveConfig(config: Record<string, any>): void {
    RNSmartMapManager.setLiveConfig(config);
  }
};
