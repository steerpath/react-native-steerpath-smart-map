type AndroidLocationEnablerOptions = {
  interval: number;
  waitForAccurate?: boolean;
};

const promptForEnableLocationIfNeeded = (opts?: AndroidLocationEnablerOptions) => {
  // No-op on non-Android platforms
};

export { promptForEnableLocationIfNeeded };
