import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ItemMasterContainerComponent } from './item-master/item-master-container/item-master-container.component';
import { ItemMasterFormContainerComponent } from './item-master/item-master-form-container/item-master-form-container.component';
import { HsnMasterContainerComponent } from './miscellaneous/hsn-master-container/hsn-master-container.component';
import { LocationMasterContainerComponent } from './miscellaneous/location-master-container/location-master-container.component';
import { TaxMasterContainerComponent } from './miscellaneous/tax-master-container/tax-master-container.component';
import { UnitMasterContainerComponent } from './miscellaneous/unit-master-container/unit-master-container.component';
import { YarnMasterContainerComponent } from './yarn-master-container/yarn-master-container.component';

const routes: Routes = [
  {
    path: "",
    pathMatch: "full",
    redirectTo: "yarn",
  },
  {
    path: "yarn",
    component: YarnMasterContainerComponent,
  },
  {
    path: "item-master",
    component: ItemMasterContainerComponent,
  },
  {
    path: "item-master/add",
    component: ItemMasterFormContainerComponent,
  },
  {
    path: 'misc/hsn',
    component: HsnMasterContainerComponent,
  },
  {
    path: 'misc/tax',
    component: TaxMasterContainerComponent,
  },
  {
    path: 'misc/location',
    component: LocationMasterContainerComponent,
  },
  {
    path: 'misc/unit',
    component: UnitMasterContainerComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MasterRoutingModule { }
