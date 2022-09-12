const db = require("../util/database");
const bcrypt = require("bcryptjs");

module.exports = class RegTarea {
  // pla info que se debe tener para crear un usuario y guardarlo en la base de datos
  constructor(nombreT, horasRegistradas) {
    this.nombre = unNombre;
    this.nombreT = nombreT;
    this.horasRegistradas = horasRegistradas
  }

  async save(){
    try(){
      await db.execute('INSERT INTO tarea (nombreT) VALUES (?)', [this.nombreT]);
      await db.execute ('INSERT INTO tareas (horasRegistadas) VALUES (?)', [this.horasRegistradas]);
      // return db.execute
    }
  }

  static fetchAll() {
    return db.execute('SELECT nombreP FROM proyecto');
}
};
