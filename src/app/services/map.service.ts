import { Injectable } from '@angular/core';
import { Map } from 'mapbox-gl';
import { LocationState } from '@atticadt/state';

@Injectable({
  providedIn: 'root',
})
export class MapService {
  map!: Map;

  initializeMap(container: HTMLDivElement) {
    this.map = new Map({
      container,
      antialias: true,
      attributionControl: false,
      preserveDrawingBuffer: true,
      bearingSnap: 0,
      pitch: 0,
      accessToken:
        'pk.eyJ1IjoiY2hyaXN0b2RvdWxvcyIsImEiOiJja3luYTd3eW0ydGFiMm9xcHRmMGJyOHVrIn0.c1mSurunkjU4Wyf2hxcy0g',
    });
  }

  flyTo(location: LocationState) {
    this.map.flyTo(location);
  }
}
