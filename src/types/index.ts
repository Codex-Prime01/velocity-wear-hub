
export interface Product {
  id: string;
  name: string;
  price: number;
  description: string;
  category: Category;
  images: string[];
  sizes: string[];
  colors: string[];
  isFeatured?: boolean;
  isNew?: boolean;
  rating?: number;
}

export type Category = 'shoes' | 'clothing' | 'accessories';

export interface CartItem {
  product: Product;
  quantity: number;
  selectedSize?: string;
  selectedColor?: string;
}
