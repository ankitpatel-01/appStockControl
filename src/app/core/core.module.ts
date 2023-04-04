import { NgModule } from '@angular/core';
import { HomeComponent } from './components/home/home.component';
import { HorizontalNavMenuComponent } from './components/home/horizontal-nav-menu/horizontal-nav-menu.component';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { LoginPageComponent } from './components/login-page/login-page.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';

@NgModule({
  declarations: [
    HomeComponent,
    HorizontalNavMenuComponent,
    LoginPageComponent,
    SignUpComponent,
  ],
  imports: [
    RouterModule,
    SharedModule,
    BsDatepickerModule,
  ],
})
export class CoreModule { }
