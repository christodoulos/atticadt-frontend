import { Component } from '@angular/core';
import { MapComponent } from '../map/map.component';
import { FooterComponent } from '../footer/footer.component';

@Component({
  selector: 'app-content',
  standalone: true,
  imports: [MapComponent, FooterComponent],
  templateUrl: './content.component.html',
  styleUrl: './content.component.css',
})
export class ContentComponent {}
