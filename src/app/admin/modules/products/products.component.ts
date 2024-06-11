import { Component } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { ProductService } from 'src/app/service/product/product.service';
import { Utils } from 'src/app/shared/global/utils';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss',
})
export class ProductsComponent {
  currentPage: number = 1;
  itemsPerPage: number = 10;
  products: any;
  productCount: number = 0;
  media_url = environment.MEDIA_URL;
  query: any = {};


  constructor(
    private service: ProductService,
    private toast: ToastrService,
  ) {}

  async ngOnInit() {
    const query = Utils.getAllQueryParameters();
    this.getAllProducts(query);
  }

  async getAllProducts(query: any) {
    query.page = this.currentPage;
    query.limit = this.itemsPerPage;
    (await this.service.getAllProduct(query)).subscribe(
      (res: any) => {
        this.products = res?.result.product;
        this.productCount = res?.result.count;
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

  async onPageChange(pageNumber: number) {
    this.currentPage = pageNumber;
    await this.getAllProducts(this.query);
  }
}
