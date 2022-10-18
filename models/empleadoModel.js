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

  static getEmpleadosNoRegistrados(idTarea) {
    return db.execute('SELECT E.nombre, E.idEmpleado FROM empleado as E WHERE E.idEmpleado NOT IN (SELECT E.idEmpleado FROM empleado as E, ejecuta as EJ WHERE E.idEmpleado = EJ.idEmpleado AND EJ.idTarea = ?)', [idTarea])
  }

  // Devuelve todos los empleados que no estén registrados en el proyecto dado
  static getEmpleadosNoRegistradosProyectos(idProyecto) {
  return db.execute(`SELECT E.nombre, E.idEmpleado 
  FROM empleado as E 
  WHERE E.idEmpleado 
  NOT IN 
  (SELECT E.idEmpleado 
  FROM empleado as E, trabaja as TR 
  WHERE E.idEmpleado = TR.idEmpleado 
  AND TR.idProyecto = ${idProyecto})`)
}
}