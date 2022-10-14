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

getReportes = (request, response, next) => {
    // Reporte.fetchHorasReporte(request.session.idSesion, request.params.fechaInicio, request.params.fechaFin)
    console.log("hola")
    Reporte.fetchReporte()
    .then(([rowsRep, fieldData]) => {
        console.log("Datos de filas:", rowsRep)
        return response.render(path.join("reporte", "modificarCrearReporte"), {
            reporte: rowsRep,
            listaPrivilegios: request.session.privilegios
        });
    })
    .catch(err => {
        console.log(err)
    });
}

postReporte = (request, response, next) => {
    const nuevoReporte = new Reporte(request.body.proporcion, request.body.horasVacaciones, request.body.personalCompletoT, request.body.personalMedioT, request.body.descripcion);
    console.log(nuevoReporte);
    nuevoReporte.save()
    .then(() => {
        console.log(nuevoReporte)
    })
    .catch(err => {
        console.log(err)
    });
}

getBuscarReporte = (request, response, next) => {

    Reporte.buscarReporteFecha(request.params.fechaInicio, request.params.fechaFin)
        .then(([rows, fieldData]) => {
            console.log("Los datos del reporte son:", rows)
            response.status(200).json({fecha: rows});
        })
        .catch(err => { 
            console.log(err);
            response.status(500).json({message: "ERROR 500"});
        });
};

module.exports = {
    postnuevoReporte,
    getReportes,
    postReporte,
    getBuscarReporte
}
