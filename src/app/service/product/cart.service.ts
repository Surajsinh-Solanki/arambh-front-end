import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { NAVIGATE_ROUTES } from 'src/app/shared/global/constants';
import { Cart } from 'src/app/shared/interface/product.interface';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  constructor(private http: HttpClient) {}

  GetUserCartProduct() {
    return this.http.get(`${NAVIGATE_ROUTES.CART}`);
  }

  AddUserCartProduct(product: Cart) {
    return this.http.post(`${NAVIGATE_ROUTES.CART}`, product);
  }

  checkout(data: any) {
    return this.http.post(`${NAVIGATE_ROUTES.CART}/checkout`, data);
  }

  updateCartProduct(data: Cart, id: string) {
    return this.http.put(`${NAVIGATE_ROUTES.CART}?id=${id}`, data);
  }

  deleteCartProduct(id: string) {
    return this.http.delete(`${NAVIGATE_ROUTES.CART}?id=${id}`);
  }

  createOrder(data: any) {
    return this.http.post(`${NAVIGATE_ROUTES.ORDER}/`, data);
  }
}
