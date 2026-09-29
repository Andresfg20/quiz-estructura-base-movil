import { NewUser, User } from '../entities/User';

export interface IUserRepository {
  create(user: NewUser): Promise<User>;
  getAll(): Promise<User[]>;
}
