/* eslint-disable prefer-destructuring */
import { NativeModules, Platform, TurboModuleRegistry } from "react-native";
import { Spec } from './NativeSmartMapManager';

export interface ConfigSDK {
  apiKey: string;
  configFilePath?: string | null;
  configString?: string | null;
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
    showsThisDevice?: boolean;
    groups?: string[];
  };
}

declare var global: {
  __turboModuleProxy: any;
};

const isTurboModuleEnabled = global.__turboModuleProxy != null;

const RNSmartMapManager = isTurboModuleEnabled
  ? TurboModuleRegistry.get<Spec>('RNSmartMapManager')
  : NativeModules.RNSmartMapManager;

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
   * 
   * @deprecated Use loginToLive instead.
   */
  setLiveConfig(config: LiveConfig | null): void {
    RNSmartMapManager.setLiveConfig(config);
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
  setLanguage(languageCode: String): void {
    RNSmartMapManager.setLanguage(languageCode);
  }
};
