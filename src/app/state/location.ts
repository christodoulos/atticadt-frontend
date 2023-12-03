import { Injectable, inject } from '@angular/core';
import {
  createAction,
  props,
  createReducer,
  on,
  createSelector,
} from '@ngrx/store';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { AppState } from '@atticadt/state';
import { HttpClient } from '@angular/common/http';
import { map, switchMap } from 'rxjs';

export interface LocationState {
  name: string;
  center: { lng: number; lat: number };
  zoom: number;
  bearing: number;
  pitch: number;
}

export const locationInitialState: LocationState = {
  name: '',
  center: { lng: 0, lat: 0 },
  zoom: 0,
  bearing: 0,
  pitch: 0,
};

// Location Actions

export const setLocation = createAction(
  '[Location] Set Location',
  props<{ name: string }>()
);

export const setLocationSuccess = createAction(
  '[Location] Set Location Success',
  props<LocationState>()
);

// Location Reducer

export const locationReducer = createReducer(
  locationInitialState,
  on(setLocationSuccess, (state, { name, center, zoom, bearing, pitch }) => ({
    ...state,
    name,
    center,
    zoom,
    bearing,
    pitch,
  }))
);

// Location Selectors

export const selectLocationState = (state: AppState) => state.location;

export const locationName = createSelector(
  selectLocationState,
  (state: LocationState) => state.name
);

export const center = createSelector(
  selectLocationState,
  (state: LocationState) => state.center
);

export const zoom = createSelector(
  selectLocationState,
  (state: LocationState) => state.zoom
);

export const bearing = createSelector(
  selectLocationState,
  (state: LocationState) => state.bearing
);

export const pitch = createSelector(
  selectLocationState,
  (state: LocationState) => state.pitch
);

// Location Effects

export const setLocationEffect = createEffect(
  (actions$ = inject(Actions), locationService = inject(LocationService)) => {
    return actions$.pipe(
      ofType(setLocation),
      map((action) => action.name),
      switchMap((name) => locationService.getLocation(name)),
      map((location) => setLocationSuccess(location))
    );
  },
  { functional: true }
);

// Location Service

@Injectable({ providedIn: 'root' })
export class LocationService {
  constructor(private http: HttpClient) {}

  getLocation(name: string) {
    return this.http.get<LocationState>(
      `http://localhost:3456/api/atticadt/location/${name}`
    );
  }
}
