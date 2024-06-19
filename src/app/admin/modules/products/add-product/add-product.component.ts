import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { GST, SIZES } from 'src/app/shared/global/constants';
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
  // variantForm: FormGroup;
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
      mrp: ['', Validators.min(1)],
      discounted_price: ['', Validators.min(1)],
      size: [''],
      stock: [''],
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
      this.productForm.patchValue({ tags: '' });
    }
  }

  removeTag(tag: string) {
    this.tags = this.tags.filter((t) => t !== tag);
  }

  addProduct() {
    this.productForm.patchValue({ variants: this.variants });
    this.productForm.patchValue({ tags: this.tags });
    if (this.productForm.valid) {
      const productData = this.productForm.value;
      console.log(
        '😊 >> AddProductComponent >> addProduct >> productData:',
        productData,
      );
    }
  }
  addVariant() {
    this.variants.push({
      mrp: this.productForm.controls['mrp'].value,
      discounted_price: this.productForm.controls['discounted_price'].value,
      size: this.productForm.controls['size'].value,
      stock: this.productForm.controls['stock'].value,
      gst: GST(this.productForm.controls['discounted_price'].value),
    });
    this.productForm.patchValue({ mrp: '' });
    this.productForm.patchValue({ discounted_price: '' });
    this.productForm.patchValue({ size: '' });
    this.productForm.patchValue({ stock: '' });
  }

  removeVariant(index: number) {
    this.variants.splice(index, 1);
  }

  onTagInputKeydown(event: any) {
    event.preventDefault();
    if (event.key === 'Enter') {
      this.addTag();
    }
  }
}
