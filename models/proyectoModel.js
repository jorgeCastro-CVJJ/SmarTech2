const db = require("../util/database");
const bcrypt = require("bcryptjs");

module.exports = class Proyecto {
  
  constructor(nombreP, descripcion, estatus, stackTecnologico, stakeholders){
    this.nombreP = nombreP;
    this.descripcion = descripcion;
    this.estatus = estatus;
    this.stackTecnologico = stackTecnologico;
    this.stakeholders = stakeholders;
  }

  // hacer un nuevo proyecto, insert en la base de datos
  save(){
    return db.execute('INSERT INTO proyecto (nombreP, descripcion, estatus, stackTecnologico, stakeholders) VALUES (?,?,?,?,?)', [this.nombreP, this.descripcion, this.estatus, this.stackTecnologico, this.stakeholders]);
  }

  // jalar todo de la base de datos, 
  static fetchAll() {
    return db.execute('SELECT * FROM proyecto');
  }
}
