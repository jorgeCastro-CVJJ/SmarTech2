const express = require("express");
const router = express.Router();

const regTareaController = require("../controllers/regTarea.controller");

router.get("/nueva", regTareaController.getTarea);
router.post("/nueva", regTareaController.postTarea);

module.exports = router;