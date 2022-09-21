const express = require("express");
const router = express.Router();

const regProyectoController = require("../controllers/regProyecto.controller");

router.get("/nuevo", regProyectoController.getnuevoProyecto);
router.post("/nuevo", regProyectoController.postnuevoProyecto);

module.exports = router;