const path = require("path");
const Proyecto = require("../models/proyectoModel");
const Tarea  = require("../models/tareaModel");
const Empleado = require("../models/empleadoModel");
const Usuario = require("../models/usuarioModel");
const Reporte = require("../models/reporteModel");
const { Module } = require("module");

postnuevoReporte = (request, response, next) => {
    Reporte.fetchHoras()
    .then(([rowsTarea, fieldData]) => {
        // response.render("crearReporte","crearReporteForm.ejs"), 
        {
        horas: rowsTarea
        } 
    })
    Proyecto.fetchAll()
    .then(([rowsProyecto, fieldData]) => {
        proyecto: rowsProyecto
    })
        .catch(err => { 
        console.log(err)
    });
}

module.exports = {
    postnuevoReporte,
}
