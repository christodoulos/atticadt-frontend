import { inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { MapService } from './map.service';
import {
  mapInitialize,
  mapInitialized,
  setBounds,
  setLocation,
  setLocationSuccess,
} from './map.actions';
import { concat, from, map, of, switchMap, tap } from 'rxjs';

export const mapInitializeEffect = createEffect(
  (actions$ = inject(Actions), mapService = inject(MapService)) =>
    actions$.pipe(
      ofType(mapInitialize),
      map(() => mapInitialized()),
      tap(() => mapService.initializeMap())
    ),
  { functional: true }
);

// Map Location Effects

export const setLocationEffect = createEffect(
  (actions$ = inject(Actions), mapService = inject(MapService)) =>
    actions$.pipe(
      ofType(setLocation),
      map((action) => action.name),
      switchMap((name) => mapService.getLocation(name)),
      switchMap((location) =>
        concat(
          of(setLocationSuccess({ location })),
          from(mapService.flyTo(location)).pipe(
            map((bounds) => setBounds({ bounds }))
          )
        )
      )
    ),
  { functional: true }
);
