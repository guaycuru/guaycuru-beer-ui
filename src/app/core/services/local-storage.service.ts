import { Injectable } from '@angular/core';

@Injectable()
export class LocalStorageService {
  private static TOKEN_KEY = 'bearerToken';
  private static USER_UUID_KEY = 'userUuid';

  getBearerToken(): string {
    return localStorage.getItem(LocalStorageService.TOKEN_KEY);
  }

  setBearerToken(bearerToken: string): void {
    localStorage.setItem(LocalStorageService.TOKEN_KEY, bearerToken);
  }

  clearBearerToken(): void {
    localStorage.removeItem(LocalStorageService.TOKEN_KEY);
  }

  getUserUuid(): string {
    return localStorage.getItem(LocalStorageService.USER_UUID_KEY);
  }

  setUserUuid(userUuid: string): void {
    localStorage.setItem(LocalStorageService.USER_UUID_KEY, userUuid);
  }

  clearUserUuid(): void {
    localStorage.removeItem(LocalStorageService.USER_UUID_KEY);
  }

  clearAll(): void {
    localStorage.clear();
  }
}
