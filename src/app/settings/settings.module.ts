import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SettingsRoutingModule } from './settings-routing.module';
import { SettingsComponent } from './settings.component';
import { SharedModule } from '../shared/shared.module';
import { TabsModule, TabsetConfig } from 'ngx-bootstrap/tabs';
import { Test1Component } from './test1/test1.component';
import { Test2Component } from './test2/test2.component';
// import { TabsModule } from '../custom-components/tabs/tabs.module';


@NgModule({
  declarations: [
    SettingsComponent,
    Test1Component,
    Test2Component
  ],
  imports: [
    CommonModule,
    SettingsRoutingModule,
    SharedModule,
    // TabsModule,
    TabsModule,
  ],
  providers: [
    TabsetConfig
  ]
})
export class SettingsModule { }
