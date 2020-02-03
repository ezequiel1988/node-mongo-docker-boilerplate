module.exports = router => {
    const usuario = require('../controllers/registerController');
    const usuarioRegistrado = require("../controllers/loginController");

    router.get('/home/usuarios-registrados', usuarioRegistrado.verifyToken, usuario.findAll);


}