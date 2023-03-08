import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs/internal/Observable';
import { map } from 'rxjs/internal/operators/map';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private _authSerive: AuthService, private _router: Router) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    const loggedIn = this._authSerive.isLoggedIn;
    const access_token = this._authSerive.getAccessToken();

    if (this._authSerive.isTokenExpired(access_token)) {
      this._authSerive.setLoggedInStatus(false);
      if (!loggedIn && route.routeConfig?.path === 'login') {
        return true;
      }
      this._router.navigate(['/login'])
      return false;
    }

    if (!loggedIn && route.routeConfig?.path === 'login') {
      return true;
    }

    if (loggedIn && route.routeConfig?.path === 'login') {
      this._router.navigate(['/'])
    }

    if (loggedIn) {
      return true;
    }

    return false
  }


}
