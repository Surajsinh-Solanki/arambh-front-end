import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class SessionStorageService {
  constructor() {}
  setSessionStore(key: string, data: any) {
    return sessionStorage.setItem(key, data);
  }

  getSessionStore(key: string) {
    return sessionStorage.getItem(key);
  }

  clearStorageFor(key: string) {
    return sessionStorage.removeItem(key);
  }

  clearStorage() {
    return sessionStorage.clear();
  }

  getLoggedInUser(key: any) {
    return JSON.parse(localStorage.getItem(key) || '{}');
  }

  clearStorageOnLogout() {
    this.clearStorage();
  }
}
