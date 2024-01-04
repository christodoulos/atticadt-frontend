import { AfterViewInit, Component, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState, mapInitialize } from '@atticadt/state';

@Component({
  selector: 'app-map',
  standalone: true,
  templateUrl: './map.component.html',
  styleUrl: './map.component.css',
})
export class MapComponent implements AfterViewInit {
  store = inject(Store<AppState>);

  async ngAfterViewInit() {
    this.store.dispatch(mapInitialize());
  }
}
