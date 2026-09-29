import { NewProduct, Product } from '../../domain/entities/Product';
import { IProductRepository } from '../../domain/repositories/IProductRepository';
import { databaseService } from '../database/database.service';

interface ProductRow {
  id: number;
  name: string;
  price: number;
}

export class ProductRepository implements IProductRepository {
  async create(product: NewProduct): Promise<Product> {
    const db = await databaseService.getConnection();
    const result = await db.run(
      'INSERT INTO products (name, price) VALUES (?, ?)',
      [product.name, product.price]
    );

    const id = result.changes?.lastId;
    if (id === undefined) {
      throw new Error('No se pudo obtener el id del producto creado');
    }
    return { id, ...product };
  }

  async getAll(): Promise<Product[]> {
    const db = await databaseService.getConnection();
    const result = await db.query('SELECT id, name, price FROM products ORDER BY id DESC');
    const rows = (result.values ?? []) as ProductRow[];

    return rows.map((row) => ({
      id: row.id,
      name: row.name,
      price: row.price,
    }));
  }
}
