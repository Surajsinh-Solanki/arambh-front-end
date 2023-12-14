import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { NAVIGATE_ROUTES } from 'src/app/shared/global/constants';
import { Login } from 'src/app/shared/interface/user.interface';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}

  GetAllUsers() {
    return this.http.get(`${NAVIGATE_ROUTES.AUTH}`);
  }

  GetById(id: string) {
    return this.http.get(`${NAVIGATE_ROUTES.USER_DETAILS}?id=${id}`);
  }

  ProceedRegistration(inputData: any) {
    return this.http.post(NAVIGATE_ROUTES.REGISTER, inputData);
  }

  ProceedLogin(inputData: Login) {
    return this.http.post(NAVIGATE_ROUTES.LOGIN, inputData);
  }
}
