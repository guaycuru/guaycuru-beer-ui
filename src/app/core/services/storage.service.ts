import { Injectable } from '@angular/core';
import { ConfigService } from './config.service';
import { AuthHttp } from './http.service';
import { Storage, StorageJSON } from '../models/storage.model';

@Injectable()
export class StorageService {

  constructor(private http: AuthHttp, private config: ConfigService) {
  }

  async listStorages(): Promise<Storage[]> {
    let res = await this.http.get<StorageJSON[]>(this.config.apiBaseUrl + '/storages');
    return res.map(json => Storage.fromJSON(json));
  }

  async getStorage(uuid: string): Promise<Storage> {
    let res = await this.http.get<StorageJSON>(this.config.apiBaseUrl + '/storages/' + uuid);
    return Storage.fromJSON(res);
  }

  async addStorage(storage: Storage): Promise<Storage> {
    let res = await this.http.post<StorageJSON>(this.config.apiBaseUrl + '/storages', storage.toJSON());
    return Storage.fromJSON(res);
  }

  async updateStorage(storage: Storage): Promise<Storage> {
    let res = await this.http.put<StorageJSON>(this.config.apiBaseUrl + '/storages/' + storage.uuid, storage.toJSON());
    return Storage.fromJSON(res);
  }

  async deleteStorage(uuid: string): Promise<boolean> {
    await this.http.delete(this.config.apiBaseUrl + '/storages/' + uuid);
    return true;
  }
}
