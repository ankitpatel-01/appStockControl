import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { ToUpperCaseDirective } from './directives/to-upper-case.directive';
import { NumberOnlyDirective } from './directives/number-only.directive';
import { AlphabetOnlyDirective } from './directives/alphabet-only.directive';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { OverlayModule } from '@angular/cdk/overlay';
import { DialogModule } from '@angular/cdk/dialog';
import { NumberFloatDirective } from './directives/number-float.directive';
import { ConfirmDialogComponent } from './components/confirm-dialog/confirm-dialog.component';
import { AlertDialogComponent } from './components/alert-dialog/alert-dialog.component';
import { UtitityService } from './services/utitity.service';
import { DrawerService } from './services/drawer.service';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { EventService } from './services/event.service';
import { CommanApiService } from './services/comman-api.service';
import { PreventFirstNewlineDirective } from './directives/prevent-first-new-line.directive';
import { AvatarComponent } from './components/avatar/avatar.component';
import { FileUploadComponent } from './components/file-upload/file-upload.component';

const Directives = [
  ToUpperCaseDirective,
  NumberOnlyDirective,
  AlphabetOnlyDirective,
  NumberFloatDirective,
  PreventFirstNewlineDirective
]

const ComponentList = [
  AvatarComponent,
  FileUploadComponent,
  ConfirmDialogComponent,
  AlertDialogComponent,
]

@NgModule({
  declarations: [
    Directives,
    ComponentList,
  ],
  imports: [
    CommonModule
  ],
  exports: [
    Directives,
    ComponentList,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NgSelectModule,
    OverlayModule,
    DialogModule,
    BsDatepickerModule,
  ], providers: [
    DatePipe,
    UtitityService,
    DrawerService,
    EventService,
    CommanApiService,
  ]
})
export class SharedModule { }
