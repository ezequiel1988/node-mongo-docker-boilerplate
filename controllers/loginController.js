const LoginUserModel = require("../model/loginModel.js");
const passport = require("passport");
const jwt = require("jsonwebtoken");

//Registrar un usuario nuevo
exports.registrarUsuario = async (req, res) => {
  if (!req.body) {
    return res.status(400).send({
      mensaje: "Usuario logeado correctamente"
    });
  }

  const usuarioARegistrar = await new LoginUserModel({
    nombre: req.body.nombre,
    apellido: req.body.apellido,
    email: req.body.email,
    password: req.body.password
  });

  try {
    const userEmail = await LoginUserModel.findOne({
      email: req.body.email
    });

    if (userEmail) {
      res.status(500).send({
        mensaje: "El email ya está en uso"
      });
    }
  } catch (err) {
    console.error(err);
  }

  try {
    //Guarda la contraseña cifrada
    usuarioARegistrar.password = await usuarioARegistrar.encryptPassword(
      usuarioARegistrar.password
    );
    //Guarda el usuario registrado
    const data = await usuarioARegistrar.save();
    res.send(data);
  } catch (err) {
    console.error(err);
    res.status(500).send({
      mensaje: "Hubo un problema al registar el usuario"
    });
  }
};

//login con un usuario registrado y envía un token
exports.loginUsuario = async (req, res) => {
  
  if (!req.body) {
    return res.status(400).send({
      mensaje: "Hubo un problema al iniciar sesión"
    });
  }

  try {
    const usuarioARegistrar = await new LoginUserModel({
      nombre: req.body.nombre,
      apellido: req.body.apellido,
      email: req.body.email,
      password: req.body.password
    });

    try {
      const { email } = await LoginUserModel.findOne({
        email: req.body.email
      });
  
      if (email) {
        res.status(500).send({
          mensaje: `El usuario con el email ${email} ya inició sesión`
        });
      }
    } catch (err) {
      console.error(err);
    }
    
    jwt.sign({ usuarioARegistrar }, "secretkey", (err, token) => {
      if (err) {
        console.log(err);
      }
      res.send({ token });
    });
  
    
  
    try {
      //Guarda la contraseña cifrada
      usuarioARegistrar.password = await usuarioARegistrar.encryptPassword(usuarioARegistrar.password);
  
      //Guarda el usuario registrado
      const data = await usuarioARegistrar.save();
      res.send(data);
    } catch (err) {
      console.error(err);
      res.status(500).send({
        mensaje: "Hubo un problema al iniciar sesión"
      });
    }
  } catch (e) {
    console.log(e)
  }
  
};

//Para acceder se necesita mandar un token por Authorization
exports.findAll = async (req, res) => {
  jwt.verify(req.token, "secretkey", (err, autData) => {
        //verifica quien es el usuario que hizo la petición
    if (err) {
      res.sendStatus(403);
    } else {
      res.json({
        mensaje: "no se que va acá",
        autData
      });
    }
  });
  try {
    const usuarios = await LoginUserModel.find();
    res.send(usuarios);
  } catch (err) {
    console.error(err);
    res.status(500).send({
      mensaje: "Hubo un problema al cargar los usuarios registrados"
    });
  }
};

exports.deleteLogin = (req, res) => {

  // jwt.verify(req.token, "secretkey", (err, autData) => {
  //   //verifica quien es el usuario que hizo la petición
  //   if (err) {
  //     res.sendStatus(403);
  //   } else {
  //     res.json({
  //       mensaje: "Este es el usuario que hizo la petición",
  //       autData
  //     });
  //   }
  // });

  console.log(req.body)
    
    LoginUserModel.findOneAndRemove({
      email: req.body.email
    })
    .then(usuario => {
      if (!usuario) {
        res.status(404).send({
          mensaje: `El usuario con el email ${req.body.email} no se encuentra`
        });
      }
      res.send({ mensaje: "Se ha cerrado sesión correctamente" });
    })
    .catch(err => {
      console.log(err);
      if (err.kind === "ObjectId" || err.name === "NotFound") {
        res.status(404).send({
          mensaje: `El usuario con el email ${req.body.email} no se encuentra`
        });
      }
      res.status(500).send({
        mensaje: `No se puede eliminar el usuario con el email ${req.body.email}`
      });
    });
}

exports.verifyToken = function(req, res, next) {
  const bearerHeader = req.headers["authorization"];
  if (typeof bearerHeader !== "undefined") {
    const bearer = bearerHeader.split(" ");
    const bearerToken = bearer[1];
    req.token = bearerToken;
    next();
  } else {
    res.sendStatus(403);
  }
};
