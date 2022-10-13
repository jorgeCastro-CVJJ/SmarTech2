const express = require("express");
const router = express.Router();
const userController = require("../controllers/user.controller");
const isAuth = require('../util/isAuth');

// router.get('/login', (req, res) => {
//     res.render('/login', userController.getLogin)
// });

router.get('/login', userController.getLogin)


<<<<<<< Updated upstream
router.post('/login', userController.postLogin);
=======
router.get("/login", userController.getLogin);
router.post("/login", userController.postLogin);
router.get("/logout", userController.logout)
>>>>>>> Stashed changes

router.get('/inicio', isAuth, userController.menu);
router.post('/inicio', isAuth, userController.menu);

<<<<<<< Updated upstream
router.get('/logout', userController.logout)
=======
router.get('/crearUsuario',userController.getCrearUsuario);
router.post('/crearusuario',userController.postCrearUsuario);

>>>>>>> Stashed changes

module.exports = router;