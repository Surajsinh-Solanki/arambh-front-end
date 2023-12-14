import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  RouterStateSnapshot,
  Router,
  UrlTree,
} from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  canActivate(
    _next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot,
  ): boolean | UrlTree {
    let url: string = state.url;

    return this.checkLogin(url);
  }
  constructor(private router: Router) {}
  checkLogin(url: string): true | UrlTree {
    let val: string | null = localStorage.getItem('isUserLoggedIn');
    if (val != null && val == 'true') {
      if (url == '/') {
        setTimeout(() => {
          this.router.parseUrl('/');
        }, 1500);
      } else return true;
    } else {
      return this.router.parseUrl('/login');
    }
    return true;
  }
}
