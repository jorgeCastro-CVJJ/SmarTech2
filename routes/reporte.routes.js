const express = require("express");
const router = express.Router();
const reporteController = require("../controllers/reporte.controller");
const isAuth = require('../util/isAuth');

router.get("/nuevoReporte", isAuth,reporteController.getReportes);
router.get("/crearReporte", isAuth,reporteController.postnuevoReporte);
router.post("/crearReporte", isAuth,reporteController.postReporte);

router.get('/buscar/:fechaInicio/:fechaFinal', isAuth, reporteController.getBuscarReporte);

router.get("/crearPdf", isAuth,reporteController.getPDF);

router.get("/existente/:noReporte", isAuth, reporteController.getReporteExistente)

module.exports = router;
