const express = require("express");
const router = express.Router();

const regTareaController = require("../controllers/regTarea.controller");

router.get("/registrarTarea", regTareaController.getnuevaTarea);
router.post("/registrarTarea", regTareaController.postnuevaTarea);
router.get("/misTareas", regTareaController.getTareas);
router.get('/buscar/:fechaInicio/:fechaFin', regTareaController.getBuscar);
router.get('/horasTarea/:idProyecto', regTareaController.getHorasXtarea)

module.exports = router;