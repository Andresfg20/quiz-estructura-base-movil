import { useCallback, useEffect, useState } from 'react';
import { NewPerson, Person } from '../domain/entities/Person';
import { IPersonRepository } from '../domain/repositories/IPersonRepository';

export function usePersons(repository: IPersonRepository) {
  const [persons, setPersons] = useState<Person[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const loadPersons = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      setPersons(await repository.getAll());
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Error al cargar personas');
    } finally {
      setLoading(false);
    }
  }, [repository]);

  const addPerson = useCallback(
    async (newPerson: NewPerson): Promise<boolean> => {
      try {
        setError(null);
        const created = await repository.create(newPerson);
        setPersons((current) => [created, ...current]);
        return true;
      } catch (e) {
        setError(e instanceof Error ? e.message : 'Error al crear persona');
        return false;
      }
    },
    [repository]
  );

  useEffect(() => {
    void loadPersons();
  }, [loadPersons]);

  return { persons, loading, error, addPerson, reload: loadPersons };
}
