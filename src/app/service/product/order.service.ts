import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { NAVIGATE_ROUTES } from 'src/app/shared/global/constants';

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  constructor(private http: HttpClient) {}

  GetUserProductOrder() {
    return this.http.get(`${NAVIGATE_ROUTES.ORDER}`);
  }

  cancelProductOrder(id: string) {
    return this.http.put(`${NAVIGATE_ROUTES.ORDER}?id=${id}`, {});
  }
}
