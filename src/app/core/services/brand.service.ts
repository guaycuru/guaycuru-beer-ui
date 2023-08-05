import { Injectable } from '@angular/core';
import { AuthHttp } from './http.service';
import { ConfigService } from './config.service';
import { Brand, BrandJSON } from '../models/brand.model';

@Injectable()
export class BrandService {
  constructor(private http: AuthHttp, private config: ConfigService) {
  }

  async listBrands(): Promise<Brand[]> {
    let res = await this.http.get<BrandJSON[]>(this.config.apiBaseUrl + '/brands');
    return res.map(json => Brand.fromJSON(json));
  }

  async getBrand(uuid: string): Promise<Brand> {
    let res = await this.http.get<BrandJSON>(this.config.apiBaseUrl + '/brands/' + uuid);
    return Brand.fromJSON(res);
  }

  async addBrand(brand: Brand): Promise<Brand> {
    let res = await this.http.post<BrandJSON>(this.config.apiBaseUrl + '/brands', brand.toJSON());
    return Brand.fromJSON(res);
  }

  async updateBrand(brand: Brand): Promise<Brand> {
    let res = await this.http.put<BrandJSON>(this.config.apiBaseUrl + '/brands/' + brand.uuid, brand.toJSON());
    return Brand.fromJSON(res);
  }

  async deleteBrand(uuid: string): Promise<boolean> {
    await this.http.delete(this.config.apiBaseUrl + '/brands/' + uuid);
    return true;
  }
}
