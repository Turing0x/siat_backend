import { IResult } from "mssql";
import { getConnection } from "../../../database/connection";

export async function ConsumptionManager(action: string, data?: any) {
  const pool = await getConnection();
  if (!pool) {
    throw new Error("Failed to establish a database connection.");
  }

  let query = "";
  let result: IResult<any> | null = null;

  switch (action) {
    case "all":
      query = `SELECT 
        LC.[ID],
        LC.[IdAgencia],
        LC.[IdMetroContador],
        LTRIM(RTRIM(MC.[Nombre])) AS NombreContador,
        LC.[Fecha],
        LC.[Madrugada],
        LC.[Dia],
        LC.[Pico],
        LC.[Reactivo],
        LC.[DMax],
        LC.[PicoDiurno],
        MC.[Factor],
        (LC.[Madrugada] + LC.[Dia] + LC.[Pico]) * MC.[Factor] AS ConsumoTotal
      FROM 
        [ADT_EMPRESA].[dbo].[LecturaContador] LC
      INNER JOIN 
        [ADT_EMPRESA].[dbo].[MetroContador] MC ON LC.[IdMetroContador] = MC.[Id]
      WHERE 
        MC.[Activo] = 1
      ORDER BY 
        LC.[Fecha] DESC, LC.[ID] DESC;`;
      result = await pool.request().query(query);
      break;

    case "save":
      query = `Insert into Consumo (id, idAgencia, idMetroContador, nombreContador, fecha, madrugada, dia, pico, reactivo, dMax, picoDiurno, factor, consumoTotal) values (@id, @idAgencia, @idMetroContador, @nombreContador, @fecha, @madrugada, @dia, @pico, @reactivo, @dMax, @picoDiurno, @factor, @consumoTotal);`;
      result = await pool
        .request()
        .input("id", data!.id)
        .input("name", data!.name)
        .input("phone", data!.phone)
        .input("email", data!.email)
        .input("entity", data!.entity)
        .input("department", data!.department)
        .input("charge", data!.charge)
        .query(query);
      break;

    case "update":
      query =
        "UPDATE Consumo SET id = @id, idAgencia = @idAgencia, idMetroContador = @idMetroContador, nombreContador = @nombreContador, fecha = @fecha, madrugada = @madrugada, dia = @dia, pico = @pico, reactivo = @reactivo, dMax = @dMax, picoDiurno = @picoDiurno, factor = @factor, consumoTotal = @consumoTotal WHERE id = @id;";
      result = await pool
        .request()
        .input("id", data!.id)
        .input("name", data!.name)
        .input("phone", data!.phone)
        .input("email", data!.email)
        .input("entity", data!.entity)
        .input("department", data!.department)
        .input("charge", data!.charge)
        .query(query);
      break;

    case "delete":
      query = "DELETE FROM Consumo WHERE id = @id;";
      result = await pool.request().input("id", data!.id).query(query);
      break;
  }

  await pool.close();

  if (result === null) {
    throw new Error("No action matched in WorkersManager.");
  }

  return result.recordset;
}
