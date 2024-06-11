import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SIZES } from 'src/app/shared/global/constants';
import {
  ProductData,
  Variant,
} from 'src/app/shared/interface/product.interface';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrl: './add-product.component.scss',
})
export class AddProductComponent {
  productForm: FormGroup;
  variantForm: FormGroup;
  variants: Variant[] = [];
  tags: string[] = [];
  tagInput: string = '';
  sizes = SIZES;

  constructor(private fb: FormBuilder) {
    this.productForm = this.fb.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      variants: [],
      category: ['', Validators.required],
      brand: ['', Validators.required],
      material: ['', Validators.required],
      tags: [],
    });
    this.variantForm = this.fb.group({
      mrp: ['', Validators.required],
      discounted_price: ['', Validators.required],
      size: ['', Validators.required],
      stock: ['', Validators.required],
      color: ['', Validators.required],
    });
  }

  delelteImage() {
    this.imageUrl = null;
  }
  imageUrl: string | ArrayBuffer | null = null;

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;

    if (input.files && input.files[0]) {
      const file = input.files[0];
      const reader = new FileReader();

      reader.onload = () => {
        this.imageUrl = reader.result;
      };

      reader.readAsDataURL(file);
    }
    console.log(this.imageUrl);
  }

  addTag() {
    const newTag = this.productForm.value.tags.trim();
    if (newTag && !this.tags.includes(newTag)) {
      this.tags.push(newTag);
      this.productForm.patchValue({ tags: this.tags });
    }
  }

  removeTag(tag: string) {
    this.tags = this.tags.filter((t) => t !== tag);
    this.productForm.patchValue({ tags: this.tags });
  }

  addProduct() {
    this.productForm.value.variants = this.variants;
    if (this.productForm.valid) {
      const productData = this.productForm.value;
      productData.tags = this.tags; // Update tags if necessary
      console.log(
        ' >> AddProductComponent >> addProduct >> productData:',
        productData,
      );
    }
  }
  addVariant() {
    if (this.variantForm.valid) {
      this.variants.push(this.variantForm.value);
      this.variantForm.reset();
    }
  }

  removeVariant(index: number) {
    this.variants.splice(index, 1);
  }
}
