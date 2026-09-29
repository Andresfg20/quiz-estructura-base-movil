import { useCallback, useEffect, useState } from 'react';
import { NewUser, User } from '../domain/entities/User';
import { IUserRepository } from '../domain/repositories/IUserRepository';

export function useUsers(repository: IUserRepository) {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const loadUsers = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      setUsers(await repository.getAll());
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Error al cargar usuarios');
    } finally {
      setLoading(false);
    }
  }, [repository]);

  const addUser = useCallback(
    async (newUser: NewUser): Promise<boolean> => {
      try {
        setError(null);
        const created = await repository.create(newUser);
        setUsers((current) => [created, ...current]);
        return true;
      } catch (e) {
        setError(e instanceof Error ? e.message : 'Error al crear usuario');
        return false;
      }
    },
    [repository]
  );

  useEffect(() => {
    void loadUsers();
  }, [loadUsers]);

  return { users, loading, error, addUser, reload: loadUsers };
}
