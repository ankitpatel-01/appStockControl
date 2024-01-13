import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs/internal/Observable';
import { AuthService } from '../services/auth.service';

/**
 * Guard to check if the user is authenticated before allowing access to a route
 */
@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(
    private _authService: AuthService,
    private _router: Router
  ) { }

  /**
   * Checks if the user is authenticated and has a valid access token before allowing access to a route
   * @param route - The activated route snapshot
   * @param state - The router state snapshot
   * @returns true if the user is authenticated and has a valid access token, false otherwise
   */
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    // Check if the user is logged in and has a valid access token
    const loggedIn = this._authService.isLoggedIn;
    const accessToken = this._authService.getAccessToken();

    // If the access token has expired, clear the session storage, set the logged in status to false and redirect to the login page
    if (this._authService.isTokenExpired(accessToken)) {
      this._authService.setLoggedInStatus(false);
      this._authService.clearSessionStorage();
      if (!loggedIn && (route.routeConfig?.path === 'login' || route.routeConfig?.path === 'signup')) {
        // Allow access to the login and signup pages if the user is not logged in
        return true;
      }
      this._router.navigate(['/login']);
      return false;
    }

    // Allow access to the login and signup pages if the user is not logged in
    if (!loggedIn && (route.routeConfig?.path === 'login' || route.routeConfig?.path === 'signup')) {
      return true;
    }

    // If the user is already logged in and tries to access the login or signup page, redirect to the home page
    if (loggedIn && (route.routeConfig?.path === 'login' || route.routeConfig?.path === 'signup')) {
      this._router.navigate(['/']);
    }

    // Allow access to the requested route if the user is logged in and has a valid access token
    if (loggedIn) {
      return true;
    }

    // Redirect to the login page if the user is not logged in and trying to access a protected page
    this._router.navigate(['/login']);
    return false;
  }

}
