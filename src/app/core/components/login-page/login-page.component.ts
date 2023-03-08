import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs/internal/Subscription';
import { Tokens } from '../../models/token.model';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
})
export class LoginPageComponent implements OnInit, OnDestroy {

  loginForm: FormGroup;
  isLogingIn: boolean;
  loginSub: Subscription;
  passwordField: {
    className: "hide" | "show";
  }

  constructor(private _fb: FormBuilder, private _authService: AuthService, private _router: Router) {
    this.passwordField = {
      className: "hide"
    }
    this.isLogingIn = false;
  }

  ngOnDestroy(): void {
    this.loginSub?.unsubscribe();
  }

  ngOnInit(): void {
    this.loginForm = this.buildLoginForm();
  }

  buildLoginForm() {
    return this._fb.group({
      username: [{
        value: null,
        disabled: false
      }, Validators.required],

      password: [{
        value: null,
        disabled: false
      }, Validators.required],
    })
  }

  public get getControls() {
    return this.loginForm['controls'];
  }

  /**
  * @description for password visibility
  */
  public togglePasswordVisibility(): void {
    this.passwordField.className = this.passwordField.className === "hide" ? "show" : "hide";
  }

  public login() {
    if (this.loginForm.valid) {
      this.isLogingIn = true;
      this.loginSub = this._authService.login(this.loginForm.value).subscribe({
        next: (res: Tokens) => {
          this._authService.setAccessToken(res.access_token);
          this._authService.setRefreshToken(res.refresh_token);
          this._authService.setLoggedInStatus(true);
          this.isLogingIn = false;
          this._router.navigate(['/'])
        },
        error: (error: any) => {
          this.isLogingIn = false;
          console.log(error)
        }
      })
    } else {
      this.loginForm.markAllAsTouched();
    }
  }


}
