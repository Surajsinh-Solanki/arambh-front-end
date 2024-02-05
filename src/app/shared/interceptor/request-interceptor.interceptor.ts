import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { getFromStorage } from 'src/app/service/storage-service/storage.service';

@Injectable()
export class RequestInterceptorInterceptor implements HttpInterceptor {
  intercept(
    request: HttpRequest<any>,
    next: HttpHandler,
  ): Observable<HttpEvent<any>> {
    const authorization = getFromStorage('authorization');
    const authReq = request.clone({
      headers: request.headers.set('authorization', 'Bearer ' + authorization),
    });
    return next.handle(authReq);
  }
}
