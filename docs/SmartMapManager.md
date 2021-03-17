### SmartMapManager API.

| Function | Arguments | Platform | Note |
|:---|:---|:---|:------|
| `fetchVersions` | `callback: (versions: FetchVersionResponse) => void` | iOS/Android | Use to fetch Steerpath Smart SDK and Mapbox versions |
| `setLiveConfig` | `config: LiveConfig ⎮ null` | iOS/Android | Used to login or logout user from Steerpath LIVE. Use null value to stop the live service. |
| `start` | `apiKey: string` | iOS/Android | Call this before using any smart map api. |
| `start` | `apiKey: string, config: Record<string, unknown> ⎮ string` | Web | Call this before using any smart map api. |
| `startWithConfig` | `config: ConfigSDK` | iOS/Android | Use instead of plain `start` command to start the smart SDK with configuration file |

