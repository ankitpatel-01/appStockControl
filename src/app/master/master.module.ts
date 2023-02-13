import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MasterRoutingModule } from './master-routing.module';
import { YarnMasterContainerComponent } from './yarn-master-container/yarn-master-container.component';
import { YarnMasterListPresentationComponent } from './yarn-master-container/yarn-master-list-presentation/yarn-master-list-presentation.component';
import { YarnMasterFormPresentationComponent } from './yarn-master-container/yarn-master-form-container/yarn-master-form-presentation/yarn-master-form-presentation.component';
import { YarnMasterService } from './services/yarn-master.service';
import { YarnMasterFormContainerComponent } from './yarn-master-container/yarn-master-form-container/yarn-master-form-container.component';
import { YarnTypeAddDialogComponent } from './yarn-master-container/yarn-master-form-container/yarn-master-form-presentation/yarn-type-add-dialog/yarn-type-add-dialog.component';
import { SharedModule } from '../shared/shared.module';
import { QualityAddDialogComponent } from './yarn-master-container/yarn-master-form-container/yarn-master-form-presentation/quality-add-dialog/quality-add-dialog.component';
import { ColorAddDialogComponent } from './yarn-master-container/yarn-master-form-container/yarn-master-form-presentation/color-add-dialog/color-add-dialog.component';
import { YarnCategoryAddDialogComponent } from './yarn-master-container/yarn-master-form-container/yarn-master-form-presentation/yarn-category-add-dialog/yarn-category-add-dialog.component';
import { YarnGroupAddDialogComponent } from './yarn-master-container/yarn-master-form-container/yarn-master-form-presentation/yarn-group-add-dialog/yarn-group-add-dialog.component';
import { HsnAddDialogComponent } from './yarn-master-container/yarn-master-form-container/yarn-master-form-presentation/hsn-add-dialog/hsn-add-dialog.component';

import { PaginatorModule, TabsModule } from '../custom-components';
import { YarnTypeListPresentationComponent } from './yarn-master-container/yarn-type-list-presentation/yarn-type-list-presentation.component';
import { YarnTypeFormPresentationComponent } from './yarn-master-container/yarn-type-list-presentation/yarn-type-form-presentation/yarn-type-form-presentation.component';

@NgModule({
  declarations: [
    YarnMasterContainerComponent,
    YarnMasterListPresentationComponent,
    YarnMasterFormPresentationComponent,
    YarnMasterFormContainerComponent,
    YarnTypeAddDialogComponent,
    QualityAddDialogComponent,
    ColorAddDialogComponent,
    YarnCategoryAddDialogComponent,
    YarnGroupAddDialogComponent,
    HsnAddDialogComponent,
    YarnTypeListPresentationComponent,
    YarnTypeFormPresentationComponent,
  ],
  imports: [
    MasterRoutingModule,
    SharedModule,
    TabsModule,
    PaginatorModule,
  ],
  providers: [
    YarnMasterService
  ]
})
export class MasterModule { }
