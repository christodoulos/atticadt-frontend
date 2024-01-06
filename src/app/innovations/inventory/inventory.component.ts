import { Component, OnInit, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { MapAction } from '@atticadt/state';

@Component({
  selector: 'app-inventory',
  standalone: true,
  imports: [],
  templateUrl: './inventory.component.html',
  styleUrl: './inventory.component.css',
})
export class InventoryComponent implements OnInit {
  store = inject(Store);

  ngOnInit(): void {
    this.store.dispatch(MapAction.setLocation({ name: 'attica' }));
  }
}
