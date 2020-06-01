import React, { useState, useRef, useEffect } from "react";
import {
  SmartMapManager,
  SmartMapView,
} from "react-native-steerpath-smart-map";
import RNFS, { setReadable } from "react-native-fs";
import Drawer from "./Drawer.js";
import { View, Platform } from "react-native";
import { CONFIG_STRING, LIVE_CONFIG } from "./config.js";

const CONFIG_FILE_PATH = RNFS.DocumentDirectoryPath + "/steerpath_config.json";

const API_KEY = Platform.select({
  web:
    "eyJhbGciOiJSUzI1NiJ9.eyJpYXQ6IjoxNTY0NDEwMjIxLCJqdGkiOiIwOGViODMyMi01ZGM1LTRkNTMtYjJmYy02NDllOTdlNzhjMjkiLCJzY29wZXMiOiJ2Mi1kNGQzNmI5Zi1lOGZiLTQ4MDctYTBjNS1lZDk3MzM0NGI2MDktcHVibGlzaGVkOnIiLCJzdWIiOiJ2Mi1kNGQzNmI5Zi1lOGZiLTQ4MDctYTBjNS1lZDk3MzM0NGI2MDkifQ.S-_kH7HnsN8TMl2ISq_niOycXKIGf7kox6fBZpeDWMnNH1bS9gT_a9grgKskiNe89oXGzV5lfR3uyBSAEFVzyl5nTJSDzFop-HqsI27VHx9CSInah0XDNe2lTLpgA1GG8UzcODKZ1N2eZyekb84FvT-wgh3joLdRtztUFUNkudTGpU3tquw41od-Ktw33UF8PXSWtI4Cpr3aU9k2bKCgYSB-csz8x3Svj3yda2R-uQgR-RzvZICywk4QYuVkNB-gs_lvzlS2h8AVZsgpJRcBsR2SLAv4kJHpdComPpicab3dGRutykzdtf3wnAnnJxl81qv-9r5WkBojlR3XMeSMkw",
  default:
    "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsIndyYXBwZWQiOnRydWV9.eyJjbGllbnRfdG9rZW4iOiJleUpoYkdjaU9pSlNVekkxTmlJc0ltbHpjeUk2SW5OMFpXVnljR0YwYUMxemJXRnlkQzF2Wm1acFkyVWlmUS5leUpqWm1jaU9pSnpkR1ZsY25CaGRHaGZZMjl1Wm1sbkxtcHpiMjRpTENKbFpHbDBVbWxuYUhSeklqb2lJaXdpWldsa1FXTmpaWE56SWpvaUlpd2lhV0YwT2lJNk1UVTRNalV6T1RVMU1Dd2lhblJwSWpvaVptSTFaVGswTW1RdE1XSmtOeTAwTlRobUxUaGtOelV0WW1FNU5EZzNZamczWWpKaElpd2liV1YwWVVGalkyVnpjeUk2SW5raUxDSnpZMjl3WlhNaU9pSjJNaTB6WVdVME1UZGlZUzB3TXpnM0xUUmxOemt0WVRVeE9TMDNaV1U1TWpFM05tUmpOamd0Y0hWaWJHbHphR1ZrT25JaUxDSnpkV0lpT2lKMk1pMHpZV1UwTVRkaVlTMHdNemczTFRSbE56a3RZVFV4T1MwM1pXVTVNakUzTm1Sak5qZ2lmUS51TEdtb0RoYzgyc3d1aHpKcU5qcE95cmdROVJjZjR4M2VYbWEtX3pjdnB2QTNxdVhTZVptazhhSWRvS0RKeVQwOXpuM0lDaEJ3R1hyNzdRZ2RaNzI1REZLRG95MjJ0OWZSc3pETFk0WGo1YVVOYk1EZDhHYnVwc0FOQm1VbW5NTkxjRC0zQUVsTWtkMjBEVEsxdlJNSWFXZU01TGJCb2ZfemFNMXJwMFJYdDM3UWNyaV9PSFNDZUtqWENvWm95YVlfSWdWSktfZGs1R3Y0S1U2S21TRmJRQkEtQVVMcUNwU2NUS0VFNzNFY0stNXVnZ0J0R2NNcDhyUG1oR1RSTXhDRkNGblpEYzB4cl9CS0ZKR3hqVjhuNUsxWGJhTjZrUXBmbE9CcVZUWHl0d1BnVUFvSzAwczVta0ZWZTByb2Q3Rkd2ZHpuR0RMb1FlVDl5a3dDaTFjV3ciLCJpYXQiOjE1ODI1Mzk1OTMsImlzcyI6InN0ZWVycGF0aF93cmFwcGVyIiwianRpIjoiNDU2NGZmMzYtNTY0OC00MTBjLWEwN2ItZWVhMTg3YzRmYzk0In0.D_imTL9bHGf97REf3B0_jwdaORXI3tTkp_6fLdIKJHop0QWYf-c_lC9XzGlh8tmoXMX39MuTH__FDs0jSa7psHBWeYNmv6gLsvTLjGlUR36Vl_dU7-CKREFnTI3MAJo2oiiwE27E8jH-DjcBXEk1JGl2PJfeQqEnj9pUPnPyGeLiFgsG23HcpXF08SKWPrbvlhGXKl2_bXr4AJABReKhEH0YG7H42p8D6D2HNsZPN_SXDJKVMtRPT5fQDK4VXLiKyZ0xKUi7_DFFlLRf-nELeRFpMSQ_iuPHXWgNuzTCKsMP6W9e4UazsMJbjuAhx1ti2Z7bIv-Z4eeIXGUo6vS73Q",
});

export default function App() {
  const smartMapRef = useRef();

  const [sdkReady, setSDKReady] = useState(false);

  useEffect(() => {
    console.log("configString", CONFIG_STRING);
    SmartMapManager.startWithConfig({
      apiKey: API_KEY,
      configString: JSON.stringify(CONFIG_STRING),
    });
    setSDKReady(true);
    /* RNFS.writeFile(CONFIG_FILE_PATH, CONFIG_STRING, "utf8")
      .then((success) => {
        SmartMapManager.startWithConfig({
          apiKey: API_KEY,
          configFilePath: CONFIG_FILE_PATH,
        });

        setSDKReady(true);
        console.log("FILE WRITTEN!");
      })
      .catch((err) => {
        console.log(err.message);
      }); */
  }, []);

  // navigate to selected smart map object
  const navigateToPoi = (smartmapObject) => {
    if (smartmapObject) {
      const userTask = {
        type: "navigation",
        payload: smartmapObject,
      };

      smartMapRef.current.startUserTask(userTask);
    }
  };

  return (
    <View style={{ flex: 10, flexDirection: "row" }}>
      <View style={{ flex: 7 }}>
        {sdkReady && (
          <SmartMapView
            style={{ flex: 1 }}
            apiKey={API_KEY}
            ref={smartMapRef}
            onMapLoaded={() => {
              console.log("Map loaded");
            }}
            onMapClicked={(payload) => {
              console.log(payload);
              const { mapObjects } = payload;
              console.log("length", mapObjects.length);

              for (let i = 0; i < mapObjects.length; i++) {
                console.log("object", mapObjects[i]);
              }

              const smartmapObject = mapObjects[0];
              // use selectMapObject() to open the default info bottomsheet of selected smartMapObject
              smartMapRef.current.selectMapObject(smartmapObject);

              //navigateToPoi(smartmapObject);
            }}
            onUserFloorChanged={(payload) =>
              console.log("User floor changed", payload)
            }
            onVisibleFloorChanged={(payload) =>
              console.log("Visible Floor changed", payload)
            }
            onSearchResultSelected={(payload) => {
              smartMapRef.current.selectMapObject(payload);
              console.log("Search result selected ", payload);
            }}
            onViewStatusChanged={(payload) =>
              console.log("onViewstatuschanged", payload)
            }
            onNavigationEnded={() => console.log("navigation ended")}
            onNavigationStarted={() => console.log("navigation started")}
            onNavigationPreviewAppeared={() =>
              console.log("navigation PreviewAppeared")
            }
            onNavigationDestinationReached={() =>
              console.log("navigation DestinationReached")
            }
            onUserTaskResponse={(payload) => {
              console.log(payload);
            }}
            onBackPressed={(payload) => {
              console.log("onBackPressed", payload);
            }}
          />
        )}
      </View>
      {
        <View style={{ flex: 3 }}>
          <Drawer smartMapRef={smartMapRef} />
        </View>
      }
    </View>
  );
}
