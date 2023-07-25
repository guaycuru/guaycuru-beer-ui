import { Injectable } from '@angular/core';
import { ConfigService } from './config.service';
import { AuthHttp } from './http.service';
import { Tag, TagJSON } from '../models/tag.model';

@Injectable()
export class TagService {

  constructor(private http: AuthHttp, private config: ConfigService) {
  }

  listTags(): Promise<Tag[]> {
    return this.http.get<TagJSON[]>(this.config.apiBaseUrl + "/tags").then(
      res => res.map(json => Tag.fromJSON(json))
    );
  }

  getTag(uuid: string): Promise<Tag> {
    return this.http.get<TagJSON>(this.config.apiBaseUrl + "/tags/" + uuid).then(
      res => Tag.fromJSON(res)
    );
  }

  addTag(tag: Tag): Promise<Tag> {
    return this.http.post<TagJSON>(this.config.apiBaseUrl + "/tags", tag.toJSON()).then(
      res => Tag.fromJSON(res)
    );
  }

  updateTag(tag: Tag): Promise<Tag> {
    return this.http.put<TagJSON>(this.config.apiBaseUrl + "/tags/" + tag.uuid, tag.toJSON()).then(
      res => Tag.fromJSON(res)
    );
  }

  deleteTag(uuid: string): Promise<boolean> {
    return this.http.delete(this.config.apiBaseUrl + '/tags/' + uuid).then(
      () => true
    );
  }
}
