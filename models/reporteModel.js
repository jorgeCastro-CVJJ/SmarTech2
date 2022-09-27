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
        return db.execute('INSERT INTO reporteFinal (proporcion, personalCompleto, personalMedio, horasVacaciones, horasModificadas) VALUES (?,?,?,?,?)', [this.proporcion, this.personalCompleto, this.personalMedio, this.horasVacaciones, this.horasModificadas]);
    }

    static fetchReporte() {
        db.execute("SELECT * from reportefinal")
    }


}