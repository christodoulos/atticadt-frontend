import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TopbarComponent } from '../topbar/topbar.component';
import { LeftSidebarComponent } from '../left-sidebar/left-sidebar.component';
import { ContentComponent } from '../content/content.component';
import { MapService } from '@atticadt/services';

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [
    CommonModule,
    TopbarComponent,
    LeftSidebarComponent,
    ContentComponent,
  ],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.css',
})
export class LayoutComponent {
  mapService = inject(MapService);

  onMapInitialized(elementRef: HTMLDivElement) {
    this.mapService.initializeMap(elementRef);
  }
}
