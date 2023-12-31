import { CustomLayerInterface, LngLat } from 'mapbox-gl';

export type AnchorType =
  | 'auto'
  | 'center'
  | 'top'
  | 'bottom'
  | 'left'
  | 'right'
  | 'top-left'
  | 'top-right'
  | 'bottom-left'
  | 'bottom-right';

export type ThreeDType = { x: number; y: number; z: number };

export interface GLBModel {
  id: string;
  where: LngLat;
  elevation: number;
  anchor: AnchorType;
  glb: string;
  scale: ThreeDType;
  rotation: ThreeDType;
  castShadow: boolean;
  tooltip: string;
}

export interface MapLocation {
  name: string;
  center: { lng: number; lat: number };
  zoom: number;
  bearing: number;
  pitch: number;
  glbModels?: GLBModel[];
}

export interface MapboxLayerVisibility {
  'poi-label': boolean;
  'road-label': boolean;
  'transit-label': boolean;
}

export interface MapState {
  isInitialized: boolean;
  mapIsLoading: boolean;
  style: string;
  bounds: number[][];
  bearing: number;
  pitch: number;
  zoom: number;
  center: { lng: number; lat: number };
  lat: number;
  lng: number;
  terrain: boolean;
  skyLayer: boolean;
  location: MapLocation;
  mapboxLayerVisibility: MapboxLayerVisibility;
  customLayers: CustomLayerInterface[] | null;
}

export const MapInitialState: MapState = {
  isInitialized: false,
  mapIsLoading: false,
  style: 'mapbox://styles/christodoulos/clqjoryfl00o301qvhaat7oj4',
  bounds: [
    [-180, -90],
    [180, 90],
  ],
  bearing: 0,
  pitch: 0,
  zoom: 0,
  center: { lng: 0, lat: 0 },
  lat: 0,
  lng: 0,
  terrain: false,
  skyLayer: false,
  location: {
    name: '',
    center: { lng: 0, lat: 0 },
    zoom: 0,
    bearing: 0,
    pitch: 0,
  },
  mapboxLayerVisibility: {
    'poi-label': false,
    'road-label': false,
    'transit-label': false,
  },
  customLayers: null,
};
