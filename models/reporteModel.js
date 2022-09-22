const db = require("../util/database");
const bcrypt = require("bcryptjs");
const { application } = require("express");

module.exports = class Reporte {
  
  constructor(noReporte, proporcion, eficiencia, horasModificadas, horasVacaciones){
    this.noReporte = noReporte;
    this.proporcion = proporcion;
    this.eficiencia = eficiencia;
    this.horasModificadas = horasModificadas;
    this.horasVacaciones = horasVacaciones;
  }
  // hacer un nuevo proyecto, insert en la base de datos
  save(){
    // no hay nada que insertar en tabla proyecto para registrar tarea 
  }

  // jalar todo de la base de datos, 
  static fetchAll() {
    return db.execute('SELECT * FROM reporteFinal');
  }
}