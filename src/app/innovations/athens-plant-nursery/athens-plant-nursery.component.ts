import { Component, inject } from '@angular/core';
import { AppState, setLocation } from '@atticadt/state';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-athens-plant-nursery',
  standalone: true,
  imports: [],
  templateUrl: './athens-plant-nursery.component.html',
  styleUrl: './athens-plant-nursery.component.css',
})
export class AthensPlantNurseryComponent {
  store = inject(Store<AppState>);

  ngOnInit(): void {
    this.store.dispatch(setLocation({ name: 'athens-plant-nursery' }));
  }
}
