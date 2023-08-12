import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CompanyType } from '../../../shared/models/company-type.model';
import { SignUpPresenterService } from '../sign-up-presenter/sign-up-presenter.service';
import { FormGroup, Validators } from '@angular/forms';
import { StateMaster } from 'src/app/shared/models/state-master.model';
import { SignUpDTO } from '../../models/new-signup.model';

@Component({
  selector: 'app-sign-up-presentation',
  templateUrl: './sign-up-presentation.component.html',
  viewProviders: [SignUpPresenterService]
})
export class SignUpPresentationComponent implements OnInit {

  @Input() public set company_type_master(v: CompanyType[] | null) {
    if (v)
      this._company_type_master = v;
  }

  @Input() public set stateList(v: StateMaster[] | null) {
    if (v)
      this._stateList = v;
  }

  public steps: step[] = [
    {
      step: 1,
      active: true,
      completed: false
    },
    {
      step: 2,
      active: false,
      completed: false
    },
    {
      step: 3,
      active: false,
      completed: false
    },
    {
      step: 4,
      active: false,
      completed: false
    },
    {
      step: 5,
      active: false,
      completed: false
    },
    {
      step: 6,
      active: false,
      completed: false
    },
  ]

  public country = [
    {
      id: 1,
      name: "India",
    }
  ]

  public passwordField: { // Object for password field
    className: "hide" | "show"; // String property for password field visibility
  }

  public confirmPasswordField: { // Object for password field
    className: "hide" | "show"; // String property for password field visibility
  }

  public currentStep = 1;

  public signUpFormGroup: FormGroup;

  @Output() public newSignUpObj: EventEmitter<SignUpDTO>


  private _company_type_master: CompanyType[];
  public get company_type_master(): CompanyType[] {
    return this._company_type_master;
  }

  private _stateList: StateMaster[];
  public get stateList(): StateMaster[] {
    return this._stateList;
  }

  constructor(private _signUpPresenter: SignUpPresenterService) {
    // Initialize password field and login status
    this.passwordField = {
      className: "hide",
    };
    this.confirmPasswordField = {
      className: "hide",
    }

    this.newSignUpObj = new EventEmitter<SignUpDTO>();
  }

  ngOnInit(): void {
    this._prop();
  }

  _prop() {
    this.signUpFormGroup = this._signUpPresenter.signUpForm();
    this.listenToCompanyType();
  }

  public get getControls() {
    return this.signUpFormGroup['controls'];
  }

  listenToCompanyType() {
    this.getControls['company_type'].valueChanges.subscribe(value => {
      const panControl = this.getControls['pan_no'];
      const gstControl = this.getControls['gst_no'];
      if (value == 1) {
        panControl.setValidators([Validators.required]);
        gstControl.setValidators([Validators.required]);
      } else {
        panControl.clearValidators();
        gstControl.clearValidators();
      }
      panControl.updateValueAndValidity();
      gstControl.updateValueAndValidity();
    });
  }

  next() {

    const currentStepper = this.steps[this.currentStep - 1];
    const nextStepper = this.steps[this.currentStep];

    switch (this.currentStep) {
      case 1:
        const companyDetailsValid = this.checkDetails(['company_name', 'trading_name', 'company_short_name', 'company_type']);
        if (!companyDetailsValid) {
          return;
        }
        break;
      case 2:
        const addressDetailsValid = this.checkDetails(['address1', 'address2', 'address3', 'state_id', 'city', 'pincode']);
        if (!addressDetailsValid) {
          return;
        }
        break;
      case 3:
        const contactDetailsValid = this.checkDetails(['mobile1', 'mobile2', 'tel_no', 'fax_no', 'company_email', 'website']);
        if (!contactDetailsValid) {
          return;
        }
        break;
      case 4:
        const taxtionDetailsValid = this.checkDetails(['pan_no', 'gst_no', 'cin_no', 'opening_date', 'from_date', 'to_date']);
        if (!taxtionDetailsValid) {
          return;
        }
        break;
      case 5:
        const bankDetailsValid = this.checkDetails(['bank_name', 'bank_branch_name', 'ifsc_code', 'account_no']);
        if (!bankDetailsValid) {
          return;
        }
        break;
    }


    if (currentStepper) {
      currentStepper.completed = true;
      currentStepper.active = false;
    }

    if (nextStepper) {
      nextStepper.active = true;
      nextStepper.completed = false
    }

    const newcurrentStep = this.steps.find(el => el.active === true)?.step;
    if (newcurrentStep) {
      this.currentStep = newcurrentStep;
    }
  }

  checkDetails(controlNames: string[]): boolean {
    for (const controlName of controlNames) {
      const control = this.getControls[controlName];
      if (!control.valid) {
        control.markAllAsTouched();
        return false;
      }
    }
    return true;
  }

  prev() {
    const prevStepper = this.steps.find(el => el.step == (this.currentStep - 1));
    const currentStepper = this.steps.find(el => el.step == this.currentStep);

    if (prevStepper) {
      prevStepper.completed = false;
      prevStepper.active = true;
    }

    if (currentStepper) {
      currentStepper.active = false;
      currentStepper.completed = false
    }

    const newcurrentStep = this.steps.find(el => el.active === true)?.step;
    if (newcurrentStep) {
      this.currentStep = newcurrentStep;
    }
  }

  getStep(step: number): step | undefined {
    return this.steps.find(el => el.step === step);
  }

  findActiveStep(): number {
    return this.steps.find(el => el.active === true)?.step ?? 1;
  }

  /**
 * @description Toggle password visibility
 */
  public togglePasswordVisibility(): void {
    this.passwordField.className = this.passwordField.className === "hide" ? "show" : "hide";
  }

  /**
 * @description Toggle Confirm password visibility
 */
  public toggleConfirmPasswordVisibility(): void {
    this.confirmPasswordField.className = this.confirmPasswordField.className === "hide" ? "show" : "hide";
  }

  submit() {
    if (this.signUpFormGroup.valid) {
      this.newSignUpObj.emit(this._signUpPresenter.createSignUpObj(this.signUpFormGroup));
    } else {
      this.signUpFormGroup.markAllAsTouched();
    }
  }

}

interface step {
  step: number;
  active: boolean;
  completed: boolean;
}
