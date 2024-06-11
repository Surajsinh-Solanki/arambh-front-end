import { Component, Input } from '@angular/core';
import { SIZES, GST } from '../../../shared/global/constants';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { Variant } from 'src/app/shared/interface/product.interface';

@Component({
  selector: 'app-product-variants',
  templateUrl: './product-variants.component.html',
  styleUrl: './product-variants.component.scss',
})
export class ProductVariantsComponent {
  @Input() variants: Variant[] = [];

  sizes = SIZES;

  variantForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.variantForm = this.fb.group({
      mrp: ['', Validators.required],
      discounted_price: ['', Validators.required],
      size: ['', Validators.required],
      stock: ['', Validators.required],
      color: ['', Validators.required],
    });
  }

  addVariant() {
    if (this.variantForm.valid) {
      const data : Variant[] = [];
      this.variantForm.value.gst = GST(this.variantForm.value.discounted_price);
      this.variants.push(this.variantForm.value);
      this.variantForm.reset();
    }
  }

  removeVariant(index: number) {
    this.variants.splice(index, 1);
  }
}
