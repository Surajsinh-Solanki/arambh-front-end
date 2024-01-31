import { Component } from '@angular/core';
import { FormArray, FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ProductService } from 'src/app/service/product/product.service';
import { colorName } from '../../global/color-name';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.scss'],
})
export class AddProductComponent {
  constructor(
    private formBuilder: FormBuilder,
    private service: ProductService,
    private toast: ToastrService,
  ) {}

  colorNames: { [key: string]: string } = colorName;
  colorKeys: string[] = Object.keys(colorName);

  selectedFile: File | undefined;
  selectedColor: string = '#ffffff';

  productForm = this.formBuilder.group({
    name: this.formBuilder.control('', [Validators.required]),
    description: this.formBuilder.control('', [Validators.required]),
    category: this.formBuilder.control('', [Validators.required]),
    price: this.formBuilder.control(0, [
      Validators.required,
      Validators.min(0),
    ]),
    brand: this.formBuilder.control('', [Validators.required]),
    gender: this.formBuilder.control('', [Validators.required]),
    color: this.formBuilder.control('', [Validators.required]),
    images: this.formBuilder.array([], [Validators.required]),
    sizeStock: this.formBuilder.array([], [Validators.required]),
    mrp: this.formBuilder.control(0, [Validators.required, Validators.min(0)]),
    gst: this.formBuilder.control('', [Validators.required]),
  });

  async addProduct() {
    if (this.productForm.valid) {
      const formData = new FormData();

      const name: any = this.productForm.value.name;
      const description: any = this.productForm.value.description;
      const category: any = this.productForm.value.category;
      const price: any = this.productForm.value.price;
      const brand: any = this.productForm.value.brand;
      const gender: any = this.productForm.value.gender;
      const color: string = this.selectedColor;
      const mrp: any = this.productForm.value.mrp;
      const gst: any = this.productForm.value.gst;
      // Loop through image files and append them to the form data

      // Add other form fields to the form data
      formData.append('name', name);
      formData.append('description', description);
      formData.append('category', category);
      formData.append('price', price.toString());
      formData.append('brand', brand);
      formData.append('gender', gender);
      formData.append('color', color);
      formData.append('gst', gst);
      formData.append('mrp', mrp);
      for (let i = 0; i < this.images.length; i++) {
        formData.append(`images[${i}]`, this.images.at(i)?.value as File);
      }

      const sizeStockData = this.sizeStock.value.map((sizeStockItem: any) => ({
        size: sizeStockItem.size,
        stock: sizeStockItem.stock,
      }));
      formData.append('sizeStock', JSON.stringify(sizeStockData));

      (await this.service.addProduct(formData)).subscribe(
        () => {
          this.toast.success('Product add Success.');
          this.productForm.reset();
          this.sizeStock.clear();
          this.images.clear();
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

  get sizeStock(): FormArray {
    return this.productForm.get('sizeStock') as FormArray;
  }

  addSizeStock(): void {
    const ssForm = this.formBuilder.group({
      size: ['', Validators.required],
      stock: [0, [Validators.required, Validators.min(0)]],
    });
    this.sizeStock.push(ssForm);
  }

  get images(): FormArray {
    return this.productForm.get('images') as FormArray;
  }

  onImageSelected(event: any): void {
    const files: FileList = event.target.files;
    if (files) {
      const imagesArray = this.productForm.get('images') as FormArray;

      // Remove existing images
      while (imagesArray.length > 0) {
        imagesArray.removeAt(0);
      }

      const images = Array.from(files);

      images.forEach((image: File, index: number) => {
        imagesArray.push(this.formBuilder.control(image));
      });
    }
  }

  removeImage(index: number): void {
    const imagesArray = this.productForm.get('images') as FormArray;
    imagesArray.removeAt(index);
  }

  getImageSrc(file: File): string {
    return URL.createObjectURL(file);
  }

  onColorChange() {
    this.selectedColor = this.productForm.value.color || '#ffffff';
  }
}
