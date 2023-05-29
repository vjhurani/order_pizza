import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpParams
} from '@angular/common/http';
import { take, exhaustMap } from 'rxjs/operators';
import {AuthService} from "../services/auth.service";



@Injectable()
export class AuthInterceptorService implements HttpInterceptor {
  constructor(private authService: AuthService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    return this.authService.authResponse.pipe(
      take(1),
      exhaustMap(authResponseData => {

        if (!authResponseData) {
          return next.handle(req);
        }



        const modifiedReq = req.clone({
          setHeaders: { Authorization: `Bearer ${authResponseData.token}` },
        });
        return next.handle(modifiedReq);
      })
    );
  }
}
