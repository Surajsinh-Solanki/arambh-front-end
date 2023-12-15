import { NgModule } from '@angular/core';
import { ProductsComponent } from './products.component';
import { ProductDetailComponent } from '../product-detail/product-detail.component';
import { CommonModule } from '@angular/common';
import { ProductRoutingModule } from './products.routing.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { FormsModule } from '@angular/forms';
import { MatSliderModule } from '@angular/material/slider';

@NgModule({
  declarations: [ProductsComponent, ProductDetailComponent],
  imports: [
    CommonModule,
    ProductRoutingModule,
    SharedModule,
    FormsModule,
    MatSliderModule,
  ],
  providers: [],
  exports: [],
})
export class ProductModule {}
