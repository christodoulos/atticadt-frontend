import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MapService } from '@atticadt/services';
import { SelectComponent } from '@atticadt/ui';

import * as interpolateHeatmapLayer from 'interpolateheatmaplayer';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-heatmaps',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, SelectComponent],
  templateUrl: './heatmaps.component.html',
  styleUrl: './heatmaps.component.css',
})
export class HeatmapsComponent implements OnInit, OnDestroy {
  mapService = inject(MapService);

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
  form = new FormGroup({
    metric: new FormControl('', Validators.required),
  });
  subscription: Subscription | undefined;

  ngOnInit() {
    this.mapService.setLocation('attica');
    this.subscription = this.form.controls.metric.valueChanges.subscribe(
      (value) => {
        console.log(value);
      }
    );
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }
}
