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

  // Declare variables
  loginForm: FormGroup; // Login form group
  isLogingIn: boolean; // Flag for whether user is logging in or not
  loginSub: Subscription; // Subscription to login service
  passwordField: { // Object for password field
    className: "hide" | "show"; // String property for password field visibility
  }

  constructor(private _fb: FormBuilder, private _authService: AuthService, private _router: Router) {
    // Initialize password field and login status
    this.passwordField = {
      className: "hide"
    }
    this.isLogingIn = false;
  }

  // Unsubscribe from subscription when component is destroyed
  ngOnDestroy(): void {
    this.loginSub?.unsubscribe();
  }

  // Initialize login form when component is initialized
  ngOnInit(): void {
    this.loginForm = this.buildLoginForm();
  }

  // Build login form using FormBuilder
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

  // Get login form controls
  public get getControls() {
    return this.loginForm['controls'];
  }

  /**
  * @description Toggle password visibility
  */
  public togglePasswordVisibility(): void {
    this.passwordField.className = this.passwordField.className === "hide" ? "show" : "hide";
  }

  /**
  * @description Login user
  */
  public login() {
    // Check if login form is valid
    if (this.loginForm.valid) {
      // Set login flag to true
      this.isLogingIn = true;
      // Subscribe to login service and handle response
      this.loginSub = this._authService.login(this.loginForm.value).subscribe({
        next: (res: Tokens) => {
          // Set access and refresh tokens, set logged in status to true, set login flag to false, and navigate to home page
          this._authService.setAccessToken(res.access_token);
          this._authService.setRefreshToken(res.refresh_token);
          this._authService.setLoggedInStatus(true);
          this.isLogingIn = false;
          this._router.navigate(['/'])
        },
        error: (error: any) => {
          // Set login flag to false and log error to console
          this.isLogingIn = false;
          console.log(error)
        }
      })
    } else {
      // Mark all fields as touched if form is not valid
      this.loginForm.markAllAsTouched();
    }
  }


}
