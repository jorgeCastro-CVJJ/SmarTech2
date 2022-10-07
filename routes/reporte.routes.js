const express = require("express");
const router = express.Router();
const reporteController = require("../controllers/reporte.controller");

router.get("/nuevoReporte", reporteController.getReportes);
router.get("/crearReporte", reporteController.postnuevoReporte);

module.exports = router;
