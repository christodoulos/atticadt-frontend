import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'ui-off-canvas-checkbox',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './off-canvas-checkbox.component.html',
  styleUrl: './off-canvas-checkbox.component.css',
})
export class OffCanvasCheckboxComponent {
  @Input() prompt = 'Checkbox prompt';
  @Input() name = 'checkbox';
  @Input() model = false;
  @Output() toggle = new EventEmitter<{ setting: string; status: boolean }>();

  onChange(setting: string, status: boolean) {
    this.toggle.emit({ setting, status });
  }
}
