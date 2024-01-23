import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Feature, FeatureCollection } from 'geojson';

@Injectable({
  providedIn: 'root',
})
export class HeatmapsService {
  url = 'https://backend.atticadt.uwmh.eu/api/geojson/featurecollection';

  constructor(private readonly http: HttpClient = inject(HttpClient)) {}

  getHeatmap(metric: string | null) {
    return this.http.get<FeatureCollection>(`${this.url}/${metric}`);
  }

  getAtticaNUTS() {
    return this.http.get<Feature>(
      'https://backend.atticadt.uwmh.eu/api/geojson/nuts/EL30'
    );
  }
}
