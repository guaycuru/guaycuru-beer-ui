import { Injectable } from '@angular/core';

export interface ConfigJSON {
  baseHostName: string;
  apiHostName: string;
  apiBaseUrl: string;
  reCaptchaSiteKey: string;
  defaultLanguage: string;
  debug: boolean;
}

// This variable is set globally in config.js
declare var CURRENT_CONFIG: ConfigJSON;

@Injectable({
  providedIn: 'root'
})
export class ConfigService {
  current: ConfigJSON;

  constructor() {
    this.current = CURRENT_CONFIG;
  }

  get apiBaseUrl(): string {
    return this.current.apiBaseUrl;
  }

  get apiHostName(): string {
    return this.current.apiHostName;
  }

  get baseHostName(): string {
    return this.current.baseHostName;
  }

  get defaultLanguage(): string {
    return this.current.defaultLanguage;
  }

  get isDebugEnabled(): boolean {
    return this.current.debug;
  }
}
