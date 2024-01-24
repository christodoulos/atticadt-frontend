import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Feature, FeatureCollection } from 'geojson';
import { environment } from 'src/environments/environment';

export interface MyFeatureCollection extends FeatureCollection {
  properties: {
    [key: string]: any;
  };
}

@Injectable({
  providedIn: 'root',
})
export class HeatmapsService {
  url = 'https://backend.atticadt.uwmh.eu/api/geojson/featurecollection';

  constructor(private readonly http: HttpClient = inject(HttpClient)) {}

  getHeatmap(metric: string | null) {
    return this.http.get<MyFeatureCollection>(
      `${environment.apiUrl}/heatmap/${metric}`
    );
  }

  getAtticaNUTS() {
    return this.http.get<Feature>(`${environment.apiUrl}/nuts/2/EL30`);
  }
}
