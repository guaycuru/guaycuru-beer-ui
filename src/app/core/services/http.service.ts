import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { firstValueFrom, Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { AuthService } from './auth.service';
import { Errors } from '../models/errors.model';

type BodyTypes = string | Object | FormData | ArrayBuffer | Blob | null;

@Injectable()
export class AuthHttp {

  constructor(private auth: AuthService, private http: HttpClient) {
  }

  get<R>(url: string, options?: any) : Promise<R> {
    return this._request<R>('get', url, null, options);
  }

  post<R>(url: string, body: BodyTypes, options?: any): Promise<R> {
    return this._request<R>('post', url, body, options);
  }

  put<R>(url: string, body: BodyTypes, options?: any): Promise<R> {
    return this._request<R>('put', url, body, options);
  }

  delete<R>(url: string, options?: any): Promise<R> {
    return this._request<R>('delete', url, null, options);
  }

  patch<R>(url: string, body: BodyTypes, options?: any): Promise<R> {
    return this._request<R>('patch', url, body, options);
  }

  head<R>(url: string, options?: any): Promise<R> {
    return this._request<R>('head', url, null, options);
  }

  _craftHttpOptions(body?: any, options?: any): any {
    const defaultOptions = {
      observe: 'response',
      headers: new HttpHeaders()
    };

    let httpOptions = Object.assign(defaultOptions, options);
    if (body) {
      httpOptions.body = body;
    }

    if (!httpOptions.headers.has('Content-Type')) {
      httpOptions.headers = httpOptions.headers.set('Content-Type', 'application/json');
    }

    return httpOptions;
  }

  _request<R>(method: string, url: string, body?: any, options?: any): Promise<R> {
    let response: Observable<HttpResponse<R>>;
    let httpOptions = this._craftHttpOptions(body, options);
    response = this.http.request<R>(method, url, httpOptions) as Observable<HttpResponse<R>>;
    return firstValueFrom(response.pipe(
      map(res => res.body as R),
      catchError(Errors.handleErrorResponse)
    ));
  }
}
