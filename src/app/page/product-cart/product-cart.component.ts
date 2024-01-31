import { Component } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
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

  constructor(
    private cartService: CartService,
    private toast: ToastrService,
  ) {}

  ngOnInit() {
    this.cartService.GetUserCartProduct().subscribe(
      (res: any) => {
        this.cartProducts = res?.result.cartProduct;
        this.count = res?.result.count;
        for (const product of this.cartProducts) {
          this.totalMrp += (product.product.mrp || 0) * product.quantity;
          this.totalPrice += (product.product.price || 0) * product.quantity;
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

  checkout(data: any) {
    this.cartService.checkout(data).subscribe(async (order: any) => {
      this.cartService.createOrder(data).subscribe();
      let checkoutOptions = {
        paymentSessionId: order,
        returnUrl: 'http://localhost:4000/cart',
      };
      cashfree.checkout(checkoutOptions);
    });
  }

  applyPromoCode() {}

  getTotal() {}

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

  updateCartItemQuantity(event: Event, id: string) {
    const newQuantity = (event.target as HTMLInputElement)?.value;
    this.cartService
      .updateCartProduct({ quantity: Utils.toNumber(newQuantity) }, id)
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
}
