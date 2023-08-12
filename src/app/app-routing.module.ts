import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './core/components/home/home.component';
import { LoginPageComponent } from './core/components/login-page/login-page.component';
import { AuthGuard } from './core/guards/auth.guard';

const routes: Routes = [
  {
    path: "",
    component: HomeComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: "",
        pathMatch: "full",
        redirectTo: "master",
      },
      {
        path: "master",
        loadChildren: () => import("./master/master.module").then(m => m.MasterModule),
      }
    ]
  },
  {
    path: 'login',
    component: LoginPageComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'signup',
    loadChildren: () => import("./sign-up/sign-up.module").then(m => m.SignUpModule),
    canActivate: [AuthGuard],
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
