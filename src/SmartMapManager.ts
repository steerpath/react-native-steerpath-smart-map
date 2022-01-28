/* eslint-disable prefer-destructuring */
import { NativeModules, Platform } from "react-native";

const RNSmartMapManager = NativeModules.RNSmartMapManager;

interface ConfigSDK {
  apiKey: string;
  configFilePath?: string | null;
  configString?: string | null;
}

interface FetchVersionResponse {
  smartSDKVersion: string;
  mapboxSDKVersion: string;
}

export interface LiveConfig {
  transmit?: {
    id: string;
    password: string;
    title?: string;
    groups?: string[];
    geofences?: {
      neutral?: string[];
      forbidden?: string[];
      allowed?: string[];
    };
  };
  receive?: {
    showThisDevice?: boolean;
    groups?: string[];
  };
}

export const SmartMapManager = {
  start(apiKey: string): void {
    RNSmartMapManager.start(apiKey);
  },
  startWithConfig(config: ConfigSDK): void {
    if (Platform.OS === "web") {
      throw new Error("Not implemented");
    }
    let { configFilePath } = config;
    const { configString } = config;

    if (configFilePath && configFilePath.startsWith("file://")) {
      // iOS only accept the path like this: /var/something/file.json
      configFilePath = configFilePath.substring(7);
    }

    RNSmartMapManager.startWithConfig({
      apiKey: config.apiKey,
      configFilePath,
      configString,
    });
  },
  setLiveConfig(config: LiveConfig | null): void {
    RNSmartMapManager.setLiveConfig(config);
  },
  fetchVersions(callback: (versions: FetchVersionResponse) => void) {
    RNSmartMapManager.fetchVersions(callback);
  },
  setLanguage(languageCode: String): void {
    RNSmartMapManager.setLanguage(languageCode);
  }
};
