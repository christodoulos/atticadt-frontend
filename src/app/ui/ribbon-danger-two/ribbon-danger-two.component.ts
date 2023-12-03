import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-ribbon-danger-two',
  standalone: true,
  imports: [],
  templateUrl: './ribbon-danger-two.component.html',
  styleUrl: './ribbon-danger-two.component.css',
})
export class RibbonDangerTwoComponent {
  @Input() ribbonText: string | undefined;
  @Input() text: string | undefined;
}
