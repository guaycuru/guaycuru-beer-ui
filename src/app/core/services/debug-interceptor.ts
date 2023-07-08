import { Injectable } from '@angular/core';
import { HttpHandler, HttpInterceptor, HttpParams, HttpRequest } from '@angular/common/http';
import { ConfigService } from './config.service';

@Injectable()
export class DebugInterceptor implements HttpInterceptor {
  constructor(private config: ConfigService) {
  }

  // Add the token to all requests
  intercept(req: HttpRequest<any>, next: HttpHandler) {
    if(this.config.isDebugEnabled) {
      const method = req.method.toLowerCase();
      //if(method === 'get' || method === 'delete') {
      const clone = req.clone({
        params: (req.params ?? new HttpParams()).set('XDEBUG_SESSION', 'debug')
      });
      /*} else if(method === 'post' || method === 'put') {
        req.body['XDEBUG_SESSION'] = 'debug';
      }*/
      return next.handle(clone);
    } else {
      return next.handle(req);
    }
  }
}
