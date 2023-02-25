import { NgModule } from '@angular/core';
import { MasterRoutingModule } from './master-routing.module';
// ---------------------------------------------------------------------------
import { SharedModule } from '../shared/shared.module';
import { PaginatorModule, TabsModule } from '../custom-components';
import { YarnMasterService } from './services/yarn-master.service';
// ---------------------------------------------------------------------------
import { YarnMasterContainerComponent } from './yarn-master-container/yarn-master-container.component';
import { YarnMasterListPresentationComponent } from './yarn-master-container/yarn-master-list-presentation/yarn-master-list-presentation.component';
import { YarnMasterFormPresentationComponent } from './yarn-master-container/yarn-master-form-container/yarn-master-form-presentation/yarn-master-form-presentation.component';
import { YarnMasterFormContainerComponent } from './yarn-master-container/yarn-master-form-container/yarn-master-form-container.component';
import { YarnTypeAddDialogComponent } from './yarn-master-container/yarn-master-form-container/yarn-master-form-presentation/yarn-type-add-dialog/yarn-type-add-dialog.component';
import { QualityAddDialogComponent } from './yarn-master-container/yarn-master-form-container/yarn-master-form-presentation/quality-add-dialog/quality-add-dialog.component';
import { ColorAddDialogComponent } from './yarn-master-container/yarn-master-form-container/yarn-master-form-presentation/color-add-dialog/color-add-dialog.component';
import { YarnCategoryAddDialogComponent } from './yarn-master-container/yarn-master-form-container/yarn-master-form-presentation/yarn-category-add-dialog/yarn-category-add-dialog.component';
import { YarnGroupAddDialogComponent } from './yarn-master-container/yarn-master-form-container/yarn-master-form-presentation/yarn-group-add-dialog/yarn-group-add-dialog.component';
import { HsnAddDialogComponent } from './yarn-master-container/yarn-master-form-container/yarn-master-form-presentation/hsn-add-dialog/hsn-add-dialog.component';
import { YarnTypeListPresentationComponent } from './yarn-master-container/yarn-type-list-presentation/yarn-type-list-presentation.component';
import { YarnTypeFormPresentationComponent } from './yarn-master-container/yarn-type-list-presentation/yarn-type-form-presentation/yarn-type-form-presentation.component';
import { HsnMasterContainerComponent } from './miscellaneous/hsn-master-container/hsn-master-container.component';
import { HsnMasterListPresentationComponent } from './miscellaneous/hsn-master-container/hsn-master-list-presentation/hsn-master-list-presentation.component';
import { HsnMasterFormPresentationComponent } from './miscellaneous/hsn-master-container/hsn-master-form-presentation/hsn-master-form-presentation.component';
import { TaxMasterContainerComponent } from './miscellaneous/tax-master-container/tax-master-container.component';
import { TaxMasterListPresentationComponent } from './miscellaneous/tax-master-container/tax-master-list-presentation/tax-master-list-presentation.component';
import { TaxMasterFormPresentationComponent } from './miscellaneous/tax-master-container/tax-master-form-presentation/tax-master-form-presentation.component';
import { YarnColorListPresentationComponent } from './yarn-master-container/yarn-color-list-presentation/yarn-color-list-presentation.component';
import { YarnColorFormPresentationComponent } from './yarn-master-container/yarn-color-list-presentation/yarn-color-form-presentation/yarn-color-form-presentation.component';
import { YarnQualityListPresentationComponent } from './yarn-master-container/yarn-quality-list-presentation/yarn-quality-list-presentation.component';
import { YarnGroupListPresentationComponent } from './yarn-master-container/yarn-group-list-presentation/yarn-group-list-presentation.component';
import { YarnCategoryListPresentationComponent } from './yarn-master-container/yarn-category-list-presentation/yarn-category-list-presentation.component';
import { YarnCategoryFormPresentationComponent } from './yarn-master-container/yarn-category-list-presentation/yarn-category-form-presentation/yarn-category-form-presentation.component';
import { YarnGroupFormPresentationComponent } from './yarn-master-container/yarn-group-list-presentation/yarn-group-form-presentation/yarn-group-form-presentation.component';
import { YarnQualityFormPresentationComponent } from './yarn-master-container/yarn-quality-list-presentation/yarn-quality-form-presentation/yarn-quality-form-presentation.component';

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
    YarnColorListPresentationComponent,
    YarnColorFormPresentationComponent,
    YarnQualityListPresentationComponent,
    YarnGroupListPresentationComponent,
    YarnCategoryListPresentationComponent,
    YarnCategoryFormPresentationComponent,
    YarnGroupFormPresentationComponent,
    YarnQualityFormPresentationComponent,
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
