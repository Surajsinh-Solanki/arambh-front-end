import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { ProductService } from 'src/app/service/product/product.service';
import { Utils } from '../../global/utils';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss'],
})
export class ProductComponent implements OnInit {
  products: any;

  constructor(
    private service: ProductService,
    private toast: ToastrService,
  ) {}

  async ngOnInit() {
    const query = Utils.getAllQueryParameters();
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
}
