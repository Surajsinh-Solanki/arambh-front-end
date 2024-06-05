import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/service/auth/auth.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss'],
})
export class RegistrationComponent {
  showPassword: boolean = false;
  constructor(
    private formBuilder: FormBuilder,
    private toast: ToastrService,
    private service: AuthService,
    private router: Router,
  ) {}
  registrationForm = this.formBuilder.group({
    firstName: this.formBuilder.control(
      '',
      Validators.compose([Validators.required]),
    ),
    lastName: this.formBuilder.control(
      '',
      Validators.compose([Validators.required]),
    ),
    email: this.formBuilder.control(
      '',
      Validators.compose([Validators.required]),
    ),
    password: this.formBuilder.control(
      '',
      Validators.compose([
        Validators.required,
        Validators.pattern(
          /^(?=.{8,15})(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%^!&*+=~`*]).*$/,
        ),
      ]),
    ),
  });

  proceedRegistration() {
    if (this.registrationForm.valid) {
      this.service
        .ProceedRegistration(this.registrationForm.value)
        .subscribe(() => {
          this.toast.success('Registration Success.');
          this.router.navigate(['/login']);
        });
    } else {
      this.toast.warning('please enter a valid Data');
    }
  }
  
  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }
}
