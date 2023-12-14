import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { NAVIGATE_ROUTES } from 'src/app/shared/global/constants';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  constructor(private http: HttpClient) {}
  GetAllProduct(query: Record<string, string>) {
    let params = new HttpParams();

    for (const key in query) {
      if (query.hasOwnProperty(key)) {
        params = params.append(key, query[key]);
      }
    }
    console.log(
      '😊 >> file: product.service.ts:20 >> ProductService >> GetAllProduct >> params:',
      params,
    );
    return this.http.get(`${NAVIGATE_ROUTES.PRODUCT}`, { params });
  }

  addProduct(product: any) {
    return this.http.post(`${NAVIGATE_ROUTES.PRODUCT}`, product);
  }

  getProductById(id: string) {
    return this.http.get(`${NAVIGATE_ROUTES.PRODUCT}/${id}`);
  }
}
