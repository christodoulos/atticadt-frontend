import { Component, OnInit, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState, setLocation } from '@atticadt/state';

@Component({
  selector: 'app-inventory',
  standalone: true,
  imports: [],
  templateUrl: './inventory.component.html',
  styleUrl: './inventory.component.css',
})
export class InventoryComponent implements OnInit {
  store = inject(Store<AppState>);

  ngOnInit(): void {
    this.store.dispatch(setLocation({ name: 'attica' }));
  }
}
