import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { ConfigService } from './config.service';
import { AuthHttp } from './http.service';
import { Errors } from '../models/errors.model';
import { Storage, StorageJSON } from '../models/storage.model';

@Injectable()
export class StorageService {

  constructor(private http: AuthHttp, private config: ConfigService) {
  }

  listStorages(): Observable<Storage[]> {
    return this.http.get<StorageJSON[]>(this.config.apiBaseUrl + "/storages").pipe(
      map(res => res.map(json => Storage.fromJSON(json))),
      catchError(Errors.handleErrorResponse)
    );
  }

  getStorage(uuid: string): Observable<Storage> {
    return this.http.get<StorageJSON>(this.config.apiBaseUrl + "/storages/" + uuid).pipe(
      map(res => Storage.fromJSON(res)),
      catchError(Errors.handleErrorResponse)
    );
  }

  addStorage(storage: Storage): Observable<Storage> {
    return this.http.post<StorageJSON>(this.config.apiBaseUrl + "/storages", storage.toJSON()).pipe(
      map(res => Storage.fromJSON(res)),
      catchError(Errors.handleErrorResponse)
    );
  }

  updateStorage(storage: Storage): Observable<Storage> {
    return this.http.put<StorageJSON>(this.config.apiBaseUrl + "/storages/" + storage.uuid, storage.toJSON()).pipe(
      map(res => Storage.fromJSON(res)),
      catchError(Errors.handleErrorResponse)
    );
  }

  deleteStorage(uuid: string): Observable<boolean> {
    return this.http.delete(this.config.apiBaseUrl + '/storages/' + uuid).pipe(
      map(() => true),
      catchError(Errors.handleErrorResponse)
    );
  }
}
