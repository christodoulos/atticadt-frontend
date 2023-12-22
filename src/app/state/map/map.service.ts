import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Map } from 'mapbox-gl';
import { Store } from '@ngrx/store';
import { AppState, MapLocation, setBounds } from '@atticadt/state';

@Injectable({ providedIn: 'root' })
export class MapService {
  map: Map | undefined;
  http = inject(HttpClient);
  store = inject(Store<AppState>);

  initializeMap() {
    this.map = new Map({
      container: 'map',
      antialias: true,
      attributionControl: false,
      preserveDrawingBuffer: true,
      bearingSnap: 0,
      pitch: 0,
      accessToken:
        'pk.eyJ1IjoiY2hyaXN0b2RvdWxvcyIsImEiOiJja3luYTd3eW0ydGFiMm9xcHRmMGJyOHVrIn0.c1mSurunkjU4Wyf2hxcy0g',
    });
  }

  getLocation(name: string) {
    return this.http.get<MapLocation>(
      `http://localhost:3456/api/atticadt/location/${name}`
    );
  }

  getBounds() {
    return this.map?.getBounds().toArray();
  }

  // async flyTo(location: MapLocation) {
  //   this.map?.flyTo({ ...location });
  //   return await this.map?.once('moveend', () => {
  //     const bounds = this.map?.getBounds().toArray() ?? [];
  //     this.store.dispatch(setBounds({ bounds }));
  //     return bounds;
  //   });
  // }

  async flyTo(location: MapLocation): Promise<number[][]> {
    return new Promise((resolve, reject) => {
      if (!this.map) {
        reject('Map is not initialized');
        return;
      }

      this.map.flyTo({ ...location });
      this.map.once('moveend', () => {
        const bounds = this.map?.getBounds().toArray() ?? [];
        console.log('MAP move ended to bounds:', bounds);
        resolve(bounds);
      });
    });
  }
}
