import { Component, effect, inject } from '@angular/core';
import {
  TopbarComponent,
  LeftSidebarComponent,
  ContentComponent,
} from '@atticadt/layout';
import { MapService } from './services';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [TopbarComponent, LeftSidebarComponent, ContentComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  mapService = inject(MapService);
  mapDivInitialized = this.mapService.mapDivInitialized;

  constructor() {
    effect(() => {
      if (this.mapDivInitialized()) {
        this.mapService.initializeMap();
      }
    });
  }
}
