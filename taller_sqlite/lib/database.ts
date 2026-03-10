import * as SQLite from 'expo-sqlite';

const db = SQLite.openDatabaseSync('app.db');

interface Program {
  id: number;
  name: string;
  description: string;
}

interface Student {
  id: number;
  name: string;
  program_id: number;
}

export const initDatabase = async () => {
  await db.execAsync(`
    CREATE TABLE IF NOT EXISTS programs (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      description TEXT
    );
    CREATE TABLE IF NOT EXISTS students (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      program_id INTEGER NOT NULL,
      FOREIGN KEY (program_id) REFERENCES programs(id)
    );
  `);
};

export const getPrograms = async (): Promise<Program[]> => {
  const result = await db.getAllAsync<Program>('SELECT * FROM programs');
  return result;
};

export const getProgram = async (id: number): Promise<Program> => {
  const result = await db.getAllAsync<Program>('SELECT * FROM programs WHERE id = ?', id);
  return result[0];
};

export const addProgram = async (name: string, description: string) => {
  await db.runAsync('INSERT INTO programs (name, description) VALUES (?, ?)', name, description);
};

export const updateProgram = async (id: number, name: string, description: string) => {
  await db.runAsync('UPDATE programs SET name = ?, description = ? WHERE id = ?', name, description, id);
};

export const deleteProgram = async (id: number) => {
  const students = await db.getAllAsync<{count: number}>('SELECT COUNT(*) as count FROM students WHERE program_id = ?', id);
  if (students[0].count > 0) {
    throw new Error('No se puede eliminar el programa porque tiene estudiantes');
  }
  await db.runAsync('DELETE FROM programs WHERE id = ?', id);
};

export const getStudentsByProgram = async (programId: number): Promise<Student[]> => {
  const result = await db.getAllAsync<Student>('SELECT * FROM students WHERE program_id = ?', programId);
  return result;
};

export const addStudent = async (name: string, programId: number) => {
  await db.runAsync('INSERT INTO students (name, program_id) VALUES (?, ?)', name, programId);
};

export const updateStudent = async (id: number, name: string) => {
  await db.runAsync('UPDATE students SET name = ? WHERE id = ?', name, id);
};

export const deleteStudent = async (id: number) => {
  await db.runAsync('DELETE FROM students WHERE id = ?', id);
};

export const getStudent = async (id: number): Promise<Student> => {
  const result = await db.getAllAsync<Student>('SELECT * FROM students WHERE id = ?', id);
  return result[0];
};