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
import { HsnMasterContainerComponent } from './miscellaneous/hsn-master-container/hsn-master-container.component';
import { HsnMasterListPresentationComponent } from './miscellaneous/hsn-master-container/hsn-master-list-presentation/hsn-master-list-presentation.component';
import { HsnMasterFormPresentationComponent } from './miscellaneous/hsn-master-container/hsn-master-form-presentation/hsn-master-form-presentation.component';
import { TaxMasterContainerComponent } from './miscellaneous/tax-master-container/tax-master-container.component';
import { TaxMasterListPresentationComponent } from './miscellaneous/tax-master-container/tax-master-list-presentation/tax-master-list-presentation.component';
import { TaxMasterFormPresentationComponent } from './miscellaneous/tax-master-container/tax-master-form-presentation/tax-master-form-presentation.component';

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
    HsnMasterContainerComponent,
    HsnMasterListPresentationComponent,
    HsnMasterFormPresentationComponent,
    TaxMasterContainerComponent,
    TaxMasterListPresentationComponent,
    TaxMasterFormPresentationComponent,
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
