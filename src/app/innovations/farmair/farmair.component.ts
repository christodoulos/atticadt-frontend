import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MapService } from '@atticadt/services';

@Component({
  selector: 'app-farmair',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './farmair.component.html',
  styleUrl: './farmair.component.css',
})
export class FarmairComponent implements OnInit {
  mapService = inject(MapService);
  ngOnInit(): void {
    this.mapService.setLocation('farmair');
  }
}
