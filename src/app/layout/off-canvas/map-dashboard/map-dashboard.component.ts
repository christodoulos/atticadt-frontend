import { Component, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState, setMapConfigProperty } from '@atticadt/state';
import { OffCanvasCheckboxComponent } from '@atticadt/ui';

@Component({
  selector: 'off-canvas-map-dashboard',
  standalone: true,
  imports: [OffCanvasCheckboxComponent],
  templateUrl: './map-dashboard.component.html',
  styleUrl: './map-dashboard.component.css',
})
export class MapDashboardComponent {
  store = inject(Store<AppState>);
  onToggle(property: { setting: string; status: boolean }) {
    this.store.dispatch(
      setMapConfigProperty({
        property: property.setting,
        value: property.status,
      })
    );
  }
}
