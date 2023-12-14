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
