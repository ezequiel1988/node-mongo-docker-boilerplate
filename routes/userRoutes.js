module.exports = app => {
  const usuario = require("../controllers/userController");
  const usuarioRegistrado = require("../controllers/loginController");


  //Crear un nuevo usuario
  app.post("/usuarios",usuarioRegistrado.verifyToken, usuario.create);

  //Obtener un usuario por su id

  app.get("/usuarios/:usuarioId",usuarioRegistrado.verifyToken, usuario.findOne);

  //Obtener todos los usuarios

  app.get("/usuarios", usuarioRegistrado.verifyToken, usuario.findAll);

  //Actualizar un usuario por su id

  app.put("/usuarios/:usuarioId",usuarioRegistrado.verifyToken, usuario.update);

  //Eliminar un usuario por su id

  app.delete("/usuarios/:usuarioId", usuarioRegistrado.verifyToken, usuario.delete);
};
