import { Injectable } from '@angular/core';
import { HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { AuthService } from './auth.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private authService: AuthService) {
  }

  // Add the token to all requests
  intercept(req: HttpRequest<any>, next: HttpHandler) {
    const token = this.authService.getBearerToken();
    if(token) {
      req = req.clone({
        setHeaders: { 'Authorization': 'Bearer ' + token }
      });
    }

    return next.handle(req);
  }
}
