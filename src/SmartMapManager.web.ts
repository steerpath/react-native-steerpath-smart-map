/* eslint-disable prefer-destructuring */
import { steerpath } from "steerpath-smart-sdk";

export const SmartMapManager = {
  start(apiKey: string, config?: Record<string, unknown> | string): void {
    const smartSDK = new steerpath.SmartSDK();
    smartSDK.start(apiKey, config);
  },
};
