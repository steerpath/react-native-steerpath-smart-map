import React, {
  Component,
} from "react";
import {
  SmartMapManager,
  SmartMapView
} from "react-native-steerpath-smart-map";

const API_KEY =
//"eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsIndyYXBwZWQiOnRydWV9.eyJjbGllbnRfdG9rZW4iOiJleUpoYkdjaU9pSklVekkxTmlJc0luUjVjQ0k2SWtwWFZDSjkuZXlKelkyOXdaWE1pT2lKaVlYTmxPbkk3YzNSbFpYSndZWFJvWDNOMFlYUnBZenB5TzNOMFpXVnljR0YwYUY5a2VXNWhiV2xqT25JaUxDSnRaWFJoUVdOalpYTnpJam9pZVNJc0ltcDBhU0k2SWpobE5UQTJPV1JoTFRWaU5ERXROR1l4WlMxaVlqWXpMVEUzTm1FMFkyRmpNRGN5T0NJc0luTjFZaUk2SW5OMFpXVnljR0YwYUNJc0ltVmthWFJTYVdkb2RITWlPaUlpTENKbGFXUkJZMk5sYzNNaU9pSjVJbjAuaW44eklVbV9abFZobVlQaFJNc014U2hscUNIMG5Kbm9mMGtSbFd5S3VRdyIsImlhdCI6MTU2MjkzMjUyNywiaXNzIjoic3RlZXJwYXRoX3dyYXBwZXIiLCJqdGkiOiJiNjhiNTM3MS05MjM1LTRkMmYtOGE3NC1iOWZiNDAzZDhhOWIifQ.nRix79oSLz2mmoxitFYAlinu6Ft8znnBWq2GnkLBkck1xQVfXgc7iJkSrFE2J9dtM-EICEEZCgVdSjRq0UpaHrJB2SQxr8p_AIk9C4YgCRSkAa1D6luqVnpxcVbaI0qwMbZeAFB2DGdn3gQuhoOOXlpU1mbAZLj_aAEvrVXVBmMzmnNtFNgai_v0s2jyMVDnO4p1mEvjGcyka8RHr4EAEV1emot8K_GTgoLMm5otIxj9Kzy-d_BjtalFETnEOXvbUegJe8wCgC6qAPlQ9-iie_b3cWyW52gXnVe21hS7fia5OMoAan1pEJLmPSMyHPx5ELb0llP8Pc7oKhoNVA3aAQ";
"eyJhbGciOiJSUzI1NiJ9.eyJpYXQ6IjoxNTY0NDEwMjIxLCJqdGkiOiIwOGViODMyMi01ZGM1LTRkNTMtYjJmYy02NDllOTdlNzhjMjkiLCJzY29wZXMiOiJ2Mi1kNGQzNmI5Zi1lOGZiLTQ4MDctYTBjNS1lZDk3MzM0NGI2MDktcHVibGlzaGVkOnIiLCJzdWIiOiJ2Mi1kNGQzNmI5Zi1lOGZiLTQ4MDctYTBjNS1lZDk3MzM0NGI2MDkifQ.S-_kH7HnsN8TMl2ISq_niOycXKIGf7kox6fBZpeDWMnNH1bS9gT_a9grgKskiNe89oXGzV5lfR3uyBSAEFVzyl5nTJSDzFop-HqsI27VHx9CSInah0XDNe2lTLpgA1GG8UzcODKZ1N2eZyekb84FvT-wgh3joLdRtztUFUNkudTGpU3tquw41od-Ktw33UF8PXSWtI4Cpr3aU9k2bKCgYSB-csz8x3Svj3yda2R-uQgR-RzvZICywk4QYuVkNB-gs_lvzlS2h8AVZsgpJRcBsR2SLAv4kJHpdComPpicab3dGRutykzdtf3wnAnnJxl81qv-9r5WkBojlR3XMeSMkw"

SmartMapManager.start(API_KEY);

export default class App extends Component {
  constructor(props) {
    super(props)
    this.smartMapRef = {}
  }
  render() {
    return (
      <SmartMapView
        style={{ flex: 1 }}
        apiKey={API_KEY}
        onMapLoaded={() => console.log("MapLoaded")}
        onMapClicked={mapObjects => console.log("Map Clicked: ", mapObjects)}
        onUserFloorChanged={payload => console.log("User floor changed", payload)}
        onVisibleFloorChanged={payload =>
          console.log("Visible Floor changed", payload)
        }
        onViewStatusChanged={payload =>
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
        onUserTaskResponse={payload => {
          console.log("onUsertask response", payload);
        }}
        ref={(smartMapRef) => { this.smartMapRef = smartMapRef }}
      />
    )
  }
}
