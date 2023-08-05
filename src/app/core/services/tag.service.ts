import { Injectable } from '@angular/core';
import { ConfigService } from './config.service';
import { AuthHttp } from './http.service';
import { Tag, TagJSON } from '../models/tag.model';

@Injectable()
export class TagService {

  constructor(private http: AuthHttp, private config: ConfigService) {
  }

  async listTags(): Promise<Tag[]> {
    let res = await this.http.get<TagJSON[]>(this.config.apiBaseUrl + '/tags');
    return res.map(json => Tag.fromJSON(json));
  }

  async getTag(uuid: string): Promise<Tag> {
    let res = await this.http.get<TagJSON>(this.config.apiBaseUrl + '/tags/' + uuid);
    return Tag.fromJSON(res);
  }

  async addTag(tag: Tag): Promise<Tag> {
    let res = await this.http.post<TagJSON>(this.config.apiBaseUrl + '/tags', tag.toJSON());
    return Tag.fromJSON(res);
  }

  async updateTag(tag: Tag): Promise<Tag> {
    let res = await this.http.put<TagJSON>(this.config.apiBaseUrl + '/tags/' + tag.uuid, tag.toJSON());
    return Tag.fromJSON(res);
  }

  async deleteTag(uuid: string): Promise<boolean> {
    await this.http.delete(this.config.apiBaseUrl + '/tags/' + uuid);
    return true;
  }
}
