import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { NAVIGATE_ROUTES } from 'src/app/shared/global/constants';

interface AddReview {
  productId: string;
  rating: number;
  comment?: string;
}

@Injectable({
  providedIn: 'root',
})
export class RatingService {
  constructor(private http: HttpClient) {}

  getAllProductRating(query: Record<string, string>) {
    let params = new HttpParams();

    for (const key in query) {
      if (query.hasOwnProperty(key)) {
        params = params.append(key, query[key]);
      }
    }
    return this.http.get(`${NAVIGATE_ROUTES.REVIEW}`, { params });
  }

  addProductReview(data: AddReview) {
    return this.http.post(`${NAVIGATE_ROUTES.REVIEW}`, data);
  }
}
