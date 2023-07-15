import { Injectable } from '@angular/core';
import { LocalStorageService } from './local-storage.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  // ToDo: Remove
  private static readonly USER_TOKENS: { [key: string]: string } = {
    '8d906da9-1aab-11ee-aab2-3c7c3f299a76': 'af9c4c2d-1aab-11ee-aab2-3c7c3f299a76', // Felipe
    '9be04e2f-1aab-11ee-aab2-3c7c3f299a76': '14e03311-21cc-11ee-88ae-ac1f6bbcd3b3' // Kaue
  }

  constructor(private localStorageService: LocalStorageService) {
  }

  getBearerToken(): string {
    return this.localStorageService.getBearerToken();
  }

  setBearerToken(token: string): void {
    this.localStorageService.setBearerToken(token);
  }

  private clearAuthData(): void {
    this.localStorageService.clearAll();
  }

  loginAs(userUuid: string): void {
    if (AuthService.USER_TOKENS.hasOwnProperty(userUuid)) {
      this.setBearerToken(AuthService.USER_TOKENS[userUuid]);
    }
  }

  logout(): void {
    this.clearAuthData();
  }
}
