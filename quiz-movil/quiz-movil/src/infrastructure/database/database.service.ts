import { SQLiteDBConnection } from '@capacitor-community/sqlite';
import { DATABASE_NAME, DATABASE_VERSION, sqliteConnection } from './sqlite';

const CREATE_TABLES_SQL = `
  CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    email TEXT NOT NULL
  );

  CREATE TABLE IF NOT EXISTS products (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    price REAL NOT NULL
  );

  CREATE TABLE IF NOT EXISTS persons (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    first_name TEXT NOT NULL,
    last_name TEXT NOT NULL,
    age INTEGER NOT NULL
  );
`;

class DatabaseService {
  private initPromise: Promise<SQLiteDBConnection> | null = null;

  /** Abre la conexión y crea las tablas. Seguro de llamar varias veces. */
  init(): Promise<SQLiteDBConnection> {
    if (!this.initPromise) {
      this.initPromise = this.openAndMigrate().catch((error) => {
        this.initPromise = null; // permite reintentar si falló
        throw error;
      });
    }
    return this.initPromise;
  }

  /** Devuelve la conexión lista para usar (la inicializa si hace falta). */
  getConnection(): Promise<SQLiteDBConnection> {
    return this.init();
  }

  private async openAndMigrate(): Promise<SQLiteDBConnection> {
    const consistency = (await sqliteConnection.checkConnectionsConsistency()).result;
    const exists = (await sqliteConnection.isConnection(DATABASE_NAME, false)).result;

    const db: SQLiteDBConnection =
      consistency && exists
        ? await sqliteConnection.retrieveConnection(DATABASE_NAME, false)
        : await sqliteConnection.createConnection(
            DATABASE_NAME,
            false,
            'no-encryption',
            DATABASE_VERSION,
            false
          );

    await db.open();
    await db.execute(CREATE_TABLES_SQL);
    return db;
  }
}

export const databaseService = new DatabaseService();
