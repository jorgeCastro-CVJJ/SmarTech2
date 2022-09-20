const db = require("../util/database");
const bcrypt = require("bcryptjs");

module.exports = class Usuario {
  // pla info que se debe tener para crear un usuario y guardarlo en la base de datos
  constructor(idEmpleado, nombreUsuario, tokenAuth, apellidoM, apellidoP, correo) {
    this.idEmpleado = idEmpleado;
    this.nombre = nombreUsuario;
    this.tokenAuth = tokenAuth;
    this.apellidoM = apellidoM;
    this.apellidoP = apellidoP;
    this.correo = correo;
  }

  static fetchOne(correo) {
    return db.execute("SELECT correo, nombre FROM empleado WHERE correo = ? ", [correo]);
  }

  static fetchPrivilegio(correo) {
    return db.execute(`SELECT E.correo, PR.descripcionPrivilegio
    FROM empleado E, tiene T, roles R, privilegios PR, posee P
    WHERE E.idEmpleado = T.idEmpleado
    AND T.idRol = R.idRol
    AND R.idRol = P.idRol
    AND P.idPrivilegio = PR.idPrivilegio
    AND E.correo = ?`, [correo]);
  }

  static fetchNombre(nombre){
    return db.execute("SELECT nombre FROM empleado");
  }
 
};

