const express = require("express");
const router = express.Router();
const isAuth = require('../util/isAuth');

const regProyectoController = require("../controllers/regProyecto.controller");

router.get("/registrarProyecto", isAuth, regProyectoController.getnuevoProyecto);
router.post("/registrarProyecto", isAuth, regProyectoController.postnuevoProyecto);

router.get("/proyectosExistentes", isAuth, regProyectoController.getProyectoExistente);

router.get("/misProyectos", isAuth, regProyectoController.getProyectosByUserID);

router.get("/buscar/:valor", isAuth, regProyectoController.getBuscar)

router.get("/existente/:idProyecto", isAuth, regProyectoController.getProyectosExistentes)

router.get("/editar/:idProyecto", isAuth, regProyectoController.getEditarProyecto)
//router.post("/editar/", regProyectoController.postEditarProyecto)

module.exports = router;