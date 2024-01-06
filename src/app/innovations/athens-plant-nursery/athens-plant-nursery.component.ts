import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { MapAction } from '@atticadt/state';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-athens-plant-nursery',
  standalone: true,
  imports: [],
  templateUrl: './athens-plant-nursery.component.html',
  styleUrl: './athens-plant-nursery.component.css',
})
export class AthensPlantNurseryComponent implements OnInit, OnDestroy {
  store = inject(Store);

  ngOnInit() {
    this.store.dispatch(
      MapAction.setLocation({ name: 'athens-plant-nursery' })
    );
  }

  ngOnDestroy() {
    this.store.dispatch(MapAction.removeCustomLayers());
  }
}
