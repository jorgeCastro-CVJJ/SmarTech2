const express = require("express");
const router = express.Router();
const reporteController = require("../controllers/reporte.controller");
const isAuth = require('../util/isAuth');

router.get("/nuevoReporte", isAuth,reporteController.getReportes);
router.get("/crearReporte", isAuth,reporteController.postnuevoReporte);
router.post("/registrarReporte", isAuth,reporteController.postReporte);

router.get('/buscar/:fechaInicio/:fechaFin', isAuth, reporteController.getBuscarReporte);

router.get("/crearReporte", isAuth,reporteController.getPDF);

router.get("/existente/:noReporte", isAuth, reporteController.getReporteExistente)

module.exports = router;
