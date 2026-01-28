import { trackingStatusValues } from '@/components/SteerpathMap';
import type { LayerSpecification, StyleImageMetadata } from 'maplibre-gl';
import { LocationResponse } from 'react-native-steerpath-smart-map';

import { z } from 'zod';

export type PaletteName = string & { __paletteName: never };
export type ColorVariable = string;
export type Color = string;

export type BinaryImageData = {
  type: 'png' | 'jpeg' | 'gif';
  url: string;
  opts: {
    // The pixel ratio for this binary data that is loaded
    pixelRatio: number;

    // With and Height are not recommended to be used
    // This width and hight will be used to resize the image
    // so if you have a 20px normal image at pixel density 1,
    // and you want it to be 15px at pixel density 1,
    // then if your pixelratio is 2 you need to set the width to 30.
    width?: number;
    height?: number;
  } & StyleImageMetadata;
};

type SwitchName = string;
type EnabledChildId = string;

export type SvgImageData = {
  type: 'svg';
  url: string;
  opts?: {
    // The width and height at pixel ratio 1
    width?: number;
    height?: number;

    pixelRatio?: never;
    preProcess?: boolean;
    palette?: Record<ColorVariable, Color>;
    switches?: Record<SwitchName, EnabledChildId | undefined>;
  } & Omit<StyleImageMetadata, 'pixelRatio' | 'sdf'>;
};

export type LottieData = {
  type: 'lottie';
  url: string;
  opts: {
    // The width and height at pixel ratio 1
    width: number;
    height: number;
    // We could add more options like aspect ratio etc.

    pixelRatio?: never;
  };
};

export type SupportedData = BinaryImageData | SvgImageData | LottieData;

export type SvgOpts = {
  pixelRatio: number;
};

// eslint-disable-next-line no-unused-vars
type OnCompleteFunc = (imageId: string) => void;
export type AddImageVars = {
  imageId: string;
  data: SupportedData;
  onComplete: OnCompleteFunc;
};

export const GeoJSONFeatureSchema = z.object({
  type: z.literal('Feature'),
  id: z.union([z.string(), z.number()]).optional(),
  properties: z.object({
    buildingRef: z.string().optional(),
    localRef: z.string().optional(),
    layerIndex: z.number().optional(),
  }),
  geometry: z.union([
    z.object({
      type: z.literal('Point'),
      coordinates: z.tuple([z.number(), z.number()]),
    }),
    z.object({
      type: z.literal('MultiPoint'),
      coordinates: z.array(z.tuple([z.number(), z.number()])),
    }),
    z.object({
      type: z.literal('Polygon'),
      coordinates: z.array(z.array(z.tuple([z.number(), z.number()]))),
    }),
    z.object({
      type: z.literal('MultiPolygon'),
      coordinates: z.array(z.array(z.array(z.tuple([z.number(), z.number()])))),
    }),
    z.object({
      type: z.literal('LineString'),
      coordinates: z.array(z.tuple([z.number(), z.number()])),
    }),
    z.object({
      type: z.literal('MultiLineString'),
      coordinates: z.array(z.array(z.tuple([z.number(), z.number()]))),
    }),
  ]),
});

export const EventMapClickSchema = z.object({
  type: z.literal('EVENT_CLICK_EVENT'),
  frameId: z.string(),
  point: z.object({
    x: z.number(),
    y: z.number(),
  }),
  lngLat: z.object({
    lng: z.number(),
    lat: z.number(),
  }),
  mapFeatures: z.array(GeoJSONFeatureSchema),
});

export const FunctionSelectPoiSchema = z.object({
  type: z.literal('FUNC_SELECT_POI'),
  frameId: z.string(),
  buildingRef: z.string(),
  localRef: z.string(),
});

export const FunctionNavigateBetweenPoisSchema = z.object({
  type: z.literal('FUNC_NAVIGATE_BETWEEN_POIS'),
  frameId: z.string(),
  from: z.object({
    buildingRef: z.string(),
    localRef: z.string(),
  }),
  to: z.object({
    buildingRef: z.string(),
    localRef: z.string(),
  }),
});

export const EventNavigationStartedSchema = z.object({
  type: z.literal('EVENT_NAVIGATION_STARTED'),
  frameId: z.string(),
  from: z.object({
    buildingRef: z.string(),
    localRef: z.string(),
  }),
  to: z.object({
    buildingRef: z.string(),
    localRef: z.string(),
  }),
  status: z.union([z.literal('STARTED'), z.literal('ERROR')]),
});

export const FunctionExitNavigationSchema = z.object({
  type: z.literal('FUNC_EXIT_NAVIGATION'),
  frameId: z.string(),
});

export const EventUrlChangedSchema = z.object({
  type: z.literal('EVENT_URL_CHANGED'),
  frameId: z.string(),
  url: z.string(),
});

export const EventMapLoadedSchema = z.object({
  type: z.literal('EVENT_MAP_LOADED'),
  frameId: z.string(),
});

export const EventExternalLinkPressedSchema = z.object({
  type: z.literal('EVENT_EXTERNAL_LINK_PRESSED'),
  frameId: z.string(),
  url: z.string(),
});

export const FunctionCameraToPoiSchema = z.object({
  type: z.literal('FUNC_CAMERA_TO_POI'),
  frameId: z.string(),
  buildingRef: z.string(),
  localRef: z.string(),
  animated: z.boolean(),
});

export const FunctionCameraToCoordsSchema = z.object({
  type: z.literal('FUNC_CAMERA_TO_COORDS'),
  frameId: z.string(),
  coords: z.tuple([z.number(), z.number()]),
  buildingRef: z.string().optional(),
  layerIndex: z.number().optional(),
  animated: z.boolean(),
});

// if markers array is empty, all markers will be removed
export const FunctionSetMarkersSchema = z.object({
  type: z.literal('FUNC_SET_MARKERS'),
  frameId: z.string(),
  markers: z.array(
    z.object({
      id: z.string(),
      coords: z.tuple([z.number(), z.number()]),
      buildingRef: z.string().optional().default(''),
      layerIndex: z.number().optional().default(0),
      title: z.string().optional().default(''),
      description: z.string().optional().default(''),
    }),
  ),
});

export const FunctionResetSchema = z.object({
  type: z.literal('FUNC_RESET'),
  frameId: z.string(),
});

const LayerSpecificationSchema = z.custom<LayerSpecification>();
const DataUrlsSchema = z.custom<Omit<AddImageVars, 'onComplete'>>();
export const FunctionSetMapContent = z.object({
  type: z.literal('FUNC_SET_MAP_CONTENT'),
  frameId: z.string(),
  sourceId: z.string(),
  geojson: z
    .object({
      type: z.literal('FeatureCollection'),
      features: z.array(GeoJSONFeatureSchema),
    })
    .optional(),
  layers: z.array(LayerSpecificationSchema).optional(),
  beforeLayerId: z.string().optional(),
  dataUrls: z.array(DataUrlsSchema).optional(),
  updateIndoorStyle: z.boolean().default(true),
});

export const FunctionClearMapContent = z.object({
  type: z.literal('FUNC_CLEAR_MAP_CONTENT'),
  frameId: z.string(),
  sourceId: z.string(),
});

// to change maplibre featurestate

export const FunctionSetFeatureStates = z.object({
  type: z.literal('FUNC_SET_FEATURE_STATES'),
  frameId: z.string(),
  sourceId: z.string(),
  featureIds: z.array(z.number()),
  state: z.object({}),
});

const UserLocationSchema = z.custom<LocationResponse>();
const UserHeadingSchema = z.object({
  heading: z.number(),
  accuracyDeg: z.number(),
});
export const FunctionSetUserLocation = z.object({
  type: z.literal('FUNC_SET_USER_LOCATION'),
  frameId: z.string(),
  newLocation: UserLocationSchema.optional(),
  newHeading: UserHeadingSchema.optional(),
});

const TrackingStatusSchema = z.enum(trackingStatusValues);
export const EventLocateMeButtonPressed = z.object({
  type: z.literal('EVENT_LOCATE_ME_BUTTON_PRESSED'),
  frameId: z.string(),
  currentTrackingStatus: TrackingStatusSchema,
});

export const FunctionSetBluetoothPermissionStatus = z.object({
  type: z.literal('FUNC_SET_BLUETOOTH_PERMISSION_STATUS'),
  frameId: z.string(),
  enabled: z.boolean(),
});

export const FunctionSetBluetoothEnabled = z.object({
  type: z.literal('FUNC_SET_BLUETOOTH_ENABLED'),
  frameId: z.string(),
  enabled: z.boolean(),
});

export const FunctionSetLocationPermissionStatus = z.object({
  type: z.literal('FUNC_SET_LOCATION_PERMISSION_STATUS'),
  frameId: z.string(),
  enabled: z.boolean(),
});
export const FunctionSetLocationEnabled = z.object({
  type: z.literal('FUNC_SET_LOCATION_ENABLED'),
  frameId: z.string(),
  enabled: z.boolean(),
});

// all types of functions above
export const FunctionMessageSchema = z.union([
  FunctionSelectPoiSchema,
  FunctionNavigateBetweenPoisSchema,
  FunctionExitNavigationSchema,
  FunctionCameraToPoiSchema,
  FunctionCameraToCoordsSchema,
  FunctionSetMarkersSchema,
  FunctionResetSchema,
  FunctionSetMapContent,
  FunctionClearMapContent,
  FunctionSetFeatureStates,
  FunctionSetUserLocation,
  FunctionSetBluetoothPermissionStatus,
  FunctionSetBluetoothEnabled,
  FunctionSetLocationPermissionStatus,
  FunctionSetLocationEnabled,
]);

export const EventMessageSchema = z.union([
  EventMapClickSchema,
  EventNavigationStartedSchema,
  EventUrlChangedSchema,
  EventExternalLinkPressedSchema,
  EventMapLoadedSchema,
  EventLocateMeButtonPressed,
]);

export type EventMessage = z.infer<typeof EventMessageSchema>;

export type EventMapClick = z.infer<typeof EventMapClickSchema>;
export type EventNavigationStarted = z.infer<
  typeof EventNavigationStartedSchema
>;
export type EventUrlChanged = z.infer<typeof EventUrlChangedSchema>;
export type MapLoaded = z.infer<typeof EventMapLoadedSchema>;
export type EventExternalLinkPressed = z.infer<
  typeof EventExternalLinkPressedSchema
>;

export type FunctionMessage = z.infer<typeof FunctionMessageSchema>;
export type FunctionSelectPoi = z.infer<typeof FunctionSelectPoiSchema>;
export type FunctionNavigateBetweenPois = z.infer<
  typeof FunctionNavigateBetweenPoisSchema
>;
export type FunctionCameraToPoi = z.infer<typeof FunctionCameraToPoiSchema>;
export type FunctionSetMarkers = z.infer<typeof FunctionSetMarkersSchema>;

export type ClickEventFeatures = z.infer<typeof GeoJSONFeatureSchema>;
export type UserLocation = z.infer<typeof UserLocationSchema>;
export type UserHeading = z.infer<typeof UserHeadingSchema>;
