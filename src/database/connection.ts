import sql, { ConnectionPool } from 'mssql';

const dbSettings: sql.config = {
  user: 'TURING0X',
  password: 'siat.2024',
  server: 'localhost',
  database: 'ADT_EMPRESA',
  options: {
    encrypt: false,
    trustServerCertificate: true
  }
}

export async function getConnection(): Promise<ConnectionPool> {
  try {
    const pool = await sql.connect(dbSettings);

    await pool.request().query(`
      
      IF NOT EXISTS (SELECT * FROM sysobjects WHERE type = 'U' AND name = 'Trabajador')
      BEGIN
        Create Table Trabajador (id varchar(255) primary key, name varchar(255), phone varchar(255), email varchar(255), entity varchar(255), department varchar  (255), charge varchar(255), taxi varchar(255));
      END
      
    `);

    return pool;
  } catch (error) {
    throw new Error('Error connecting to the database');
  }
}