import { NewProduct, Product } from '../entities/Product';

export interface IProductRepository {
  create(product: NewProduct): Promise<Product>;
  getAll(): Promise<Product[]>;
}
