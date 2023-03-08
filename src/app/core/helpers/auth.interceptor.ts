import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {


  constructor(private _authService: AuthService) { }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {

    const accessToken = this._authService.getAccessToken();
    const refreshToken = this._authService.getRefreshToken();

    if (this.isRefrshPath(request.url) && refreshToken) { // check if the request path is has to set refresh token
      const authRefreshRequest = request.clone({
        headers: request.headers.set('Authorization', `Bearer ${refreshToken}`)
      });
      return next.handle(authRefreshRequest);

    }

    if (accessToken) {
      const authAccessRequest = request.clone({
        headers: request.headers.set('Authorization', `Bearer ${accessToken}`)
      });
      return next.handle(authAccessRequest);
    }
    return next.handle(request);

  }

  private isRefrshPath(path: string): boolean {
    return path.includes('/api/auth/refresh');
  }
}
