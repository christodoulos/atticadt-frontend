import { CustomLayerInterface, LngLat, LngLatLike } from 'mapbox-gl';

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

export interface MapState {
  isInitialized: boolean;
  isLoading: boolean;
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
  location: string;
  customLayers?: CustomLayerInterface[];
}

export const MapInitialState: MapState = {
  isInitialized: false,
  isLoading: false,
  style: 'mapbox://styles/mapbox/streets-v11',
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
  location: '',
};
