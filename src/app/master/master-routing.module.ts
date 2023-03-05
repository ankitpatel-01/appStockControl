import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HsnMasterContainerComponent } from './miscellaneous/hsn-master-container/hsn-master-container.component';
import { TaxMasterContainerComponent } from './miscellaneous/tax-master-container/tax-master-container.component';
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
    path: 'misc/hsn',
    component: HsnMasterContainerComponent,
  },
  {
    path: 'misc/tax',
    component: TaxMasterContainerComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MasterRoutingModule { }
