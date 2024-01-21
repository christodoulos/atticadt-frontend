import { Component, OnInit, inject } from '@angular/core';
import { MapService } from '@atticadt/services';

@Component({
  selector: 'app-inventory',
  standalone: true,
  imports: [],
  templateUrl: './inventory.component.html',
  styleUrl: './inventory.component.css',
})
export class InventoryComponent implements OnInit {
  mapService = inject(MapService);
  ngOnInit() {
    this.mapService.setLocation('attica');
  }
}
