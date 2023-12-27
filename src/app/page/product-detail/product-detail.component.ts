import { Component } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { CartService } from 'src/app/service/product/cart.service';
import { ProductService } from 'src/app/service/product/product.service';
import { RatingService } from 'src/app/service/product/rating.service';
import { Utils } from 'src/app/shared/global/utils';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss'],
})
export class ProductDetailComponent {
  product: any;
  review: any;
  selectedSize: string = 'S';
  quantity: number = 1;

  //rating
  rateBox: any;
  globalValue = '0.0';
  totalReviews = 0;
  average = 0.0;
  reviews: { [key: number]: number } = {
    5: 0,
    4: 0,
    3: 0,
    2: 0,
    1: 0,
  };

  //reviews
  star: number = 0;
  comment: string = '';

  constructor(
    private productService: ProductService,
    private ratingService: RatingService,
    private cartService: CartService,
    private toast: ToastrService,
  ) {}

  ngOnInit() {
    const productId = Utils.getQueryParameter('id');
    if (productId) {
      this.productService.getProductById(productId).subscribe(
        (res: any) => {
          this.product = res?.msg?.result;
          if (this.product._id) {
            this.getProductRating(this.product._id);
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
        switch (rt.rating) {
          case 1:
            this.reviews[1] = this.reviews[1] + 1;
            break;
          case 2:
            this.reviews[2] = this.reviews[2] + 1;
            break;
          case 3:
            this.reviews[3] = this.reviews[3] + 1;
            break;
          case 4:
            this.reviews[4] = this.reviews[4] + 1;
            break;
          case 5:
            this.reviews[5] = this.reviews[5] + 1;
            break;
          default:
            break;
        }
      }
      this.average = totalRatting / rating.length;
      this.globalValue = this.average.toFixed(1);
    }
  }

  getProgressBarColor(rating: number): string {
    switch (rating) {
      case 1:
        return '#ff0000';
      case 2:
        return '#ffff00';
      case 3:
        return '#800080';
      case 4:
        return '#0000FF';
      case 5:
        return '#00ff00';
      default:
        return '#000000';
    }
  }

  getProgressBarWidth(rating: number): string {
    return Math.round((rating / this.totalReviews) * 100).toString();
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
}
