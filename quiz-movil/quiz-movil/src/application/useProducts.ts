import { useCallback, useEffect, useState } from 'react';
import { NewProduct, Product } from '../domain/entities/Product';
import { IProductRepository } from '../domain/repositories/IProductRepository';

export function useProducts(repository: IProductRepository) {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const loadProducts = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      setProducts(await repository.getAll());
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Error al cargar productos');
    } finally {
      setLoading(false);
    }
  }, [repository]);

  const addProduct = useCallback(
    async (newProduct: NewProduct): Promise<boolean> => {
      try {
        setError(null);
        const created = await repository.create(newProduct);
        setProducts((current) => [created, ...current]);
        return true;
      } catch (e) {
        setError(e instanceof Error ? e.message : 'Error al crear producto');
        return false;
      }
    },
    [repository]
  );

  useEffect(() => {
    void loadProducts();
  }, [loadProducts]);

  return { products, loading, error, addProduct, reload: loadProducts };
}
