import { createReducer, on } from '@ngrx/store';
import { MapInitialState } from './map.interfaces';
import {
  mapInitialize,
  mapInitialized,
  mapload,
  maploaded,
  setBearing,
  setBounds,
  setCenter,
  setDateTime,
  setLat,
  setLng,
  setLocation,
  setLocationSuccess,
  setMapConfigProperty,
  setPitch,
  setShadows,
  setSkyLayer,
  setStyle,
  setTerrain,
  setZoom,
  toggleSkyLayer,
  toggleTerrain,
  update,
} from './map.actions';

export const mapReducer = createReducer(
  MapInitialState,

  //   Map initialize action
  on(mapInitialize, (state) => ({
    ...state,
    isInitialized: false,
  })),

  //   Map initialized action
  on(mapInitialized, (state) => ({
    ...state,
    isInitialized: true,
  })),

  //   Map load action
  on(mapload, (state) => ({
    ...state,
    isLoading: true,
  })),

  //   Map loaded action
  on(maploaded, (state) => ({
    ...state,
    isLoading: false,
  })),

  //   Map update action
  on(update, (state, action) => {
    const center = action.attrs['center'];
    if (center) {
      const { lng, lat } = center;
      return { ...state, ...action.attrs, lng, lat };
    } else
      return {
        ...state,
        ...action.attrs,
      };
  }),

  //   Set Style action
  on(setStyle, (state, action) => ({
    ...state,
    style: action.style,
  })),

  //   Set Bounds action
  on(setBounds, (state, action) => ({
    ...state,
    bounds: action.bounds,
  })),

  //   Set Bearing action
  on(setBearing, (state, action) => ({
    ...state,
    bearing: action.bearing,
  })),

  //   Set Pitch action
  on(setPitch, (state, action) => ({
    ...state,
    pitch: action.pitch,
  })),

  //   Set Zoom action
  on(setZoom, (state, action) => ({
    ...state,
    zoom: action.zoom,
  })),

  //   Set Center action
  on(setCenter, (state, action) => {
    const { lng, lat } = action.center;
    return {
      ...state,
      center: action.center,
      lng,
      lat,
    };
  }),

  //   Set Lat action
  on(setLat, (state, action) => {
    const center = { lng: state.lng, lat: action.lat };
    return {
      ...state,
      center,
      lat: action.lat,
    };
  }),
  //   Set Lng action
  on(setLng, (state, action) => {
    const center = { lng: action.lng, lat: state.lat };
    return {
      ...state,
      center,
      lng: action.lng,
    };
  }),

  //   Set Follow action
  // on(setFollow, (state, action) => ({
  //   ...state,
  //   follow: action.follow,
  // })),
  //   Set Where action
  // on(setWhere, (state, action) => ({
  //   ...state,
  //   where: action.where,
  // })),
  //   Set Antialias action
  // on(setAntialias, (state, action) => ({
  //   ...state,
  //   antialias: action.antialias,
  // })),

  //   Set Sky Layer action
  on(setSkyLayer, (state, action) => ({
    ...state,
    skyLayer: action.skyLayer,
  })),

  //   Set Terrain action
  on(setTerrain, (state, action) => ({
    ...state,
    terrain: action.terrain,
  })),

  //   Set Shadows action
  on(setShadows, (state, action) => ({
    ...state,
    shadows: action.shadows,
  })),

  //   Set DateTime action
  on(setDateTime, (state, action) => ({
    ...state,
    dateTime: action.dateTime,
  })),

  //   Toggle Follow action
  // on(toggleFollow, (state) => ({
  //   ...state,
  //   follow: !state.follow,
  // })),
  //   Toggle Antialias action
  // on(toggleAntialias, (state) => ({
  //   ...state,
  //   antialias: !state.antialias,
  // })),

  on(setMapConfigProperty, (state, action) => ({
    ...state,
    [action.property]: action.value,
  })),

  //   Toggle Sky Layer action
  on(toggleSkyLayer, (state) => ({
    ...state,
    skyLayer: !state.skyLayer,
  })),

  //   Toggle Terrain action
  on(toggleTerrain, (state) => ({
    ...state,
    terrain: !state.terrain,
  })),

  //   Toggle Shadows action
  // on(toggleShadows, (state) => ({
  //   ...state,
  //   shadows: !state.shadows,
  // }))

  on(setLocation, (state) => ({
    ...state,
    isLoading: true,
  })),

  on(setLocationSuccess, (state, action) => {
    const location = action.location.name;
    const { lat, lng } = action.location.center;
    const { center, zoom, bearing, pitch, glbModels } = action.location;
    return {
      ...state,
      isLoading: false,
      location,
      center,
      lat,
      lng,
      zoom,
      bearing,
      pitch,
      glbModels,
    };
  })
);
