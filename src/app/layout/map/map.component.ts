import { Component, OnInit, inject } from '@angular/core';
import { MapService } from '@atticadt/services';

@Component({
  selector: 'app-map',
  standalone: true,
  templateUrl: './map.component.html',
  styleUrl: './map.component.css',
})
export class MapComponent implements OnInit {
  mapService = inject(MapService);

  ngOnInit() {
    this.mapService.initializeMap();
  }
}
