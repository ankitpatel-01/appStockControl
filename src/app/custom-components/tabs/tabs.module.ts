import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TabGroupComponent } from './tab-group/tab-group.component';
import { TabComponent } from './tab/tab.component';



@NgModule({
  declarations: [
    TabGroupComponent,
    TabComponent
  ],
  imports: [
    CommonModule
  ], exports: [
    TabGroupComponent,
    TabComponent
  ]
})
export class TabsModule { }
