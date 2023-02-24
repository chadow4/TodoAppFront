import {HTTP_INTERCEPTORS, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Injectable} from '@angular/core';

import {Observable} from 'rxjs';
import {AuthService} from "../Services/auth.service";

const TOKEN_HEADER_KEY = 'x-access-token';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private authService: AuthService) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let authReq = req;
    const token = this.authService.getToken();
    if (token != null) {
      authReq = req.clone({headers: req.headers.set(TOKEN_HEADER_KEY, token)});
    }
    return next.handle(authReq);
  }
}

export const authInterceptorProviders = [
  {provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true}
];
