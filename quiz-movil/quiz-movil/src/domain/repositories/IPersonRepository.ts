import { NewPerson, Person } from '../entities/Person';

export interface IPersonRepository {
  create(person: NewPerson): Promise<Person>;
  getAll(): Promise<Person[]>;
}
