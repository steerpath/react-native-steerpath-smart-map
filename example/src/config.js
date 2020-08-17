export const CONFIG_STRING = `{
  "services": {
    "settings": {
      "default": {
        "enabled": false,
        "externalLinks": [
          {
            "title": "Send feedback",
            "link": "support@steerpath.com",
            "type": "email"
          },
          {
            "title": "Website",
            "link": "https://steerpath.com",
            "type": "web"
          }
        ]
      },
      "web": {
        "enabled": true,
        "settingsButtons": [
          {
            "title": "sp_toggle_positioning_title",
            "description": "sp_toggle_positionin_description",
            "action": {
              "type": "toggle_gps_positionig"
            },
            "type": "button"
          },
          {
            "title": "sp_set_user_location_title",
            "description": "sp_set_user_location_description",
            "action": {
              "type": "set_user_location"
            },
            "type": "button"
          },
          {
            "title": "sp_set_dark_style_title",
            "description": "sp_set_dark_style_description",
            "action": {
              "type": "set_dark_style"
            },
            "type": "button"
          },
          {
            "title": "sp_set_default_style_title",
            "description": "sp_set_default_style_description",
            "action": {
              "type": "set_default_style"
            },
            "type": "button"
          }
        ],
        "externalLinks": [
          {
            "title": "sp_send_feedback_title",
            "link": "support@steerpath.com",
            "type": "email"
          },
          {
            "title": "sp_visit_website_title",
            "link": "https://steerpath.com",
            "type": "web"
          }
        ]
      }
    },
    "smartmap": {
      "default": {
        "initialSearchBottomSheetState": "collapsed",
        "defaultLanguage": "en-GB",
        "supportedLanguages": [
          "en-GB"
        ],
        "defaultTheme": "default",
        "supportedThemes": [
          "default",
          "dark"
        ],
        "useFloorBasedStyle": true,
        "nonSelectableCssClasses": [
          "text_large",
          "text_medium",
          "text_small",
          "service_direction",
          "category_other",
          "infrastructure_hole",
          "category_cover_poi",
          "infrastructure_wing",
          "wing",
          "infrastructure_department",
          "department"
        ],
        "mapDataURL": "https://mapdata.eu.steerpath.net/",
        "bluedot": {
          "indoor": true,
          "outdoor": false
        },
        "routeDataURL": "https://routes.eu.steerpath.com/",
        "navigationDestinationThresholdM": 5,
        "navigationRerouteThresholdM": 5,
        "mapStylePath": "/style/default.json",
        "urlServiceURL": "https://url.steerpath.com/",
        "viewProperties": {
          "bearing": 94.29793866970478,
          "pitch": 30,
          "layerIndex": 14,
          "buildingRef": "639",
          "bounds": {
            "sw": {
              "lng": -3.693198654357275,
              "lat": 40.462478232545465
            },
            "ne": {
              "lng": -3.692763517930075,
              "lat": 40.46299633547011
            }
          }
        }
      }
    },
    "search": {
      "default": {
        "searchSortResultsByDistance": true,
        "nonSearchableCssClasses": [
          "text_large",
          "text_medium",
          "text_small",
          "service_direction",
          "category_other",
          "infrastructure_hole",
          "category_cover_poi"
        ],
        "searchSuggestions": [
          {
            "title": "sp_category_building_title",
            "shortTitle": "sp_category_building_short",
            "description": "sp_category_building_description",
            "iconName": "category_building",
            "action": {
              "type": "show_pois_with_tags",
              "allTags": [
                "building"
              ]
            }
          },
          {
            "title": "sp_show_free_rooms_title",
            "shortTitle": "sp_show_free_rooms_title_short",
            "description": "sp_show_free_rooms_description",
            "iconName": "category_meeting_room_free",
            "action": {
              "type": "show_free_live_rooms",
              "anyTags": [
                "room",
                "category_room"
              ]
            }
          },
          {
              "title": "sp_show_free_desk_title",
              "shortTitle": "sp_show_free_desk_title_short",
              "description": "sp_show_free_desk_description",
              "iconName": "service_desk_free",
              "action": {
                  "type": "show_free_live_rooms",
                  "allTags": ["service_desk"]
              }
          },
          {
            "title": "sp_service_toilet_title",
            "shortTitle": "sp_service_toilet_title_short",
            "description": "sp_service_toilet_description",
            "iconName": "service_toilet",
            "action": {
              "type": "show_pois_with_tags",
              "anyTags": [
                "service_toilet",
                "toilet"
              ]
            }
          }
        ],
        "moreSuggestionsButton": {
          "title": "sp_more_suggestions_title",
          "shortTitle": "sp_more_suggestions_title_short",
          "description": "sp_more_suggestions_description",
          "iconName": "category_more",
          "action": {
            "type": "show_more_categories"
          }
        }
      }
    },
    "kiosk": {
      "defaultCamera": {
        "bearing": 94.29793866970478,
        "pitch": 30,
        "layerIndex": 14,
        "buildingRef": "639",
        "bounds": {
          "sw": {
            "lng": -3.693198654357275,
            "lat": 40.462478232545465
          },
          "ne": {
            "lng": -3.692763517930075,
            "lat": 40.46299633547011
          }
        }
      },
      "share": {
        "hash": false,
        "qrCodeShare": {
          "enabled": false,
          "qrCodeURL": "https://kiosk.steerpath.com/",
          "qrCodePath": "/aon-madrid/index.html"
        },
        "copyLinkToClipboard": false
      }
    },
    "telemetry": {
      "default": {
        "telemetryURL": "https://capture-v1.eu.steerpath.com/v1/",
        "beacons": "known",
        "location": "indoor",
        "enabled": false,
        "locationIntervalS": 60,
        "transmissionIntervalS": 120
      },
      "web": {
        "enabled": false,
        "telemetryURL": "https://capture-v1.eu.steerpath.com/v1/"
      }
    },
    "metadata": {
      "default": {
        "metadataURL": "https://meta2.eu.steerpath.com/meta/v2/"
      }
    },
    "offline": {
      "default": {
        "offlineDataURL": "https://offline.eu.steerpath.com/"
      }
    },
    "geofencing": {
      "default": {
        "whitelist": []
      }
    },
    "live": {
      "default": {
        "enabled": true,
        "liveApiKey": "eyJhbGciOiJSUzI1NiJ9.eyJpYXQ6IjoxNTg5MzY3OTY0LCJqdGkiOiIyMDZhZThkOC01YzljLTRjZGQtYjc0MS05Yjk2N2E1Y2I1MTMiLCJzY29wZXMiOiJ2Mi0zYjBhZWFlOS1iNTI5LTQ4MjgtODY1OS0xM2NkMmI2NTk0YTQtbGl2ZTpyLHciLCJzdWIiOiJ2Mi0zYjBhZWFlOS1iNTI5LTQ4MjgtODY1OS0xM2NkMmI2NTk0YTQifQ.iVaSSQn2Xe7O38xyNPy_mVvxpnc9Mto7evU601DKx-lbvnmHQHjgoxK8PJiLwuOjunoKAQk3hRkaxU24VnSX_qzmLnAL_hMW4y-6nrdd90Exk91usPVOfN4ElpnO8r3yxlCCpUI08LPptGUlU1E1crhQb-Kk441CG01U6lsEbcqcgebdaDE6ICZHzas9LwI14tOwt-Yy0IRcF1tGallCfpaoBScVZzydsTE7wc8N1ufq8xYMXBTb5ANprcYQTOojO9noeInWc20FUpPCL-eeXIfWaYsBbdv-UEwMyckCz8RIUnCKRYSgf229JLNjpjl8_PJpoJmcAUerDGvucpq6yg",
        "liveURL": "https://live-eu3.steerpath.com/"
      },
      "web": {
        "enabled": true,
        "liveApiKey": "eyJhbGciOiJSUzI1NiJ9.eyJpYXQ6IjoxNTg5MzY3OTY0LCJqdGkiOiIzNDExNDg3Yy01OWNlLTQzYjAtOGY0ZS1mZGEwZDFiYmE3MmYiLCJzY29wZXMiOiJ2Mi0zYjBhZWFlOS1iNTI5LTQ4MjgtODY1OS0xM2NkMmI2NTk0YTQtbGl2ZTpyIiwic3ViIjoidjItM2IwYWVhZTktYjUyOS00ODI4LTg2NTktMTNjZDJiNjU5NGE0In0.GqlFTF8KhMsgNfZ89VaER2ZGgnuzwsot7JS9_LiRYRTnkA2Zzk837UMKT2lumtIkb1QgPmRSuO3FuQ4Vrj-kc-yM0gXXf3RepHHqW2jngAoS2HuJhtK3UnfYs-HOSNhvpplZZLDsYLpJnRcNxoGZtJ4DGictn1RPv2pmkLTgISqd45kA_fSdzteoN0IiITAMbAqDBdfID49ppmhhZOnWu4n1Sk9dm_fTZuDx3tqr1wmqMO3USfebXPypOTqXMFhKYQS_dHM4pFoK3dxErfSWX10qyrd32zGXeXm10ej6JTrZnAj7Yk0_zAkvYf-ddX-Et2EsFqIajOBsm_HvySDlgg",
        "liveURL": "https://live-eu3.steerpath.com/sdk-data"
      }
    },
    "positioning": {
      "default": {
        "beaconsURL": "https://beacons2.eu.steerpath.com/",
        "nddURL": "https://ndd.eu.steerpath.com/",
        "eidURL": "https://eidupdates.eu.steerpath.com/",
        "useAccelerometer": true,
        "useGyro": false,
        "useCompass": false,
        "gpsThresholdM": 10
      },
      "ios": {
        "useCompass": true
      },
      "web": {
        "staticLocation": {
          "bearing": 94.29793866970478,
          "pitch": 30,
          "layerIndex": 14,
          "buildingRef": "639",
          "lat": null,
          "lng": null
        }
      }
    },
    "ui": {
      "default": {
        "colors": {
          "primaryColor": "#01b2a5",
          "bluedotColor": "#3887be",
          "backgroundColor": "#fafafa",
          "zoomedInRouteLineColor": "#01b2a5",
          "zoomedOutRouteLineColor": "#d7b127",
          "altRouteLineColor": "#DEC56B",
          "backgroundColorLayout": "rgba(255, 255, 255, 0.6)",
          "backgroundColorItem": "#fafafa",
          "textColor": "#000",
          "textHaloColor": "#fff"
        },
        "colors_dark": {
          "primaryColor": "#272b3f",
          "bluedotColor": "#3a5e78",
          "backgroundColor": "#fafafa",
          "zoomedInRouteLineColor": "#3a7874",
          "zoomedOutRouteLineColor": "#d7b127",
          "altRouteLineColor": "#DEC56B",
          "backgroundColorLayout": "rgba(0, 0, 0, 0.9)",
          "backgroundColorItem": "#333333",
          "textColor": "#fff",
          "textHaloColor": "#000"
        }
      }
    }
  },
  "update": false
}`;
