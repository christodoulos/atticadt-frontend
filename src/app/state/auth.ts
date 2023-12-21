import { inject } from '@angular/core';
import { SocialUser } from '@abacritt/angularx-social-login';
import {
  createAction,
  props,
  createReducer,
  on,
  createSelector,
} from '@ngrx/store';
import { AppState } from '@atticadt/state';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map } from 'rxjs';

export interface AuthState {
  loggedIn: boolean;
  isLoading: boolean;
  user: SocialUser | null;
}

export const login = createAction(
  '[Auth] Login',
  props<{ user: SocialUser }>()
);

export const loginSuccess = createAction('[Auth] Login Success');

export const logout = createAction('[Auth] Logout');

export const authInitialState: AuthState = {
  loggedIn: false,
  isLoading: false,
  user: null,
};

export const authReducer = createReducer(
  authInitialState,

  on(login, (state, { user }) => ({
    ...state,
    loggedIn: true,
    isLoading: true,
    user,
  })),

  on(loginSuccess, (state) => ({
    ...state,
    isLoading: false,
  })),

  on(logout, (state) => ({
    ...state,
    loggedIn: false,
    isLoading: false,
    user: null,
  }))
);

// Auth Selectors

export const selectAuthState = (state: AppState) => state.auth;

export const loggedIn = createSelector(
  selectAuthState,
  (state: AuthState) => state.loggedIn
);

export const userIsLoading = createSelector(
  selectAuthState,
  (state: AuthState) => state.isLoading
);

export const user = createSelector(
  selectAuthState,
  (state: AuthState) => state.user
);

export const name = createSelector(
  selectAuthState,
  (state: AuthState) => state.user?.name
);

export const email = createSelector(
  selectAuthState,
  (state: AuthState) => state.user?.email
);

export const photoUrl = createSelector(
  selectAuthState,
  (state: AuthState) => state.user?.photoUrl
);

// Auth Effects

export const loginEffect = createEffect(
  (actions$ = inject(Actions)) =>
    actions$.pipe(
      ofType(login),
      map(() => loginSuccess())
    ),
  { functional: true }
);
