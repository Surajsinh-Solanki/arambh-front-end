import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/service/auth/auth.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss',
})
export class ProfileComponent {
  constructor(
    private formBuilder: FormBuilder,
    private service: AuthService,
    private toast: ToastrService,
  ) {}

  profile: any;

  profileForm: FormGroup = this.formBuilder.group({
    firstName: ['', Validators.required],
    lastName: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    mobileNumber: ['', Validators.required],
    gender: ['', Validators.required],
    billingAddress: this.formBuilder.group({
      address: ['', Validators.required],
      street: ['', Validators.required],
      city: ['', Validators.required],
      state: ['', Validators.required],
      zipCode: ['', [Validators.required, Validators.pattern('^[0-9]*$')]],
    }),
    shippingAddress: this.formBuilder.group({
      address: ['', Validators.required],
      street: ['', Validators.required],
      city: ['', Validators.required],
      state: ['', Validators.required],
      zipCode: ['', [Validators.required, Validators.pattern('^[0-9]*$')]],
    }),
  });

  updateProfile() {
    if (this.profileForm.valid) {
      const {
        firstName,
        lastName,
        gender,
        billingAddress: {
          address: billingAddress,
          street: billingStreet,
          city: billingCity,
          state: billingState,
          zipCode: billingZipCode,
        },
        shippingAddress: {
          address: shippingAddress,
          street: shippingStreet,
          city: shippingCity,
          state: shippingState,
          zipCode: shippingZipCode,
        },
      } = this.profileForm.value;
      const profile = {
        firstName,
        lastName,
        gender,
        billingAddress: {
          address: billingAddress,
          street: billingStreet,
          city: billingCity,
          state: billingState,
          zipCode: billingZipCode,
        },
        shippingAddress: {
          address: shippingAddress,
          street: shippingStreet,
          city: shippingCity,
          state: shippingState,
          zipCode: shippingZipCode,
        },
      };
      this.service.updateUser(profile).subscribe(
        () => {
          this.getProfile();
        },
        (error) => {
          if (error.error.code) {
            this.toast.error(error.error.msg);
          } else {
            this.toast.error('An error occurred. Please try again later.');
          }
        },
      );
    }
  }

  async ngOnInit() {
    this.getProfile();
  }

  getProfile() {
    this.service.GetById().subscribe(
      (res: any) => {
        this.profile = res?.result;
        this.profileForm.patchValue(this.profile);
      },
      (error) => {
        if (error.error.code) {
          this.toast.error(error.error.msg);
        } else {
          this.toast.error('An error occurred. Please try again later.');
        }
      },
    );
  }

  cancel() {
    this.profileForm.patchValue(this.profile);
  }
}
