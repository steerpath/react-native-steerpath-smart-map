### SmartMapManager API.

| Function | Arguments | Platform | Note |
|:---|:---|:---|:------|
| `fetchVersions` | `callback: (versions: FetchVersionResponse) => void` | iOS/Android |Use to fetch Steerpath Smart SDK and Mapbox versions |
| `setLiveConfig` | `config: LiveConfig ⎮ null` | iOS/Android |**Deprecated.** Use loginToLive and logoutFromLive instead.|
| `loginToLive` | `config: LiveConfig ⎮ null` | iOS/Android |Share location and receive live updates to map. Leave transmit or receive out from the config if you don't want to either share location or get map updates.|
| `logoutFromLive` | | iOS/Android |Stop location sharing and updates. Call loginToLive to start again.|
| `start` | `apiKey: string` | iOS/Android |Call this before using any smart map api. |
| `start` | `apiKey: string, config: Record<string, unknown> ⎮ string` | Web |Call this before using any smart map api. |
| `startWithConfig` | `config: ConfigSDK` | iOS/Android |Use instead of plain `start` command to start the smart SDK with configuration file |
| `setLanguage` | `languageCode: string` | All platforms |3Sets the language for the search engine (doesn't affect UI). <br/><br/>To change the language of the UI components, see comment in example/src/App.tsx |

