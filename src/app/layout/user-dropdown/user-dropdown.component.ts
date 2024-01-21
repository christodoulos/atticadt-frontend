import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-user-dropdown',
  standalone: true,
  imports: [CommonModule, NgbDropdownModule],
  templateUrl: './user-dropdown.component.html',
  styleUrl: './user-dropdown.component.css',
})
export class UserDropdownComponent {
  @Input() name: string | null | undefined;
  @Input() email: string | null | undefined;
  @Input() photoUrl: string | null | undefined;
  @Output() signOut = new EventEmitter<void>();
  imgError = false;

  onSignOut() {
    this.signOut.emit();
  }

  onImageError(event: Event) {
    (event.target as HTMLImageElement).style.display = 'none';
    this.imgError = true;
  }
}
