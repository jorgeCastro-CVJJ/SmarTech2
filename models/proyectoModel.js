const db = require("../util/database");
const bcrypt = require("bcryptjs");

module.exports = class Proyecto {
  
  constructor(nombreP, descripcion, estatus, stackTecnologico, stakeholders, idProyecto){
    this.nombreP = nombreP;
    this.descripcion = descripcion;
    this.estatus = estatus;
    this.stackTecnologico = stackTecnologico;
    this.stakeholders = stakeholders;
    this.idProyecto = idProyecto;
  }

  // hacer un nuevo proyecto, insert en la base de datos
  save(){
    return db.execute('INSERT INTO proyecto (nombreP, descripcion, estatus, stackTecnologico, stakeholders) VALUES (?,?,?,?,?)', [this.nombreP, this.descripcion, this.estatus, this.stackTecnologico, this.stakeholders]);
  }

  // jalar todo de la base de datos, 
  static fetchAll() {
    return db.execute('SELECT * FROM proyecto');
  }

  // Obtiene los proyectos "asignados" que tiene el usuario
  static fetchProyectos(idSesion) {
    return db.execute('SELECT DISTINCT nombreP, descripcion, estatus, stackTecnologico, stakeholders FROM proyecto p, trabaja t WHERE p.idProyecto = t.idProyecto AND t.idEmpleado = ? ', [idSesion]) //Tablas: tarea, proyecto, ejecuta
  }

  static fetchOne(idProyecto){
    return db.execute('SELECT * FROM proyecto WHERE idProyecto = ?', [idProyecto]);

  }

  static proyectoMasReciente() {
    return db.execute('SELECT idProyecto FROM proyecto ORDER BY idProyecto DESC limit 1')
  }

  static asignarColaborador(idEmpleado, idProyecto) {
    return db.execute ('INSERT INTO trabaja (idEmpleado, idProyecto) VALUES (?,?)', [idEmpleado, idProyecto]);
  }

  static buscar(valor) {
    return db.execute('SELECT * FROM proyecto WHERE nombreP like ?', ['%' + valor + '%']);
  }
}
