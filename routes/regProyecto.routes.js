const express = require("express");
const router = express.Router();

const regProyectoController = require("../controllers/regProyecto.controller");

router.get("/registrarProyecto", regProyectoController.getnuevoProyecto);
router.post("/registrarProyecto", regProyectoController.postnuevoProyecto);

router.get("/proyectosExistentes", regProyectoController.getProyectoExistente);

router.get("/misProyectos", regProyectoController.getProyectosByUserID);

router.get("/buscar/:valor", regProyectoController.getBuscar)

router.get("/existente/:idProyecto", regProyectoController.getProyectosExistentes)

router.get("/editar/:idProyecto", regProyectoController.getEditarProyecto)
//router.post("/editar/", regProyectoController.postEditarProyecto)

module.exports = router;