import { SocialUser } from '@abacritt/angularx-social-login';
import {
  createAction,
  props,
  createReducer,
  on,
  createSelector,
} from '@ngrx/store';
import { AppState } from '@atticadt/state';

export interface AuthState {
  loggedIn: boolean;
  user: SocialUser | null;
}

export const login = createAction(
  '[Auth] Login',
  props<{ user: SocialUser }>()
);
export const logout = createAction('[Auth] Logout');

export const authInitialState: AuthState = {
  loggedIn: false,
  user: null,
};

export const authReducer = createReducer(
  authInitialState,
  on(login, (state, { user }) => ({ loggedIn: true, user })),
  on(logout, (state) => ({ loggedIn: false, user: null }))
);

// Auth Selectors

export const selectAuthState = (state: AppState) => state.auth;

export const loggedIn = createSelector(
  selectAuthState,
  (state: AuthState) => state.loggedIn
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
