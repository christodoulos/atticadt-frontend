import {
  AfterViewInit,
  Component,
  ElementRef,
  OnInit,
  Renderer2,
  inject,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { NgbCollapse } from '@ng-bootstrap/ng-bootstrap';
import { SimplebarAngularModule } from 'simplebar-angular';

import { LogoComponent } from '../logo/logo.component';
import { MenuItem } from './menu.model';
import { MENU } from './menu-meta';
import { findAllParent, findMenuItem } from './utils';

@Component({
  selector: 'app-left-sidebar',
  standalone: true,
  imports: [
    CommonModule,
    LogoComponent,
    SimplebarAngularModule,
    NgbCollapse,
    RouterLink,
  ],
  templateUrl: './left-sidebar.component.html',
  styleUrl: './left-sidebar.component.css',
})
export class LeftSidebarComponent implements OnInit {
  renderer = inject(Renderer2);
  el = inject(ElementRef);
  activeMenuItems: string[] = [];
  menuItems: MenuItem[] = MENU;
  menuCollapsed = true;

  ngOnInit(): void {
    const div = this.el.nativeElement.querySelector('#leftside-menu-container');
    let matchingMenuItem = null;

    if (div) {
      let items: any = div.getElementsByClassName('side-nav-link-ref');
      for (let i = 0; i < items.length; ++i) {
        if (window.location.pathname === items[i].pathname) {
          matchingMenuItem = items[i];
          break;
        }
      }

      if (matchingMenuItem) {
        const mid = matchingMenuItem.getAttribute('data-menu-key');
        const activeMt = findMenuItem(this.menuItems, mid);
        if (activeMt) {
          const matchingObjs = [
            activeMt['key'],
            ...findAllParent(this.menuItems, activeMt),
          ];

          this.activeMenuItems = matchingObjs;
          this.menuItems.forEach((menu: MenuItem) => {
            menu.collapsed = !matchingObjs.includes(menu.key!);

            // Use Renderer2 to manipulate the DOM safely
            if (menu.collapsed) {
              this.renderer.addClass(menu, 'collapsed');
            } else {
              this.renderer.removeClass(menu, 'collapsed');
            }
          });
        }
      }
    }
  }

  closeSidebar() {
    const htmlTag = document.getElementsByTagName('html')[0];
    if (htmlTag.classList.contains('sidebar-enable')) {
      this.renderer.removeClass(htmlTag, 'sidebar-enable');
    }
  }

  hasSubmenu(menu: MenuItem): boolean {
    return menu.children ? true : false;
  }

  toggleMenuItem(menuItem: MenuItem, collapse: NgbCollapse): void {
    collapse.toggle();
    let openMenuItems: string[];
    if (!menuItem.collapsed) {
      openMenuItems = [
        menuItem['key'],
        ...findAllParent(this.menuItems, menuItem),
      ];
      this.menuItems.forEach((menu: MenuItem) => {
        if (!openMenuItems.includes(menu.key!)) {
          menu.collapsed = true;
        }
      });
    }
  }
}
