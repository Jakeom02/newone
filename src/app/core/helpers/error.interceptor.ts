import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HTTP_INTERCEPTORS,
  HttpErrorResponse,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  currentRoute: string;
  constructor(private toastrService: ToastrService, private router: Router) {}
  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    // extract error message from http body if an error occurs
    return next.handle(request).pipe(
      catchError((errorResponse) => {
        if (errorResponse instanceof HttpErrorResponse) {
          switch (errorResponse.status) {
            case 401: // login
              this.router.events
                .pipe(filter((event: any) => event instanceof NavigationEnd))
                .subscribe((event) => {
                  this.currentRoute = event['url'];
                });
              this.toastrService.error(
                'Your token may have expired. So please login again'
              );
              this.router.navigate(['/auth/home'], {
                queryParams: { returnUrl: this.currentRoute },
              });
              break;
            case 400: // forbidden
              // show server bad request message
              if (errorResponse.error) {
                if (errorResponse.error.error) {
                  if (errorResponse.error.error.error_params) {
                    errorResponse.error.error.error_params.forEach((x: any) => {
                      return this.toastrService.error(x.msg, 'Error');
                    });
                  }
                  if (errorResponse.error.error.errors) {
                    errorResponse.error.error.errors.forEach((x: any) => {
                      return this.toastrService.error(x, 'Error');
                    });
                  }
                }
              }
              if (errorResponse.error) {
                if (errorResponse.error.error) {
                  this.toastrService.error(errorResponse.error.error, 'Error');
                }
              }
              break;
            case 412: // precondition_failed
            case 422: // unprocessable_entity
            case 410: // unprocessable_entity
            case 503: // unprocessable_entity
            case 404: // unprocessable_entity
              // show server bad request message
              if (errorResponse.error) {
                if (errorResponse.error.error) {
                  this.toastrService.error(errorResponse.error.error, 'Error');
                }
              }
              break;
            case 405: // validation error
              if (errorResponse?.error) {
                if (errorResponse.error.errors) {
                  errorResponse.error.errors.forEach((x: any) => {
                    return this.toastrService.error(x.msg, 'Error');
                  });
                }
              }
              break;
          }
        }

        return throwError(errorResponse.error);
      })
    );
  }
}

export const ErrorInterceptorProvider = {
  provide: HTTP_INTERCEPTORS,
  useClass: ErrorInterceptor,
  multi: true,
};
