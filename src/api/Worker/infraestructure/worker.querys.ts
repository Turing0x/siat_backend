import { IResult } from 'mssql';
import { getConnection } from '../../../database/connection';

export async function WorkersManager(action: string, data?: any) {
  
  const pool = await getConnection();
  if (!pool) {
    throw new Error('Failed to establish a database connection.');
  }

  let query = '';
  let result: IResult<any> | null = null;

  switch (action) {

    case 'all':
      query = 'SELECT * FROM Trabajador;';
      result = await pool.request()
        .query(query);
      break;

    case 'byid':
      query = 'SELECT * FROM Trabajador WHERE id = @id;';
      result = await pool.request()
          .input('id', data!.id)
          .query(query);
      break;

    case 'save':
      query = `Insert into Trabajador (id, name, phone, email, entity, department, charge) values (@id, @name, @phone, @email, @entity, @department, @charge);`;
      result = await pool.request()
        .input('id', data!.id)
        .input('name', data!.name)
        .input('phone', data!.phone)
        .input('email', data!.email)
        .input('entity', data!.entity)
        .input('department', data!.department)
        .input('charge', data!.charge)
        .query(query);
      break;

    case 'update':
      query = 'UPDATE Trabajador SET id = @id, name = @name, phone = @phone, email = @email, entity = @entity, department = @department, charge = @charge WHERE id = @id;';
      result = await pool.request()
        .input('id', data!.id)
        .input('name', data!.name)
        .input('phone', data!.phone)
        .input('email', data!.email)
        .input('entity', data!.entity)
        .input('department', data!.department)
        .input('charge', data!.charge)
        .query(query);
      break;

    case 'delete':
      query = 'DELETE FROM Trabajador WHERE id = @id;';
      result = await pool.request()
        .input('id', data!.id)
        .query(query);
      break;

    case 'aditional':
      query = `SELECT ID, LTRIM(RTRIM(NOMBRE)) AS NOMBRE FROM Entidad; 
               SELECT ID, LTRIM(RTRIM(NOMBRE)) AS NOMBRE FROM Departamentos;`;
      result = await pool.request()
        .query(query);
      break;

  }

  await pool.close();

  if (result === null) {
    throw new Error('No action matched in WorkersManager.');
  }

  return action === 'aditional' ? result.recordsets : result.recordset;
}
