const db = require("../util/database");
const bcrypt = require("bcryptjs");

module.exports = class Reporte {
    constructor(porcentaje, horasVacaciones, personalCompletoT, personalMedioT, descripcion, fechaInicio, fechaFinal) {
        this.porcentaje = porcentaje,
        this.horasVacaciones = horasVacaciones, 
        this.personalCompletoT = personalCompletoT,
        this.personalMedioT = personalMedioT,
        this.descripcion = descripcion,
        this.fechaInicio = fechaInicio,
        this.fechaFinal = fechaFinal
    };

    save() {
        return db.execute('INSERT INTO reporteFinal (porcentaje, horasVacaciones, personalCompletoT, personalMedioT, descripcion, fechaInicio, fechaFinal) VALUES (?,?,?,?,?, ?, ?)', [this.porcentaje, this.horasVacaciones, this.personalCompletoT, this.personalMedioT, this.descripcion, this.fechaInicio, this.fechaFinal]);
    }

    static fetchReporte() {
       return db.execute("SELECT * FROM reporteFinal")
    }

     static fetchOne(noReporte) {
       return db.execute("SELECT noReporte, porcentaje, horasVacaciones, personalCompletoT, personalMedioT, descripcion, fechaInicio, fechaFinal FROM reporteFinal WHERE noReporte = ?", [noReporte])
    }

  //   static fetchHorasReporte(idSesion, fechaInicio, fechaFinal) {
  //    return db.execute('SELECT fechaInicio, fechaFinal FROM reporteFinal WHERE fechaInicio ? AND fechaFinal ?', [idSesion, fechaInicio, fechaFinal])
  //  }

      //tarea, proyecto = idProyecto
   static fetchHoras() {
     return db.execute('SELECT SUM(horasTrabajo) as horasTrabajo, nombreP FROM tarea T, proyecto P WHERE T.idProyecto = P.idProyecto GROUP BY nombreP');
   }

  static buscarReporteFecha(fechaInicio, fechaFinal) {
    return db.execute(`SELECT nombreP, SUM(horasTrabajo) as horasReales 
    FROM tarea T, proyecto P, trabaja Tr 
    WHERE T.idProyecto = P.idProyecto 
    AND Tr.idProyecto = P.idProyecto
    AND Tr.fecha BETWEEN ? AND ?
    Group by nombreP`, [fechaInicio, fechaFinal]);
  }
}