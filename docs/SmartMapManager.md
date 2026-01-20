### SmartMapManager API.

| Function | Arguments | Platform | Note |
|:---|:---|:---|:------|
| `fetchVersion` | `callback: (version: string) => void` | iOS/Android |Use to fetch Steerpath Smart SDK version |
| `loginToLive` | `config: LiveConfig ⎮ null` | iOS/Android |Share location and receive live updates to map. Leave transmit or receive out from the config if you don't want to either share location or get map updates.|
| `logoutFromLive` | | iOS/Android |Stop location sharing and updates. Call loginToLive to start again.|
| `start` | `apiKey: string` | iOS/Android |Call this before using any smart map api. |
| `start` | `apiKey: string, config: Record<string, unknown> ⎮ string` | Web |Call this before using any smart map api. |
| `startWithConfig` | `config: ConfigSDK` | iOS/Android |Use instead of plain `start` command to start the smart SDK with configuration file |

