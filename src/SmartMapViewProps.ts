import { ViewProperties } from "react-native";

export interface ConfigSDK {
  apiKey: string;
  // In Web, the config file path is a JSON string, on Android/iOS, it will be a
  // local file path to the config JSON file
  configFilePath: string;
}

export interface SmartMapViewMethods {
  addMarker(
    smartMapObj: SmartMapObject,
    layout: Layout | null,
    iconName: string | null,
    textColor: string | null,
    textHaloColor: string | null
  ): void;
  addMarkers(
    mapObjectsArray: SmartMapObject[],
    layout: Layout | null,
    iconName: string | null,
    textColor: string | null,
    textHaloColor: string | null
  ): void;
  animateCamera(arg: {
    latitude: number;
    longitude: number;
    zoomLevel: number;
    bearing?: number;
    pitch?: number;
    floorIndex?: number;
    buildingRef?: string;
  }): void;
  animateCameraToBuildingRef(
    buildingRef: string,
    callback: (response: MapResponse) => void
  ): void;
  animateCameraToObject(
    localRef: string,
    buildingRef: string,
    zoomLevel: number | null,
    callback: (response: MapResponse) => void
  ): void;
  cancelCurrentUserTask(): void;
  getCurrentUserTask(
    callback: (userTaskResponse: SmartMapUserTaskResponse) => void
  ): void;
  getMapObject(
    localRef: string,
    buildingRef: string,
    source: SmartObjectSource,
    callback: (mapObject: SmartMapObject | null) => void
  ): void;
  getMapObjectByProperties(
    properties: Record<string, unknown>,
    callback: (mapObject: SmartMapObject | null) => void
  ): void;
  getWidgetPadding(
    callback: (padding: {
      left: number;
      top: number;
      right: number;
      bottom: number;
    }) => void
  ): void;
  onBackPressed(callback: (response: boolean) => void): void; // Android only
  removeMarker(smartMapObj: SmartMapObject): void;
  removeMarkers(mapObjectsArray: SmartMapObject[]): void;
  removeAllMarkers(): void;
  selectMapObject(mapObj: SmartMapObject): void;
  setCamera(arg: {
    latitude: number;
    longitude: number;
    zoomLevel: number;
    bearing?: number;
    pitch?: number;
    floorIndex?: number;
    buildingRef?: string;
  }): void;
  setCameraToBuildingRef(
    buildingRef: string,
    callback: (response: MapResponse) => void
  ): void;
  setCameraToObject(
    localRef: string,
    buildingRef: string,
    zoomLevel: number,
    callback: (response: MapResponse) => void
  ): void;
  setGeoJson(
    sourceId: string,
    geoJson: Record<string, unknown> | null,
    callback: (response: MapResponse) => void
  ): void;
  setMapMode(mapMode: SmartMapMode): void;
  setWidgetPadding(
    left: number,
    top: number,
    right: number,
    bottom: number
  ): void;
  start(): void; // Android only
  startUserTask(userTask: SmartMapUserTask): void;
  stop(): void; // Android only
}

export enum SmartMapMode {
  MAP_ONLY = "mapOnly",
  STATIC = "static",
  SEARCH = "search",
}

export enum SmartObjectSource {
  STATIC = "STATIC",
  MARKER = "MARKER",
  LIVE = "LIVE",
}

export enum Layout {
  TOP = "top",
  BOTTOM = "bottom",
  LEFT = "left",
  RIGHT = "right",
}

export enum MapResponse {
  SUCCESS = "success",
  OBJECT_NOT_FOUND = "objectNotFound",
  NETWORK_ERROR = "networkError",
  NOT_SUPPORTED = "notSupported",
}

export enum SmartGeofenceResponse {
  SUCCESS = "success",
  MALFORMED_DATA = "malformedData",
  NOT_FOUND = "notFound",
}

export enum SmartMapEvent {
  MAP_LOADED = "SPSmartMapLoaded",
  MAP_CLICKED = "SPSmartMapClicked",
  SEARCH_RESULT_SELECTED = "SPSearchResultSelected",
}

export enum SmartMapViewStatus {
  ONLY_MAP = "onlyMap",
  CARD_VIEW = "cardView",
  ERROR_VIEW = "errorView",
  SETTING_VIEW = "settingView",
  NAVIGATING_VIEW = "navigatingView",
  SEARCH_VIEW = "searchView",
}

export enum SmartBottomSheetState {
  HIDDEN = "hidden",
  COLLAPSED = "collapsed",
  HALF_EXPANDED = "halfExpanded",
  EXPANDED = "expanded",
}

export enum NavigationError {
  OBJECT_NOT_FOUND = "objectNotFound",
  ROUTE_NOT_FOUND = "routeNotFound",
  USER_LOCATION_NOT_FOUND = "userLocationNotFound",
}

export enum SmartMapUserTaskResponse {
  STARTED = "started",
  CANCELLED = "cancelled",
  ERROR = "error",
  BUSY = "busy",
  UNSUPPORTED = "unsupported",
  COMPLETED = "completed",
}

export interface SmartMapObject {
  latitude: number;
  longitude: number;
  floorIndex: number;
  localRef: string;
  buildingRef: string;
  title: string;
  properties: Record<string, unknown>;
  source: SmartObjectSource;
}

export interface SmartViewWebProps {
  apiKey?: string;
}

export interface SearchAction {
  title: string;
  shortTitle: string;
  description: string;
  iconName: string;
  action: {
    allTags?: string[];
    anyTags?: string[];
    type: string;
  }
}

export interface SmartViewNativeProps {
  onBottomSheetStateChanged?: (payload: {
    state: SmartBottomSheetState;
  }) => void;
  onMapClicked?: (payload: { mapObjects: SmartMapObject[] }) => void;
  onNavigationDestinationReached?: () => void;
  onNavigationEnded?: () => void;
  onNavigationFailed?: (payload: { error: NavigationError }) => void;
  onNavigationPreviewAppeared?: () => void;
  onNavigationStarted?: () => void;
  onSearchCategorySelected?: (payload: {
    searchAction: SearchAction;
    searchResults: SmartMapObject[];
  }) => void;
  onSearchResultSelected?: (payload: { mapObject: SmartMapObject }) => void;
  onUserFloorChanged?: (payload: {
    floorIndex: number;
    buildingRef?: string;
  }) => void;
  onUserTaskResponse?: (payload: {
    response: SmartMapUserTaskResponse;
    userTask: SmartMapUserTask;
  }) => void;
  onViewStatusChanged?: (payload: {
    status: SmartMapViewStatus;
    poiDetail: SmartMapObject;
  }) => void;
  onVisibleFloorChanged?: (payload: {
    floorIndex: number;
    buildingRef?: string;
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

export interface SmartMapPOISelectionUserTask {
  shouldAddMarker: boolean;
  actionButtonText: string;
  actionButtonIcon: string;
  smartMapObject: SmartMapObject;
}

export enum SmartMapUserTaskType {
  NAVIGATION = "navigation",
  POI_SELECTION = "poiSelection",
}

export interface SmartMapUserTask {
  type: SmartMapUserTaskType;
  payload: SmartMapNavigationUserTask | SmartMapPOISelectionUserTask;
}
