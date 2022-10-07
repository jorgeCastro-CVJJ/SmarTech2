const express = require("express");
const router = express.Router();
const reporteController = require("../controllers/reporte.controller");

router.get("/nuevoReporte", reporteController.getReportes);
router.get("/crearReporte", reporteController.postnuevoReporte);
router.post("/registrarReporte", reporteController.postReporte);

module.exports = router;
