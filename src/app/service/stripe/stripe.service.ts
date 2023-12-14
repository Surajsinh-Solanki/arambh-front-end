import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  Stripe,
  StripeElements,
  StripeElementsOptions,
  StripeCardElementOptions,
  ConfirmCardPaymentData,
  PaymentIntent,
  loadStripe,
} from '@stripe/stripe-js';
import { Observable } from 'rxjs';
import { NAVIGATE_ROUTES } from 'src/app/shared/global/constants';

@Injectable({
  providedIn: 'root',
})
export class StripeService {
  private stripe: Stripe | null = null;
  private elements: StripeElements | null = null;

  constructor(private http: HttpClient) {
    loadStripe(
      'pk_test_51OJgPUGqeTD0FRCsuBbgEnyXc8lS6M1r6xIprvHsZgYsqUzdh0d5snuRVDIqTeKdPpF8PsCBO9IamlV7GODV1OBP00l696cUF5',
    ).then((stripe) => {
      this.stripe = stripe;
      this.elements = stripe!.elements();
    });
  }

  createPaymentIntent(
    amount: number,
    currency: string,
  ): Observable<{ clientSecret: string }> {
    return this.http.post<{ clientSecret: string }>(
      `${NAVIGATE_ROUTES}/create-payment-intent`,
      { amount, currency },
    );
  }

  createCardElement(options?: StripeCardElementOptions): any {
    return this.elements?.create('card', options);
  }

  mountCardElement(element: any, selector: string): void {
    element.mount(selector);
  }

  setupStripeElements(options?: StripeElementsOptions): StripeElements {
    return this.elements!;
  }

  async confirmCardPayment(
    clientSecret: string,
    data: ConfirmCardPaymentData,
  ): Promise<PaymentIntent> {
    const result = await this.stripe!.confirmCardPayment(clientSecret, data);
    if (result.error) {
      throw new Error(result.error.message);
    }
    return result.paymentIntent!;
  }
}
