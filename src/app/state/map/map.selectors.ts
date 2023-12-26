import { createSelector } from '@ngrx/store';
import { MapState } from './map.interfaces';
import { AppState } from '@atticadt/state';

export const selectMapState = (state: AppState) => state.map;

export const mapIsInitialized = createSelector(
  selectMapState,
  (state: MapState) => state.isInitialized
);

export const isLoading = createSelector(
  selectMapState,
  (state: MapState) => state.isLoading
);

export const style = createSelector(
  selectMapState,
  (state: MapState) => state.style
);

export const bounds = createSelector(
  selectMapState,
  (state: MapState) => state.bounds
);

export const bearing = createSelector(
  selectMapState,
  (state: MapState) => state.bearing
);

export const pitch = createSelector(
  selectMapState,
  (state: MapState) => state.pitch
);

export const zoom = createSelector(
  selectMapState,
  (state: MapState) => state.zoom
);

export const center = createSelector(
  selectMapState,
  (state: MapState) => state.center
);

export const lat = createSelector(
  selectMapState,
  (state: MapState) => state.lat
);

export const lng = createSelector(
  selectMapState,
  (state: MapState) => state.lng
);

// export const follow = createSelector(
//   selectMapState,
//   (state: MapState) => state.follow
// );

// export const where = createSelector(
//   selectMapState,
//   (state: MapState) => state.where
// );

// export const antialias = createSelector(
//   selectMapState,
//   (state: MapState) => state.antialias
// );

export const skyLayer = createSelector(
  selectMapState,
  (state: MapState) => state.skyLayer
);

export const terrain = createSelector(
  selectMapState,
  (state: MapState) => state.terrain
);

// export const shadows = createSelector(
//   selectMapState,
//   (state: MapState) => state.shadows
// );

// export const dateTime = createSelector(
//   selectMapState,
//   (state: MapState) => state.dateTime
// );

export const customLayers = createSelector(
  selectMapState,
  (state: MapState) => state.customLayers
);

export const customLayersNames = createSelector(
  selectMapState,
  (state: MapState) =>
    state.location.glbModels?.map((customLayer) => customLayer.id)
);
