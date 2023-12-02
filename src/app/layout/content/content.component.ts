import {
  Component,
  ElementRef,
  EventEmitter,
  Output,
  ViewChild,
  inject,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { FooterComponent } from '../footer/footer.component';
import { MapComponent } from '../map/map.component';
import { MapService } from '@atticadt/services';
import { RouteTitleComponent } from '../route-title/route-title.component';

@Component({
  selector: 'app-content',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    RouteTitleComponent,
    MapComponent,
    FooterComponent,
  ],
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
