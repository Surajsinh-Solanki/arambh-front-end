import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CartService } from 'src/app/service/product/cart.service';
import { ProductService } from 'src/app/service/product/product.service';
import { RatingService } from 'src/app/service/product/rating.service';
import { Utils } from 'src/app/shared/global/utils';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss'],
})
export class ProductDetailComponent {
  product: any;
  review: any;
  selectedSize: string = '';
  quantity: number = 0;
  media_url = environment.MEDIA_URL;

  //rating
  globalValue = '0.0';
  totalReviews = 0;
  emptyStarArray: number[] = [];
  fullStarArray: number[] = [];
  hasHalfStar = false;

  //reviews
  star: number = 0;
  comment: string = '';

  constructor(
    private productService: ProductService,
    private ratingService: RatingService,
    private cartService: CartService,
    private toast: ToastrService,
    private router: Router,
  ) {}

  ngOnInit() {
    const productId = Utils.getQueryParameter('id');
    if (productId) {
      this.productService.getProductById(productId).subscribe(
        (res: any) => {
          this.product = res?.result;
          if (this.product._id) {
            this.getProductRating(this.product._id);
            this.selectedSize = this.product.sizeStock[0].size;
            console.log(
              '😊 >> ProductDetailComponent >> ngOnInit >> this.selectedSize:',
              this.selectedSize,
            );
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
  }

  addToCart() {
    if (this.selectedSize) {
      const productId = this.product._id;
      const size = this.selectedSize;

      this.cartService
        .AddUserCartProduct({
          productId,
          size: size,
          quantity: this.quantity,
        })
        .subscribe(
          (response) => {
            this.toast.success('Product added successfully');
            this.router.navigate(['/cart']);
          },
          (error) => {
            if (error.error.code) {
              this.toast.error(error.error.msg);
            } else {
              this.router.navigate(['/login']);
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

  getProductRating(productId: string) {
    this.ratingService
      .getAllProductRating({
        productId: productId,
      })
      .subscribe(
        (res: any) => {
          this.review = res?.result;
          this.updateRating(this.review);
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

  updateRating(rating: Array<any>) {
    if (rating.length > 0) {
      let totalRatting = 0;
      this.totalReviews = rating.length;

      for (const rt of rating) {
        totalRatting += rt.rating;
      }

      const average = totalRatting / rating.length;
      this.globalValue = average.toFixed(1);
      const fullStarCount: number = Math.floor(average); // Number of full stars
      const emptyStarCount: number = Math.floor(5 - average); // Number of empty stars
      this.hasHalfStar = average % 1 !== 0;
      this.fullStarArray = Array(fullStarCount).fill(0);
      this.emptyStarArray = Array(emptyStarCount).fill(0);
    }
  }

  rateStar(selectedStar: number): void {
    this.star = selectedStar;
  }

  addReview(): void {
    this.ratingService
      .addProductReview({
        productId: this.product._id,
        comment: this.comment,
        rating: this.star,
      })
      .subscribe(
        () => {
          this.toast.success('Review added successfully');
          this.comment = '';
          this.star = 0;
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

  selectSize(size: string): void {
    this.selectedSize = size;
  }

  incrementQuantity(): void {
    this.quantity++;
  }

  decrementQuantity(): void {
    if (this.quantity > 0) {
      this.quantity--;
    }
  }
}
