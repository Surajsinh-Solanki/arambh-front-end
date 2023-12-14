import { Injectable } from "@angular/core";
import {
  ActivatedRouteSnapshot,
  CanActivate,
  RouterStateSnapshot,
  Router,
  UrlTree,
} from "@angular/router";

@Injectable({
  providedIn: "root",
})
export class AntiAuthGuard implements CanActivate {
  canActivate(
    _next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean | UrlTree {
    let url: string = state.url;
    
    return this.checkLogin(url);
  }
  constructor(private router: Router) {}
  checkLogin(url: string): true | UrlTree {
    let val: string | null = localStorage.getItem("isUserLoggedIn");
    if (val == null) {
      this.router.parseUrl("/");
    } else {
      return this.router.parseUrl("/dashboard");
    }
    return true;
  }
}
