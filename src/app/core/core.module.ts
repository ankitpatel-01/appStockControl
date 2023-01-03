import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './components/home/home.component';
import { HorizontalNavMenuComponent } from './components/home/horizontal-nav-menu/horizontal-nav-menu.component';
import { CdkMenuModule } from '@angular/cdk/menu';



@NgModule({
  declarations: [
    HomeComponent,
    HorizontalNavMenuComponent,
  ],
  imports: [
    CommonModule,
    CdkMenuModule,
  ]
})
export class CoreModule { }
