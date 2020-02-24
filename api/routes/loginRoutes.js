module.exports = router => {
  const usuarioRegistrado = require("../controllers/loginController");

  //Rgistra un nuevo usuario
  router.post("/registrarse", usuarioRegistrado.registrarUsuario);

  //Se loguea el usuario que se registró previamente y recibe un token
  router.post("/login", usuarioRegistrado.loginUsuario);

  //El usuario cierra sesión
  router.delete('/login', usuarioRegistrado.verifyToken, usuarioRegistrado.deleteLogin)

  //Ruta para ver usuarios registrados
  router.get('/usuarios_registrados', usuarioRegistrado.verifyToken, usuarioRegistrado.findAll )

};
