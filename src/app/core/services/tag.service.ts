import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { ConfigService } from './config.service';
import { AuthHttp } from './http.service';
import { Errors } from '../models/errors.model';
import { Tag, TagJSON } from '../models/tag.model';

@Injectable()
export class TagService {

  constructor(private http: AuthHttp, private config: ConfigService) {
  }

  listTags(): Observable<Tag[]> {
    return this.http.get<TagJSON[]>(this.config.apiBaseUrl + "/tags").pipe(
      map(res => res.map(json => Tag.fromJSON(json))),
      catchError(Errors.handleErrorResponse)
    );
  }

  getTag(uuid: string): Observable<Tag> {
    return this.http.get<TagJSON>(this.config.apiBaseUrl + "/tags/" + uuid).pipe(
      map(res => Tag.fromJSON(res)),
      catchError(Errors.handleErrorResponse)
    );
  }

  addTag(tag: Tag): Observable<Tag> {
    return this.http.post<TagJSON>(this.config.apiBaseUrl + "/tags", tag.toJSON()).pipe(
      map(res => Tag.fromJSON(res)),
      catchError(Errors.handleErrorResponse)
    );
  }

  updateTag(tag: Tag): Observable<Tag> {
    return this.http.put<TagJSON>(this.config.apiBaseUrl + "/tags/" + tag.uuid, tag.toJSON()).pipe(
      map(res => Tag.fromJSON(res)),
      catchError(Errors.handleErrorResponse)
    );
  }

  deleteTag(uuid: string): Observable<boolean> {
    return this.http.delete(this.config.apiBaseUrl + '/tags/' + uuid).pipe(
      map(() => true),
      catchError(Errors.handleErrorResponse)
    );
  }
}
