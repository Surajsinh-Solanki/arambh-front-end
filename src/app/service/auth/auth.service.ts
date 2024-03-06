import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { NAVIGATE_ROUTES } from 'src/app/shared/global/constants';
import { Login, Profile } from 'src/app/shared/interface/user.interface';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}

  GetAllUsers() {
    return this.http.get(`${NAVIGATE_ROUTES.AUTH}`);
  }

  GetById() {
    return this.http.get(`${NAVIGATE_ROUTES.USER_DETAILS}`);
  }

  ProceedRegistration(inputData: any) {
    return this.http.post(NAVIGATE_ROUTES.REGISTER, inputData);
  }

  ProceedLogin(inputData: Login) {
    return this.http.post(NAVIGATE_ROUTES.LOGIN, inputData);
  }

  updateUser(data: Profile) {
    return this.http.put(`${NAVIGATE_ROUTES.USER_DETAILS}`, data);
  }
}
