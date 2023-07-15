import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { ConfigService } from './config.service';
import { AuthHttp } from './http.service';
import { Errors } from '../models/errors.model';
import { Product, ProductJSON } from '../models/product.model';

@Injectable()
export class ProductService {

  constructor(private http: AuthHttp, private config: ConfigService) {
  }

  listProducts(): Observable<Product[]> {
    return this.http.get<ProductJSON[]>(this.config.apiBaseUrl + "/products").pipe(
      map(res => res.map(json => Product.fromJSON(json))),
      catchError(Errors.handleErrorResponse)
    );
  }

  getProduct(uuid: string): Observable<Product> {
    return this.http.get<ProductJSON>(this.config.apiBaseUrl + "/products/" + uuid).pipe(
      map(res => Product.fromJSON(res)),
      catchError(Errors.handleErrorResponse)
    );
  }

  deleteProduct(uuid: string): Observable<boolean> {
    return this.http.delete(this.config.apiBaseUrl + '/products/' + uuid).pipe(
      map(() => true),
      catchError(Errors.handleErrorResponse)
    );
  }
}
