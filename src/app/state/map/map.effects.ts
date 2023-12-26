import { inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { AppState } from '@atticadt/state';
import { MapService } from './map.service';
import {
  mapInitialize,
  mapInitialized,
  setBounds,
  setLocation,
  setLocationSuccess,
  setMapConfigProperty,
  addCustomLayers,
  removeCustomLayers,
} from './map.actions';
import {
  Observable,
  concat,
  from,
  map,
  of,
  switchMap,
  tap,
  withLatestFrom,
} from 'rxjs';
import { customLayersNames } from './map.selectors';

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
      switchMap((location) => {
        const actions: Observable<any>[] = [
          of(setLocationSuccess({ location })),
          from(mapService.flyTo(location)).pipe(
            map((bounds) => setBounds({ bounds }))
          ),
        ];

        if (location.glbModels && location.glbModels.length > 0) {
          actions.push(
            from(mapService.addGLBModels(location.glbModels)).pipe(
              map((customLayers) => addCustomLayers({ customLayers }))
            )
          );
        }

        return concat(...actions);
      })
    ),
  { functional: true }
);

export const addCustomLayersEffect = createEffect(
  (actions$ = inject(Actions), mapService = inject(MapService)) =>
    actions$.pipe(
      ofType(addCustomLayers),
      map((action) => action.customLayers),
      tap((customLayers) => {
        for (const customLayer of customLayers) {
          console.log('addCustomLayersEffect', customLayer);
          mapService.map?.addLayer(customLayer);
        }
      })
    ),
  { dispatch: false, functional: true }
);

export const removeCustomLayersEffect = createEffect(
  (
    actions$ = inject(Actions),
    store = inject(Store<AppState>),
    mapService = inject(MapService)
  ) =>
    actions$.pipe(
      ofType(removeCustomLayers),
      withLatestFrom(store.select(customLayersNames)),
      tap(([action, customLayersNames]) => {
        console.log('removeCustomLayersEffect', customLayersNames);
        for (const customLayerName of customLayersNames ?? []) {
          console.log('removeCustomLayersEffect', customLayerName);
          mapService.map?.removeLayer(`glb-model-${customLayerName}`);
        }
      })
    ),
  { dispatch: false, functional: true }
);

export const setMapConfigPropertyEffect = createEffect(
  (actions$ = inject(Actions), mapService = inject(MapService)) =>
    actions$.pipe(
      ofType(setMapConfigProperty),
      map((action) => action),
      tap((action) => {
        const { property, value } = action;
        mapService.map?.setLayoutProperty(
          property,
          'visibility',
          value ? 'visible' : 'none'
        );
      })
    ),
  { dispatch: false, functional: true }
);
