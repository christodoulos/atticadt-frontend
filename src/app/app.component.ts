import { Component } from '@angular/core';
import {
  TopbarComponent,
  LeftSidebarComponent,
  ContentComponent,
} from '@atticadt/layout';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [TopbarComponent, LeftSidebarComponent, ContentComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {}
