import { Component, EventEmitter, Output, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Store } from '@ngrx/store';
import { AppState, selectLocationState } from '@atticadt/state';
import { MapService } from '@atticadt/services';

@Component({
  selector: 'app-map',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './map.component.html',
  styleUrl: './map.component.css',
})
export class MapComponent {
  @Output() mapInitialized = new EventEmitter();

  mapService = inject(MapService);

  store = inject(Store<AppState>);
  location$ = this.store.select(selectLocationState);

  ngAfterViewInit() {
    this.mapInitialized.emit();

    this.location$.subscribe((location) => {
      this.mapService.flyTo(location);
    });
  }
}
