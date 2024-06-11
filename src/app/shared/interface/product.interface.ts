export interface SizeStock {
  size: string;
  stock: number;
}

export interface Product {
  name: string;
  description: string;
  category: string;
  price: number;
  brand?: string;
  gender?: string;
  color: string;
  sizeStock: SizeStock[];
  imageUrls?: string[];
  createdAt?: Date;
  updatedAt?: Date;
}

export interface Cart {
  userId?: string;
  productId?: string;
  quantity?: number;
  size?: string;
  product?: Product;
}

export interface Variant {
  mrp: number;
  discounted_price: number;
  gst: number;
  size: string;
  stock: number;
  color: string;
}

export interface ProductData {
  name: string;
  discription: string;
  variants: Variant[];
  category: string;
  brand: string;
  material: string;
  tags: string[];
}
