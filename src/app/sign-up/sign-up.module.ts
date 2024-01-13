import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SignUpRoutingModule } from './sign-up-routing.module';
import { SharedModule } from '../shared/shared.module';
import { SignUpService } from './services/sign-up.service';
import { SignUpComponent } from './sign-up/sign-up.component';
import { SignUpPresentationComponent } from './sign-up/sign-up-presentation/sign-up-presentation.component';


@NgModule({
  declarations: [
    SignUpComponent,
    SignUpPresentationComponent,
  ],
  imports: [
    CommonModule,
    SignUpRoutingModule,
    SharedModule,
  ],
  providers: [
    SignUpService,
  ]
})
export class SignUpModule { }
