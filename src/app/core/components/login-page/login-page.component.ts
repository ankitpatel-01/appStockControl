import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
// ------------------------------------------------------------------------------------
import { Subject } from 'rxjs/internal/Subject';
import { takeUntil } from 'rxjs/internal/operators/takeUntil';
import { switchMap } from 'rxjs/internal/operators/switchMap';
import { forkJoin } from 'rxjs/internal/observable/forkJoin';
import { map } from 'rxjs/internal/operators/map';
import { Observable } from 'rxjs/internal/Observable';
import { tap } from 'rxjs/internal/operators/tap';
import { catchError } from 'rxjs/internal/operators/catchError';
import { EMPTY } from 'rxjs/internal/observable/empty';
// ------------------------------------------------------------------------------------
import { AuthService } from '../../services/auth.service';
// ------------------------------------------------------------------------------------
import { Tokens } from '../../models/token.model';
import { CompanyBranchList } from '../../models/company-branch.model';
import { UserProfile } from '../../models/user-profile.model';
import { LoginRes } from '../../models/login-credentails.model';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
})
export class LoginPageComponent implements OnInit, OnDestroy {

  // Declare variables
  loginForm: FormGroup; // Login form group
  isLoggingIn: boolean; // Flag for whether user is logging in or not
  passwordField: { // Object for password field
    className: "hide" | "show"; // String property for password field visibility
  }
  private destroy$: Subject<void> = new Subject<void>();

  constructor(private _fb: FormBuilder, private _authService: AuthService, private _router: Router) {
    // Initialize password field and login status
    this.passwordField = {
      className: "hide"
    }
    this.isLoggingIn = false;
  }

  // Unsubscribe from subscription when component is destroyed
  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
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
      this.isLoggingIn = true;
      // Subscribe to login service and handle response
      this._authService.login(this.loginForm.value)
        .pipe(
          switchMap((token: Tokens) => {
            return forkJoin({
              companyBranchList: this.getCompanyBranchList(token),
              userProfile: this.getUserProfile(token)
            }).pipe(map((joinRes) => { return { ...joinRes, token } }));
          }),
          takeUntil(this.destroy$))
        .subscribe({
          next: (result: LoginRes) => {
            if (result.companyBranchList.length == 1) {
              this.setUserLoggedIn(result.token, result.companyBranchList[0].id);
            } else {
              // some code
            }
          },
          error: (error: any) => {
            // Set login flag to false and log error to console
            this.isLoggingIn = false;
            console.log(error)
          }
        })
    } else {
      // Mark all fields as touched if form is not valid
      this.loginForm.markAllAsTouched();
    }
  }


  getCompanyBranchList(tokens: Tokens): Observable<CompanyBranchList[]> {
    return this._authService.getCompanyBranchList(tokens.access_token).pipe(
      tap((res: CompanyBranchList[]) => {
        if (res && res.length > 0) {
          this._authService.setBranchListToStorage(res);
        }
      }),
      catchError(error => {
        console.log(error);
        return EMPTY; // Return an empty observable to continue the chain
      })
    );
  }

  getUserProfile(tokens: Tokens): Observable<UserProfile> {
    return this._authService.getUserProfile(tokens.access_token).pipe(
      tap((res: UserProfile) => {
        if (res) {
          this._authService.setUserProfileToStorage(res);
        }
      }),
      catchError(error => {
        console.log(error);
        return EMPTY; // Return an empty observable to continue the chain
      })
    );
  }

  setUserLoggedIn(tokens: Tokens, loggedInBranchId: number) {
    // Set access and refresh tokens, set logged in status to true, set login flag to false, and navigate to home page
    this._authService.setAccessToken(tokens.access_token);
    this._authService.setRefreshToken(tokens.refresh_token);
    this._authService.setLoggedInBranchId(loggedInBranchId);
    this._authService.setLoggedInStatus(true);
    this.isLoggingIn = false;
    this._router.navigate(['/'])
  }


}
