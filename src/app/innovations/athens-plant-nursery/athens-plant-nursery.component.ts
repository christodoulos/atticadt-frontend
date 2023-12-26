import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { AppState, setLocation, removeCustomLayers } from '@atticadt/state';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-athens-plant-nursery',
  standalone: true,
  imports: [],
  templateUrl: './athens-plant-nursery.component.html',
  styleUrl: './athens-plant-nursery.component.css',
})
export class AthensPlantNurseryComponent implements OnInit, OnDestroy {
  store = inject(Store<AppState>);

  async ngOnInit() {
    this.store.dispatch(setLocation({ name: 'athens-plant-nursery' }));
  }

  ngOnDestroy() {
    console.log('AthensPlantNurseryComponent.ngOnDestroy()');
    this.store.dispatch(removeCustomLayers());
  }
}
