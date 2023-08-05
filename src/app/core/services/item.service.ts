import { Injectable } from '@angular/core';
import { HttpParams } from '@angular/common/http';
import { ConfigService } from './config.service';
import { AuthHttp } from './http.service';
import { Item, ItemJSON } from '../models/item.model';

@Injectable()
export class ItemService {
  constructor(private http: AuthHttp, private config: ConfigService) {}

  async listItems(): Promise<Item[]> {
    let res = await this.http.get<ItemJSON[]>(this.config.apiBaseUrl + '/items');
    return res.map(json => Item.fromJSON(json));
  }

  async findItems(brandUuid: string, storageUuid: string): Promise<Item[]> {
    const options: any = {};
    options.params = new HttpParams();
    if (brandUuid) {
      options.params = options.params.set('brand', brandUuid);
    }
    if (storageUuid) {
      options.params = options.params.set('storage', storageUuid);
    }
    let res = await this.http.get<ItemJSON[]>(this.config.apiBaseUrl + '/items/', options);
    return res.map(json => Item.fromJSON(json));
  }

  async getItem(uuid: string): Promise<Item> {
    let res = await this.http.get<ItemJSON>(this.config.apiBaseUrl + '/items/' + uuid);
    return Item.fromJSON(res);
  }

  async addItem(item: Item): Promise<Item> {
    let res = await this.http.post<ItemJSON>(this.config.apiBaseUrl + '/items', item.toJSON());
    return Item.fromJSON(res);
  }

  async updateItem(item: Item): Promise<Item> {
    let res = await this.http.put<ItemJSON>(this.config.apiBaseUrl + '/items/' + item.uuid, item.toJSON());
    return Item.fromJSON(res);
  }

  async deleteItem(item: Item): Promise<boolean> {
    await this.http.delete(this.config.apiBaseUrl + '/items/' + item.uuid);
    return true;
  }
}
