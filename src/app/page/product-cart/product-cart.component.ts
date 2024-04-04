import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/service/auth/auth.service';
import { CartService } from 'src/app/service/product/cart.service';
import { Utils } from 'src/app/shared/global/utils';
declare var Cashfree: any;

const cashfree = Cashfree({
  mode: 'sandbox', //or production   check :::
});

@Component({
  selector: 'app-product-cart',
  templateUrl: './product-cart.component.html',
  styleUrls: ['./product-cart.component.scss'],
})
export class ProductCartComponent {
  cartProducts: any = [];
  count: number = 0;
  totalMrp: number = 0;
  totalPrice: number = 0;
  profile: any = {};

  constructor(
    private formBuilder: FormBuilder,
    private cartService: CartService,
    private toast: ToastrService,
    private authService: AuthService,
  ) {}

  profileForm: FormGroup = this.formBuilder.group({
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

  ngOnInit() {
    this.cartService.GetUserCartProduct().subscribe(
      (res: any) => {
        this.cartProducts = res?.result.cartProduct;
        this.count = res?.result.count;
        for (const product of this.cartProducts) {
          this.totalMrp += (product.product.mrp || 0) * product.quantity;
          this.totalPrice += (product.product.price || 0) * product.quantity;
        }
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

  checkout(data: any) {
    this.cartService.checkout(data).subscribe(async (order: any) => {
      this.cartService.createOrder(data).subscribe();
      this.updateProfile();
      // let checkoutOptions = {
      //   paymentSessionId: order,
      //   returnUrl: 'http://localhost:4000/cart',
      // };
      // cashfree.checkout(checkoutOptions);
    });
  }

  removeCartItem(id: string) {
    this.cartService.deleteCartProduct(id).subscribe(
      (res: any) => {
        if (res?.result?.deletedCount === 1) {
          this.totalMrp = 0;
          this.totalPrice = 0;
          this.ngOnInit();
        }
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

  updateCartItemQuantity(id: string, value: number) {
    if (value < 1) {
      return; // Prevent decreasing quantity below 1
    }
    this.cartService
      .updateCartProduct({ quantity: Utils.toNumber(value) }, id)
      .subscribe(
        (res: any) => {
          this.totalMrp = 0;
          this.totalPrice = 0;
          this.ngOnInit();
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

  getProfile() {
    this.authService.GetById().subscribe(
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

  updateProfile() {
    if (this.profileForm.valid) {
      const {
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
        firstName: this.profile.firstName,
        lastName: this.profile.lastName,
        gender: this.profile.gender,
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
      this.authService.updateUser(profile).subscribe(
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
}
