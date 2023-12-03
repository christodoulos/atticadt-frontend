import { createSelector } from '@ngrx/store';

import { AuthState } from './auth';
import { LocationState } from './location';

export interface AppState {
  auth: AuthState;
  location: LocationState;
}

// export const isLoading = createSelector(
//   (AppState) => AppState,
//   nutsIsLoading,
//   sourceIsLoading,
//   selectMapIsLoading
// );

export * from './auth';
export * from './location';
export * from './ui-action';
