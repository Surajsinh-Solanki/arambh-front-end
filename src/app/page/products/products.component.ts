import { Component } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { ProductService } from 'src/app/service/product/product.service';
import { SearchTextService } from 'src/app/service/shared/search-text.service';
import { Utils } from 'src/app/shared/global/utils';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss'],
})
export class ProductsComponent {
  products: any;
  minPrice: number = 100;
  maxPrice: number = 2000;
  selectedColors: string[] = [];
  selectedBrands: string[] = [];
  selectedCategory: string[] = [];
  sortBy: string = '{"createdAt" : -1}';

  constructor(
    private service: ProductService,
    private toast: ToastrService,
    private searchService: SearchTextService,
  ) {}

  async ngOnInit() {
    const query = Utils.getAllQueryParameters();
    this.getAllProducts(query);
    this.searchService.searchText$.subscribe((searchText) => {
      if (searchText.trim() !== '') {
        const query = { searchString: searchText };
        this.getAllProducts(query);
      }
    });
  }

  async getAllProducts(query: any) {
    (await this.service.getAllProduct(query)).subscribe(
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

  toggleBrandSelection(key: string, value: string) {
    if (key === 'brand') {
      if (this.selectedBrands.includes(value)) {
        this.selectedBrands = this.selectedBrands.filter((b) => b !== value);
      } else {
        this.selectedBrands.push(value);
      }
    }
    if (key === 'color') {
      if (this.selectedColors.includes(value)) {
        this.selectedColors = this.selectedColors.filter((b) => b !== value);
      } else {
        this.selectedColors.push(value);
      }
    }
    if (key === 'category') {
      if (this.selectedCategory.includes(value)) {
        this.selectedCategory = this.selectedCategory.filter(
          (b) => b !== value,
        );
      } else {
        this.selectedCategory.push(value);
      }
    }
  }

  async filter() {
    const filter: {
      minPrice: number;
      maxPrice: number;
      color?: string;
      category?: string;
      brand?: string;
      sort?: string;
    } = { minPrice: this.minPrice, maxPrice: this.maxPrice, sort: this.sortBy };
    if (this.selectedColors.length) {
      filter.color = JSON.stringify(this.selectedColors);
    }
    if (this.selectedBrands.length) {
      filter.brand = JSON.stringify(this.selectedBrands);
    }
    if (this.selectedCategory.length) {
      filter.category = JSON.stringify(this.selectedCategory);
    }

    await this.getAllProducts(filter);
  }

  priceChange() {}
}
