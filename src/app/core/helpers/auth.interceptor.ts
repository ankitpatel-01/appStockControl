import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { AuthService } from '../services/auth.service';
import { Observable } from 'rxjs/internal/Observable';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private _authService: AuthService) { }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {

    const accessToken = this._authService.getAccessToken();
    const refreshToken = this._authService.getRefreshToken();

    // Check if the request path is for refreshing the access token
    if (this.isRefreshPath(request.url) && refreshToken) {
      const authRefreshRequest = request.clone({
        headers: request.headers.set('Authorization', `Bearer ${refreshToken}`)
      });
      return next.handle(authRefreshRequest);
    }

    // Add the access token to the request headers if it exists
    if (accessToken) {
      const authAccessRequest = request.clone({
        headers: request.headers.set('Authorization', `Bearer ${accessToken}`)
      });
      return next.handle(authAccessRequest);
    }

    // If there is no access token, make the request without modifying the headers
    return next.handle(request);
  }

  /**
   * Check if the request path is for refreshing the access token
   * @param path The request path
   * @returns true if the path includes "/api/auth/refresh", false otherwise
   */
  private isRefreshPath(path: string): boolean {
    return path.includes('/api/auth/refresh');
  }
}
