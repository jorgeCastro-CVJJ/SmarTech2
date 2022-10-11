const express = require("express");
const router = express.Router();
const isAuth = require('../util/isAuth');

const regTareaController = require("../controllers/regTarea.controller");

router.get("/nueva", isAuth, regTareaController.consultarTareas);
// router.post("/nueva", regTareaController.postnuevaTarea);




module.exports = router;