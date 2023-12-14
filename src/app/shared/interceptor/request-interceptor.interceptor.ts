import { Injectable } from "@angular/core";
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from "@angular/common/http";
import { Observable } from "rxjs";
import { LocalStorageService } from "src/app/service/storage-service/local-storage.service";

@Injectable()
export class RequestInterceptorInterceptor implements HttpInterceptor {
  constructor(private localStorageService: LocalStorageService) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const authorization =
      this.localStorageService.getLocalStore("authorization");
    const authReq = request.clone({
      headers: request.headers.set("authorization", "Bearer " + authorization),
    });
    return next.handle(authReq);
  }
}
