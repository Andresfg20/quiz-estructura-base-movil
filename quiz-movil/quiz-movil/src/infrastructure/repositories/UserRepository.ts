import { NewUser, User } from '../../domain/entities/User';
import { IUserRepository } from '../../domain/repositories/IUserRepository';
import { databaseService } from '../database/database.service';

interface UserRow {
  id: number;
  name: string;
  email: string;
}

export class UserRepository implements IUserRepository {
  async create(user: NewUser): Promise<User> {
    const db = await databaseService.getConnection();
    const result = await db.run(
      'INSERT INTO users (name, email) VALUES (?, ?)',
      [user.name, user.email]
    );

    const id = result.changes?.lastId;
    if (id === undefined) {
      throw new Error('No se pudo obtener el id del usuario creado');
    }
    return { id, ...user };
  }

  async getAll(): Promise<User[]> {
    const db = await databaseService.getConnection();
    const result = await db.query('SELECT id, name, email FROM users ORDER BY id DESC');
    const rows = (result.values ?? []) as UserRow[];

    return rows.map((row) => ({
      id: row.id,
      name: row.name,
      email: row.email,
    }));
  }
}
