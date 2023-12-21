import { createSelector } from '@ngrx/store';
import { AuthState } from './auth';
import { MapState } from './map/map.interfaces';

export interface AppState {
  auth: AuthState;
  map: MapState;
}

export const dtIsLoading = createSelector(
  (state: AppState) => state.map.isLoading,
  (state: AppState) => state.auth.isLoading,
  (mapIsLoading, userIsLoading) => mapIsLoading || userIsLoading
);

export * from './auth';
export * from './ui-action';
export * from './map';
