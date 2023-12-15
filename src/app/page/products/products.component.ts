import { Component } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { ProductService } from 'src/app/service/product/product.service';
import { Utils } from 'src/app/shared/global/utils';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss'],
})
export class ProductsComponent {
  products: any;
  minRange: number = 100;
  maxRange: number = 2000;
  filterObj: any = {};

  constructor(
    private service: ProductService,
    private toast: ToastrService,
  ) {}

  async ngOnInit() {
    const query = Utils.getAllQueryParameters();
    this.getAllProducts(query);
  }

  async getAllProducts(query: any) {
    (await this.service.GetAllProduct(query)).subscribe(
      (res: any) => {
        this.products = res?.msg?.result;
        console.log(this.products);
        this.toast.success('All Products Success.');
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

  priceChange(type: any) {
    console.log(this.minRange);
    console.log(this.maxRange);
    // delete this.filterObj?.minPrice;
    // delete this.filterObj?.maxPrice;
    this.filterObj = {};
    this.filterObj['minPrice'] = this.minRange;
    this.filterObj['maxPrice'] = this.maxRange;
  }
}
