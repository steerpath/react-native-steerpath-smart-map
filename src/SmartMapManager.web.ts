/* eslint-disable prefer-destructuring */
import { steerpath } from "steerpath-smart-sdk"

declare let window: any;

export const SmartMapManager = {
  start(apiKey: string): void {
    const smartSDK = new steerpath.SmartSDK();
    smartSDK.start(apiKey)
  },
};
