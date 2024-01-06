import { inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as AuthAction from './auth.actions';
import { map } from 'rxjs';

export const loginEffect = createEffect(
  (actions$ = inject(Actions)) =>
    actions$.pipe(
      ofType(AuthAction.login),
      map(() => AuthAction.loginSuccess())
    ),
  { functional: true }
);
