import { Injectable } from '@angular/core';
import { HttpParams } from '@angular/common/http';
import { ConfigService } from './config.service';
import { AuthHttp } from './http.service';
import { Item, ItemJSON } from '../models/item.model';

@Injectable()
export class ItemService {
  constructor(private http: AuthHttp, private config: ConfigService) {}

  listItems(): Promise<Item[]> {
    return this.http.get<ItemJSON[]>(this.config.apiBaseUrl + '/items').then(
      res => res.map(json => Item.fromJSON(json))
    );
  }

  findItems(brandUuid: string, storageUuid: string): Promise<Item[]> {
    const options: any = {};
    options.params = new HttpParams();
    if (brandUuid) {
      options.params = options.params.set('brand', brandUuid);
    }
    if (storageUuid) {
      options.params = options.params.set('storage', storageUuid);
    }
    return this.http.get<ItemJSON[]>(this.config.apiBaseUrl + '/items/', options).then(
      res => res.map(json => Item.fromJSON(json))
    );
  }

  getItem(uuid: string): Promise<Item> {
    return this.http.get<ItemJSON>(this.config.apiBaseUrl + '/items/' + uuid).then(
      res => Item.fromJSON(res)
    );
  }

  addItem(item: Item): Promise<Item> {
    return this.http.post<ItemJSON>(this.config.apiBaseUrl + '/items', item.toJSON()).then(
      res => Item.fromJSON(res)
    );
  }

  updateItem(item: Item): Promise<Item> {
    return this.http.put<ItemJSON>(this.config.apiBaseUrl + '/items/' + item.uuid, item.toJSON()).then(
      res => Item.fromJSON(res)
    );
  }

  deleteItem(item: Item): Observable<boolean> {
    return this.http.delete(this.config.apiBaseUrl + '/items/' + item.uuid).pipe(
      map(() => true),
      catchError(Errors.handleErrorResponse)
    );
  }
}
