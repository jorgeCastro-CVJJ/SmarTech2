const db = require("../util/database");
const bcrypt = require("bcryptjs");

module.exports = class Ejecuta {
  
  constructor(fecha, idEmpleado, idTarea){
    this.fecha = fecha;
    this.idEmpleado = idEmpleado;
    this.idTarea = idTarea;
  }

  // hacer un nuevo proyecto, insert en la base de datos
  save(){
    
  }

  static fetchFechaEmpleado (idTarea){
    //return db.execute('SELECT idEmpleado FROM trabaja WHERE idProyecto = ?', [idProyecto]);
    return db.execute('SELECT EM.nombre, E.fecha FROM ejecuta as E, empleado as EM WHERE E.idEmpleado = EM.idEmpleado AND idTarea = ?', [idTarea]);
  }
}