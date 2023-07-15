import { Injectable } from '@angular/core';
import { BehaviorSubject, filter, firstValueFrom, Observable, take } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { ConfigService } from './config.service';
import { AuthHttp } from './http.service';
import { Errors } from '../models/errors.model';
import { User, UserJSON } from '../models/user.model';
import { LocalStorageService } from './local-storage.service';

@Injectable()
export class UserService {
  private currentUserUuid: string;
  private currentUser: BehaviorSubject<User> = new BehaviorSubject<User>(null);

  constructor(private http: AuthHttp, private config: ConfigService, private localStorageService: LocalStorageService) {
    // ToDo: Listen for logout events
    /*this.authService.getLoggedOutObservable().subscribe(() => {
      // Clear the current user
      this.currentUser.next(null);
    });*/
  }

  getCurrentUser(takeOne = true, forceRefresh = false): Observable<User> {
    if (forceRefresh && this.currentUser.getValue()) {
      this.currentUser.next(null);
    }

    if (!this.currentUser.getValue()) {
      void this.refreshCurrentUser();
    }

    // Don't emit null values
    let observable = this.currentUser.asObservable().pipe(
      filter(user => user !== null && user !== undefined)
    );

    if (takeOne) {
      observable = observable.pipe(take(1));
    }

    return observable;
  }

  private async refreshCurrentUser(): Promise<void> {
    try {
      const user = await firstValueFrom(this.getMe());
      this.currentUserUuid = user.uuid;
      this.currentUser.next(user);
    } catch (error) {
      console.warn('Failed to refresh current user', error);
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

  getMe(): Observable<User> {
    return this.getUser('me');
  }

  private setCurrentUser(user: User) {
    if (user !== this.currentUser.getValue()) {
      this.currentUser.next(user);
      if (user) {
        this.localStorageService.setUserUuid(user.uuid);
      } else
        this.localStorageService.clearUserUuid();
    }
  }

}
