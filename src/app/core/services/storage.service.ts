import { Injectable } from '@angular/core';
import { ConfigService } from './config.service';
import { AuthHttp } from './http.service';
import { Storage, StorageJSON } from '../models/storage.model';

@Injectable()
export class StorageService {

  constructor(private http: AuthHttp, private config: ConfigService) {
  }

  listStorages(): Promise<Storage[]> {
    return this.http.get<StorageJSON[]>(this.config.apiBaseUrl + "/storages").then(
      res => res.map(json => Storage.fromJSON(json))
    );
  }

  getStorage(uuid: string): Promise<Storage> {
    return this.http.get<StorageJSON>(this.config.apiBaseUrl + "/storages/" + uuid).then(
      res => Storage.fromJSON(res)
    );
  }

  addStorage(storage: Storage): Promise<Storage> {
    return this.http.post<StorageJSON>(this.config.apiBaseUrl + "/storages", storage.toJSON()).then(
      res => Storage.fromJSON(res)
    );
  }

  updateStorage(storage: Storage): Promise<Storage> {
    return this.http.put<StorageJSON>(this.config.apiBaseUrl + "/storages/" + storage.uuid, storage.toJSON()).then(
      res => Storage.fromJSON(res)
    );
  }

  deleteStorage(uuid: string): Promise<boolean> {
    return this.http.delete(this.config.apiBaseUrl + '/storages/' + uuid).then(
      () => true
    );
  }
}
