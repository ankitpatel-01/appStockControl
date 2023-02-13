import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { YarnMasterContainerComponent } from './yarn-master-container/yarn-master-container.component';

const routes: Routes = [
  {
    path: "",
    pathMatch: "full",
    redirectTo: "yarn",
  },
  {
    path: "yarn",
    component: YarnMasterContainerComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MasterRoutingModule { }
