import { NewPerson, Person } from '../../domain/entities/Person';
import { IPersonRepository } from '../../domain/repositories/IPersonRepository';
import { databaseService } from '../database/database.service';

interface PersonRow {
  id: number;
  first_name: string;
  last_name: string;
  age: number;
}

export class PersonRepository implements IPersonRepository {
  async create(person: NewPerson): Promise<Person> {
    const db = await databaseService.getConnection();
    const result = await db.run(
      'INSERT INTO persons (first_name, last_name, age) VALUES (?, ?, ?)',
      [person.firstName, person.lastName, person.age]
    );

    const id = result.changes?.lastId;
    if (id === undefined) {
      throw new Error('No se pudo obtener el id de la persona creada');
    }
    return { id, ...person };
  }

  async getAll(): Promise<Person[]> {
    const db = await databaseService.getConnection();
    const result = await db.query(
      'SELECT id, first_name, last_name, age FROM persons ORDER BY id DESC'
    );
    const rows = (result.values ?? []) as PersonRow[];

    return rows.map((row) => ({
      id: row.id,
      firstName: row.first_name,
      lastName: row.last_name,
      age: row.age,
    }));
  }
}
