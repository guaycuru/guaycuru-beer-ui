import { Injectable } from '@angular/core';
import { AuthHttp } from './http.service';
import { ConfigService } from './config.service';
import { Brand, BrandJSON } from '../models/brand.model';

@Injectable()
export class BrandService {
  constructor(private http: AuthHttp, private config: ConfigService) {
  }

  listBrands(): Promise<Brand[]> {
    return this.http.get<BrandJSON[]>(this.config.apiBaseUrl + "/brands").then(
      res => res.map(json => Brand.fromJSON(json))
    );
  }

  getBrand(uuid: string): Promise<Brand> {
    return this.http.get<BrandJSON>(this.config.apiBaseUrl + '/brands/' + uuid).then(
      res => Brand.fromJSON(res)
    );
  }

  addBrand(brand: Brand): Promise<Brand> {
    return this.http.post<BrandJSON>(this.config.apiBaseUrl + '/brands', brand.toJSON()).then(
      res => Brand.fromJSON(res)
    );
  }

  updateBrand(brand: Brand): Promise<Brand> {
    return this.http.put<BrandJSON>(this.config.apiBaseUrl + '/brands/' + brand.uuid, brand.toJSON()).then(
      res => Brand.fromJSON(res)
    );
  }

  deleteBrand(uuid: string): Promise<boolean> {
    return this.http.delete(this.config.apiBaseUrl + '/brands/' + uuid).then(
      () => true
    );
  }
}
