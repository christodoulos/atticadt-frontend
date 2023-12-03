import { Component, Renderer2, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LogoComponent } from '../logo/logo.component';
import { UserDropdownComponent } from '../user-dropdown/user-dropdown.component';

import { AppState, email, loggedIn, name, photoUrl } from '@atticadt/state';
import { Store } from '@ngrx/store';
import { GoogleSigninButtonModule } from '@abacritt/angularx-social-login';
import { AuthService } from '@atticadt/services';
import { RibbonDangerTwoComponent } from 'src/app/ui/ribbon-danger-two/ribbon-danger-two.component';

@Component({
  selector: 'app-topbar',
  standalone: true,
  imports: [
    CommonModule,
    LogoComponent,
    UserDropdownComponent,
    GoogleSigninButtonModule,
    RibbonDangerTwoComponent,
  ],
  templateUrl: './topbar.component.html',
  styleUrl: './topbar.component.css',
})
export class TopbarComponent {
  authService = inject(AuthService);
  store = inject(Store<AppState>);
  loggedIn$ = this.store.select(loggedIn);
  photoUrl$ = this.store.select(photoUrl);
  name$ = this.store.select(name);
  email$ = this.store.select(email);
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
}
