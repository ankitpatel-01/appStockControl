import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { EventService } from 'src/app/shared/services/event.service';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

  constructor(private _eventService: EventService) {
  }

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
            case 0:
              this._eventService.showErrorToastr("Server is not available.", "Server Unavailable");
              break;
            case 400:
              this._eventService.showErrorToastr(error.error.message, "Bad Request:");
              errorMessage = `Bad Request: ${error.error.message}`;
              break;
            case 401:
              this._eventService.showErrorToastr(error.error.message, "Unauthorized:",);
              errorMessage = `Unauthorized: ${error.error.message}`;
              break;
            case 403:
              this._eventService.showErrorToastr(error.error.message, "Forbidden");
              errorMessage = `Forbidden: ${error.error.message}`;
              break;
            case 404:
              this._eventService.showErrorToastr(error.error.message, "Not Found");
              errorMessage = `Not Found: ${error.error.message}`;
              break;
            default:
              this._eventService.showErrorToastr(error.error.message, `Error Code:${error.status}`);
              errorMessage = `Error Code: ${error.status}\nMessage: ${error.error.message}`;
              break;
          }
        }
        return throwError(() => errorMessage);
      })
    );
  }
}
