import * as SQLite from "expo-sqlite";

const db = SQLite.openDatabaseSync("universidad.db");

const exec = async (sql: string, params: any[] = []) => {
  const result = await db.getAllAsync(sql, params);
  return { rows: result };
};

export const initDB = async () => {
  await db.execAsync(
    `CREATE TABLE IF NOT EXISTS programas (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      codigo TEXT,
      nombre TEXT
    );`
  );
  await db.execAsync(
    `CREATE TABLE IF NOT EXISTS estudiantes (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      codigo TEXT,
      nombre TEXT,
      email TEXT,
      programa_id INTEGER
    );`
  );
  // Limpiar estudiantes para dejar solo programas
  await db.execAsync("DELETE FROM estudiantes");
};

export const insertarProgramasIfEmpty = async () => {
  const res = await db.getAllAsync("SELECT COUNT(*) as cnt FROM programas");
  const count = (res[0] as { cnt: number })?.cnt ?? 0;
  if (count === 0) {
    await db.execAsync(
      `INSERT INTO programas (codigo,nombre) VALUES
      ('SIS','Ingeniería de Sistemas'),
      ('ADM','Administración'),
      ('CON','Contaduría'),
      ('DER','Derecho'),
      ('MED','Medicina');`
    );
  }
};

export const getProgramas = async (): Promise<Array<{id: number, codigo: string, nombre: string}>> => {
  return await db.getAllAsync("SELECT * FROM programas ORDER BY nombre");
};

export const addPrograma = async (codigo: string, nombre: string) => {
  console.log('Adding programa:', codigo, nombre);
  await db.runAsync("INSERT INTO programas (codigo,nombre) VALUES (?,?)", [
    codigo,
    nombre,
  ]);
  console.log('Programa added');
};

export const addEstudiante = async (
  codigo: string,
  nombre: string,
  email: string,
  programa_id: number
) => {
  await db.runAsync(
    "INSERT INTO estudiantes (codigo,nombre,email,programa_id) VALUES (?,?,?,?)",
    [codigo, nombre, email, programa_id]
  );
};

export const getEstudiantes = async (): Promise<Array<{id: number, codigo: string, nombre: string, email: string, programa_id: number, programa_nombre?: string}>> => {
  // join to get program name
  return await db.getAllAsync(
    `SELECT e.id, e.codigo, e.nombre, e.email, e.programa_id, p.nombre as programa_nombre
     FROM estudiantes e
     LEFT JOIN programas p ON e.programa_id = p.id
     ORDER BY e.nombre`
  );
};