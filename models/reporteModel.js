const db = require("../util/database");
const bcrypt = require("bcryptjs");

module.exports = class Reporte {
    constructor(proporcion, horasVacaciones, personalCompleto, personalMedio, descripcion) {
        this.proporcion = proporcion,
        this.horasVacaciones = horasVacaciones, 
        this.personalCompleto = personalCompleto,
        this.personalMedio = personalMedio
        this.descripcion = descripcion
    };

    save() {
        return db.execute('INSERT INTO reporteFinal (proporcion, horasVacaciones, personalCompleto, personalMedio, descripcion) VALUES (?,?,?,?,?)', [this.proporcion, this.horasVacaciones, this.personalCompleto, this.personalMedio, this.descripcion]);
    }

    static fetchReporte() {
       return db.execute("SELECT proporcion, horasVacaciones, personalCompleto, personalMedio, descripcion FROM reporteFinal")
    }

  //   static fetchHorasReporte(idSesion, fechaInicio, fechaFinal) {
  //    return db.execute('SELECT fechaInicio, fechaFinal FROM reporteFinal WHERE fechaInicio ? AND fechaFinal ?', [idSesion, fechaInicio, fechaFinal])
  //  }

      //tarea, proyecto = idProyecto
  static fetchHoras() {
    return db.execute('SELECT SUM(horasTrabajo) as horasTrabajo, nombreP FROM tarea T, proyecto P WHERE T.idProyecto = P.idProyecto GROUP BY nombreP');
  }



}