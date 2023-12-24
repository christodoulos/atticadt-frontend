import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FooterComponent } from '../footer/footer.component';
import { MapComponent } from '../map/map.component';
import { OffCanvasComponent } from '../off-canvas/off-canvas/off-canvas.component';

@Component({
  selector: 'app-content',
  standalone: true,
  imports: [CommonModule, MapComponent, FooterComponent, OffCanvasComponent],
  templateUrl: './content.component.html',
  styleUrl: './content.component.css',
})
export class ContentComponent {}
