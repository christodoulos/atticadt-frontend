import { inject } from '@angular/core';
import { SocialUser } from '@abacritt/angularx-social-login';
import {
  createAction,
  props,
  createReducer,
  on,
  createFeature,
} from '@ngrx/store';
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

export const authFeature = createFeature({
  name: 'auth',
  reducer: authReducer,
});

export const { selectLoggedIn, selectIsLoading, selectUser } = authFeature;

// Auth Effects

export const loginEffect = createEffect(
  (actions$ = inject(Actions)) =>
    actions$.pipe(
      ofType(login),
      map(() => loginSuccess())
    ),
  { functional: true }
);
