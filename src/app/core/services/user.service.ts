import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { ConfigService } from './config.service';
import { AuthHttp } from './http.service';
import { Errors } from '../models/errors.model';
import { User, UserJSON } from '../models/user.model';
import { LocalStorageService } from './local-storage.service';

@Injectable()
export class UserService {
  private currentUser = new BehaviorSubject<User>(null);

  constructor(private http: AuthHttp, private config: ConfigService, private localStorageService: LocalStorageService) {
    const userUuid = this.localStorageService.getUserUuid();
    if(userUuid) {
      this.refreshCurrentUser(userUuid);
    }
  }

  listUsers(): Observable<User[]> {
    return this.http.get<UserJSON[]>(this.config.apiBaseUrl + "/users").pipe(
      map(res => res.map(json => User.fromJSON(json))),
      catchError(Errors.handleErrorResponse)
    );
  }

  getUser(uuid: string): Observable<User> {
    return this.http.get<UserJSON>(this.config.apiBaseUrl + "/users/" + uuid).pipe(
      map(res => User.fromJSON(res)),
      catchError(Errors.handleErrorResponse)
    );
  }

  getCurrentUser(): Observable<User> {
    return this.currentUser.asObservable();
  }

  private setCurrentUser(user: User) {
    if(user !== this.currentUser.getValue()) {
      this.currentUser.next(user);
      if(user) {
        this.localStorageService.setUserUuid(user.uuid);
      } else
        this.localStorageService.setUserUuid(null);
    }
  }

  refreshCurrentUser(uuid: string) {
    this.getUser(uuid).subscribe(
      user => this.setCurrentUser(user)
    )
  }

}
