import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { NAVIGATE_ROUTES } from 'src/app/shared/global/constants';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  constructor(private http: HttpClient) {}
  getAllProduct(query: Record<string, string>) {
    let params = new HttpParams();

    for (const key in query) {
      if (query.hasOwnProperty(key)) {
        params = params.append(key, query[key]);
      }
    }
    return this.http.get(`${NAVIGATE_ROUTES.PRODUCT}`, { params });
  }

  addProduct(product: any) {
    return this.http.post(`${NAVIGATE_ROUTES.PRODUCT}`, product);
  }

  getProductById(id: string) {
    const query: Record<string, string> = { id: id };
    let params = new HttpParams();

    for (const key in query) {
      if (query.hasOwnProperty(key)) {
        params = params.append(key, query[key]);
      }
    }
    return this.http.get(`${NAVIGATE_ROUTES.PRODUCT}/details`, { params });
  }

  getCategoryCount() {
    return this.http.get(`${NAVIGATE_ROUTES.PRODUCT}/category`);
  }

  getColorCount() {
    return this.http.get(`${NAVIGATE_ROUTES.PRODUCT}/color`);
  }

  getBrandCount() {
    return this.http.get(`${NAVIGATE_ROUTES.PRODUCT}/brand`);
  }
}
