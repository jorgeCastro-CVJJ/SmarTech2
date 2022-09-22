const express = require("express");
const router = express.Router();

const regProyectoController = require("../controllers/regProyecto.controller");

router.get("/registrarProyecto", regProyectoController.getnuevoProyecto);
router.post("/registrarProyecto", regProyectoController.postnuevoProyecto);

module.exports = router;