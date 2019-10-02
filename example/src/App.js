import React, {
  Component,
} from "react";
import {
  SmartMapManager,
  SmartMapView
} from "react-native-steerpath-smart-map";
import Drawer from "./Drawer.js"
import {
  View
} from 'react-native';

const API_KEY =
//native
//"eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsIndyYXBwZWQiOnRydWV9.eyJjbGllbnRfdG9rZW4iOiJleUpoYkdjaU9pSlNVekkxTmlJc0ltbHpjeUk2SW5OMFpXVnljR0YwYUMxemJXRnlkQzF2Wm1acFkyVWlmUS5leUpqWm1jaU9pSnpkR1ZsY25CaGRHaGZiMlptYVdObFgyTnZibVpwWnk1cWMyOXVJaXdpWldScGRGSnBaMmgwY3lJNklpSXNJbVZwWkVGalkyVnpjeUk2SWlJc0ltbGhkRG9pT2pFMU5qZzRPVEkwTkRjc0ltcDBhU0k2SW1NeVptTXpaREE1TFdNMlpqWXRORFZtTlMwNFpXWTNMV0ZpTXprM1pEbGpaVEV4TVNJc0ltMWxkR0ZCWTJObGMzTWlPaUo1SWl3aWMyTnZjR1Z6SWpvaWRqSXRaRFJrTXpaaU9XWXRaVGhtWWkwME9EQTNMV0V3WXpVdFpXUTVOek16TkRSaU5qQTVMWEIxWW14cGMyaGxaRHB5SWl3aWMzVmlJam9pZGpJdFpEUmtNelppT1dZdFpUaG1ZaTAwT0RBM0xXRXdZelV0WldRNU56TXpORFJpTmpBNUluMC5CZkk5X0ZVZnUtcmJjVklRNTNfQkpxYkdBeVBYVndVSEpyZTdibnBKTGkyM0NuSzVUZ2ZxN2I4dWtlNUtQSFRRODJEdk9sMmhfUG1KMWpMU2lNdU9OTXlxNXVGZE1oOXNSbjBEbWJORTR4aFQtS2dVSnVFTEtZMmFqbEQ4ZUdQMEktZUVTSURpZ1VHNjRIMnUyRnFBZmk3WDhjQXVkdUFfd2cwV3ExVjllOFlzc2Qxc0JudjFvWUQ2NjAtN2NMTkdNVjhwOVF0M1JXUW5YZ3hRanNEYlpUdFM0Z2s2alcwRlM0Sk1zVDRkM0R1bHE1SXRWUFRoTUhzdDQ5V2o2WnFIaXFBMTV5UW83emZoNThDd2ZTSDZHME5laWFaWXMwNGYzbGtfcHZid2pQeTdCeng3Y0hKWk5yaVFucFRMNzNUSnQ3UDRCSlBTaUx5Um5RTjlEZ19fc1EiLCJpYXQiOjE1Njg4OTI1MTEsImlzcyI6InN0ZWVycGF0aF93cmFwcGVyIiwianRpIjoiOTBmODJmZGYtYTIwOC00ZTBmLWEzMWQtZTMxZjI1NzgyNzU0In0.kleL2Ufkh4kUR8jEFbfbN03Ph0lBoS7c3SbpPn4Rsv9cUZLKiSIAmWu-vMobGi50WWbAedQCl5PyfZwCkY_S763zPqpMQ2I-u86stnCqPP2KmWilyDUbTadS3I9uwf5Ga7sdgOOwFw_9HVJxIzS6h2BsrxHuxLmC0KKFZVNpZ52jQmhEnRjShQGtqnwN1_4wWV0V03R7krDm26TgxSyoHwyog0w9LNuEEUlY1UxTUl4uP0VF9x-qB98bZ-XMUnEz7tQt0ALILEWQqYDvvQZi5O1rZB1cR8fYiWX0efG2Z3m1v-jjdXybgy8ilcncfdAk1m75BwWd_JlhUyw27TpJ0A"
//web
"eyJhbGciOiJSUzI1NiJ9.eyJpYXQ6IjoxNTY0NDEwMjIxLCJqdGkiOiIwOGViODMyMi01ZGM1LTRkNTMtYjJmYy02NDllOTdlNzhjMjkiLCJzY29wZXMiOiJ2Mi1kNGQzNmI5Zi1lOGZiLTQ4MDctYTBjNS1lZDk3MzM0NGI2MDktcHVibGlzaGVkOnIiLCJzdWIiOiJ2Mi1kNGQzNmI5Zi1lOGZiLTQ4MDctYTBjNS1lZDk3MzM0NGI2MDkifQ.S-_kH7HnsN8TMl2ISq_niOycXKIGf7kox6fBZpeDWMnNH1bS9gT_a9grgKskiNe89oXGzV5lfR3uyBSAEFVzyl5nTJSDzFop-HqsI27VHx9CSInah0XDNe2lTLpgA1GG8UzcODKZ1N2eZyekb84FvT-wgh3joLdRtztUFUNkudTGpU3tquw41od-Ktw33UF8PXSWtI4Cpr3aU9k2bKCgYSB-csz8x3Svj3yda2R-uQgR-RzvZICywk4QYuVkNB-gs_lvzlS2h8AVZsgpJRcBsR2SLAv4kJHpdComPpicab3dGRutykzdtf3wnAnnJxl81qv-9r5WkBojlR3XMeSMkw"
SmartMapManager.start(API_KEY);

export default class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      "didMount": false
    }
    this.smartMapRef = {}
  }
  
  onUserTaskResponse(payload) {
    console.log("onUserTaskResponse ", payload);
     let userTask = payload.userTask
     let response = payload.response
      if (userTask instanceof window.steerpath.POISelectionUserTask) {
        if (response === "COMPLETED") {
          this.smartMapRef.cancelCurrentUserTask()
        }
      }
  }
  
  componentDidMount(){
    this.setState({
      "didMount": true
    })
  }
  render() {
    console.log("this " , this);
    return (
       <View
        style={{ flex: 10, flexDirection: "row" }}>
        <View
          style={{ flex: 7 }}>
            <SmartMapView
            style={{ flex: 1 }}
            apiKey={API_KEY}
            ref={(smartMapRef) => { this.smartMapRef = smartMapRef }}
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
            onUserTaskResponse={(payload)=>this.onUserTaskResponse(payload)}
          />
        </View>
        <View
          style={{ flex: 3 }}>
            <Drawer
            smartMapRef={this.smartMapRef}/ >
        </View>
      </View>
    )
  }
}
