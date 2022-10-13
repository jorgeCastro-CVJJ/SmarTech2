const db = require("../util/database");
const bcrypt = require("bcryptjs");

module.exports = class Usuario {
  // pla info que se debe tener para crear un usuario y guardarlo en la base de datos
  constructor(nombre, correo, contraseña) {
    this.nombre = nombre;
    this.correo = correo;
    this.password = contraseña;
  }

  save() {
  //return db.execute('INSERT INTO usuarios (username, password, nombre) VALUES (?, ?, ?)', [this.username, this.pasword, this.nombre]);
  return bcrypt.hash(this.password, 12)
    .then((newPassword) => {
        console.log(newPassword);
        return db.execute('INSERT INTO empleado (nombre, correo, contraseña) VALUES (?, ?, ?)', [this.nombre, this.correo, newPassword]);
    }).catch(err => {
        console.log("Error al cifrar el password");
      });
  }

  static fetchOne(correo) {
    return db.execute("SELECT correo, contraseña, nombre, idEmpleado FROM empleado WHERE correo = ?", [correo]);
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

