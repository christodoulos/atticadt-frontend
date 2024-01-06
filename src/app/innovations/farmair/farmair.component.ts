import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Store } from '@ngrx/store';
import { MapAction } from '@atticadt/state';

@Component({
  selector: 'app-farmair',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './farmair.component.html',
  styleUrl: './farmair.component.css',
})
export class FarmairComponent implements OnInit {
  store = inject(Store);

  ngOnInit(): void {
    this.store.dispatch(MapAction.setLocation({ name: 'farmair' }));
  }
}
