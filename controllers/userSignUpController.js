const UserSignUp = require("../model/usuarioLogeado.js");


//Registrar un usuario nuevo
exports.registrarUsuario = async (req, res)=>{
    if(!req.body) {
        return res.status(400).send({
            mensaje: "Hubo un error al registrar usuario"
        })
    }

    const usuarioARegistrar = await new UserSignUp({
        usuarioRegistrado: {
            nombre: req.body.nombre,
            apellido: req.body.apellido,
            email: req.body.email,
            password: req.body.password
        }
    })

    try {
        const data = await usuarioARegistrar.save()
        res.send(data)
    } catch (err) {
        console.error(err);
        res.status(500).send({
            mensaje:"Hubo un problema al registar el usuario"
        })
    }
}

exports.findAll = async (req, res) => {
    try {
      const usuarios = await  UserSignUp.find();
      res.send(usuarios)
        
    } catch (err) {
        console.error(err);
        res.status(500).send({
            mensaje: "Hubo un problema al cargar los usuarios registrados"
        })
    } 
}