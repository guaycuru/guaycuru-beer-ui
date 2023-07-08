import { Injectable } from '@angular/core';
import { HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { ConfigService } from './config.service';
import { AuthHttp } from './http.service';
import { Errors } from '../models/errors.model';
import { Item, ItemJSON } from '../models/item.model';

@Injectable()
export class ItemService {

  constructor(private http: AuthHttp, private config: ConfigService) {
  }

  listItems(): Observable<Item[]> {
    return this.http.get<ItemJSON[]>(this.config.apiBaseUrl + '/items').pipe(
      map(res => res.map(json => Item.fromJSON(json))),
      catchError(Errors.handleErrorResponse)
    );
  }

  getItem(uuid: string): Observable<Item> {
    return this.http.get<ItemJSON>(this.config.apiBaseUrl + '/items/' + uuid).pipe(
      map(res => Item.fromJSON(res)),
      catchError(Errors.handleErrorResponse)
    );
  }

  findItems(brandUuid: string): Observable<Item[]> {
    const options: any = {};
    options.params = new HttpParams();
    if(brandUuid) {
      options.params = options.params.set('brand', brandUuid);
    }
    return this.http.get<ItemJSON[]>(this.config.apiBaseUrl + '/items/', options).pipe(
      map(res => res.map(json => Item.fromJSON(json))),
      catchError(Errors.handleErrorResponse)
    );
  }

  addItem(item: Item): Observable<Item> {
    const body = item.toJSON();
    return this.http.put<ItemJSON>(this.config.apiBaseUrl + '/items', body).pipe(
      map(res => Item.fromJSON(res)),
      catchError(Errors.handleErrorResponse)
    );
  }

  refreshItem(uuid: string, force = false): Observable<Item> {
    const options: any = {};
    options.params = new HttpParams();
    options.params = options.params.set('force', force);
    return this.http.post<ItemJSON>(this.config.apiBaseUrl + '/items/' + uuid, null, options).pipe(
      map(res => Item.fromJSON(res)),
      catchError(Errors.handleErrorResponse)
    );
  }

  deleteItem(item: Item): Observable<boolean> {
    return this.http.delete(this.config.apiBaseUrl + '/items/' + item.uuid).pipe(
      map(res => true),
      catchError(Errors.handleErrorResponse)
    );
  }
}
