import { Injectable } from '@angular/core';
import { ConfigService } from './config.service';
import { AuthHttp } from './http.service';
import { Product, ProductJSON } from '../models/product.model';

@Injectable()
export class ProductService {

  constructor(private http: AuthHttp, private config: ConfigService) {
  }

  listProducts(): Promise<Product[]> {
    return this.http.get<ProductJSON[]>(this.config.apiBaseUrl + "/products").then(
      res => res.map(json => Product.fromJSON(json))
    );
  }

  getProduct(uuid: string): Promise<Product> {
    return this.http.get<ProductJSON>(this.config.apiBaseUrl + "/products/" + uuid).then(
      res => Product.fromJSON(res)
    );
  }

  deleteProduct(uuid: string): Promise<boolean> {
    return this.http.delete(this.config.apiBaseUrl + '/products/' + uuid).then(
      () => true
    );
  }
}
