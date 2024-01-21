import { Routes } from '@angular/router';

import { FarmairComponent } from './innovations/farmair/farmair.component';
import { InventoryComponent } from './innovations/inventory/inventory.component';
import { AthensPlantNurseryComponent } from './innovations/athens-plant-nursery/athens-plant-nursery.component';

export const routes: Routes = [
  {
    path: 'innovations/athens-plant-nursery',
    component: AthensPlantNurseryComponent,
  },
  { path: 'innovations/farmair', component: FarmairComponent },
  { path: '', component: InventoryComponent },
];
