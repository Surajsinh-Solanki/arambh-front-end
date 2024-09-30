import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ProductService } from 'src/app/service/product/product.service';
import { SearchTextService } from 'src/app/service/shared/search-text.service';
import { colorName } from 'src/app/shared/global/color-name';
import { Utils } from 'src/app/shared/global/utils';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss'],
})
export class ProductsComponent {
  media_url = environment.MEDIA_URL;
  query: any = {};
  products: any;
  productCount: number = 0;
  category: any;
  color: any;
  brand: any;
  minPrice: number = 0;
  maxPrice: number = 10000;
  selectedColors: string[] = [];
  selectedBrands: string[] = [];
  selectedCategory: string[] = [];
  sortBy: string = '{"createdAt" : -1}';
  currentPage: number = 1;
  itemsPerPage: number = 12;

  constructor(
    private service: ProductService,
    private toast: ToastrService,
    private searchService: SearchTextService,
    private route: ActivatedRoute,
  ) {}

  async ngOnInit() {
    // const query = Utils.getAllQueryParameters();
    // this.getAllProducts(query);
    this.getCategoryCount();
    this.getColorCount();
    this.getBrandCount();
    //check
    this.route.queryParams.subscribe((params) => {
      this.query['gender'] = params['gender'] || '';
      this.getAllProducts(this.query);
    });
    this.searchService.searchText$.subscribe((searchText) => {
      if (searchText.trim() !== '') {
        this.query['searchString'] = searchText;
        this.getAllProducts(this.query);
      }
    });
  }

  async getAllProducts(query: any) {
    query.page = this.currentPage;
    query.limit = this.itemsPerPage;
    (await this.service.getAllProduct(query)).subscribe(
      (res: any) => {
        this.products = res?.result;
        this.productCount = res?.result.count;
        console.log(this.products);
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

  onSortChange() {
    this.filter();
  }

  async getCategoryCount() {
    (await this.service.getCategoryCount()).subscribe(
      (res: any) => {
        this.category = res?.result;
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

  async getColorCount() {
    (await this.service.getColorCount()).subscribe(
      (res: any) => {
        const colorDataWithNames = res?.result.map((item: { _id: string }) => {
          const name =
            Object.keys(colorName).find((key) => colorName[key] === item._id) ||
            'Unknown';
          return { ...item, name };
        });
        this.color = colorDataWithNames;
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

  async getBrandCount() {
    (await this.service.getBrandCount()).subscribe(
      (res: any) => {
        this.brand = res?.result;
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
      page?: number;
      limit?: number;
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

  async onPageChange(pageNumber: number) {
    this.currentPage = pageNumber;
    await this.getAllProducts(this.query);
  }
}
