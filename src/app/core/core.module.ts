import { NgModule } from '@angular/core';
import { HomeComponent } from './components/home/home.component';
import { HorizontalNavMenuComponent } from './components/home/horizontal-nav-menu/horizontal-nav-menu.component';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { LoginPageComponent } from './components/login-page/login-page.component';
import { FlyoutModule } from '../custom-components/flyout/flyout.module';
import { AccountFlyoutComponent } from './components/home/horizontal-nav-menu/account-flyout/account-flyout.component';

@NgModule({
  declarations: [
    HomeComponent,
    HorizontalNavMenuComponent,
    LoginPageComponent,
    AccountFlyoutComponent,
  ],
  imports: [
    RouterModule,
    SharedModule,
    FlyoutModule
  ],
})
export class CoreModule { }
