import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { CompanyType } from '../../shared/models/company-type.model';
import { SignUpService } from '../services/sign-up.service';
import { CommanApiService } from 'src/app/shared/services/comman-api.service';
import { StateMaster } from 'src/app/shared/models/state-master.model';
import { SignUpDTO } from '../models/new-signup.model';
import { UtitityService } from 'src/app/shared/services/utitity.service';
import { EventService } from 'src/app/shared/services/event.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
})
export class SignUpComponent implements OnInit {

  companyTypeMaster$: Observable<CompanyType[]>;
  stateMaster$: Observable<StateMaster[]>;
  constructor(private _signUpService: SignUpService,
    private _commanApiService: CommanApiService,
    private _utilityService: UtitityService,
    private _event: EventService,
    private _router: Router) { }

  ngOnInit(): void {
    this.getCompanyTypeMaster();
    this.getStateMaster();
  }

  getCompanyTypeMaster() {
    this.companyTypeMaster$ = this._commanApiService.getCompanyTypeMaster();
  }

  getStateMaster() {
    this.stateMaster$ = this._commanApiService.getStateMaster();
  }

  newSignUpPost(signUpDto: SignUpDTO) {
    this._signUpService.newSignUp(signUpDto).subscribe({
      next: (res: number) => {
        if (res == 1) {
          this._event.showSuccessSnackBar("Sign Up Completed Sucessfully!");
          this._router.navigate(['/login'])
        }
        if (res == 2) {
          this._event.showErrorSnackBar("Sign Up Failed!", "Error");
        }
      },
      error: (err) => {
        this._utilityService.openAlertDialog(err?.error?.error, err?.error?.message);
      }
    })
  }

}
