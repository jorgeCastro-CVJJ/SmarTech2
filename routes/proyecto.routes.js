const express = require("express");
const router = express.Router();
const regProyectoController = require("../controllers/regProyecto.controller");
const isAuth = require('../util/isAuth');
const hasRegNuevoProyecto = require('../util/hasRegNuevoProyecto');
const hasEditarProyecto = require("../util/hasEditarProyecto");

router.get("/registrarProyecto", isAuth, hasRegNuevoProyecto, regProyectoController.getnuevoProyecto);
router.post("/registrarProyecto", isAuth, hasRegNuevoProyecto, regProyectoController.postnuevoProyecto);

router.get("/proyectosExistentes", isAuth, regProyectoController.getProyectoExistente);

router.get("/misProyectos", isAuth, regProyectoController.getProyectosByUserID);

router.get("/buscar/:valor", isAuth, regProyectoController.getBuscar)

router.get("/existente/:idProyecto", isAuth, regProyectoController.getProyectosExistentes)

router.get("/editar/:idProyecto", isAuth, hasEditarProyecto, regProyectoController.getEditarProyecto)
router.post("/editar/:idProyecto", hasEditarProyecto, regProyectoController.postEditarProyecto)

router.get('/eliminarProyecto/:idProyecto', isAuth, regProyectoController.eliminarProyecto)


// Rutas Auxiliares 
router.get('/eliminar/:id', isAuth, regProyectoController.borrarColaboradorController);
router.get('/asignar/:idProyecto/empleado/:idEmpleado', isAuth, regProyectoController.agregarColaboradorController);


module.exports = router;