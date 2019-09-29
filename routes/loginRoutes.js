module.exports = router => {
  const usuarioRegistrado = require("../controllers/userSignUpController");  

  //Rgistra un nuevo usuario
  router.post("/signUp", usuarioRegistrado.registrarUsuario);

  router.get("/signIn", usuarioRegistrado.findAll);

  router.post("/signIn", usuarioRegistrado.registrarUsuario);

  //Se loguea el usuario que se registró previamente y recibe un token
  router.post("/login", usuarioRegistrado.loginUsuario);

  //Método que sirve para probar el usuario logeado. Se debe enviar el token
  //por Authorization
  router.get("/profile", usuarioRegistrado.verifyToken, async (req, res) => {
    try {
      const data = res.status(200).send("Bienvenido a tú perfil");
      return data;
    } catch (error) {
      console.log(error);
    }
  });
};
