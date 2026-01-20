import type { TurboModule } from 'react-native';
import { TurboModuleRegistry } from 'react-native';

// Nested objects must be defined as separate types for Codegen
export type ConfigSDK = {
  apiKey: string;
  configFilePath?: string | null;
  configString?: string | null;
};

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
};

export interface Spec extends TurboModule {
  readonly start: (apiKey: string) => void;
  readonly startWithConfig: (config: ConfigSDK) => void;
  readonly setLiveConfig: (config: LiveConfig | null) => void;
  readonly loginToLive: (config: LiveConfig) => void;
  readonly logoutFromLive: () => void;
  readonly fetchVersion: (callback: (version: string) => void) => void;
  readonly setLanguage: (languageCode: string) => void;
}

export default TurboModuleRegistry.getEnforcing<Spec>(
  'RNSmartMapManager'
);