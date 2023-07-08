import { Injectable } from '@angular/core';
import { LocalStorageService } from './local-storage.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private static readonly USER_TOKENS = {
    '9f84099f-5316-11ed-a2eb-3c7c3f299a76': 'cd7205c0-5316-11ed-a2eb-3c7c3f299a76' // Admin
  }

  constructor(private localStorageService: LocalStorageService) {
  }

  getBearerToken(): string {
    return this.localStorageService.getBearerToken();
  }

  setBearerToken(token: string): void {
    this.localStorageService.setBearerToken(token);
  }

  getUserUuid(): string {
    return this.localStorageService.getUserUuid();
  }

  setUserUuid(userUuid: string): void {
    this.localStorageService.setUserUuid(userUuid);
  }

  private clearAuthData(): void {
    this.localStorageService.clearAll();
  }

  loginAs(userUuid: string): void {
    if(AuthService.USER_TOKENS.hasOwnProperty(userUuid)) {
      this.setBearerToken(AuthService.USER_TOKENS[userUuid]);
      this.setUserUuid(userUuid);
    }
  }

  logout(): void {
    this.clearAuthData();
  }
}
