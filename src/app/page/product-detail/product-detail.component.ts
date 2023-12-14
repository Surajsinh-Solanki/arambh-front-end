import { Component } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { CartService } from 'src/app/service/product/cart.service';
import { ProductService } from 'src/app/service/product/product.service';
import { Utils } from 'src/app/shared/global/utils';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss'],
})
export class ProductDetailComponent {
  product: any;
  selectedSize: string = 'S';
  quantity: number = 1;

  constructor(
    private productService: ProductService,
    private cartService: CartService,
    private toast: ToastrService,
  ) {}

  ngOnInit() {
    const productId = Utils.getQueryParameter('id');
    if (productId) {
      this.productService.getProductById(productId).subscribe(
        (res: any) => {
          this.product = res?.msg?.result;
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

  increment() {
    this.quantity++;
    return this.quantity;
  }

  decrement() {
    this.quantity--;
    return this.quantity;
  }

  addToCart() {
    if (this.selectedSize) {
      const productId = this.product._id;
      const size = this.selectedSize;

      this.cartService
        .AddUserCartProduct({
          userId: '655e49e8d5a6426e2e8d2cbd', //check ==>  : update userId,
          productId,
          size: size,
          quantity: this.quantity,
        })
        .subscribe(
          (response) => {
            this.toast.success('Product added successfully');
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
      this.toast.error(
        'Please select size & quantity before adding to the cart.',
      );
    }
  }
}
