import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-top-middle-brand',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './top-middle-brand.component.html',
  styleUrl: './top-middle-brand.component.css',
})
export class TopMiddleBrandComponent {
  @Input() subtitle: string | undefined;
}
