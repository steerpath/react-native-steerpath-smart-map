import React, {
  Component,
} from "react";
import {
  SmartMapManager,
  SmartMapView,
} from "react-native-steerpath-smart-map";

const API_KEY =
//"eyJhbGciOiJSUzI1NiJ9.eyJpYXQ6IjoxNTY0NDEwMjIxLCJqdGkiOiIwOGViODMyMi01ZGM1LTRkNTMtYjJmYy02NDllOTdlNzhjMjkiLCJzY29wZXMiOiJ2Mi1kNGQzNmI5Zi1lOGZiLTQ4MDctYTBjNS1lZDk3MzM0NGI2MDktcHVibGlzaGVkOnIiLCJzdWIiOiJ2Mi1kNGQzNmI5Zi1lOGZiLTQ4MDctYTBjNS1lZDk3MzM0NGI2MDkifQ.S-_kH7HnsN8TMl2ISq_niOycXKIGf7kox6fBZpeDWMnNH1bS9gT_a9grgKskiNe89oXGzV5lfR3uyBSAEFVzyl5nTJSDzFop-HqsI27VHx9CSInah0XDNe2lTLpgA1GG8UzcODKZ1N2eZyekb84FvT-wgh3joLdRtztUFUNkudTGpU3tquw41od-Ktw33UF8PXSWtI4Cpr3aU9k2bKCgYSB-csz8x3Svj3yda2R-uQgR-RzvZICywk4QYuVkNB-gs_lvzlS2h8AVZsgpJRcBsR2SLAv4kJHpdComPpicab3dGRutykzdtf3wnAnnJxl81qv-9r5WkBojlR3XMeSMkw"
"eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsIndyYXBwZWQiOnRydWV9.eyJjbGllbnRfdG9rZW4iOiJleUpoYkdjaU9pSlNVekkxTmlKOS5leUpwWVhRNklqb3hOVFkwTkRFd01qSXhMQ0pxZEdraU9pSXdPR1ZpT0RNeU1pMDFaR00xTFRSa05UTXRZakptWXkwMk5EbGxPVGRsTnpoak1qa2lMQ0p6WTI5d1pYTWlPaUoyTWkxa05HUXpObUk1WmkxbE9HWmlMVFE0TURjdFlUQmpOUzFsWkRrM016TTBOR0kyTURrdGNIVmliR2x6YUdWa09uSWlMQ0p6ZFdJaU9pSjJNaTFrTkdRek5tSTVaaTFsT0daaUxUUTRNRGN0WVRCak5TMWxaRGszTXpNME5HSTJNRGtpZlEuUy1fa0g3SG5zTjhUTWwySVNxX25pT3ljWEtJR2Y3a294NmZCWnBlRFdNbk5IMWJTOWdUX2E5Z3JnS3NraU5lODlvWEd6VjVsZlIzdXlCU0FFRlZ6eWw1blRKU0R6Rm9wLUhxc0kyN1ZIeDlDU0luYWgwWEROZTJsVExwZ0ExR0c4VXpjT0RLWjFOMmVaeWVrYjg0RnZULXdnaDNqb0xkUnR6dFVGVU5rdWRUR3BVM3RxdXc0MW9kLUt0dzMzVUY4UFhTV3RJNENwcjNhVTlrMmJLQ2dZU0ItY3N6OHgzU3ZqM3lkYTJSLXVRZ1ItUnp2WklDeXdrNFFZdVZrTkItZ3NfbHZ6bFMyaDhBVlpzZ3BKUmNCc1IyU0xBdjRrSkhwZENvbVBwaWNhYjNkR1J1dHlremR0ZjN3bkFubkp4bDgxcXYtOXI1V2tCb2psUjNYTWVTTWt3IiwiaWF0IjoxNTY3Njg2NDk2LCJpc3MiOiJzdGVlcnBhdGhfd3JhcHBlciIsImp0aSI6Ijg4YjI5NjUyLWE0NWMtNGMyNC04ZDNlLTU4MTdiZGVlNGViOCJ9.NhfdTGLiTEL56GW7dxexd7AtCmlIrPOOV5ReOEMSXjRAtquijBKB6SSappmjgKFQMqbfTCVQdRNQtzBcAgO4ES9s1mwod3qWZeDEDcIz9jyY60_SFcV5j4iWqXuZJnA7WNTtxsA4B2ZuP6YQDeTD3-k2NjlZEsHX5lKL1nLvzeeKYEOxGE13oPiy_UEEYk9cmuIE2ZiPV13qW0cnGuzDauE7202AkydTmxkNYNdDiiGDlaiKp4k_TeS1Tar_Dyvg3tKWMZXIuyLnuNFLbdCOWYsUfy7u1NW2TzrCs3aZO_daatFx3MSn9MJhJmFpsS2HKSzAb4-p6bpkX8indZ-ZkA"


SmartMapManager.start(API_KEY);

export default class App extends Component {
  constructor(props) {
    super(props)
    this.smartMapRef = {}
  }
  
  onUserTaskResponse(payload) {
    console.log("onUserTaskResponse ", payload);
    
     let userTask = payload.userTask
     let response = payload.response
     if (userTask instanceof window.steerpath.POISelectionUserTask) {
       if (response === "COMPLETED") {
         console.log("event ", userTask);
         this.cancelUserTask()
         //this.smartMapRef.setMapMode("mapOnly")
       }
     }
  }

   startUserTask(userTask) {
      let buildingRef = "building_1_31552752-7d5a-44c6-8206-cd86bd91f7c4"
      let localRef = "Kitchen"
      let source = "poi"
      this.smartMapRef.getMapObject(localRef, buildingRef, source, (smartMapObject) => {
        if (smartMapObject) {
          let addMarker = true
          let actionButtonText = "Show Details"
          let actionButtonIcon = "category_fun"
          this.smartMapRef.startUserTask({
            "type": "poiSelection",
            "payload": {
              "addMarker": addMarker,
              "actionButtonText": actionButtonText,
              "actionButtonIcon": actionButtonIcon,
              "smartMapObject": smartMapObject
            }
          })
        }
      })
  }

   cancelUserTask() {
    this.smartMapRef.cancelCurrentUserTask()
  }

  componentDidMount(){
    setTimeout(() => {
      this.startUserTask()
      
    }, 3000);
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
        onUserTaskResponse={(payload)=>this.onUserTaskResponse(payload)}
        ref={(smartMapRef) => { this.smartMapRef = smartMapRef }}
      />
    )
  }
}
