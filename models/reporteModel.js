const db = require("../util/database");
const bcrypt = require("bcryptjs");

module.exports = class Reporte {
    constructor(proporcion, horasVacaciones, personalCompletoT, personalMedioT, descripcion) {
        this.proporcion = proporcion,
        this.horasVacaciones = horasVacaciones, 
        this.personalCompletoT = personalCompletoT,
        this.personalMedioT = personalMedioT
        this.descripcion = descripcion
    };

    save() {
        return db.execute('INSERT INTO reporteFinal (proporcion, horasVacaciones, personalCompletoT, personalMedioT, descripcion) VALUES (?,?,?,?,?)', [this.proporcion, this.horasVacaciones, this.personalCompletoT, this.personalMedioT, this.descripcion]);
    }

    static fetchReporte() {
       return db.execute("SELECT proporcion, horasVacaciones, personalCompletoT, personalMedioT, descripcion FROM reporteFinal")
    }

  //   static fetchHorasReporte(idSesion, fechaInicio, fechaFinal) {
  //    return db.execute('SELECT fechaInicio, fechaFinal FROM reporteFinal WHERE fechaInicio ? AND fechaFinal ?', [idSesion, fechaInicio, fechaFinal])
  //  }

      //tarea, proyecto = idProyecto
  static fetchHoras() {
    return db.execute('SELECT SUM(horasTrabajo) as horasTrabajo, nombreP FROM tarea T, proyecto P WHERE T.idProyecto = P.idProyecto GROUP BY nombreP');
  }

  static buscarReporteFecha(fechaInicio, fechaFin) {
    return db.execute('SELECT DISTINCT SUM(horasTrabajo) as horasTrabajo, nombreP FROM tarea T, proyecto P, trabaja Tr WHERE T.idProyecto = P.idProyecto AND Tr.fecha BETWEEN ? AND ? GROUP BY nombreP', [fechaInicio, fechaFin]);
  }

}