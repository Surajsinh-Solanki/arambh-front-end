import { Injectable } from '@angular/core';
import { jwtDecode } from 'jwt-decode';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  RouterStateSnapshot,
  Router,
  UrlTree,
} from '@angular/router';
import { getFromStorage } from 'src/app/service/storage-service/storage.service';

@Injectable({
  providedIn: 'root',
})
export class AdminGuard implements CanActivate {
  canActivate(
    _next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot,
  ): boolean | UrlTree {
    let url: string = state.url;

    return this.checkLogin(url);
  }
  constructor(private router: Router) {}
  checkLogin(url: string): true | UrlTree {
    const token = getFromStorage('authorization');
    let decodedToken: any = '';
    if (token) {
      decodedToken = jwtDecode(token);
    }
    const val = getFromStorage('isUserLoggedIn');
    const admin = decodedToken.isAdmin;
    if (val != null && val == 'true' && admin != null && admin == true) {
      if (url == '/') {
        console.log('hi');
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
