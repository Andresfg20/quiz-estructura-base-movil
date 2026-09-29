export interface Product {
  id: number;
  name: string;
  price: number;
}

export type NewProduct = Omit<Product, 'id'>;
