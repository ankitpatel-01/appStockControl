import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
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

const Directives = [
  ToUpperCaseDirective,
  NumberOnlyDirective,
  AlphabetOnlyDirective,
  NumberFloatDirective
]

@NgModule({
  declarations: [
    Directives,
    ConfirmDialogComponent,
    AlertDialogComponent,
  ],
  imports: [
    CommonModule
  ],
  exports: [
    Directives,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NgSelectModule,
    OverlayModule,
    DialogModule
  ], providers: [
    UtitityService,
    DrawerService
  ]
})
export class SharedModule { }
