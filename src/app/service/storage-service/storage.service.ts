import { Injectable } from '@angular/core';
import { interval, take, takeWhile } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class StorageService {
  setLocalStore(key: string, data: any) {
    return localStorage.setItem(key, data);
  }

  getLocalStore(key: string) {
    return localStorage.getItem(key) || '{}';
  }

  clearLocalStorage(key: string) {
    return localStorage.removeItem(key);
  }

  clearAllLocalStorage() {
    return localStorage.clear();
  }

  decodeJWT(authorization: string) {
    if (authorization) {
      const [_header, payload, _signature] = authorization.split('.');
      return JSON.parse(window.atob(payload));
    }
    return {};
  }

  clearLocalKeyAfterTime(key: string, timeInMilliseconds: number): void {
    // Create an observable that emits at a regular interval
    interval(1000)
      .pipe(
        takeWhile((value) => value * 1000 < timeInMilliseconds),
        take(1),
      )
      .subscribe(() => {
        this.clearLocalStorage(key);
      });
  }

  setSessionStore(key: string, data: any) {
    return sessionStorage.setItem(key, data);
  }

  getSessionStore(key: string) {
    return sessionStorage.getItem(key);
  }

  clearSessionStorage(key: string) {
    return sessionStorage.removeItem(key);
  }

  clearAllSessionStorage() {
    return sessionStorage.clear();
  }

  clearSessionKeyAfterTime(key: string, timeInMilliseconds: number): void {
    // Create an observable that emits at a regular interval
    interval(1000)
      .pipe(
        takeWhile((value) => value * 1000 < timeInMilliseconds),
        take(1),
      )
      .subscribe(() => {
        this.clearSessionStorage(key);
      });
  }
}

export function getFromStorage(key: string): string | null {
  let value: string | null = sessionStorage.getItem(key);

  if (value === null) {
    value = localStorage.getItem(key);
  }

  return value;
}
