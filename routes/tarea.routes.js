const express = require("express");
const router = express.Router();
const regTareaController = require("../controllers/regTarea.controller");
const isAuth = require('../util/isAuth');
const hasModificarTarea = require('../util/hasModificarTarea');
const hasRegTarea = require('../util/hasRegTarea');



// ====== REGISTRAR TAREA ====== //
router.get("/registrarTarea", isAuth, hasRegTarea, regTareaController.getnuevaTarea);
router.post("/registrarTarea", isAuth, hasRegTarea, regTareaController.postnuevaTarea);
// ============================= //

router.get("/misTareas", isAuth, regTareaController.getTareas);
router.get('/buscar/:fechaInicio/:fechaFin', isAuth, regTareaController.getBuscar);
router.get('/horasTarea/:idProyecto', isAuth, regTareaController.getHorasXtarea)

router.get('/editar/:idTarea', isAuth, hasModificarTarea, regTareaController.getEditarTarea);
router.post('/editar/:idTarea',  isAuth, hasModificarTarea, regTareaController.postEditarTarea);

router.get('/eliminar/:id', isAuth, regTareaController.borrarColaborador);
router.get('/asignar/:idTarea/empleado/:idEmpleado', isAuth, regTareaController.agregarColaborador);

router.get('/eliminarTarea/:idTarea', isAuth, regTareaController.borrarTarea);

module.exports = router;