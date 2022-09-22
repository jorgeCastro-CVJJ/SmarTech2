const express = require("express");
const router = express.Router();

const regTareaController = require("../controllers/regTarea.controller");

router.get("/nueva", regTareaController.consultarTareas);
// router.post("/nueva", regTareaController.postnuevaTarea);


module.exports = router;