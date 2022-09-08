const express = require("express");
const router = express.Router();
const colaboradorController = require("../controllers/colaborador_controller");

router.get("/pruebaMenu", colaboradorController.menu);

module.exports = router;
