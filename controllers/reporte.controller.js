const path = require("path");
const Proyecto = require("../models/proyectoModel");
const Tarea  = require("../models/tareaModel");
const Empleado = require("../models/empleadoModel");
const Usuario = require("../models/usuarioModel");
const Reporte = require("../models/reporteModel");

postnuevoReporte = (request, response, next) => {
    Reporte.fetchHoras()
    .then(([rowsReporte, fieldData]) => {
        return response.render(path.join("reporte", "crearReporte"), {
            horas: rowsReporte,
            listaPrivilegios: request.session.privilegios
       });
//    })
    })
    .catch(err => { 
        console.log(err)
    });
}

module.exports = {
    postnuevoReporte,
}
