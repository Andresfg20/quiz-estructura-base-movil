import { CapacitorSQLite, SQLiteConnection } from '@capacitor-community/sqlite';

export const DATABASE_NAME = 'quiz_movil_db';
export const DATABASE_VERSION = 1;

export const sqliteConnection = new SQLiteConnection(CapacitorSQLite);
