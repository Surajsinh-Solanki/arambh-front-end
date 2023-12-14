import { Injectable } from '@angular/core';
// import * as localforage from "localforage";
import { interval, take, takeWhile } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LocalStorageService {
  setLocalStore(key: string, data: any) {
    return localStorage.setItem(key, data);
  }

  getLocalStore(key: string) {
    return localStorage.getItem(key) || '{}';
  }

  clearStorageFor(key: string) {
    return localStorage.removeItem(key);
  }

  clearStorage() {
    return localStorage.clear();
  }

  getLoggedInUser(key: any) {
    return JSON.parse(localStorage.getItem(key) || '{}');
  }

  setData(key: any, value: any) {
    return localStorage.setItem(key, value);
  }

  getData(key: any) {
    return localStorage.getItem(key);
  }

  clearStorageOnLogout() {
    this.clearStorage();
    this.clearStorageFor('userDetails');
    this.clearStorageFor('token');
    this.clearStorageFor('currentCompany');
    this.clearStorageFor('sort');
    this.clearStorageFor('status');
    this.clearStorageFor('filter');
    this.clearStorageFor('date');
  }

  // store particular key details
  // async setDataInIndexedDB(key: string, value: any) {
  //   try {
  //     await localforage.setItem(key, JSON.stringify(value));
  //   } catch {}
  // }

  // fetch particular key details
  // async getDataFromIndexedDB(key: string) {
  //   return new Promise((resolve, reject) => {
  //     localforage
  //       .getItem(key)
  //       .then((result: any) => {
  //         resolve(JSON.parse(result));
  //       })
  //       .catch((err) => {
  //         reject(err);
  //       });
  //   });
  // }

  // For Remove Particular Field/Key
  // removeDataFromIndexedDB(key: string) {
  //   return new Promise((resolve, reject) => {
  //     localforage
  //       .removeItem(key)
  //       .then(() => {
  //         const remove = "Key Removed";
  //         return resolve(remove);
  //       })
  //       .catch((err) => {
  //         return reject(err);
  //       });
  //   });
  // }

  // Database has been entirely deleted.
  // clearDataFromIndexedDB() {
  //   return localforage.clear();
  // }

  // clearRequiredDataFromIndexedDB() {
  //   return new Promise(async (resolve) => {
  //     await localforage.removeItem("token");
  //     await localforage.removeItem("email");
  //     await localforage.removeItem("userimagepath");
  //     await localforage.removeItem("companyId");
  //     await localforage.removeItem("updateState");
  //     await localforage.removeItem("username");
  //     await localforage.removeItem("selectedCompanyId");
  //     await localforage.removeItem("selectedCompanyName");
  //     await localforage.removeItem("selectedProject");
  //     await localforage.removeItem("projectDefaultView");
  //     await localforage.removeItem("dmstab");
  //     await localforage.removeItem("userRolePermission");
  //     await localforage.removeItem("loginUserData");
  //     await localforage.removeItem("selectedCompanyData");
  //     resolve(true);
  //   });
  // }

  decodeJWT(authorization: string) {
    if (authorization) {
      const [_header, payload, _signature] = authorization.split('.');
      return JSON.parse(window.atob(payload));
    }
    return {};
  }

  constructor() {}
  clearKeyAfterTime(key: string, timeInMilliseconds: number): void {
    // Create an observable that emits at a regular interval
    interval(1000)
      .pipe(
        takeWhile((value) => value * 1000 < timeInMilliseconds),
        take(1),
      )
      .subscribe(() => {
        this.clearLocalStorageKey(key);
      });
  }
  private clearLocalStorageKey(key: string): void {
    localStorage.removeItem(key);
  }
}
