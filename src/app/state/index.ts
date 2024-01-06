import { createSelector } from '@ngrx/store';
import { AuthState } from './auth.state';
import { MapState } from './map/map.interfaces';

export interface AppState {
  auth: AuthState;
  map: MapState;
}

export const dtIsLoading = createSelector(
  (state: AppState) => state.auth,
  (state: AppState) => state.map,
  (auth, map) => auth.isLoading || map.isLoading
);

export * from './auth.state';
export * from './ui-action';
export * from './map';
