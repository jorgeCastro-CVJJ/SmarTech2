const express = require("express");
const router = express.Router();
const userController = require("../controllers/user.controller");
const isAuth = require('../util/isAuth');
const hasCrearEmpleado = require('../util/hasCrearEmpleado');

router.get("/login", userController.getLogin);
router.post("/login", userController.postLogin);
router.get("/logout", userController.logout)

router.get('/inicio', isAuth, userController.menu);
router.post('/inicio', isAuth, userController.menu);

router.get('/crearEmpleado', isAuth, hasCrearEmpleado ,userController.getCrearEmpleado);
router.post('/crearEmpleado', isAuth, hasCrearEmpleado, userController.postCrearEmpleado);

router.get('/ayuda', isAuth, userController.getAyuda);


module.exports = router;