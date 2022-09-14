const db = require("../util/database");
const bcrypt = require("bcryptjs");

module.exports = class Proyecto {
  
  constructor(unId, unNombreP, unEstatus, unDescripcion, unStack, unStake, unIdEmpleado){
    this.idProyecto = unId;
    this.nombreP = unNombreP;
    this.estatus = unEstatus;
    this.descripcion = unDescripcion;
    this.stackTecnologico = unStack;
    this.stakeholders = unStake;
    this.idEmpleado = unIdEmpleado;
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
