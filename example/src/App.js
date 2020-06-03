import React, { useState, useRef, useEffect } from "react";
import {
  SmartMapManager,
  SmartMapView,
} from "react-native-steerpath-smart-map";
import RNFS from "react-native-fs";
import Drawer from "./Drawer.js";
import { View, Platform } from "react-native";
import { CONFIG_STRING } from "./config.js";

const CONFIG_FILE_PATH = RNFS.DocumentDirectoryPath + "/steerpath_config.json";

const API_KEY =
  "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsIndyYXBwZWQiOnRydWV9.eyJjbGllbnRfdG9rZW4iOiJleUpoYkdjaU9pSlNVekkxTmlJc0ltbHpjeUk2SW5OMFpXVnljR0YwYUMxemJXRnlkQzF2Wm1acFkyVWlmUS5leUpqWm1jaU9pSnpkR1ZsY25CaGRHaGZZMjl1Wm1sbkxtcHpiMjRpTENKbFpHbDBVbWxuYUhSeklqb2lJaXdpWldsa1FXTmpaWE56SWpvaUlpd2lhV0YwT2lJNk1UVTRPVFExTkRRM015d2lhblJwSWpvaU1XRXlORFUyTmpZdE9HUXdNaTAwWmpFMkxXSTNOV1V0WlRWaE56azVOalJpTmpKaklpd2liV1YwWVVGalkyVnpjeUk2SW5raUxDSnpZMjl3WlhNaU9pSjJNaTB6WWpCaFpXRmxPUzFpTlRJNUxUUTRNamd0T0RZMU9TMHhNMk5rTW1JMk5UazBZVFF0Y0hWaWJHbHphR1ZrT25JaUxDSnpkV0lpT2lKMk1pMHpZakJoWldGbE9TMWlOVEk1TFRRNE1qZ3RPRFkxT1MweE0yTmtNbUkyTlRrMFlUUWlmUS5sUGtKaE5peDFFSFhjWW1WcHgxWlZ5eVlJMHczNXFZZ0RheXVlUzIydXJOOFhaSWdhVlNhS002NFhxeHRpNVFGVEVQN1B5QWNlNFRxTEI1VXlHWEJCcy1WTHBGU0V4RmlhX19ySjJ1dDBmZmlETGJucUV3MDdBdmFNUjNQRGpiazNZdm9DZjBPcFNUM3pvVkZ4dmhNODdCLU5nanVqeWhDOGVqX3hQX1R6RGRzQVNiY2RwNktIVUR2bWtXSlRDOVdqSGVQLUp3c243MHRhVVlCbWJkVGFKcjNDRlFlZG9hbTdlbF9jZkI3dVU2NkxRSEFIQ001Y2FBUzc3UXk0ZWthbWdqYWNhS2V4NEtFaEtCaEZOelNneTh0ZjdTWXltVVA0eEFldVNzenlnZnk3bVMwMHI4UGtseTZwR3ZXTUVjbzQyMzFkWG51MnFObWI0dVl2dEx1dHciLCJpYXQiOjE1ODk0NTQ1MDcsImlzcyI6InN0ZWVycGF0aF93cmFwcGVyIiwianRpIjoiZmQyMjVmZjYtMzkwNC00NjM4LTk5NGUtNzAzY2ZkYzQxMDA4In0.LujaGz0AywNOl5oXWvD0ICR7wsuP78z8wMw88dJy5AK1b9hv5eadRnKlDsfgCYCJwtw55Sjx1emtTTlk_CAwh5Ja85LOndyEubhbCqczXAWNydo5dyUu2xiZ68Nex3A1N4DaQFnScPoeRJr7H_JDT3cmsOmFEsH6Jz4iQp4SZzztHYNy0Qw8lDXUXNPXSOrb6-Z52SLiFm6PqDB2asY5B_-EPyT2U5UdmVdgebf4wXJll4vqVIZrj2TI-W9udMnfGKjRrH9VxuZGHI8DsxoDUw-4__OU-cv_yy86xsHFERs3EC04uPXMyyJHZY0YHjtAd2gP5kNGhjV6oCNRTcz0Dg";

export default function App() {
  const smartMapRef = useRef();

  const [sdkReady, setSDKReady] = useState(false);

  useEffect(() => {
    console.log("configString", CONFIG_STRING);

    RNFS.writeFile(CONFIG_FILE_PATH, CONFIG_STRING, "utf8")
      .then((success) => {
        SmartMapManager.startWithConfig({
          apiKey: API_KEY,
          configFilePath: CONFIG_FILE_PATH,
        });
        console.log("FILE WRITTEN!");
        setSDKReady(true);
      })
      .catch((err) => {
        console.log(err.message);
      });
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
            //apiKey={API_KEY}
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
