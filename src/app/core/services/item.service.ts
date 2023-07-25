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
  constructor(private http: AuthHttp, private config: ConfigService) {}

  listItems(): Observable<Item[]> {
    return this.http.get<ItemJSON[]>(this.config.apiBaseUrl + '/items').pipe(
      map(res => res.map(json => Item.fromJSON(json))),
      catchError(Errors.handleErrorResponse)
    );
  }

  findItems(brandUuid: string, storageUuid: string): Observable<Item[]> {
    const options: any = {};
    options.params = new HttpParams();
    if (brandUuid) {
      options.params = options.params.set('brand', brandUuid);
    }
    if (storageUuid) {
      options.params = options.params.set('storage', storageUuid);
    }
    return this.http
      .get<ItemJSON[]>(this.config.apiBaseUrl + '/items/', options)
      .pipe(
        map(res => res.map(json => Item.fromJSON(json))),
        catchError(Errors.handleErrorResponse)
      );
  }

  getItem(uuid: string): Observable<Item> {
    return this.http
      .get<ItemJSON>(this.config.apiBaseUrl + '/items/' + uuid)
      .pipe(
        map(res => Item.fromJSON(res)),
        catchError(Errors.handleErrorResponse)
      );
  }

  addItem(item: Item): Observable<Item> {
    return this.http
      .post<ItemJSON>(this.config.apiBaseUrl + '/items', item.toJSON())
      .pipe(
        map(res => Item.fromJSON(res)),
        catchError(Errors.handleErrorResponse)
      );
  }

  updateItem(item: Item): Observable<Item> {
    return this.http
      .put<ItemJSON>(
        this.config.apiBaseUrl + '/items/' + item.uuid,
        item.toJSON()
      )
      .pipe(
        map(res => Item.fromJSON(res)),
        catchError(Errors.handleErrorResponse)
      );
  }

  /* updateItem(
    item: Item,
    quantityToReduce: number = 0,
    quantityToAdd: number = 0
  ): Observable<Item> {
    // Modifica a quantidade do item localmente
    item.quantity -= quantityToReduce;
    item.quantity += quantityToAdd;

    return this.http
      .put<ItemJSON>(
        `${this.config.apiBaseUrl}/items/${item.uuid}`,
        item.toJSON()
      )
      .pipe(
        map(res => Item.fromJSON(res)),
        catchError(Errors.handleErrorResponse)
      );
  } */

  deleteItem(item: Item): Observable<boolean> {
    return this.http
      .delete(this.config.apiBaseUrl + '/items/' + item.uuid)
      .pipe(
        map(() => true),
        catchError(Errors.handleErrorResponse)
      );
  }
}
