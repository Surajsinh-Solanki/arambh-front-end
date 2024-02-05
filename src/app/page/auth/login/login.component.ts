import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/service/auth/auth.service';
import {
  LocalStorageService,
  SessionStorageService,
} from 'src/app/service/storage-service/storage.service';
import { Login } from 'src/app/shared/interface/user.interface';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  rememberMe: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private toast: ToastrService,
    private service: AuthService,
    private router: Router,
    private localStorage: LocalStorageService,
    private sessionStorage: SessionStorageService,
  ) {}
  loginForm = this.formBuilder.group({
    emailOrMobile: this.formBuilder.control('', [Validators.required]),
    password: this.formBuilder.control('', [Validators.required]),
  });

  proceedLogin() {
    if (this.loginForm.valid) {
      this.service.ProceedLogin(this.loginForm.value as Login).subscribe(
        (res: any) => {
          if (res.result?.token) {
            if (this.rememberMe) {
              this.localStorage.setLocalStore(
                'authorization',
                res.result?.token,
              );
              this.localStorage.setLocalStore('isUserLoggedIn', 'true');
            } else {
              this.sessionStorage.setSessionStore(
                'authorization',
                res.result?.token,
              );
              this.sessionStorage.setSessionStore('isUserLoggedIn', 'true');
            }
          }
          this.toast.success('Login Success.');
          this.router.navigate(['/']);
        },
        (error) => {
          if (error.error.code) {
            this.toast.error(error.error.msg);
          } else {
            this.toast.error('An error occurred. Please try again later.');
          }
        },
      );
    } else {
      this.toast.warning('please enter a valid Data');
    }
  }
}
