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

  listBrands(): Observable<Brand[]> {
    return this.http.get<BrandJSON[]>(this.config.apiBaseUrl + "/brands").pipe(
      map(res => res.map(json => Brand.fromJSON(json))),
      catchError(Errors.handleErrorResponse)
    );
  }

  getBrand(uuid: string): Observable<Brand> {
    return this.http.get<BrandJSON>(this.config.apiBaseUrl + '/brands/' + uuid).pipe(
      map(res => Brand.fromJSON(res)),
      catchError(Errors.handleErrorResponse)
    );
  }
}
