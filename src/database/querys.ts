export default {

  // Queries para la tabla de alcances
  getAllAlcance: "SELECT * FROM Alcance",
  getAlcanceById: "SELECT * FROM Alcance WHERE Id = @Id",
  createNewAlcance: `DECLARE @cant int set @cant = ISNULL((SELECT COUNT(Id) FROM ALCANCE WHERE Id = @Id),0) 
    IF @cant = 0 BEGIN SET @Id = ISNULL((SELECT MAX(Id) + 1 FROM Alcance), 1) 
    INSERT INTO Alcance (Id, Nombre) VALUES (@Id, @Nombre) END`,
  deleteAlcanceById: "DELETE FROM Alcance WHERE Id = @Id",
  updateAlcanceById: "UPDATE Alcance SET Nombre = @Nombre WHERE Id = @Id",

  // Queries para la tabla de usuarios
  getAllUsuarios: "SELECT * FROM Usuario",
  getUsuarioById: "SELECT * FROM Usuario WHERE Id = @Id",
  insertNewUsuario: `DECLARE @cant int set @cant = ISNULL((SELECT COUNT(Id) FROM Usuario WHERE Id = @Id),0) 
    IF @cant = 0 BEGIN SET @Id = ISNULL((SELECT MAX(Id) + 1 FROM Usuario), 1) 
    INSERT INTO Usuario (Id, Nombre, ClaveAcceso, Cargo) VALUES (@Id, @Nombre, @ClaveAcceso, @Cargo) END`,
  updateUsuarioById: "UPDATE Usuario SET Nombre = @Nombre WHERE Id = @Id",

};
