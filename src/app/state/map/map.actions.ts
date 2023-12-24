import { createAction, props } from '@ngrx/store';
import { MapLocation, MapState } from './map.interfaces';
import { CustomLayerInterface } from 'mapbox-gl';

export const mapInitialize = createAction('[Map] Initialize');

export const mapInitialized = createAction('[Map] Initialized');

export const mapload = createAction('[Map] Load');

export const maploaded = createAction('[Map] Loaded');

export const update = createAction(
  '[Map] Update',
  props<{ attrs: Partial<MapState> }>()
);

export const setStyle = createAction(
  '[Map] Set Style',
  props<{ style: string }>()
);

export const setBounds = createAction(
  '[Map] Set Bounds',
  props<{ bounds: number[][] }>()
);

export const setBearing = createAction(
  '[Map] Set Bearing',
  props<{ bearing: number }>()
);

export const setPitch = createAction(
  '[Map] Set Pitch',
  props<{ pitch: number }>()
);

export const setZoom = createAction(
  '[Map] Set Zoom',
  props<{ zoom: number }>()
);

export const setCenter = createAction(
  '[Map] Set Center',
  props<{ center: { lng: number; lat: number } }>()
);

export const setLat = createAction('[Map] Set Lat', props<{ lat: number }>());

export const setLng = createAction('[Map] Set Lng', props<{ lng: number }>());

// export const setFollow = createAction(
//   '[Map] Set Follow',
//   props<{ follow: boolean }>()
// );

// export const setWhere = createAction(
//   '[Map] Set Where',
//   props<{ where: MapWhere }>()
// );

// export const setAntialias = createAction(
//   '[Map] Set Antialias',
//   props<{ antialias: boolean }>()
// );

export const setSkyLayer = createAction(
  '[Map] Set Sky Layer',
  props<{ skyLayer: boolean }>()
);

export const setTerrain = createAction(
  '[Map] Set Terrain',
  props<{ terrain: boolean }>()
);

export const setShadows = createAction(
  '[Map] Set Shadows',
  props<{ shadows: boolean }>()
);

export const setDateTime = createAction(
  '[Map] Set Date Time',
  props<{ dateTime: Date }>()
);

export const toggleFollow = createAction('[Map] Toggle Follow');

export const toggleAntialias = createAction('[Map] Toggle Antialias');

export const toggleSkyLayer = createAction('[Map] Toggle Sky Layer');

export const toggleTerrain = createAction('[Map] Toggle Terrain');

export const toggleShadows = createAction('[Map] Toggle Shadows');

// Map Location Actions

export const setLocation = createAction(
  '[Map] Set Location',
  props<{ name: string }>()
);

export const setLocationSuccess = createAction(
  '[Map] Set Location Success',
  props<{ location: MapLocation }>()
);

export const showCustomLayers = createAction(
  '[Map] Show Custom Layers',
  props<{ customLayers: CustomLayerInterface[] }>()
);

export const hideCustomLayers = createAction('[Map] Hide Custom Layers');
