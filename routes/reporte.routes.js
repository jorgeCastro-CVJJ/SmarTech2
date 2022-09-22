const express = require("express");
const router = express.Router();

const reporteController = require("../controllers/reporteController");

router.get("/login", userController.getLogin);
router.post("/login", userController.postLogin);

router.get("/inicio", userController.menu)
router.post("/inicio", userController.menu)


router.get("/inicio/reporteSemanal", reporteController.getReporte)
router.post("/inicio/reporteSemanal", reporteController.postReporte)

module.exports = router;