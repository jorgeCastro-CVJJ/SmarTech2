const db = require("../util/database");
const bcrypt = require("bcryptjs");

module.exports = class Trabaja {
  
  constructor(fecha, idEmpleado, idProyecto){
    this.fecha = fecha;
    this.idEmpleado = idEmpleado;
    this.idProyecto = idProyecto;
  }

  // hacer un nuevo proyecto, insert en la base de datos
  save(){
    
  }

  static fetchEmpleadosProyecto (idProyecto){
    //return db.execute('SELECT idEmpleado FROM trabaja WHERE idProyecto = ?', [idProyecto]);
    return db.execute('SELECT E.nombre FROM trabaja as T, empleado as E WHERE T.idEmpleado = E.idEmpleado AND idProyecto = ?' , [idProyecto]);
  }
}

// SELECT E.nombre FROM trabaja as T, empleado as E WHERE T.idEmpleado = E.idEmpleado AND idProyecto = ?' , [idProyecto]'