import { Injectable } from "@angular/core";
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HTTP_INTERCEPTORS } from "@angular/common/http";
import { Observable } from "rxjs";

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // add authorization header with jwt token if available
    if (typeof window !== "undefined") {
     let obj : any = localStorage.getItem("legaciUser");
      const legaciUser: any = JSON.parse(obj);
      if (legaciUser && legaciUser.TOKEN) {
        request = request.clone({
          setHeaders: {
            Authorization: `Bearer ${legaciUser.TOKEN}`,
            role: legaciUser.ROLE
          }
        });
      }
    }
    return next.handle(request);
  }
}

export const JwtInterceptorProvider = {
  provide: HTTP_INTERCEPTORS,
  useClass: JwtInterceptor,
  multi: true
};
