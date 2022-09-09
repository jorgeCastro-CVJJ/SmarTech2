const db = require("../util/database");
const bcrypt = require("bcryptjs");

module.exports = class RegTarea {
  // pla info que se debe tener para crear un usuario y guardarlo en la base de datos
  constructor(unNombre, unaTarea) {
    this.nombre = unNombre;
    this.nombreT = this.nombreT;
    this.horasRegistradas = this.horasRegistradas
  }

  save(){
    return db.execute('INSERT INTO tarea (nombreT) VALUES (?)', [this.nombreT]);
    //return db.execute('INSERT INTO horasRegistradas (horasRegistradas) VALUES (?)', [this.horasRegistradas]);
  }



  static fetchAll() {
    return db.execute('SELECT nombreP FROM proyecto');
}
};
