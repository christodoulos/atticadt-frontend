import { Route } from '@angular/router';

import { FarmairComponent } from './innovations/farmair/farmair.component';
import { InventoryComponent } from './innovations/inventory/inventory.component';

export const routes: Route[] = [
  { path: 'innovations/farmair', component: FarmairComponent },
  { path: '', component: InventoryComponent },
];
