import { Injectable } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { BANK_ACCOUNT_NO_REGEX, CIN_REGEX, EMAIL_REGEX, GSTIN_REGEX, IFSC_CODE_REGEX, PAN_NO_REGEX, PINCODE_REGEX } from 'src/app/shared/constants/constants';
import { Companydetails, SignUpDTO, Userdetails } from '../../models/new-signup.model';
import { UtitityService } from 'src/app/shared/services/utitity.service';


export function confirmPasswordValidator(matchingControlName: string): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } | null => {
    const matchingControl = control.parent?.get(matchingControlName);

    if (matchingControl && control.value !== matchingControl.value) {
      return { passwordsDoNotMatch: true };
    } else {
      return null;
    }
  };
}

@Injectable()
export class SignUpPresenterService {

  currentDate: Date = new Date();
  public selectedCountry = 1;

  constructor(private _fb: FormBuilder, private _utilService: UtitityService) { }

  signUpForm(): FormGroup {
    return this._fb.group({
      //Company Details
      company_name: [{
        value: null,
        disabled: false
      }, Validators.required],
      company_short_name: [{
        value: null,
        disabled: false
      }],
      trading_name: [{
        value: null,
        disabled: false
      }, Validators.required],
      company_type: [{
        value: null,
        disabled: false
      }, Validators.required],

      //Address Details
      address1: [{
        value: null,
        disabled: false
      }, Validators.required],
      address2: [{
        value: null,
        disabled: false
      }],
      address3: [{
        value: null,
        disabled: false
      }],
      country_id: [{
        value: this.selectedCountry,
        disabled: true,
      }, Validators.required],
      state_id: [{
        value: null,
        disabled: false
      }, Validators.required],
      city: [{
        value: null,
        disabled: false
      }, Validators.required],
      pincode: [{
        value: null,
        disabled: false
      }, [Validators.required, Validators.pattern(PINCODE_REGEX)]],

      //Contact Details
      mobile1: [{
        value: null,
        disabled: false
      }, [Validators.required, Validators.maxLength(10), Validators.minLength(10)]],
      mobile2: [{
        value: null,
        disabled: false
      }, [Validators.maxLength(10), Validators.minLength(10)]],
      tel_no: [{
        value: null,
        disabled: false
      }, [Validators.maxLength(10), Validators.minLength(10)]],
      fax_no: [{
        value: null,
        disabled: false
      }, [Validators.maxLength(10), Validators.minLength(10)]],
      company_email: [{
        value: null,
        disabled: false
      }, [Validators.required, Validators.pattern(EMAIL_REGEX)]],
      website: [{
        value: null,
        disabled: false
      }],

      //Taxation Details
      pan_no: [{
        value: null,
        disabled: false
      }, [Validators.pattern(PAN_NO_REGEX)]],
      gst_no: [{
        value: null,
        disabled: false
      }, [Validators.pattern(GSTIN_REGEX)]],
      cin_no: [{
        value: null,
        disabled: false
      }, [Validators.pattern(CIN_REGEX), Validators.required]],
      opening_date: [{
        value: this.currentDate,
        disabled: false
      }],
      from_date: [{
        value: null,
        disabled: false
      }],
      to_date: [{
        value: null,
        disabled: false
      }],
      //Bank Details
      bank_name: [{
        value: null,
        disabled: false
      }, Validators.required],
      bank_branch_name: [{
        value: null,
        disabled: false
      }, Validators.required],
      ifsc_code: [{
        value: null,
        disabled: false
      }, [Validators.required, Validators.pattern(IFSC_CODE_REGEX)]],
      account_no: [{
        value: null,
        disabled: false
      }, [Validators.required, Validators.pattern(BANK_ACCOUNT_NO_REGEX)]],

      // User Details 
      user_firstname: [{
        value: null,
        disabled: false
      }, Validators.required],
      user_middlename: [{
        value: null,
        disabled: false
      }],
      user_lastname: [{
        value: null,
        disabled: false
      }, Validators.required],
      user_fullname: [{
        value: null,
        disabled: false
      }],
      user_username: [{
        value: null,
        disabled: false
      }, Validators.required],
      user_password: [{
        value: null,
        disabled: false
      }, Validators.required],
      user_confirm_password: [{
        value: null,
        disabled: false
      }, [Validators.required, confirmPasswordValidator('user_password')]],
    })
  }

  createSignUpObj(form: FormGroup): SignUpDTO {
    let obj: SignUpDTO = {
      company_details: {
        company_name: form.controls['company_name'].value,
        trading_name: form.controls['trading_name'].value,
        company_short_name: form.controls['company_short_name'].value,
        company_type: form.controls['company_type'].value,
        address_details: {
          address1: form.controls['address1'].value,
          address2: form.controls['address2'].value,
          address3: form.controls['address3'].value,
          country_id: form.controls['country_id'].value,
          state_id: form.controls['state_id'].value,
          city_name: form.controls['city'].value,
          pincode: form.controls['pincode'].value
        },
        contact_details: {
          mobile1: form.controls['mobile1'].value,
          mobile2: form.controls['mobile2'].value,
          tel_no: form.controls['tel_no'].value,
          fax_no: form.controls['fax_no'].value,
          email: form.controls['company_email'].value,
          website: form.controls['website'].value
        },
        taxation_details: {
          pan_no: form.controls['pan_no'].value,
          gst_no: form.controls['gst_no'].value,
          cin_no: form.controls['cin_no'].value,
          opening_date: this._utilService.getFormatedDate(form.controls['opening_date'].value),
          to_date: this._utilService.getFormatedDate(form.controls['to_date'].value),
          from_date: this._utilService.getFormatedDate(form.controls['from_date'].value)
        },
        bank_details: {
          bank_name: form.controls['bank_name'].value,
          branch_name: form.controls['bank_branch_name'].value,
          ifsc_code: form.controls['ifsc_code'].value,
          account_no: form.controls['account_no'].value
        }
      },
      user_details: {
        first_name: form.controls['user_firstname'].value,
        middle_name: form.controls['user_middlename'].value,
        last_name: form.controls['user_lastname'].value,
        username: form.controls['user_username'].value,
        password: form.controls['user_confirm_password'].value
      }
    }
    return obj;
  }
}




