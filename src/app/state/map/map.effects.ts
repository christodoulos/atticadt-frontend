import { inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { MapService } from './map.service';
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
import * as MapAction from './map.actions';

export const mapInitializeEffect = createEffect(
  (actions$ = inject(Actions), mapService = inject(MapService)) =>
    actions$.pipe(
      ofType(MapAction.mapInitialize),
      map(() => MapAction.mapInitialized()),
      tap(() => mapService.initializeMap())
    ),
  { functional: true }
);
import { mapFeature } from './map.state';

// Map Location Effects

export const setLocationEffect = createEffect(
  (actions$ = inject(Actions), mapService = inject(MapService)) =>
    actions$.pipe(
      ofType(MapAction.setLocation),
      map((action) => action.name),
      switchMap((name) => mapService.getLocation(name)),
      switchMap((location) => {
        const actions: Observable<any>[] = [
          of(MapAction.setLocationSuccess({ location })),
          from(mapService.flyTo(location)).pipe(
            map((bounds) => MapAction.setBounds({ bounds }))
          ),
        ];

        if (location.glbModels && location.glbModels.length > 0) {
          actions.push(
            from(mapService.addGLBModels(location.glbModels)).pipe(
              map((customLayers) => MapAction.addCustomLayers({ customLayers }))
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
      ofType(MapAction.addCustomLayers),
      map((action) => action.customLayers),
      tap((customLayers) => {
        for (const customLayer of customLayers) {
          console.log('addCustomLayersEffect', customLayer);
          mapService.map?.addLayer(customLayer);
          // see https://t.ly/dd2ca
          mapService.map?.setLayoutProperty(
            customLayer.id,
            'visibility',
            'visible'
          );
        }
      })
    ),
  { dispatch: false, functional: true }
);

export const removeCustomLayersEffect = createEffect(
  (
    actions$ = inject(Actions),
    store = inject(Store),
    mapService = inject(MapService)
  ) =>
    actions$.pipe(
      ofType(MapAction.removeCustomLayers),
      withLatestFrom(store.select(mapFeature.selectCustomLayerNames)),
      tap(([action, customLayersNames]) => {
        console.log('removeCustomLayersEffect', customLayersNames);
        for (const customLayerName of customLayersNames ?? []) {
          console.log('removeCustomLayersEffect', customLayerName);
          mapService.map?.removeLayer(`glb-model-${customLayerName}`);
          mapService.tb.clear();
        }
      })
    ),
  { dispatch: false, functional: true }
);

export const setMapConfigPropertyEffect = createEffect(
  (actions$ = inject(Actions), mapService = inject(MapService)) =>
    actions$.pipe(
      ofType(MapAction.setMapConfigProperty),
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
