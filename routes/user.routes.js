const express = require("express");
const router = express.Router();

const userController = require("../controllers/user.controller");

router.get("/login", userController.getLogin);
router.post("/login", userController.postLogin);

router.get("/inicio",userController.menu)

module.exports = router;