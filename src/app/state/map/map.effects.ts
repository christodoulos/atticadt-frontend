import { inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { MapService } from './map.service';
import {
  mapInitialize,
  mapInitialized,
  setLocation,
  setLocationSuccess,
} from './map.actions';
import { map, switchMap, tap } from 'rxjs';

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
      map((location) => {
        mapService.flyTo(location);
        return setLocationSuccess({ location });
      })
      // tap((payload) => mapService.flyTo(payload.location))
    ),
  { functional: true }
);
