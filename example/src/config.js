export const CONFIG_STRING = `
{
  "services": {
      "settings": {
          "default": {
              "enabled": true,
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
              "enabled": false,
              "settingsButtons": [],
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
              "nonSelectableCssClasses": [
                  "infrastructure_stairs",
                  "infrastructure_lift",
                  "category_stairs",
                  "category_other",
                  "infrastructure_hole",
                  "category_cover_poi",
                  "infrastructure_department",
                  "infrastructure_wing"
              ],
              "mapDataURL": "https://mapdata.eu.steerpath.com/",
              "bluedot": {
                  "indoor": true,
                  "outdoor": true
              },
              "routeDataURL": "https://routes.eu.steerpath.com/",
              "navigationDestinationThresholdM": 5,
              "navigationRerouteThresholdM": 5,
              "mapStylePath": "/style/default.json",
              "urlServiceURL": "https://url.steerpath.com/",
              "viewProperties": {
                  "bearing": -2.4000000000000905,
                  "pitch": 0,
                  "layerIndex": 2,
                  "buildingRef": "building_1_31552752-7d5a-44c6-8206-cd86bd91f7c4",
                  "bounds": {
                      "sw": {
                          "lng": 24.812049873812953,
                          "lat": 60.22079674581377
                      },
                      "ne": {
                          "lng": 24.812706546050777,
                          "lat": 60.221077322610995
                      }
                  }
              }
          }
      },
      "search": {
          "default": {
              "nonSearchableCssClasses": [
                  "infrastructure_stairs",
                  "infrastructure_lift",
                  "category_stairs",
                  "category_other",
                  "infrastructure_hole",
                  "category_cover_poi",
                  "infrastructure_department",
                  "infrastructure_wing"
              ],
              "searchSuggestions": [
                  {
                      "title": "sp_show_free_desk_title",
                      "shortTitle": "sp_show_free_desk_title_short",
                      "description": "sp_show_free_desk_description",
                      "iconName": "service_desk_free",
                      "action": {
                          "type": "show_free_live_rooms",
                          "allTags": [
                              "service_desk"
                          ]
                      }
                  },
                  {
                      "title": "sp_show_free_phone_booths_title",
                      "shortTitle": "sp_show_free_phone_booths_title_short",
                      "description": "sp_show_free_phone_booths_description",
                      "iconName": "service_phone_free",
                      "action": {
                          "type": "show_free_live_rooms",
                          "allTags": [
                              "service_phone"
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
                      "title": "sp_category_meeting_room_title",
                      "shortTitle": "sp_category_meeting_room_title_short",
                      "description": "sp_category_meeting_room_description",
                      "iconName": "category_meeting_room",
                      "action": {
                          "type": "show_pois_with_tags",
                          "allTags": [
                              "category_meeting_room"
                          ]
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
                              "toilet",
                              "common_tag"
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
              "bearing": -2.4,
              "pitch": 0,
              "layerIndex": 2,
              "buildingRef": "building_1_31552752-7d5a-44c6-8206-cd86bd91f7c4",
              "bounds": {
                  "sw": {
                      "lng": 24.812092498784267,
                      "lat": 60.220765809605325
                  },
                  "ne": {
                      "lng": 24.812663064333123,
                      "lat": 60.22107929468535
                  }
              }
          },
          "share": {
              "hash": false,
              "qrCodeShare": {
                  "enabled": false,
                  "qrCodeURL": "https://kiosk.steerpath.com/",
                  "qrCodePath": "/steerpath/index.html"
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
      "live": {
          "default": {
              "liveURL": "https://live-eu3.steerpath.com/",
              "liveApiKey": "eyJhbGciOiJSUzI1NiJ9.eyJpYXQ6IjoxNTY0NDEwMjIxLCJqdGkiOiI0ZTAxOWJmYy04YzYzLTQwMzctOTcwMy0wZmNhZTM4Mjk4ZDciLCJzY29wZXMiOiJ2Mi1kNGQzNmI5Zi1lOGZiLTQ4MDctYTBjNS1lZDk3MzM0NGI2MDktbGl2ZTpyLHciLCJzdWIiOiJ2Mi1kNGQzNmI5Zi1lOGZiLTQ4MDctYTBjNS1lZDk3MzM0NGI2MDkifQ.gtZ7U2fhEYeXaKUJ9O4CVpGiG45cbWDw9Vc2RpgwykO8x1rci6Qnu6VNRe2QZc0Ay6URiAGWSImSuKrWvQwzZtGBbex90dqxsyMPqNLGZXzvlGRndVCm5gtCD6SuF0o5Pg6vn26xqG_uD13lJjI5bdpQRTuS8LoNOTsUiCHTTZu63Nv2t3F0UvXXKmlgJ7IBL7T-fym8I63ZyAKaPbUMUQJRgBmcLRRDvGvNseJQTsKbIlm0Ox5YGnzqMRWAKMwGeI7GGz7V_FUTifutmSdoHpdxBaWZSwpxtzmxUpIEyjNQRhIm1w86YqxgWEiOQTiV4Wj2vkOLdABfiMWLe6v3Ww",
              "enabled": true
          },
          "web": {
              "enabled": true,
              "liveApiKey": "eyJhbGciOiJSUzI1NiJ9.eyJpYXQ6IjoxNTY0NDEwMjIxLCJqdGkiOiJlZWJkMDZmOS1hNzE2LTQ1YmYtOWE1MC1lYWZkNDE0YmY1Y2UiLCJzY29wZXMiOiJ2Mi1kNGQzNmI5Zi1lOGZiLTQ4MDctYTBjNS1lZDk3MzM0NGI2MDktbGl2ZTpyIiwic3ViIjoidjItZDRkMzZiOWYtZThmYi00ODA3LWEwYzUtZWQ5NzMzNDRiNjA5In0.mLdk_iS5hk_QYDjKDLfMfQKLVeJx9iJHPEoxEGNsO8fNJJJbuyNntV6p2blIU48nL1ZWuVLEsdLXVLN79x6rRI700RF71tj2QeLpVfDfKe18bfQO3HO95jtpyspw4wQEVFkoWv8WYEP7b8TExn8XeaHYYCdMCE-RnvWLfyxKrDKxgNhz2D8yLM2G9WqPJNsLSqSGU8kqSHbrrSHL_ro5aQzumFsfXOkty1MiQx9GukO0RiOvOd5C_46LJOetpERWXMP16z1wquqVGY9mqEWkQm-aTDAUjW4pGRqdK0gObrN0C5qmyDqoJjAJXKM-FxcGO1Truy13o5fSB4nfVauS0w",
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
              "gpsThresholdM": 50
          },
          "ios": {
              "useCompass": true
          }
      },
      "ui": {
          "default": {
              "colors": {
                  "primaryColor": "#01b2a5",
                  "secondaryColor": "#d7b127",
                  "detailColor": "#C6956C",
                  "bluedotColor": "#3887be",
                  "primaryVariantColor": "#c90050",
                  "secondaryVariantColor": "#871c9a",
                  "detailVariantColor": "#ff9127",
                  "zoomedInRouteLineColor": "#01b2a5",
                  "zoomedOutRouteLineColor": "#d7b127",
                  "altRouteLineColor": "#DEC56B",
                  "backgroundColor": "#fafafa",
                  "shadeColor": "#949494",
                  "textColor": "#01b2a5",
                  "textHaloColor": "#fff"
              }
          }
      }
  },
  "update": false
}
`