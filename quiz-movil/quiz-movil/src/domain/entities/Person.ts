export interface Person {
  id: number;
  firstName: string;
  lastName: string;
  age: number;
}

export type NewPerson = Omit<Person, 'id'>;
