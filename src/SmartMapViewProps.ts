import { ViewProperties } from "react-native";

export enum SmartMapModes {
  MAP_ONLY = "mapOnly",
  STATIC = "static",
  SEARCH = "search"
}

export enum SmartObjectSource {
  STATIC = "static",
  MARKER = "marker",
  LIVE = "live"
}

export enum Layout {
  TOP = "top",
  BOTTOM = "bottom",
  LEFT = "left",
  RIGHT = "right"
}

export enum MapResponse {
  SUCCESS = "success",
  OBJECT_NOT_FOUND = "objectNotFound",
  NETWORK_ERROR = "networkError"
}

export enum SmartGeofenceResponse {
  SUCCESS = "success",
  MALFORMED_DATA = "malformedData",
  NOT_FOUND = "notFound"
}

export enum SmartMapEvent {
  MAP_LOADED = "SPSmartMapLoaded",
  MAP_CLICKED = "SPSmartMapClicked"
}

export interface SmartMapObject {
  latitude: number;
  longitude: number;
  floorIndex: number;
  localRef: string;
  buildingRef: string;
  title: string;
  source: SmartObjectSource;
}
export interface SmartViewWebProps {
  apiKey?: string;
}

export interface SmartViewNativeProps {
  mapMode?: SmartMapModes;
  onMapClicked?: (payload: { mapObjects: SmartMapObject[] }) => void;
  onUserFloorChanged?: (payload: {
    floorIndex: number;
    buildingRef: string;
  }) => void;
  onVisibleFloorChanged?: (payload: {
    floorIndex: number;
    buildingRef: string;
  }) => void;
  onNavigationEnded?: () => void;
  onNavigationStarted?: () => void;
  onNavigationPreviewAppeared?: () => void;
  onNavigationDestinationReached?: () => void;
}

export interface SmartMapViewProps
  extends ViewProperties,
    SmartViewWebProps,
    SmartViewNativeProps {
  /**
   * This is a quick hack for enabling typed ref
   */
  ref?: any;
  onMapLoaded?: () => void;
}

export type SmartMapNavigationUserTask = SmartMapObject;

export interface SmartMapPOISelectionUserTask extends SmartMapObject {
  shouldAddMarker: boolean;
  actionButtonText: string;
  actionButtonIcon: string;
}

export enum SmartMapUserTaskType {
  NAVIGATION = "navigation",
  POI_SELECTION = "poiSelection"
}

export interface SmartMapUserTask {
  type: SmartMapUserTaskType;
  payload: SmartMapNavigationUserTask | SmartMapPOISelectionUserTask;
}

export interface SmartMapUserTaskResponse {
  type: SmartMapUserTaskType;
  payload: {
    localRef: string;
    buildingRef: string;
  };
}
