import { inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { MapService } from './map.service';
import {
  mapInitialize,
  mapInitialized,
  setBounds,
  setLocation,
  setLocationSuccess,
  setMapConfigProperty,
  showCustomLayers,
} from './map.actions';
import { concat, from, map, of, switchMap, tap } from 'rxjs';
import { customLayers } from './map.selectors';

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
        return concat(
          of(setLocationSuccess({ location })),
          from(mapService.flyTo(location)).pipe(
            map((bounds) => setBounds({ bounds }))
          ),
          from(mapService.addGLBModels(location.glbModels ?? [])).pipe(
            // tap((customLayers) =>
            //   customLayers.forEach((customLayer) =>
            //     mapService.locationCustomLayers.push(customLayer)
            //   )
            // ),
            map((customLayers) => showCustomLayers({ customLayers }))
          )
        );
      })
    ),
  { functional: true }
);

export const showCustomLayersEffect = createEffect(
  (actions$ = inject(Actions), mapService = inject(MapService)) =>
    actions$.pipe(
      ofType(showCustomLayers),
      map((action) => action.customLayers),
      tap((customLayers) => {
        for (const customLayer of customLayers) {
          console.log('showCustomLayersEffect', customLayer);
          mapService.map?.addLayer(customLayer);
          // const { id } = customLayer;
          // mapService.locationCustomLayers.push(id);
        }
      })
    ),
  { dispatch: false, functional: true }
);

export const hideCustomLayersEffect = createEffect(
  (actions$ = inject(Actions), mapService = inject(MapService)) =>
    actions$.pipe(
      ofType(showCustomLayers),
      tap(() => {
        for (const customLayer of mapService.locationCustomLayers) {
          mapService.map?.removeLayer(customLayer);
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
