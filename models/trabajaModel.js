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
    return db.execute('SELECT idEmpleado FROM trabaja WHERE idProyecto = ?' , [idProyecto]);
  }
}

