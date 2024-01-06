import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MapDashboardComponent } from '../map-dashboard/map-dashboard.component';
import { MapService } from '@atticadt/services';

@Component({
  selector: 'app-off-canvas',
  standalone: true,
  imports: [RouterOutlet, MapDashboardComponent],
  templateUrl: './off-canvas.component.html',
  styleUrl: './off-canvas.component.css',
})
export class OffCanvasComponent {
  mapService = inject(MapService);

  getLayerNames() {
    return this.mapService.getLayers();
  }
}
