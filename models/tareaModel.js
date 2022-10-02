const db = require("../util/database");
const bcrypt = require("bcryptjs");

module.exports = class Tarea {
  constructor(nombreT, horasTrabajo, idProyecto, idTarea) {
    this.nombreT = nombreT;
    this.horasRegistradas = horasTrabajo;
    this.idProyecto = idProyecto;
    this.idTarea = idTarea;
  }

  save(){
    return db.execute('INSERT INTO tarea (nombreT, horasTrabajo, idProyecto) VALUES (?,?,?)', [this.nombreT, this.horasRegistradas, this.idProyecto]);

  }

  static fetchTareas() {
    return db.execute('SELECT DISTINCT nombreP, nombreT, fecha, horasTrabajo FROM tarea T, proyecto P, ejecuta E, empleado Em WHERE T.idProyecto = P.idProyecto AND T.idTarea = E.idTarea AND E.idEmpleado = Em.idEmpleado AND E.idEmpleado = ?', [idSesion]) //Tablas: tarea, proyecto, ejecuta
  }
  
  
//De tarea: idTarea, nombreT, horasTrabajo, idProyecto
//De proyecto: idProyecto, nombreP, descripcion, stack, stake, estatus
//De ejecuta: fecha, idEmpleado, idTarea
//Empleado: nombre, idEmpleado

  static fetchAll() {
    return db.execute('SELECT * FROM tarea');
  }

  static fetchOne(idProyecto) {
    return db.execute('SELECT P.nombreP, T.nombreT, EJ.fecha, T.horasTrabajo, E.nombre FROM tarea as T, ejecuta as EJ, empleado as E, proyecto as P WHERE T.idTarea = EJ.idTarea AND E.idEmpleado = EJ.idEmpleado AND P.idProyecto = T.idProyecto AND T.idProyecto = ?', [idProyecto])
  }  

  static tareaMasReciente() {
    return db.execute(`SELECT idTarea FROM tarea ORDER BY idTarea DESC limit 1`)
  }

  static colaboradorDeTarea(tareaReciente) {
    return db.execute('SELECT idEmpleado FROM ejecuta WHERE idTarea  = ?', [tareaReciente]);
  }

  static asignarColaborador(idEmpleado, idTarea) {
    return db.execute('INSERT INTO ejecuta (idEmpleado, idTarea) VALUES (?,?)', [idEmpleado, idTarea]);
  }

  static buscar(idSesion, fechaInicio, fechaFin) {
    return db.execute('SELECT DISTINCT nombreP, nombreT, fecha, horasTrabajo FROM tarea T, proyecto P, ejecuta E, empleado Em WHERE T.idProyecto = P.idProyecto AND T.idTarea = E.idTarea AND E.idEmpleado = Em.idEmpleado AND E.idEmpleado = ? AND fecha BETWEEN ? AND ?', [idSesion, fechaInicio, fechaFin]);
  }
};

