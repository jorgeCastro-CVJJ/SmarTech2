const db = require("../util/database");
const bcrypt = require("bcryptjs");
const { application } = require("express");

module.exports = class Empleado {
  
  constructor(idEmpleado, nombre, tokenAuth, apellidoM, apellidoP, correo){
    this.idEmpleado = idEmpleado;
    this.nombreP = nombre;
    this.tokenAuth = tokenAuth;
    this.apellidoM = apellidoM;
    this.apellidoP = apellidoP;
    this.correo = correo;
  }
  // hacer un nuevo proyecto, insert en la base de datos
  save(){
    // no hay nada que insertar en tabla proyecto para registrar tarea 
  }

  // jalar todo de la base de datos, 
  static fetchAll() {
    return db.execute('SELECT * FROM empleado');
  }
}