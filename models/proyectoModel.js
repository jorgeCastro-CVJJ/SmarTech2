const db = require("../util/database");

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

  static fetchProyectosNoPausados(idSesion) {
    return db.execute(`SELECT DISTINCT p.idProyecto, nombreP, descripcion, estatus, stackTecnologico, stakeholders 
    FROM proyecto p, trabaja t 
    WHERE p.idProyecto = t.idProyecto 
    AND t.idEmpleado = ${idSesion}
    AND p.estatus != "Pausado"`) //Tablas: tarea, proyecto, ejecuta
  }
  
  // Obtiene los proyectos "asignados" que tiene el usuario
  static fetchProyectos(idSesion) {
    return db.execute(`SELECT DISTINCT p.idProyecto, nombreP, descripcion, estatus, stackTecnologico, stakeholders 
    FROM proyecto p, trabaja t 
    WHERE p.idProyecto = t.idProyecto 
    AND t.idEmpleado = ${idSesion}`) //Tablas: tarea, proyecto, ejecuta
  }

static fetchNotMyProyectos(idSesion) {
  return db.execute(`SELECT DISTINCT t.idProyecto, nombreP, descripcion, estatus, stackTecnologico, stakeholders 
  FROM proyecto p, trabaja t 
  WHERE p.idProyecto = t.idProyecto 
  AND t.idEmpleado <> ?;`, [idSesion])
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

static getTareas(idProyecto) {
  return db.execute('SELECT DISTINCT T.idTarea, P.nombreP, T.nombreT, T.horasTrabajo FROM tarea as T, ejecuta as EJ, proyecto as P WHERE T.idTarea = EJ.idTarea AND P.idProyecto = T.idProyecto AND T.idProyecto = ?', [idProyecto])
}

static horasTotales(idProyecto){
  return db.execute('SELECT sum(horasTrabajo) as `horas` FROM tarea, proyecto WHERE proyecto.idProyecto = tarea.idProyecto AND proyecto.idProyecto = ? ',[idProyecto]);
}

static updateProyecto(idProyecto, nombreP, descripcion, estatus, stackTecnologico, stakeholders){
  return db.execute(`UPDATE proyecto
  SET 
    nombreP = '${nombreP}',
    descripcion = '${descripcion}',
    stackTecnologico = '${stackTecnologico}',
    stakeholders = '${stakeholders}',
    estatus = '${estatus}'
  WHERE
      idProyecto = ${idProyecto};`)
}


// Devuelve todo de un proyecto (Empleado, Trabaja, Proyecto))
static getTodoProyecto(idProyecto) {
  
  return db.execute(`SELECT * 
  FROM proyecto as P, trabaja as TR, empleado as Em 
  WHERE P.idProyecto = TR.idProyecto 
  AND Em.idEmpleado = TR.idEmpleado 
  AND P.idProyecto = ${idProyecto}`)
}

// Devuelve el idProyecto de la tabla Trabaja que con el ID dado 
static getIdProyecto(id) {
  return db.execute(`SELECT idProyecto 
  FROM trabaja as TR 
  WHERE TR.id = ${id}`)
}

// Borrar el registro de la Base de datos con el ID dado
static borrarColaboradorProyecto(id) {
  return db.execute(`DELETE FROM trabaja where ID =${id}`)
}

static asignarColaboradorProyecto(idEmpleado, idProyecto) {
  return db.execute(`INSERT INTO trabaja (idEmpleado, idProyecto) 
  VALUES (${idEmpleado},${idProyecto})`)
}

static getIdEliminar(idProyecto) {
  return db.execute(`SELECT * FROM proyecto WHERE idProyecto = ${idProyecto}`)
}

static eliminarProyecto(idProyecto) {
  return db.execute(`DELETE FROM proyecto WHERE idProyecto = ${idProyecto}`)
}

}
