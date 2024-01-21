import {
  ChangeDetectionStrategy,
  Component,
  Renderer2,
  inject,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { LogoComponent } from '../logo/logo.component';
import { UserDropdownComponent } from '../user-dropdown/user-dropdown.component';

import { GoogleSigninButtonModule } from '@abacritt/angularx-social-login';
import { AuthService, MapService } from '@atticadt/services';
import { NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-topbar',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    NgbTooltipModule,
    LogoComponent,
    UserDropdownComponent,
    GoogleSigninButtonModule,
  ],
  templateUrl: './topbar.component.html',
  styleUrl: './topbar.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TopbarComponent {
  authService = inject(AuthService);
  mapService = inject(MapService);

  user = this.authService.user;

  renderer = inject(Renderer2);

  signOut() {
    this.authService.signOut();
  }

  sidebarToggle() {
    const htmlElement = document.getElementsByTagName('html')[0];

    const isSidebarEnabled = htmlElement.classList.contains('sidebar-enable');
    const dataSidenavSize = htmlElement.getAttribute('data-sidenav-size');

    if (dataSidenavSize !== 'full') {
      if (dataSidenavSize === 'default') {
        this.renderer.setAttribute(
          htmlElement,
          'data-sidenav-size',
          'condensed'
        );
      } else {
        this.renderer.setAttribute(htmlElement, 'data-sidenav-size', 'default');
      }
    }

    if (isSidebarEnabled) {
      this.renderer.removeClass(htmlElement, 'sidebar-enable');
    } else {
      this.renderer.addClass(htmlElement, 'sidebar-enable');
    }
  }

  saveMap() {
    this.mapService.downloadMap();
  }
}
