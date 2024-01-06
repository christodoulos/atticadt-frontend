import { createAction, props } from '@ngrx/store';
import { SocialUser } from '@abacritt/angularx-social-login';

export const login = createAction(
  '[Auth] Login',
  props<{ user: SocialUser }>()
);

export const loginSuccess = createAction('[Auth] Login Success');

export const logout = createAction('[Auth] Logout');
