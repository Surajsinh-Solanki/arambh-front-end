import { environment } from '../../../environments/environment';
export const NAVIGATE_ROUTES = {
  AUTH: environment.API_URL + 'auth',
  REGISTER: environment.API_URL + 'auth/register',
  LOGIN: environment.API_URL + 'auth/login',
  USER_DETAILS: environment.API_URL + 'auth/user',
  PRODUCT: environment.API_URL + 'product',
  CART: environment.API_URL + 'cart',
};

export const RAZOR_PAY_CONFIG = {
  RAZOR_PAY_FROOGODO_TEXT: 'ARAMBH',
  RAZOR_PAY_CURRENCY: 'INR',
  RAZOR_PAY_DESCRIPTION: 'Test Payment',
};
