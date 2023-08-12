import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlyoutComponent } from './flyout/flyout.component';



@NgModule({
  declarations: [
    FlyoutComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    FlyoutComponent,
  ]
})
export class FlyoutModule { }
