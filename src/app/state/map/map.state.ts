import { createFeature, createReducer, createSelector, on } from '@ngrx/store';
import { MapInitialState } from './map.interfaces';
import * as MapAction from './map.actions';

export const mapReducer = createReducer(
  MapInitialState,

  //   Map initialize action
  on(MapAction.mapInitialize, (state) => ({
    ...state,
    isInitialized: false,
  })),

  //   Map initialized action
  on(MapAction.mapInitialized, (state) => ({
    ...state,
    isInitialized: true,
  })),

  //   Map load action
  on(MapAction.mapload, (state) => ({
    ...state,
    isLoading: true,
  })),

  //   Map loaded action
  on(MapAction.maploaded, (state) => ({
    ...state,
    isLoading: false,
  })),

  //   Map update action
  on(MapAction.update, (state, action) => {
    const center = action.attrs['center'];
    if (center) {
      const { lng, lat } = center;
      return { ...state, ...action.attrs, lng, lat };
    } else {
      return { ...state, ...action.attrs };
    }
  }),

  //   Set map config property action
  on(MapAction.setMapConfigProperty, (state, action) => {
    const { property, value } = action;
    return { ...state, [property]: value };
  }),

  //   Set style action
  on(MapAction.setStyle, (state, action) => {
    const { style } = action;
    return { ...state, style };
  }),

  //   Set center action
  on(MapAction.setCenter, (state, action) => {
    const { center } = action;
    return { ...state, center };
  }),

  //   Set zoom action
  on(MapAction.setZoom, (state, action) => {
    const { zoom } = action;
    return { ...state, zoom };
  }),

  //   Set bearing action
  on(MapAction.setBearing, (state, action) => {
    const { bearing } = action;
    return { ...state, bearing };
  }),

  //   Set pitch action
  on(MapAction.setPitch, (state, action) => {
    const { pitch } = action;
    return { ...state, pitch };
  }),

  //   Set bounds action
  on(MapAction.setBounds, (state, action) => {
    const { bounds } = action;
    return { ...state, bounds };
  }),

  //   Set shadows action
  on(MapAction.setShadows, (state, action) => {
    const { shadows } = action;
    return { ...state, shadows };
  }),

  //   Toggle Sky Layer action
  on(MapAction.toggleSkyLayer, (state) => ({
    ...state,
    skyLayer: !state.skyLayer,
  })),

  //   Toggle Terrain action
  on(MapAction.toggleTerrain, (state) => ({
    ...state,
    terrain: !state.terrain,
  })),

  on(MapAction.setLocation, (state) => ({
    ...state,
    isLoading: true,
  })),

  on(MapAction.setLocationSuccess, (state, action) => {
    const { center, zoom, bearing, pitch } = action.location;
    const { lat, lng } = action.location.center;
    return {
      ...state,
      isLoading: false,
      location: action.location,
      lat,
      lng,
      center,
      zoom,
      bearing,
      pitch,
    };
  })
);

export const mapFeature = createFeature({
  name: 'map',
  reducer: mapReducer,
  extraSelectors: ({ selectLocation }) => ({
    selectCustomLayerNames: createSelector(selectLocation, (location) =>
      location.glbModels?.map((customLayer) => customLayer.id)
    ),
  }),
});
