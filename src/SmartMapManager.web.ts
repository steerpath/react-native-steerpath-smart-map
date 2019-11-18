/* eslint-disable prefer-destructuring */
import { steerpath } from "steerpath-smart-sdk";

declare let window: any;

export const SmartMapManager = {
  start(apiKey: string, config?: object): void {
    const smartSDK = new steerpath.SmartSDK();
    smartSDK.start(apiKey, config);
  },
  setLiveConfig(_config: Record<string, any>): void {}
};
