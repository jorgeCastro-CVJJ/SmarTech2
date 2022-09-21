const db = require("../util/database");
const bcrypt = require("bcryptjs");

module.exports = class Proyecto {
  
  constructor(idProyecto, nombreP, estatus, descripcion, stackTecnologico, stakeholders){
    this.idProyecto = idProyecto;
    this.nombreP = nombreP;
    this.descripcion = descripcion;
    this.stackTecnologico = stackTecnologico;
    this.stakeholders = stakeholders;
    this.estatus = estatus;
  }

  // hacer un nuevo proyecto, insert en la base de datos
  save(){
    return db.execute('INSERT INTO proyecto (nombreP, descripcion, stackTecnologico, stakeholders, estatus) VALUES (?,?,?,?,?)', [this.nombreP, this.descripcion, this.stackTecnologico, this.stakeholders, this.estatus]);
  }

  // jalar todo de la base de datos, 
  static fetchAll() {
    return db.execute('SELECT * FROM proyecto');
  }
}
