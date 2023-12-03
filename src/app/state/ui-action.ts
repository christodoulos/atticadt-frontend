import { Injectable, inject } from '@angular/core';
import { createAction } from '@ngrx/store';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { saveAs } from 'file-saver';
import { tap } from 'rxjs';

export const saveMap = createAction('[UIAction] Save Map');

export const saveMapEffect = createEffect(
  (actions$ = inject(Actions), service = inject(UIActionService)) => {
    return actions$.pipe(
      ofType(saveMap),
      tap(() => {
        console.log('aaaaaaaaaaaaaaa');
        service.downloadMap();
      })
    );
  },
  { dispatch: false, functional: true }
);

@Injectable({ providedIn: 'root' })
class UIActionService {
  downloadMap() {
    // Τhanks to https://tinyurl.com/22vht9zc accepted answer
    const img = new Image();
    const mapCanvas = document.querySelector(
      '.mapboxgl-canvas'
    ) as HTMLCanvasElement;
    if (mapCanvas) {
      img.src = mapCanvas.toDataURL();
      saveAs(img.src, 'map.png');
    }
  }
}
