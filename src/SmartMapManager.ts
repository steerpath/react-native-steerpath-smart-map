/* eslint-disable prefer-destructuring */
import { NativeModules, Platform } from "react-native";
export type ConfigSDK = {
  apiKey: string;
  configFilePath?: string | null;
  configString?: string | null;
}

const RNSmartMapManager = NativeModules.RNSmartMapManager;

export type LiveConfig = {
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
    showsThisDevice?: boolean;
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
  /**
   * Share user location by setting transmit options and show live updates on map by setting receive options.
   * 
   * Leave transmit out of the config if you don't want to share location and receive out if you don't want updates to map.
   * 
   * @param config 
   */
  loginToLive(config: LiveConfig): void {
    RNSmartMapManager.loginToLive(config);
  },
  /**
   * Stop sharing user location and receiving live updates. Call loginToLive to start again.
   */
  logoutFromLive(): void {
    RNSmartMapManager.logoutFromLive();
  },
  fetchVersion(callback: (version: string) => void) {
    RNSmartMapManager.fetchVersion(callback);
  },
};
