import {
  Component,
  ElementRef,
  EventEmitter,
  Output,
  ViewChild,
  inject,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FooterComponent } from '../footer/footer.component';
import { MapComponent } from '../map/map.component';
import { MapService } from '@atticadt/services';
import { OffCanvasComponent } from '../off-canvas/off-canvas.component';

@Component({
  selector: 'app-content',
  standalone: true,
  imports: [CommonModule, MapComponent, FooterComponent, OffCanvasComponent],
  templateUrl: './content.component.html',
  styleUrl: './content.component.css',
})
export class ContentComponent {
  @ViewChild('mapComponent', { read: ElementRef }) mapComponentRef!: ElementRef;
  @Output() mapInitialized = new EventEmitter<HTMLDivElement>();
  elementRef: HTMLDivElement | undefined;
  mapService = inject(MapService);

  onMapInitialized() {
    this.elementRef = this.mapComponentRef.nativeElement.querySelector(
      '#map'
    ) as HTMLDivElement;
    this.mapInitialized.emit(this.elementRef);
  }
}
