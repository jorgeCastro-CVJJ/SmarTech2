const db = require("../util/database");
const bcrypt = require("bcryptjs");

module.exports = class Reporte {
    constructor(noReporte, proporcion, eficiencia, horasModificadas, horasVacaciones, personalCompleto, personalMedio) {
        this.noReporte = noReporte, 
        this.proporcion = proporcion,
        this.eficiencia = eficiencia, 
        this.horasModificadas = horasModificadas,
        this.horasVacaciones = horasVacaciones, 
        this.personalCompleto = personalCompleto,
        this.personalMedio = personalMedio
    };

    save() {
        return db.execute('INSERT INTO reporteFinal (proporcion, personalCompleto, personalMedio, horasVacaciones, horasModificadas, descripcion) VALUES (?,?,?,?,?,?)', [this.proporcion, this.personalCompleto, this.personalMedio, this.horasVacaciones, this.horasModificadas, this.descripcion]);
    }

    static fetchReporte() {
       return db.execute("SELECT noReporte, proporcion, eficiencia, horasModificadas, horasVacaciones FROM reporteFinal")
    }

  //   static fetchHorasReporte(idSesion, fechaInicio, fechaFinal) {
  //    return db.execute('SELECT fechaInicio, fechaFinal FROM reporteFinal WHERE fechaInicio ? AND fechaFinal ?', [idSesion, fechaInicio, fechaFinal])
  //  }

      //tarea, proyecto = idProyecto
  static fetchHoras() {
    return db.execute('SELECT SUM(horasTrabajo) as horasTrabajo, nombreP FROM tarea T, proyecto P WHERE T.idProyecto = P.idProyecto GROUP BY nombreP');
  }



}