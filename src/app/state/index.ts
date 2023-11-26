import { createSelector } from '@ngrx/store';

import { AuthState } from './auth';

export interface AppState {
  auth: AuthState;
}

// export const isLoading = createSelector(
//   (AppState) => AppState,
//   nutsIsLoading,
//   sourceIsLoading,
//   selectMapIsLoading
// );

export * from './auth';
