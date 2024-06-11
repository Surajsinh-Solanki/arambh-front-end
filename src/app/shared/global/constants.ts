import { environment } from '../../../environments/environment';
export const NAVIGATE_ROUTES = {
  AUTH: environment.API_URL + 'auth',
  REGISTER: environment.API_URL + 'auth/register',
  LOGIN: environment.API_URL + 'auth/login',
  USER_DETAILS: environment.API_URL + 'auth/user',
  PRODUCT: environment.API_URL + 'product',
  CART: environment.API_URL + 'cart',
  ORDER: environment.API_URL + 'order',
  REVIEW: environment.API_URL + 'review',
};

export const RAZOR_PAY_CONFIG = {
  RAZOR_PAY_FROOGODO_TEXT: 'ARAMBH',
  RAZOR_PAY_CURRENCY: 'INR',
  RAZOR_PAY_DESCRIPTION: 'Test Payment',
};

export const SIZES: string[] = ['XS', 'S', 'M', 'L', 'XL', 'XXL'];

export const GST = (discounted_price: number): number => {
  return discounted_price >= 1000 ? 12 : 5;
};
