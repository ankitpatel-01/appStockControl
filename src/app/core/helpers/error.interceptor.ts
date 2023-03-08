import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';
import { catchError } from 'rxjs/internal/operators/catchError';
import { throwError } from 'rxjs/internal/observable/throwError';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

  constructor() { }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return next.handle(request).pipe(
      catchError((error: HttpErrorResponse) => {
        let errorMessage = '';
        if (error.error instanceof ErrorEvent) {
          // client-side error
          errorMessage = `Error: ${error.error.message}`;
        } else {
          // server-side error
          switch (error.status) {
            case 400:
              errorMessage = `Bad Request: ${error.message}`;
              break;
            case 401:
              errorMessage = `Unauthorized: ${error.message}`;
              break;
            case 403:
              errorMessage = `Forbidden: ${error.message}`;
              break;
            case 404:
              errorMessage = `Not Found: ${error.message}`;
              break;
            default:
              errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
              break;
          }
        }
        return throwError(errorMessage);
      })
    );
  }
}
