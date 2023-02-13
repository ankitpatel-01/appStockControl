import { NgModule } from '@angular/core';
import { HomeComponent } from './components/home/home.component';
import { HorizontalNavMenuComponent } from './components/home/horizontal-nav-menu/horizontal-nav-menu.component';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared.module';



@NgModule({
  declarations: [
    HomeComponent,
    HorizontalNavMenuComponent,
  ],
  imports: [
    RouterModule,
    SharedModule
  ]
})
export class CoreModule { }
