import { inject } from '@angular/core';
import { SocialUser } from '@abacritt/angularx-social-login';
import { createReducer, on, createFeature } from '@ngrx/store';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map } from 'rxjs';
import * as AuthAction from './auth.actions';

export interface AuthState {
  loggedIn: boolean;
  authIsLoading: boolean;
  user: SocialUser | null;
}

export const authInitialState: AuthState = {
  loggedIn: false,
  authIsLoading: false,
  user: null,
};

export const authReducer = createReducer(
  authInitialState,

  on(AuthAction.login, (state, { user }) => ({
    ...state,
    loggedIn: true,
    isLoading: true,
    user,
  })),

  on(AuthAction.loginSuccess, (state) => ({
    ...state,
    isLoading: false,
  })),

  on(AuthAction.logout, (state) => ({
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

export const { selectLoggedIn, selectAuthIsLoading, selectUser } = authFeature;
