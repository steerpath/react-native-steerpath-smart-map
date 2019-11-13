import { ViewProperties } from "react-native";

export enum SmartMapModes {
  MAP_ONLY = "mapOnly",
  STATIC = "static",
  SEARCH = "search"
}

export enum SmartObjectSource {
  STATIC = "STATIC",
  MARKER = "MARKER",
  LIVE = "LIVE"
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
  MAP_CLICKED = "SPSmartMapClicked",
  SEARCH_RESULT_SELECTED = "SPSearchResultSelected"
}

export enum SmartMapViewStatus {
  ONLY_MAP = "onlyMap",
  CARD_VIEW = "cardView",
  SEARCH_IN_MIN_HEIGHT = "searchInMinHeight",
  ERROR_VIEW = "errorView",
  SETTING_VIEW = "settingView",
  NAVIGATING_VIEW = "navigatingView",
  SEARCH_IN_EXPANDED_MODE = "searchInExpandedMode",
  SEARCH_IN_PREFERRED_HEIGHT = "searchInPreferredHeight"
}

export enum NavigationError {
  OBJECT_NOT_FOUND = "objectNotFound",
  ROUTE_NOT_FOUND = "routeNotFound",
  USER_LOCATION_NOT_FOUND = "userLocationNotFound"
}

export enum SmartMapUserTaskResponse {
  STARTED = "started",
  CANCELLED = "cancelled",
  ERROR = "error",
  BUSY = "busy",
  UNSUPPORTED = "unsupported",
  COMPLETED = "completed"
}

export interface SmartMapObject {
  latitude: number;
  longitude: number;
  floorIndex: number;
  localRef: string;
  buildingRef: string;
  title: string;
  properties: object,
  source: SmartObjectSource;
}

export interface SmartViewWebProps {
  apiKey?: string;
}

export interface SmartViewNativeProps {
  mapMode?: SmartMapModes;
  onMapClicked?: (payload: { mapObjects: SmartMapObject[] }) => void;
  onSearchResultSelected?: (payload: { mapObject: SmartMapObject }) => void;
  onUserFloorChanged?: (payload: {
    floorIndex: number;
    buildingRef?: string;
  }) => void;
  onVisibleFloorChanged?: (payload: {
    floorIndex: number;
    buildingRef?: string;
  }) => void;
  onViewStatusChanged?: (payload: {
    status: SmartMapViewStatus;
    poiDetail: SmartMapObject;
  }) => void;
  onNavigationFailed?: (payload: { error: NavigationError }) => void;
  onNavigationEnded?: () => void;
  onNavigationStarted?: () => void;
  onNavigationPreviewAppeared?: () => void;
  onNavigationDestinationReached?: () => void;
  onUserTaskResponse?: (payload: {
    response: SmartMapUserTaskResponse;
    userTask: SmartMapUserTask;
  }) => void;
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
