import React, {
  Component,
} from "react";
import {
  SmartMapManager,
  SmartMapView
} from "react-native-steerpath-smart-map";

const API_KEY =
//"eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsIndyYXBwZWQiOnRydWV9.eyJjbGllbnRfdG9rZW4iOiJleUpoYkdjaU9pSklVekkxTmlJc0luUjVjQ0k2SWtwWFZDSjkuZXlKelkyOXdaWE1pT2lKaVlYTmxPbkk3YzNSbFpYSndZWFJvWDNOMFlYUnBZenB5TzNOMFpXVnljR0YwYUY5a2VXNWhiV2xqT25JaUxDSnRaWFJoUVdOalpYTnpJam9pZVNJc0ltcDBhU0k2SWpobE5UQTJPV1JoTFRWaU5ERXROR1l4WlMxaVlqWXpMVEUzTm1FMFkyRmpNRGN5T0NJc0luTjFZaUk2SW5OMFpXVnljR0YwYUNJc0ltVmthWFJTYVdkb2RITWlPaUlpTENKbGFXUkJZMk5sYzNNaU9pSjVJbjAuaW44eklVbV9abFZobVlQaFJNc014U2hscUNIMG5Kbm9mMGtSbFd5S3VRdyIsImlhdCI6MTU2MjkzMjUyNywiaXNzIjoic3RlZXJwYXRoX3dyYXBwZXIiLCJqdGkiOiJiNjhiNTM3MS05MjM1LTRkMmYtOGE3NC1iOWZiNDAzZDhhOWIifQ.nRix79oSLz2mmoxitFYAlinu6Ft8znnBWq2GnkLBkck1xQVfXgc7iJkSrFE2J9dtM-EICEEZCgVdSjRq0UpaHrJB2SQxr8p_AIk9C4YgCRSkAa1D6luqVnpxcVbaI0qwMbZeAFB2DGdn3gQuhoOOXlpU1mbAZLj_aAEvrVXVBmMzmnNtFNgai_v0s2jyMVDnO4p1mEvjGcyka8RHr4EAEV1emot8K_GTgoLMm5otIxj9Kzy-d_BjtalFETnEOXvbUegJe8wCgC6qAPlQ9-iie_b3cWyW52gXnVe21hS7fia5OMoAan1pEJLmPSMyHPx5ELb0llP8Pc7oKhoNVA3aAQ";
"eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsIndyYXBwZWQiOnRydWV9.eyJjbGllbnRfdG9rZW4iOiJleUpoYkdjaU9pSlNVekkxTmlJc0ltbHpjeUk2SW5OMFpXVnljR0YwYUMxemJXRnlkQzF2Wm1acFkyVWlmUS5leUpqWm1jaU9pSnpkR1ZsY25CaGRHaGZiMlptYVdObFgyTnZibVpwWnk1cWMyOXVJaXdpWldScGRGSnBaMmgwY3lJNklpSXNJbVZwWkVGalkyVnpjeUk2SWlJc0ltbGhkRG9pT2pFMU5qZzRPVEkwTkRjc0ltcDBhU0k2SW1NeVptTXpaREE1TFdNMlpqWXRORFZtTlMwNFpXWTNMV0ZpTXprM1pEbGpaVEV4TVNJc0ltMWxkR0ZCWTJObGMzTWlPaUo1SWl3aWMyTnZjR1Z6SWpvaWRqSXRaRFJrTXpaaU9XWXRaVGhtWWkwME9EQTNMV0V3WXpVdFpXUTVOek16TkRSaU5qQTVMWEIxWW14cGMyaGxaRHB5SWl3aWMzVmlJam9pZGpJdFpEUmtNelppT1dZdFpUaG1ZaTAwT0RBM0xXRXdZelV0WldRNU56TXpORFJpTmpBNUluMC5CZkk5X0ZVZnUtcmJjVklRNTNfQkpxYkdBeVBYVndVSEpyZTdibnBKTGkyM0NuSzVUZ2ZxN2I4dWtlNUtQSFRRODJEdk9sMmhfUG1KMWpMU2lNdU9OTXlxNXVGZE1oOXNSbjBEbWJORTR4aFQtS2dVSnVFTEtZMmFqbEQ4ZUdQMEktZUVTSURpZ1VHNjRIMnUyRnFBZmk3WDhjQXVkdUFfd2cwV3ExVjllOFlzc2Qxc0JudjFvWUQ2NjAtN2NMTkdNVjhwOVF0M1JXUW5YZ3hRanNEYlpUdFM0Z2s2alcwRlM0Sk1zVDRkM0R1bHE1SXRWUFRoTUhzdDQ5V2o2WnFIaXFBMTV5UW83emZoNThDd2ZTSDZHME5laWFaWXMwNGYzbGtfcHZid2pQeTdCeng3Y0hKWk5yaVFucFRMNzNUSnQ3UDRCSlBTaUx5Um5RTjlEZ19fc1EiLCJpYXQiOjE1Njg4OTI1MTEsImlzcyI6InN0ZWVycGF0aF93cmFwcGVyIiwianRpIjoiOTBmODJmZGYtYTIwOC00ZTBmLWEzMWQtZTMxZjI1NzgyNzU0In0.kleL2Ufkh4kUR8jEFbfbN03Ph0lBoS7c3SbpPn4Rsv9cUZLKiSIAmWu-vMobGi50WWbAedQCl5PyfZwCkY_S763zPqpMQ2I-u86stnCqPP2KmWilyDUbTadS3I9uwf5Ga7sdgOOwFw_9HVJxIzS6h2BsrxHuxLmC0KKFZVNpZ52jQmhEnRjShQGtqnwN1_4wWV0V03R7krDm26TgxSyoHwyog0w9LNuEEUlY1UxTUl4uP0VF9x-qB98bZ-XMUnEz7tQt0ALILEWQqYDvvQZi5O1rZB1cR8fYiWX0efG2Z3m1v-jjdXybgy8ilcncfdAk1m75BwWd_JlhUyw27TpJ0A"

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
