import { AfterViewInit, Component, inject } from '@angular/core';
import { MapService } from '@atticadt/services';

@Component({
  selector: 'app-map',
  standalone: true,
  templateUrl: './map.component.html',
  styleUrl: './map.component.css',
})
export class MapComponent implements AfterViewInit {
  mapService = inject(MapService);

  ngAfterViewInit() {
    this.mapService.mapDivInitialized.set(true);
  }
}
