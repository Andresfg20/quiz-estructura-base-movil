export interface User {
  id: number;
  name: string;
  email: string;
}

export type NewUser = Omit<User, 'id'>;
