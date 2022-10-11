const express = require("express");
const router = express.Router();
const regTareaController = require("../controllers/regTarea.controller");
const isAuth = require('../util/isAuth');



router.get("/registrarTarea", isAuth, regTareaController.getnuevaTarea);
router.post("/registrarTarea", isAuth, regTareaController.postnuevaTarea);
router.get("/misTareas", isAuth, regTareaController.getTareas);
router.get('/buscar/:fechaInicio/:fechaFin', isAuth, regTareaController.getBuscar);
router.get('/horasTarea/:idProyecto', isAuth, regTareaController.getHorasXtarea)

router.get('/editar/:idTarea', isAuth, regTareaController.getEditarTarea);
router.post('/editar/:idTarea',  isAuth, regTareaController.postEditarTarea);
router.get('/eliminar/:id', isAuth, regTareaController.borrarColaborador);
router.get('/asignar/:idTarea/empleado/:idEmpleado', isAuth, regTareaController.agregarColaborador);

router.get('/eliminarTarea/:idTarea', isAuth, regTareaController.borrarTarea);

module.exports = router;