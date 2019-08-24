module.exports = (app) => {

    const usuario = require("../controllers/userController")

    //Crear un nuevo usuario
    app.post("/usuarios", usuario.create)

    //Obtener un usuario por su id

    app.get("/usuarios/:usuarioId", usuario.findOne)

    //Obtener todos los usuarios

    app.get("/usuarios", usuario.findAll)

    //Actualizar un usuario por su id

    app.put("/usuarios/:usuarioId", usuario.update)

    //Eliminar un usuario por su id

    app.delete("/usuarios/:usuarioId", usuario.delete)

}
