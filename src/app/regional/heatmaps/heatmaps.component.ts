import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import {
  HeatmapsService,
  MapService,
  MyFeatureCollection,
} from '@atticadt/services';
import { SelectComponent } from '@atticadt/ui';

import {
  polygon,
  Point,
  Polygon,
  MultiPolygon,
  Feature,
  booleanPointInPolygon,
} from '@turf/turf';

import * as interpolateHeatmapLayer from 'interpolateheatmaplayer';
import { Subscription, take } from 'rxjs';

@Component({
  selector: 'app-heatmaps',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, SelectComponent],
  templateUrl: './heatmaps.component.html',
  styleUrl: './heatmaps.component.css',
})
export class HeatmapsComponent implements OnInit, OnDestroy {
  mapService = inject(MapService);
  heatmapsService = inject(HeatmapsService);

  map = this.mapService.map;

  timeOfObservation = '';
  min: number | null = null;
  max: number | null = null;
  unit = '';
  roi: number[][] | undefined;
  tpoly: Feature | null = null;

  heatmapMetrics = [
    { key: 'temperature', value: 'Temperature' },
    { key: 'windSpeed', value: 'Wind Speed (km/h)' },
    { key: 'beaufort', value: 'Wind Speed (beaufort)' },
    { key: 'humidity', value: 'Humidity' },
    { key: 'atmosphericPressure', value: 'Atmospheric Pressure' },
    { key: 'highestDailyTemperature', value: 'Highest Daily Temperature' },
    { key: 'lowestDailyTemperature', value: 'Lowest Daily Temperature' },
    { key: 'precipitation', value: 'Precipitation' },
    { key: 'highestDailyGust', value: 'Highest Daily Gust' },
  ];

  heatmapSelection = 'temperature';

  form = new FormGroup({
    metric: new FormControl('', Validators.required),
  });
  subscription: Subscription | undefined;

  ngOnInit() {
    this.mapService.setLocation('attica');

    // this.mapService.zeroExaggeration();

    this.subscription = this.form.controls.metric.valueChanges.subscribe(
      (value) => {
        if (value) {
          this.heatmapSelection = value;
          this.heatmapsService
            .getHeatmap(this.heatmapSelection)
            .pipe(take(1))
            .subscribe((data: MyFeatureCollection) => {
              this.mapboxHeatmap(data);
              // const properties = data.properties;
              // this.timeOfObservation = properties['TimeOfObservation'];
              // this.unit = properties['FeatureUnit'];
              // this.createHeatmap(data, this.heatmapSelection);
              this.createLabels(data, this.heatmapSelection);
            });
        }
      }
    );

    this.heatmapsService
      .getAtticaNUTS()
      .pipe(take(1))
      .subscribe((data) => {
        this.roi = (data.geometry as MultiPolygon).coordinates[0][0];
        this.tpoly = polygon((data.geometry as MultiPolygon).coordinates[0]);
      });
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
    this.mapService.restoreExaggeration();
  }

  mapboxHeatmap(data: MyFeatureCollection, metric: string = 'temperature') {
    this.map?.addSource('heatmap-source', {
      type: 'geojson',
      data: data, // Your FeatureCollection
    });

    console.log(data);

    this.min = Math.min(
      ...data.features.map((p) => (p.properties ? p.properties[metric] : 9999))
    );
    this.max = Math.max(
      ...data.features.map((p) => (p.properties ? p.properties[metric] : -9999))
    );

    console.log(this.min, this.max);

    this.map?.addLayer({
      id: 'heatmap-layer',
      type: 'heatmap',
      source: 'heatmap-source',
      paint: {
        // Increase the heatmap weight based on frequency and property magnitude
        'heatmap-weight': [
          'interpolate',
          ['linear'],
          ['get', metric],
          0,
          0,
          6,
          1,
        ],
        // Increase the heatmap color weight weight by zoom level
        // heatmap-intensity is a multiplier on top of heatmap-weight
        'heatmap-intensity': ['interpolate', ['linear'], ['zoom'], 0, 1, 9, 3],
        // Color ramp for heatmap.  Domain is 0 (low) to 1 (high).
        // Begin color ramp at 0-stop with a 0-transparency color to create a blur-like effect.
        'heatmap-color': [
          'interpolate',
          ['linear'],
          ['heatmap-density'],
          0,
          'rgba(33,102,172,0)',
          0.2,
          'rgb(103,169,207)',
          0.4,
          'rgb(209,229,240)',
          0.6,
          'rgb(253,219,199)',
          0.8,
          'rgb(239,138,98)',
          1,
          'rgb(178,24,43)',
        ],
        // Adjust the heatmap radius by zoom level
        'heatmap-radius': ['interpolate', ['linear'], ['zoom'], 0, 2, 9, 20],
        // Transition from heatmap to circle layer by zoom level
        'heatmap-opacity': ['interpolate', ['linear'], ['zoom'], 7, 1, 9, 0],
      },
    });
  }

  createHeatmap(data: MyFeatureCollection, metric: string): void {
    const points = [];

    for (let index = 0; index < data.features.length; index++) {
      const element = data.features[index];
      const point = {
        lon: (element.geometry as Point).coordinates[0],
        lat: (element.geometry as Point).coordinates[1],
        val: element.properties![metric],
      };

      if (
        booleanPointInPolygon(
          [point.lon, point.lat],
          this.tpoly as unknown as Polygon
        )
      ) {
        points.push(point);
      }
    }

    console.log(points);

    this.min = Math.min(...points.map((p) => p.val));
    this.max = Math.max(...points.map((p) => p.val));

    const layer = interpolateHeatmapLayer.create({
      layerId: 'heatmap',
      opacity: 0.9,
      points,
      roi: this.roi,
      // renderingMode: '3d',
    });

    this.map?.addLayer(layer);

    // if (this.legend) {
    //   this.map?.removeControl(this.legend);
    // }
    // this.legend = new HeatmapsLegendControl(
    //   metric,
    //   this.min,
    //   this.max,
    //   this.unit,
    //   this.timeOfObservation
    // );
    // this.map?.addControl(this.legend, 'top-left');
  }

  createLabels(data: any, metric: string) {
    this.map?.addSource('data', {
      type: 'geojson',
      data: data,
    });
    this.map?.addLayer({
      id: 'labels',
      type: 'symbol',
      source: 'data',
      layout: {
        'text-field': ['get', metric],
        'text-size': 11,
        'text-font': ['Open Sans Semibold', 'Arial Unicode MS Bold'],
      },
      paint: {
        'text-color': '#FFFFFF',
      },
    });
  }
}
