const Usuario = require("../model/user");

//Crear nuevo usuario
exports.create = (req, res) => {  
  if (!req.body) {
    return res.status(400).send({
      message: "No se ha enviado ningún tipo de dato"
    });
  }
  // Crear un usuario
const usuario = new Usuario({
  age: req.body.age,
  name: req.body.name,
  lastName: req.body.lastName,
  email: req.body.email
});

//Guardar un usuario en la base de datos
usuario.save()
  .then(data => {
    res.send(data);
  })
  .catch(err => {
    console.log(err);
    res.status(500).send({
      mensaje: err.mensaje || "Hubo un problema con el servidor"
    });
  });
};



//Buscar todos los usuarios

exports.findAll = (req, res) => {
  Usuario.find()
  .then(usuarios => {
    res.send(usuarios);
  }).catch(err => {
    console.log(err);
    res.status(500).send({
      mensaje: err.mensaje || "Hubo un error al traer los datos"
    });
  });
};

//Buscar un usuario por su id

exports.findOne = (req, res) => {
  Usuario.findById(req.params.usuarioId).then(usuario => {
    if (!usuario) {
      return res.status(404).send({
        mensaje: `El usuario con el id ${req.params.usuarioId} no se encuentra`
      });
    }
    res.send(usuario)

      .catch(err => {
        console.log(err);
        if (err.kind === "ObjectId") {
          return res.status(404).send({
            mensaje: `El usuario con el id ${
              req.params.usuarioId
            } no se encuentra`
          });
        }
        return res.status(500).send({
          mensaje: `El usuario con el id ${
            req.params.usuarioId
          } no se encuentra`
        });
      });
  });
};

//Validar usuario
exports.update = (req, res) => {
  if (!req.body) {
    return res.status(400).send({
      mensaje: "No se logró actualizar usuario"
    });
  }
  //Actualizar el usuario
  Usuario.findByIdAndUpdate(
    req.params.usuarioId,
    {
      id: req.body.id,
      name: req.body.name,
      lastName: req.body.lastName,
      email: req.body.email
    },
    { new: true }
  )
    .then(usuario => {
      if (!usuario) {
        res.status(404).send({
          mensaje: `El usuario con el id ${
            req.params.usuarioId
          } no se encuentra`
        });
      }
      res.send(usuario);
    })
    .catch(err => {
      console.log(err);
      if (err.kind === "ObjectId") {
        return res.status(404).send({
          mensaje: `El usuario con el id ${
            req.params.usuarioId
          } no se encuentra`
        });
      }
      return res.status(500).send({
        mensaje: `El usuario con el id ${req.params.usuarioId} no se encuentra`
      });
    });
};

//Eliminar usuario por su id

exports.delete = (req, res) => {
  console.log(req.body);
  
  Usuario.findByIdAndRemove(req.params.usuarioId)
  .then(usuario => {
    if (!usuario) {
      res.status(404).send({
        mensaje: `El usuario con el id ${req.params.usuarioId} no se encuentra`
      });
    }
    res.send({mensaje: "Usuario eliminado correctamente"})
  }).catch(err => {
        console.log(err);
        if (err.kind === "ObjectId" || err.name === "NotFound") {
          res.status(404).send({
            mensaje: `El usuario con el id ${
              req.params.usuarioId
            } no se encuentra`
          });
        }
        res.status(500).send({
          mensaje: 
          `No se puede eliminar el usuario con el id ${req.params.usuarioId}`});
      })
}

