const db = require("../util/database");
const bcrypt = require("bcryptjs");

module.exports = class Proyecto {
  
  constructor(idProyecto, nombreP, estatus, descripcion, stackTecnologico, stakeholders, idEmpleado){
    this.idProyecto = this.idProyecto;
    this.nombreP = nombreP;
    this.estatus = estatus;
    this.descripcion = descripcion;
    this.stackTecnologico = stackTecnologico;
    this.stakeholders = stakeholders;
    this.idEmpleado = idEmpleado;
  }
  // hacer un nuevo proyecto, insert en la base de datos
  save(){
    // no hay nada que insertar en tabla proyecto para registrar tarea 
  }

  // jalar todo de la base de datos, 
  static fetchAll() {
    return db.execute('SELECT * FROM proyecto');
  }
}
