import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { MapService } from '@atticadt/services';

@Component({
  selector: 'app-athens-plant-nursery',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './athens-plant-nursery.component.html',
  styleUrl: './athens-plant-nursery.component.css',
})
export class AthensPlantNurseryComponent implements OnInit, OnDestroy {
  mapService = inject(MapService);

  ngOnInit() {
    this.mapService.setLocation('athens-plant-nursery');
  }

  ngOnDestroy() {
    this.mapService.leaveLocation('athens-plant-nursery');
  }
}
