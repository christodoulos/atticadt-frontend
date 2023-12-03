import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-off-canvas',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './off-canvas.component.html',
  styleUrl: './off-canvas.component.css',
})
export class OffCanvasComponent {}
