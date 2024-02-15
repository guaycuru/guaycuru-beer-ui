import { Injectable } from '@angular/core';
import { ConfigService } from './config.service';
import { AuthHttp } from './http.service';
import { Product, ProductJSON } from '../models/product.model';

@Injectable()
export class ProductService {
  constructor(private http: AuthHttp, private config: ConfigService) {}

  async listProducts(): Promise<Product[]> {
    let res = await this.http.get<ProductJSON[]>(
      this.config.apiBaseUrl + '/products'
    );
    return res.map(json => Product.fromJSON(json));
  }

  async getProduct(uuid: string): Promise<Product> {
    let res = await this.http.get<ProductJSON>(
      this.config.apiBaseUrl + '/products/' + uuid
    );
    return Product.fromJSON(res);
  }

  async deleteProduct(uuid: string): Promise<boolean> {
    await this.http.delete(this.config.apiBaseUrl + '/products/' + uuid);
    return true;
  }

  async listProductNames(): Promise<string[]> {
    let products = await this.http.get<Product[]>(
      this.config.apiBaseUrl + '/products'
    );
    return products.map(product => product.name);
  }
}
