import { Component, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { MapAction } from '@atticadt/state';
import { OffCanvasCheckboxComponent } from '@atticadt/ui';

@Component({
  selector: 'off-canvas-map-dashboard',
  standalone: true,
  imports: [OffCanvasCheckboxComponent],
  templateUrl: './map-dashboard.component.html',
  styleUrl: './map-dashboard.component.css',
})
export class MapDashboardComponent {
  store = inject(Store);
  onToggle(property: { setting: string; status: boolean }) {
    this.store.dispatch(
      MapAction.setMapConfigProperty({
        property: property.setting,
        value: property.status,
      })
    );
  }
}
