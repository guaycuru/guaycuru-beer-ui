import { Injectable } from '@angular/core';
import { AuthHttp } from './http.service';
import { ConfigService } from './config.service';
import { Observable } from 'rxjs';
import { Brand, BrandJSON } from '../models/brand.model';
import { catchError, map } from 'rxjs/operators';
import { Errors } from '../models/errors.model';

@Injectable()
export class BrandService {
  constructor(private http: AuthHttp, private config: ConfigService) {
  }

  findBrands(labels: boolean, ips: boolean, tags: boolean): Observable<Brand[]> {
    const body = JSON.stringify({ labels, ips, tags });
    return this.http.post<BrandJSON[]>(this.config.apiBaseUrl + "/brands", body).pipe(
      map(res => res.map(json => Brand.fromJSON(json))),
      catchError(Errors.handleErrorResponse)
    );
  }
}
