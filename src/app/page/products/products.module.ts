import { NgModule } from '@angular/core';
import { ProductComponent } from 'src/app/shared/components/product/product.component';
import { ProductsComponent } from './products.component';
import { ProductDetailComponent } from '../product-detail/product-detail.component';
import { CommonModule } from '@angular/common';
import { ProductRoutingModule } from './products.routing.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [ProductComponent, ProductsComponent, ProductDetailComponent],
  imports: [CommonModule, ProductRoutingModule, SharedModule, FormsModule],
  providers: [],
  exports: [],
})
export class ProductModule {}
