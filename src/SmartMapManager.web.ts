/* eslint-disable prefer-destructuring */
import { steerpath } from "steerpath-smart-sdk";

type SmartSDK = {
  setLanguage(languageCode: String): void;
}
let smartSDKInstance: SmartSDK = {
  setLanguage: () => {}
}

export const SmartMapManager = {
  start(apiKey: string, config?: Record<string, unknown> | string): void {
    const smartSDK = new steerpath.SmartSDK();
    smartSDKInstance = smartSDK;
    smartSDK.start(apiKey, config);
  },
  /**
   * Not implemented for web. Use start() instead.
   */
  startWithConfig(): void{
     // No web implementation
  },
  setLanguage(languageCode: String): void {
    smartSDKInstance.setLanguage(languageCode);
  },
  setLiveConfig(): void {
    // No web implementation
  },
  loginToLive(): void {
    // No web implementation
  },
  logoutFromLive(): void {
    // No web implementation
  },
  fetchVersions(): void {
    // No web implementation
  }
};
