const path = require("path");
const Proyecto = require("../models/proyectoModel");
const Tarea  = require("../models/tareaModel");
const Empleado = require("../models/empleadoModel");
const Usuario = require("../models/usuarioModel");
const Reporte = require("../models/reporteModel");
// const { Module } = require("module");

postnuevoReporte = (request, response, next) => {
    Reporte.fetchHoras()
    .then(([rowsReporte, fieldData]) => {
        return response.render(path.join("reporte", "crearReporte"), {
            horas:rowsReporte,
            listaPrivilegios: request.session.privilegios,
        });
    })
    Proyecto.fetchAll()
    .then(([rowsProyecto, fieldData]) => {
        proyecto: rowsProyecto
        listaPrivilegios: request.session.privilegios
    })
        .catch(err => { 
        console.log(err)
    });
}

module.exports = {
    postnuevoReporte,
}
